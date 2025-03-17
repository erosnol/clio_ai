import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ScrollingParchments from '../components/ScrollingParchments';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      <section className="hero-section relative min-h-[90vh] flex items-center justify-center">
        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            <h1 className="text-6xl font-cinzel-decorative font-bold mb-6 text-[#FFF8E7] drop-shadow-lg">
              Divine Chronicles of Crypto
            </h1>
            <p className="text-xl font-cormorant text-[#FFF8E7] max-w-2xl mx-auto mb-12">
              Journey through the sacred scrolls of cryptocurrency history, guided by Clio, 
              the divine muse of historical knowledge.
            </p>
            <Link 
              to="/chronicles"
              className="inline-block px-8 py-4 bg-[#D4AF37] text-[#2C1810] font-cinzel text-lg 
                         hover:bg-[#B4941F] transition-colors duration-300 rounded-md shadow-lg"
            >
              Enter the Sanctuary
            </Link>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FFF8E7] to-transparent"></div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <ScrollingParchments />
        </div>
        <img src="/images/laurel.svg" alt="" className="absolute left-0 top-1/2 -translate-y-1/2 opacity-10 w-40" />
        <img src="/images/laurel.svg" alt="" className="absolute right-0 top-1/2 -translate-y-1/2 opacity-10 w-40 transform scale-x-[-1]" />
      </section>

      <section className="py-20 bg-[#2C1810] text-[#FFF8E7]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <motion.div 
              className="divine-card p-8 relative"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src="/images/laurel.svg" alt="" className="laurel-left" />
              <h3 className="text-2xl font-cinzel text-[#2C1810] mb-4">Ancient Wisdom</h3>
              <p className="font-cormorant text-lg text-[#2C1810]">
                Uncover the foundational knowledge of blockchain technology and its earliest prophecies.
              </p>
            </motion.div>
            <motion.div 
              className="divine-card p-8 relative"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src="/images/laurel.svg" alt="" className="laurel-left" />
              <h3 className="text-2xl font-cinzel text-[#2C1810] mb-4">Sacred Artifacts</h3>
              <p className="font-cormorant text-lg text-[#2C1810]">
                Examine the divine tools and tokens that shape our crypto destiny.
              </p>
            </motion.div>
            <motion.div 
              className="divine-card p-8 relative"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src="/images/laurel.svg" alt="" className="laurel-left" />
              <h3 className="text-2xl font-cinzel text-[#2C1810] mb-4">Future Visions</h3>
              <p className="font-cormorant text-lg text-[#2C1810]">
                Glimpse into the oracle's predictions for blockchain's destiny.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
