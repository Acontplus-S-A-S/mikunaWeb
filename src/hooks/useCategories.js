// src/hooks/useCategories.js
import { useState, useEffect, useCallback } from 'react';
import { getBusinessCategories, getAllCategories } from '@/services/api';

/**
 * Hook personalizado para manejar categorías de negocio
 * @param {object} options - Opciones de configuración
 * @param {boolean} options.autoLoad - Cargar automáticamente al montar (default: true)
 * @param {boolean} options.loadAll - Cargar todas las categorías sin paginación (default: false)
 * @param {number} options.initialPage - Página inicial (default: 1)
 * @param {number} options.perPage - Elementos por página (default: 10)
 */
export function useCategories(options = {}) {
  const {
    autoLoad = true,
    loadAll = false,
    initialPage = 1,
    perPage = 10
  } = options;

  // Estados
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [currentPage, setCurrentPage] = useState(initialPage);

  // Función para cargar categorías con paginación
  const fetchCategories = useCallback(async (page = currentPage, itemsPerPage = perPage) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getBusinessCategories(page, itemsPerPage);
      
      if (response.success) {
        setCategories(response.data);
        setPagination(response.pagination);
        setCurrentPage(page);
      } else {
        setError(response.message || 'No se encontraron categorías');
        setCategories([]);
        setPagination(null);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError(err.message || 'Error al cargar categorías');
      setCategories([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [currentPage, perPage]);

  // Función para cargar todas las categorías
  const fetchAllCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await getAllCategories();
      
      if (response.success) {
        setCategories(response.data);
        setPagination(null); // No hay paginación para todas las categorías
      } else {
        setError(response.error || 'Error al cargar todas las categorías');
        setCategories([]);
        setPagination(null);
      }
    } catch (err) {
      console.error('Error fetching all categories:', err);
      setError(err.message || 'Error al cargar todas las categorías');
      setCategories([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Función para ir a la siguiente página
  const nextPage = useCallback(() => {
    if (pagination && pagination.hasNextPage) {
      fetchCategories(currentPage + 1);
    }
  }, [pagination, currentPage, fetchCategories]);

  // Función para ir a la página anterior
  const prevPage = useCallback(() => {
    if (pagination && pagination.hasPrevPage) {
      fetchCategories(currentPage - 1);
    }
  }, [pagination, currentPage, fetchCategories]);

  // Función para ir a una página específica
  const goToPage = useCallback((page) => {
    if (pagination && page >= 1 && page <= pagination.lastPage) {
      fetchCategories(page);
    }
  }, [pagination, fetchCategories]);

  // Función para recargar los datos actuales
  const refetch = useCallback(() => {
    if (loadAll) {
      fetchAllCategories();
    } else {
      fetchCategories(currentPage);
    }
  }, [loadAll, fetchAllCategories, fetchCategories, currentPage]);

  // Función para resetear el estado
  const reset = useCallback(() => {
    setCategories([]);
    setLoading(false);
    setError(null);
    setPagination(null);
    setCurrentPage(initialPage);
  }, [initialPage]);

  // Efecto para cargar datos automáticamente
  useEffect(() => {
    if (autoLoad) {
      if (loadAll) {
        fetchAllCategories();
      } else {
        fetchCategories(initialPage);
      }
    }
  }, [autoLoad, loadAll, fetchAllCategories, fetchCategories, initialPage]);

  // Función para buscar categoría por ID
  const getCategoryById = useCallback((id) => {
    return categories.find(category => category.id === id);
  }, [categories]);

  // Función para filtrar categorías activas
  const getActiveCategories = useCallback(() => {
    return categories.filter(category => category.is_active);
  }, [categories]);

  return {
    // Datos
    categories,
    activeCategories: getActiveCategories(),
    loading,
    error,
    pagination,
    currentPage,
    
    // Funciones de navegación
    nextPage,
    prevPage,
    goToPage,
    
    // Funciones de carga
    fetchCategories,
    fetchAllCategories,
    refetch,
    reset,
    
    // Funciones de utilidad
    getCategoryById,
    getActiveCategories,
    
    // Estados computados
    hasCategories: categories.length > 0,
    isEmpty: !loading && categories.length === 0 && !error,
    hasError: !!error,
    hasNextPage: pagination?.hasNextPage || false,
    hasPrevPage: pagination?.hasPrevPage || false,
    totalCategories: pagination?.total || categories.length,
  };
}

/**
 * Hook simplificado para obtener solo las categorías activas
 * Útil cuando solo necesitas las categorías para mostrar en el menú
 */
export function useActiveCategories() {
  const {
    categories,
    loading,
    error,
    refetch,
    getActiveCategories
  } = useCategories({
    autoLoad: true,
    loadAll: true // Cargar todas para tener la lista completa
  });

  return {
    categories: getActiveCategories(),
    loading,
    error,
    refetch,
    hasCategories: getActiveCategories().length > 0,
    isEmpty: !loading && getActiveCategories().length === 0 && !error,
  };
}

export default useCategories;