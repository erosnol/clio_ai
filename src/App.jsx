import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import EducationPage from './pages/EducationPage';

function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-marble-pattern">
      <Navigation />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/education" element={<EducationPage />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
