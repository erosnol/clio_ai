import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import ChroniclesPage from './pages/ChroniclesPage';
import ComingSoonPage from './pages/ComingSoonPage';
import './styles/main.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#FFF8E7]">
        <Navigation />
        <main className="pt-20"> {/* Added padding-top to account for fixed navigation */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chronicles" element={<ChroniclesPage />} />
            <Route path="/k12" element={<ComingSoonPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
