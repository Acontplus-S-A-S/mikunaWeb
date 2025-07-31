// src/components/sections/Categories.jsx
import React, { useState, useEffect } from 'react';
import { getCategories } from '@/services/api';
import { Loader2, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);
  const itemsPerPage = 6; // Categorías por página

  // Cargar categorías
  const loadCategories = async (page) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await getCategories(page, itemsPerPage);
      
      if (result.success) {
        setCategories(result.categories);
        setPagination(result.pagination);
      } else {
        setError(result.message || 'No se pudieron cargar las categorías');
        setCategories([]);
      }
    } catch (err) {
      setError('Error de conexión');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Cargar al montar el componente
  useEffect(() => {
    loadCategories(currentPage);
  }, [currentPage]);

  // Cambiar página
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    // Scroll hacia arriba cuando cambie de página
    document.getElementById('categorias')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="categorias" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title">Nuestras Categorías</h2>
          <p className="text-stone-600 mt-4">
            Explora todas nuestras categorías de productos
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-amber-600" />
            <span className="ml-3 text-stone-600">Cargando categorías...</span>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => loadCategories(currentPage)}
                className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {/* Lista de Categorías */}
        {!loading && !error && categories.length > 0 && (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-stone-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Imagen de la categoría (si existe) */}
                  {category.image_url && (
                    <div className="mb-4">
                      <img
                        src={category.image_url}
                        alt={category.name}
                        className="w-full h-32 object-cover rounded-md"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                  
                  {/* Información de la categoría */}
                  <h3 className="text-xl font-semibold text-stone-800 mb-2">
                    {category.name}
                  </h3>
                  
                  {category.description && (
                    <p className="text-stone-600 text-sm mb-3">
                      {category.description}
                    </p>
                  )}
                  
                  {category.summary && (
                    <p className="text-stone-500 text-xs">
                      {category.summary}
                    </p>
                  )}
                  
                  {/* Estado activo/inactivo */}
                  <div className="mt-4">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                        category.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {category.is_active ? 'Activo' : 'Inactivo'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Paginación */}
            {pagination && pagination.lastPage > 1 && (
              <div className="flex justify-center items-center space-x-4">
                
                {/* Botón Anterior */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={!pagination.hasPrev}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    pagination.hasPrev
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Anterior
                </button>

                {/* Números de página */}
                <div className="flex items-center space-x-2">
                  {Array.from({ length: pagination.lastPage }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg ${
                        page === currentPage
                          ? 'bg-amber-600 text-white'
                          : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Botón Siguiente */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={!pagination.hasNext}
                  className={`flex items-center px-4 py-2 rounded-lg ${
                    pagination.hasNext
                      ? 'bg-amber-600 text-white hover:bg-amber-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  Siguiente
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              </div>
            )}

            {/* Info de paginación */}
            {pagination && (
              <div className="text-center mt-4 text-sm text-stone-500">
                Mostrando {categories.length} de {pagination.total} categorías
                (Página {pagination.currentPage} de {pagination.lastPage})
              </div>
            )}
          </>
        )}

        {/* No hay categorías */}
        {!loading && !error && categories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-600">No hay categorías disponibles.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;