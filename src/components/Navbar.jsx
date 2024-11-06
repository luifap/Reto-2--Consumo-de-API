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
        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-16">
          <Link to="/" className="text-2xl font-bold text-red-600 mb-2 md:mb-0 md:text-xl">
            Mi Tienda
          </Link>

          <div className="flex flex-col md:flex-row items-center w-full md:w-auto">
            <div className="flex items-center mb-2 md:mb-0 md:mr-4">
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
            </div>
            {isAuthenticated ? (
              <div className="flex items-center mb-2 md:mb-0">
                <span className="text-sm">¡Hola, {user?.name}!</span>
                <button
                  onClick={() => dispatch(logout())}
                  className="flex items-center text-gray-600 hover:text-gray-800 ml-2"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex flex-col md:flex-row items-center">
                <Link
                  to="/login"
                  className="flex items-center text-gray-600 hover:text-gray-800 mb-2 md:mb-0 md:mr-4"
                >
                  <User className="h-5 w-5 mr-1" />
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="flex items-center text-gray-600 hover:text-gray-800 mb-2 md:mb-0 md:mr-4"
                >
                  <User className="h-5 w-5 mr-1" />
                  Registrarse
                </Link>

                <Link
                  to="/Blog"
                  className="flex items-center text-gray-600 hover:text-gray-800"
                > 
                  Blog
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

