import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/cartSlice';

const Cart = () => {
  const { items, total } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ id, quantity }));
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-3xl font-bold text-orange-400 mb-4">Carrito de Compras</h2>
        <p className="text-gray-300">Tu carrito está vacío. ¡Explora nuestros artículos espeluznantes!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-orange-400 mb-4">Carrito de Compras</h2>
      <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6">
        {items.map(item => (
          <div key={item.id} className="flex items-center border-b border-orange-600 py-4">
            <img
              src={item.images}
              alt={item.title}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold text-orange-300">{item.title}</h3>
              <p className="text-gray-400">${item.price}</p>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                className="px-2 py-1 border border-orange-500 rounded bg-orange-600 hover:bg-orange-700 text-white"
              >
                -
              </button>
              <span className="mx-2 text-orange-300">{item.quantity}</span>
              <button
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                className="px-2 py-1 border border-orange-500 rounded bg-orange-600 hover:bg-orange-700 text-white"
              >
                +
              </button>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="ml-4 text-red-400 hover:text-red-600"
            >
              Eliminar
            </button>
          </div>
        ))}
        <div className="mt-6">
          <div className="text-2xl font-bold text-orange-400">Total: ${total}</div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Vaciar carrito
            </button>
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Proceder al pago
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;