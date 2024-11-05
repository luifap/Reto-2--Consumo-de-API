import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess, loginFailure } from '../redux/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: 'https://api.lorem.space/image/face?w=150&h=150'
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
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

      // Realizar login automático después del registro
      const loginResponse = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const loginData = await loginResponse.json();

      if (!loginResponse.ok) {
        throw new Error(loginData.message);
      }

      dispatch(loginSuccess({ user: data, token: loginData.access_token }));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-beige-200 relative">
      <div className="flex flex-col md:flex-row max-w-6xl w-full md:space-x-8 p-4 md:p-8">
        {/* Sección de ofertas */}
        <div className="flex-1 text-left mb-4 md:mb-0 hidden md:block">
          <p className="text-4xl md:text-5xl font-bold text-gray-900">
            ¡Regístrate y verás nuestras exclusivas ofertas!
          </p>
          <p className="text-2xl font-semibold text-red-600 pt-4 md:pt-10">
            Ofertas especiales para esta temporada de{' '}
            <span style={{ fontFamily: "'Creepster', cursive" }}>Halloween</span>
          </p>
        </div>
  
        {/* Formulario de registro */}
        <div className="flex-1 max-w-full md:max-w-md w-full space-y-8 bg-white rounded-lg shadow-xl relative z-10 -mt-40 md:mt-4">

          {/* Degradado en la parte superior */}
          <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-t-lg"></div>
  
          <h2 className="text-2xl md:text-3xl font-bold text-center text-red-600">Registro</h2>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 p-4 md:p-8">
            <div>
              <label className="block text-sm font-medium text-gray-900">Nombre</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border-b-2 border-red-500 bg-transparent text-gray-900 focus:outline-none focus:border-red-700"
              />
            </div>
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
              {loading ? 'Cargando...' : 'Registrarse'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
  
  
};

export default Register;