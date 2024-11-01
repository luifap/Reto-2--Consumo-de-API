import { useState } from 'react';
import ProductList from '../components/ProductList';
import Alert from '../components/Alert';

const Home = () => {
  const [showWelcome, setShowWelcome] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {showWelcome && (
        <Alert className="m-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">¡Bienvenido a nuestra tienda!</h2>
              <p>Descubre productos únicos y personalizables.</p>
            </div>
            <button
              onClick={() => setShowWelcome(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
        </Alert>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Nuestros Productos</h1>
        <ProductList />
      </div>
    </div>
  );
};

export default Home;
