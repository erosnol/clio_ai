import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, BookOpenIcon, AcademicCapIcon, PhotoIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const location = useLocation();

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="relative z-50 hidden md:block">
        <div className="divine-pattern absolute top-0 left-0 right-0 h-1 opacity-30"></div>
        <div className="bg-[#2C1810] bg-opacity-95 backdrop-blur-sm py-6 px-8 border-b border-[#D4AF37]/20">
          <div className="container mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <motion.div
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 10 }}
                transition={{ type: 'spring', stiffness: 200 }}
              >
                <img src="/images/owl.svg" alt="Clio" className="w-12 h-12" />
              </motion.div>
              <span className="font-cinzel-decorative text-2xl text-[#D4AF37] group-hover:text-[#FFF8E7] transition-colors">
                Clio's Sanctuary
              </span>
            </Link>
            <div className="flex space-x-8">
              <NavLink to="/" current={location.pathname === "/"}>
                Entrance
              </NavLink>
              <NavLink to="/chronicles" current={location.pathname === "/chronicles"}>
                Chronicles
              </NavLink>
              <NavLink to="/k12" current={location.pathname === "/k12"}>
                K-12 Learning
              </NavLink>
              <NavLink to="/meme-vault" current={location.pathname === "/meme-vault"}>
                Meme Vault
              </NavLink>
            </div>
          </div>
        </div>
        <div className="greek-pattern absolute bottom-0 left-0 right-0 h-1 opacity-30"></div>
      </nav>

      {/* Mobile Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="divine-pattern absolute top-0 left-0 right-0 h-1"></div>
        <div className="bg-gradient-to-b from-[#2C1810] to-[#3A2415] bg-opacity-95 backdrop-blur-sm border-b border-[#D4AF37]/20 shadow-lg relative overflow-hidden">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="container mx-auto flex items-center justify-center h-11">
            <Link to="/" className="flex items-center space-x-2 group px-3">
              <motion.div
                initial={{ rotate: 0, scale: 1 }}
                whileTap={{ scale: 0.95, rotate: -10 }}
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 300,
                  damping: 15
                }}
              >
                <img src="/images/owl.svg" alt="Clio" className="w-7 h-7" />
              </motion.div>
              <motion.div className="relative">
                <motion.span 
                  className="font-cinzel-decorative text-lg text-[#D4AF37] group-hover:text-[#FFF8E7] transition-colors relative z-10"
                  initial={{ y: 0 }}
                  animate={{ 
                    y: [0, -2, 0],
                    transition: {
                      duration: 2,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }
                  }}
                >
                  Clio's Sanctuary
                </motion.span>
                <motion.div
                  className="absolute inset-0 bg-[#D4AF37] opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl z-0"
                  initial={{ scale: 0.8 }}
                  whileHover={{ scale: 1.2 }}
                />
              </motion.div>
            </Link>
          </div>
        </div>
        <div className="greek-pattern absolute bottom-0 left-0 right-0 h-1"></div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-[#2C1810] bg-opacity-95 backdrop-blur-md border-t border-[#D4AF37]/20 pb-safe">
          <div className="flex justify-around items-center py-2">
            <Link 
              to="/" 
              className={`flex flex-col items-center p-3 min-w-[80px] ${location.pathname === '/' ? 'text-[#D4AF37]' : 'text-[#FFF8E7]'}`}
            >
              <HomeIcon className="w-6 h-6" />
              <span className="text-xs mt-1 font-cinzel">Home</span>
            </Link>
            <Link 
              to="/chronicles" 
              className={`flex flex-col items-center p-3 min-w-[80px] ${location.pathname === '/chronicles' ? 'text-[#D4AF37]' : 'text-[#FFF8E7]'}`}
            >
              <BookOpenIcon className="w-6 h-6" />
              <span className="text-xs mt-1 font-cinzel">Timeline</span>
            </Link>
            <Link 
              to="/k12" 
              className={`flex flex-col items-center p-3 min-w-[80px] ${location.pathname === '/k12' ? 'text-[#D4AF37]' : 'text-[#FFF8E7]'}`}
            >
              <AcademicCapIcon className="w-6 h-6" />
              <span className="text-xs mt-1 font-cinzel">Learn</span>
            </Link>
            <Link 
              to="/meme-vault" 
              className={`flex flex-col items-center p-3 min-w-[80px] ${location.pathname === '/meme-vault' ? 'text-[#D4AF37]' : 'text-[#FFF8E7]'}`}
            >
              <PhotoIcon className="w-6 h-6" />
              <span className="text-xs mt-1 font-cinzel">Memes</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ to, current, children }) {
  return (
    <Link 
      to={to} 
      className={`relative font-cinzel text-lg ${current ? 'text-[#D4AF37]' : 'text-[#FFF8E7]'} hover:text-[#D4AF37] transition-colors`}
    >
      {children}
      {current && (
        <motion.div
          layoutId="underline"
          className="absolute left-0 right-0 h-0.5 bg-[#D4AF37]"
          style={{ bottom: '-4px' }}
        />
      )}
    </Link>
  );
}
