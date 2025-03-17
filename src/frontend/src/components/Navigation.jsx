import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="relative z-50">
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
          </div>
        </div>
      </div>
      <div className="greek-pattern absolute bottom-0 left-0 right-0 h-1 opacity-30"></div>
    </nav>
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
