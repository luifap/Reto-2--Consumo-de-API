import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        if (!response.ok) throw new Error('Error al cargar el producto');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleBack = () => {
    navigate('/'); // Navegar de vuelta a la página de productos
  };

  if (loading) return <div className="text-center">Cargando detalles del producto...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    product && (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto">
          <img src={product.images[0]} alt={product.title} className="w-full h-64 object-cover mb-4" />
          <div className="p-4">
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-lg text-gray-600 mb-2">Precio: ${product.price}</p>
            <p className="text-gray-800 mb-4">{product.description}</p>
            <div className="flex justify-between mb-4"> {/* Flex para alinear los botones */}
              <button
                onClick={handleBack}
                className="text-red-500 hover:text-red-700 font-semibold flex items-center"
              >
                <span className="material-icons mr-2">Volver a productos</span> 
                
              </button>
  
              <button
                onClick={handleAddToCart}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
  
};

export default ProductDetail;
