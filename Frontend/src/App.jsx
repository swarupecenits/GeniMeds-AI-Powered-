import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './components/ProtectedRoute';
import MentalHealth from './pages/MentalHealth';
import FindDoctors from './pages/FindDoctors';
import MeditationZone from './pages/MeditationZone';
import HealthTracker from './pages/HealthTracker';
import SymptomChecker from './pages/SymptomChecker';
import EmergencyContacts from './pages/EmergencyContacts';
function AppContent() {
  const location = useLocation();
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';
  return (
    <>
      {!hideLayout && <NavbarDefault />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/chat"
          element={
            <ProtectedRoute>
              <AiChat />
            </ProtectedRoute>
          }
        />
        <Route
          path="/medicine"
          element={
            <ProtectedRoute>
              <Medicine />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/mental-health" element={<ProtectedRoute><MentalHealth /></ProtectedRoute>} />
        <Route path="/find-doctors" element={<ProtectedRoute><FindDoctors /></ProtectedRoute>} />
        <Route path="/meditation" element={<ProtectedRoute><MeditationZone /></ProtectedRoute>} />
        <Route path="/health-tracker" element={<ProtectedRoute><HealthTracker /></ProtectedRoute>} />
        <Route path="/symptom-checker" element={<ProtectedRoute><SymptomChecker /></ProtectedRoute>} />
        <Route path="/emergency-contacts" element={<ProtectedRoute><EmergencyContacts /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
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
