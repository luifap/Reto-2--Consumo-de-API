import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import CustomProduct from './components/CustomProduct';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id/customize" element={<CustomProduct />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
};

export default App;
