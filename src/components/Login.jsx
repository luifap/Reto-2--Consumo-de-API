import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      dispatch(loginSuccess({ user: data.user, token: data.access_token }));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-beige-200 pt-4 md:pt-8">
      <div className="flex flex-col items-center max-w-md w-full space-y-4 md:space-y-8 p-4 md:p-8 mt-32 md:mt-10"> 
        <div className="w-full space-y-6 bg-white rounded-lg shadow-xl">
          <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-t-lg"></div>
  
          <h2 className="text-2xl md:text-3xl font-bold text-center text-red-600 mt-4">Iniciar Sesión</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 p-4 md:p-8">
            <div>
              <label className="block text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-2 border-red-500 bg-transparent text-gray-900 focus:outline-none focus:border-red-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">Contraseña</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-2 border-red-500 bg-transparent text-gray-900 focus:outline-none focus:border-red-700"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              {loading ? 'Cargando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
  
        {/* Sección de redes sociales en la parte inferior */}
        <div className="flex space-x-4 mt-4 mb-4 md:mb-8">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-3xl">
            <i className="fa fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-3xl">
            <i className="fa fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-3xl">
            <i className="fa fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
  
  
};

export default Login;