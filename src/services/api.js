// src/services/api.js

const API_BASE_URL = 'https://royalblue-chamois-327906.hostingersite.com/public/api';

/**
 * Obtener categorías con paginación
 * @param {number} page - Número de página
 * @param {number} perPage - Elementos por página
 * @returns {Promise<object>} - Respuesta de la API
 */
export async function getCategories(page = 1, perPage = 10) {
  try {
    const response = await fetch(`${API_BASE_URL}/business/category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        per_page: perPage,
        page: page,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    
    // Si hay datos (code = "1")
    if (data.code === "1") {
      return {
        success: true,
        categories: data.payload.data,
        pagination: {
          currentPage: data.payload.current_page,
          lastPage: data.payload.last_page,
          total: data.payload.total,
          hasNext: !!data.payload.next_page_url,
          hasPrev: !!data.payload.prev_page_url,
        }
      };
    } else {
      // No hay datos (code = "0")
      return {
        success: false,
        categories: [],
        pagination: null,
        message: data.message || 'No hay categorías disponibles'
      };
    }
  } catch (error) {
    console.error('Error obteniendo categorías:', error);
    return {
      success: false,
      categories: [],
      pagination: null,
      error: error.message
    };
  }
}