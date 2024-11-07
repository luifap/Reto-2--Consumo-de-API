import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetail = () => {
  const { id } = useParams(); // Obtenemos el ID del producto de la URL
  const [product, setProduct] = useState(null); // Estado para almacenar el producto
  const [loading, setLoading] = useState(true); // Estado para controlar la carga
  const [error, setError] = useState(null); // Estado para manejar los errores
  const dispatch = useDispatch(); // Dispatch para agregar al carrito
  const navigate = useNavigate(); // Para navegar entre rutas

  // Fetch del producto por ID
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

  // Agregar producto al carrito
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  // Regresar a la lista de productos
  const handleBack = () => {
    navigate('/'); // Navegar a la página principal
  };

  // Manejo de estado de carga y error
  if (loading) return <div className="text-center">Cargando detalles del producto...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  // Validar si las imágenes existen y parsearlas
  const imageUrl = product?.images ? JSON.parse(product.images)[0] : 'https://placeimg.com/640/480/any';

  return (
    product && (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md mx-auto">
          {/* Imagen del producto */}
          <img
            src={imageUrl}
            alt={product.title}
            className="w-full h-64 object-cover mb-4"
          />
          <div className="p-4">
            {/* Título del producto */}
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            {/* Precio del producto */}
            <p className="text-lg text-gray-600 mb-2">Precio: ${product.price}</p>
            {/* Descripción del producto */}
            <p className="text-gray-800 mb-4">{product.description}</p>
            {/* Botones de acción */}
            <div className="flex justify-between mb-4">
              {/* Botón para volver */}
              <button
                onClick={handleBack}
                className="text-red-500 hover:text-red-700 font-semibold"
              >
                Volver a productos
              </button>
              {/* Botón para agregar al carrito */}
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
