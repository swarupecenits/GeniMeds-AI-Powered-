import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarDefault from './components/Navbar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import AiChat from './pages/AiChat';
function App() {
  return (
    <Router>
      <NavbarDefault />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<AiChat />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />

        </Routes>
    </Router>
  );
}

export default App;
