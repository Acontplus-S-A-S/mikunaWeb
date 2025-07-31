// src/services/api.js

/**
 * Configuración de la API de MIKUNA CAFETERIA
 * API Base: https://royalblue-chamois-327906.hostingersite.com/public/api
 */

// URL base de tu API existente
const API_BASE_URL = 'https://royalblue-chamois-327906.hostingersite.com/public/api';

// Configuración por defecto para las peticiones
const DEFAULT_CONFIG = {
  method: 'POST', // Tu API usa POST para obtener categorías
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Timeout para las peticiones (10 segundos)
const REQUEST_TIMEOUT = 10000;

/**
 * Función para crear un timeout en fetch
 * @param {Promise} fetchPromise - Promise de fetch
 * @param {number} timeout - Tiempo en milisegundos
 * @returns {Promise} - Promise con timeout
 */
function fetchWithTimeout(fetchPromise, timeout = REQUEST_TIMEOUT) {
  return Promise.race([
    fetchPromise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
}

/**
 * Función genérica para hacer peticiones a la API
 * @param {string} endpoint - El endpoint de la API (ej: '/business/category')
 * @param {object} requestBody - Cuerpo de la petición
 * @param {object} options - Opciones adicionales para fetch
 * @returns {Promise<object>} - Respuesta procesada de la API
 */
async function apiRequest(endpoint, requestBody = {}, options = {}) {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      ...DEFAULT_CONFIG,
      ...options,
      headers: {
        ...DEFAULT_CONFIG.headers,
        ...options.headers,
      },
      body: JSON.stringify(requestBody),
    };

    console.log(`🔗 API Request: ${config.method} ${url}`, requestBody);
    
    // Realizar petición con timeout
    const response = await fetchWithTimeout(fetch(url, config));
    
    // Verificar si la respuesta HTTP es exitosa
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    
    // Parsear respuesta JSON
    const data = await response.json();
    
    // Validar estructura de respuesta de tu API
    if (typeof data.code === 'undefined') {
      throw new Error('Estructura de respuesta API inválida - falta campo "code"');
    }
    
    console.log(`✅ API Response Code: ${data.code}`, data);
    return data;
    
  } catch (error) {
    // Log detallado del error para debugging
    console.error(`❌ API Error en ${endpoint}:`, {
      message: error.message,
      requestBody,
      timestamp: new Date().toISOString()
    });
    
    // Re-lanzar el error para que lo maneje el llamador
    throw error;
  }
}

/**
 * Obtener categorías del negocio con paginación
 * Usa tu API: POST /business/category
 * @param {number} page - Número de página (default: 1)
 * @param {number} perPage - Elementos por página (default: 10)
 * @returns {Promise<object>} - Datos procesados de categorías
 */
export async function getBusinessCategories(page = 1, perPage = 10) {
  try {
    // Cuerpo de la petición según tu especificación
    const requestBody = {
      per_page: perPage,
      page: page,
    };

    // Llamar a tu API
    const response = await apiRequest('/business/category', requestBody);

    // Procesar respuesta según tu estructura
    if (response.code === "1") {
      // Éxito - hay datos
      return {
        success: true,
        data: response.payload.data || [],
        pagination: {
          currentPage: response.payload.current_page,
          lastPage: response.payload.last_page,
          perPage: response.payload.per_page,
          total: response.payload.total,
          from: response.payload.from,
          to: response.payload.to,
          hasNextPage: !!response.payload.next_page_url,
          hasPrevPage: !!response.payload.prev_page_url,
          nextPageUrl: response.payload.next_page_url,
          prevPageUrl: response.payload.prev_page_url,
          firstPageUrl: response.payload.first_page_url,
          lastPageUrl: response.payload.last_page_url,
          links: response.payload.links || [],
        },
        message: response.message || 'Categorías obtenidas exitosamente'
      };
    } else {
      // No hay datos (code = "0")
      return {
        success: false,
        data: [],
        pagination: null,
        message: response.message || 'No se encontraron categorías'
      };
    }
  } catch (error) {
    console.error('Error en getBusinessCategories:', error);
    
    // Retornar estructura consistente en caso de error
    return {
      success: false,
      data: [],
      pagination: null,
      message: 'Error de conexión con el servidor',
      error: error.message
    };
  }
}

/**
 * Obtener todas las categorías (sin paginación)
 * Hace múltiples llamadas si es necesario para obtener todos los datos
 * @returns {Promise<object>} - Array con todas las categorías
 */
export async function getAllCategories() {
  try {
    let allCategories = [];
    let currentPage = 1;
    let hasMorePages = true;
    const perPage = 50; // Usar páginas grandes para ser eficiente

    while (hasMorePages) {
      const response = await getBusinessCategories(currentPage, perPage);
      
      if (response.success && response.data.length > 0) {
        allCategories = [...allCategories, ...response.data];
        
        // Verificar si hay más páginas
        hasMorePages = response.pagination && response.pagination.hasNextPage;
        currentPage++;
        
        // Seguridad: evitar loops infinitos
        if (currentPage > 100) {
          console.warn('Límite de páginas alcanzado en getAllCategories');
          break;
        }
      } else {
        hasMorePages = false;
      }
    }

    return {
      success: true,
      data: allCategories,
      total: allCategories.length,
      message: `${allCategories.length} categorías obtenidas`
    };
  } catch (error) {
    console.error('Error en getAllCategories:', error);
    return {
      success: false,
      data: [],
      total: 0,
      error: error.message,
      message: 'Error al obtener todas las categorías'
    };
  }
}

/**
 * Obtener solo categorías activas
 * Filtra las categorías que tienen is_active = true
 * @returns {Promise<object>} - Array con categorías activas
 */
export async function getActiveCategories() {
  try {
    const response = await getAllCategories();
    
    if (response.success) {
      // Filtrar solo categorías activas
      const activeCategories = response.data.filter(category => 
        category.is_active === true || category.is_active === 1
      );
      
      return {
        success: true,
        data: activeCategories,
        total: activeCategories.length,
        message: `${activeCategories.length} categorías activas encontradas`
      };
    } else {
      return response; // Retornar el error tal como viene
    }
  } catch (error) {
    console.error('Error en getActiveCategories:', error);
    return {
      success: false,
      data: [],
      total: 0,
      error: error.message,
      message: 'Error al obtener categorías activas'
    };
  }
}

/**
 * Función para probar la conectividad de la API
 * Útil para debugging y verificación
 * @returns {Promise<object>} - Estado de la API
 */
export async function testApiConnection() {
  try {
    console.log('🧪 Probando conexión con API...');
    
    const response = await getBusinessCategories(1, 1);
    
    return {
      success: true,
      message: 'API funcionando correctamente',
      details: {
        endpoint: `${API_BASE_URL}/business/category`,
        responseTime: 'OK',
        dataReceived: response.success,
        categoriesFound: response.data.length
      }
    };
  } catch (error) {
    return {
      success: false,
      message: 'Error de conexión con API',
      error: error.message,
      details: {
        endpoint: `${API_BASE_URL}/business/category`,
        timestamp: new Date().toISOString()
      }
    };
  }
}

/**
 * Configuración y constantes exportadas
 */
export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: REQUEST_TIMEOUT,
  ENDPOINTS: {
    CATEGORIES: '/business/category'
  }
};

// Exportar funciones principales
export default {
  getBusinessCategories,
  getAllCategories,
  getActiveCategories,
  testApiConnection,
  API_CONFIG
};