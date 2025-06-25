import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavbarDefault from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AiChat from './pages/AiChat';
import Contact from './pages/Contact';
import Medicine from './pages/Medicine';
import Product from './pages/Product';
import Footer from './components/Footer';

function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      {!hideLayout && <NavbarDefault />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<AiChat />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/register" element={<RegisterForm />} />
      </Routes>
      {!hideLayout && location.pathname !== '/chat' && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
