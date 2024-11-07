import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductList = () => {
  const [products, setProducts] = useState([]); // Estado para almacenar productos
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado para manejar errores
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    title: ''
  });

  const dispatch = useDispatch();

  // Fetch de productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();

        // Filtrar productos con imágenes y descripción
        const filteredData = data.filter(product =>
          product.title && product.images.length > 0 && product.description
        );
        setProducts(filteredData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según los filtros aplicados
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      return (
        (!filters.category || product.category.name === filters.category) &&
        (!filters.minPrice || product.price >= Number(filters.minPrice)) &&
        (!filters.maxPrice || product.price <= Number(filters.maxPrice)) &&
        (!filters.title || product.title.toLowerCase().includes(filters.title.toLowerCase()))
      );
    });
  }, [products, filters]);

  // Manejar los cambios en los filtros
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  // Extraer categorías únicas
  const uniqueCategories = [...new Set(products.map(product => product.category.name))];

  // Mostrar mensaje de carga o error
  if (loading) return <div className="text-center">Cargando productos...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Función para limpiar la URL de la imagen
  const getImageUrl = (image) => {
    // Si la imagen es un string que parece ser JSON, lo parseamos
    if (typeof image === 'string' && image.startsWith('["') && image.endsWith('"]')) {
      // Eliminamos los caracteres de comillas HTML y parseamos el JSON
      const parsedImages = JSON.parse(image);
      return parsedImages[0]; // Devuelve la primera imagen del array
    }
    // Si no es un string JSON, asumimos que ya es una URL válida
    return image || 'https://placeimg.com/640/480/any'; // URL de respaldo si no hay imagen
  };

  return (
    <div className="container mx-auto px-4">
      <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-t-lg"></div>

      {/* Filtros */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Buscar por título"
            className="border p-2 rounded"
            value={filters.title}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="minPrice"
            placeholder="Precio mínimo"
            className="border p-2 rounded"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Precio máximo"
            className="border p-2 rounded"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
          <select
            name="category"
            className="border p-2 rounded"
            value={filters.category}
            onChange={handleFilterChange}
          >
            <option value="">Todas las categorías</option>
            {uniqueCategories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de productos filtrados */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => {
          // Obtener la URL de la imagen
          const imageUrl = getImageUrl(product.images[0]);

          return (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
              <img
                src={imageUrl}
                alt={product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                  <p className="text-gray-600 mb-2">${product.price}</p>
                </div>
                <div className="flex justify-between mt-4">
                  {/* Enlace a los detalles del producto */}
                  <Link
                    to={`/product/${product.id}`}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Ver detalles
                  </Link>
                  {/* Botón para agregar al carrito */}
                  <button
                    onClick={() => dispatch(addToCart(product))}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
