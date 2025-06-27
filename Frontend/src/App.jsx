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
          element={<AiChat />}
        />
        <Route
          path="/medicine"
          element={
            <ProtectedRoute>
              <Medicine />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mental-health" element={<MentalHealth />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/meditation" element={<MeditationZone />} />
        <Route path="/health-tracker" element={<HealthTracker />} />
        <Route path="/symptom-checker" element={<SymptomChecker />} />
        <Route path="/emergency-contacts" element={<EmergencyContacts />} />
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
