import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    title: ''
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/products');
      if (!response.ok) throw new Error('Error al cargar productos');
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(product => {
    return (
      (!filters.category || product.category.name === filters.category) &&
      (!filters.minPrice || product.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || product.price <= Number(filters.maxPrice)) &&
      (!filters.title || product.title.toLowerCase().includes(filters.title.toLowerCase()))
    );
  });

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  if (loading) return <div className="text-center">Cargando productos...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      {/* Filtros */}
      <div className="mb-8 relative rounded-lg shadow">
        {/* Degradado en la parte superior */}
        <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-t-lg absolute top-0 left-0 right-0"></div>
  
        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4 pt-2">Filtros</h2>
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
              {/* Aquí puedes agregar opciones de categorías dinámicamente si las tienes */}
            </select>
          </div>
        </div>
      </div>
  
      {/* Lista de productos */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-2">${product.price}</p>
              </div>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/product/${product.id}`}
                  className="text-red-500 hover:text-red-700 font-semibold"
                >
                  Ver detalles
                </Link>
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default ProductList;