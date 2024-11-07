import { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const CustomProduct = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.auth);
  
  const [customization, setCustomization] = useState({
    text: '',
    color: '#000000',
    size: 'M',
    notes: ''
  });
  
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');
        if (!response.ok) throw new Error('Error al cargar productos');
        
        const data = await response.json();
        
        // Filtramos productos válidos con imágenes
        const filteredProducts = data
          .filter(item => 
            item.category?.name === 'Clothes' && 
            item.images && 
            Array.isArray(item.images) && 
            item.images.length > 0 &&
            item.images.every(img => 
              typeof img === 'string' && 
              (img.startsWith('http://') || img.startsWith('https://'))
            )
          );
        
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('No se pudieron cargar los productos. Por favor, intente más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCustomizationChange = (e) => {
    const { name, value } = e.target;
    setCustomization(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para personalizar productos');
      return;
    }

    if (!selectedProduct) {
      alert('Debes seleccionar un producto para personalizar');
      return;
    }

    const uniqueId = `C${Date.now()}`;
    const customizedProduct = {
      id: uniqueId,
      ...selectedProduct,
      images: uploadedImage || (selectedProduct.images?.[0] || ''),
      customization: {
        ...customization,
      },
      price: selectedProduct.price + 10
    };

    try {
      dispatch(addToCart(customizedProduct));
      alert('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    }
  };

  // Convertir la cadena de imagen a una URL válida
  const getImageUrl = (image) => {
    // Si la imagen está en formato de cadena JSON, la parseamos
    const imgArray = JSON.parse(image);
    return imgArray ? imgArray[0] : 'https://placeimg.com/640/480/any';
  };

  return (
    <div className="max-w-4xl mx-auto mt-4 bg-white rounded-xl shadow-lg p-6 md:mt-8">
      <h3 className="text-3xl font-semibold text-red-600 mb-6">Personaliza tu Producto</h3>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">
          <p>Cargando productos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="aspect-square rounded-lg border border-gray-300 flex items-center justify-center bg-gray-50">
              {uploadedImage ? (
                <img
                  src={uploadedImage}
                  alt="Vista previa"
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : selectedProduct?.images?.[0] ? (
                <img
                  src={getImageUrl(selectedProduct.images[0])}
                  alt={selectedProduct.title}
                  className="max-h-full max-w-full object-contain rounded-lg"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <p>Vista previa de la imagen</p>
                </div>
              )}
            </div>
            <div className="mt-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Selecciona un producto de ropa
              </label>
              <select
                onChange={(e) => {
                  const productId = e.target.value;
                  const selected = products.find(item => item.id === Number(productId));
                  setSelectedProduct(selected);
                }}
                className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:ring-2 focus:ring-gray-400"
              >
                <option value="">Selecciona un producto</option>
                {products.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                onClick={handleAddToCart}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:bg-red-400"
                disabled={!isAuthenticated}
              >
                Agregar al carrito
              </button>
              <p className="mt-2 text-gray-700 font-semibold">
                (+ $10 por producto personalizado)
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomProduct;
