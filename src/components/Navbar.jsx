import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-bold text-blue-600">
            Mi Tienda
          </Link>

          <div className="flex items-center space-x-4">
          <Link to="/product/:id/customize" className="text-gray-600 hover:text-gray-800">
              Productos Personalizados
            </Link>
            <Link to="/cart" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {items.length}
                </span>
              )}
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">¡Hola, {user?.name}!</span>
                <button
                  onClick={() => dispatch(logout())}
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <User className="h-5 w-5 mr-1" />
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                >
                  <User className="h-5 w-5 mr-1" />
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
