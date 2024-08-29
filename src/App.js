import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Responses from './pages/Responses.js';
import Products from './pages/Products.js';
import Login from './components/Login/Login.js';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/login"/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/responses" element={<Responses />} />
          <Route path="/products" element={<Products />} />
          <Route path="*" element={<Login/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
