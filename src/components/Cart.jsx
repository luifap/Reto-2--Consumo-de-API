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
        <h2 className="text-3xl font-bold text-red-400 mb-4">Carrito de Compras</h2>
        <p className="text-gray-300">Tu carrito está vacío. ¡Explora nuestros artículos espeluznantes!</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <h2 className="text-2xl font-bold text-orange-500 mb-4">Carrito de Compras</h2>
      <div className="h-1 bg-gradient-to-r from-red-500 to-red-700 rounded-t-lg"></div>
      <div className="bg-white text-gray-800 rounded-lg shadow-md p-5">
        {items.length === 0 ? (
          <p className="text-center text-gray-500 italic">Tu carrito está vacío.</p>
        ) : (
          items.map(item => (
            <div key={item.id} className="flex items-center border-b border-gray-200 py-3">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-16 h-16 object-cover rounded shadow-sm"
              />
              <div className="flex-1 ml-3">
                <h3 className="font-medium text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="px-2 py-1 border border-red-400 rounded bg-red-400 hover:bg-red-500 text-white"
                >
                  -
                </button>
                <span className="mx-2 text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-2 py-1 border border-red-400 rounded bg-red-400 hover:bg-red-500 text-white"
                >
                  + 
                </button>
              </div>
              <button
                onClick={() => dispatch(removeFromCart(item.id))}
                className="ml-3 text-red-500 hover:text-red-600"
              >
                Eliminar ❌
              </button>
            </div>
          ))
        )}
        <div className="mt-5">
          <div className="text-lg font-semibold text-gray-900">Total: ${total}</div>
          <div className="mt-3 flex justify-between items-center">
            <button
              onClick={() => dispatch(clearCart())}
              className="bg-red-500 text-white px-3 py-2 rounded shadow-sm hover:bg-red-600 transition"
            >
              Vaciar carrito
            </button>
            <button
              className="bg-green-500 text-white px-3 py-2 rounded shadow-sm hover:bg-green-600 transition"
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