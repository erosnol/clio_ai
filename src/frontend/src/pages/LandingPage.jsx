import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AcademicCapIcon, BookOpenIcon } from '@heroicons/react/24/outline';
import ScrollingParchments from '../components/ScrollingParchments';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7]">
      {/* Hero Section with Divine Hall 1 */}
      <section className="hero-section relative flex items-center justify-center divine-glow">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="pt-20 md:pt-28"
          >
            <h1 className="text-4xl md:text-7xl font-cinzel-decorative font-bold mb-4 md:mb-6 text-[#FFF8E7] drop-shadow-lg leading-tight">
              Welcome Young Scholars
            </h1>
            <p className="text-lg md:text-2xl font-cormorant text-[#FFF8E7] max-w-2xl mx-auto mb-6 md:mb-12 leading-relaxed px-4">
              Join Clio, your friendly guide, on an exciting journey through the history of cryptocurrency.
              Learn amazing stories and discover how digital money is changing our world!
            </p>
            <div className="button-container flex flex-col md:flex-row justify-center gap-4 md:gap-6 px-4 md:px-0">
              <Link 
                to="/k12"
                className="button w-full md:w-auto inline-flex items-center justify-center px-8 py-4 bg-[#D4AF37] text-[#2C1810] 
                         font-cinzel text-lg hover:bg-[#B4941F] active:bg-[#8B7355] transition-colors duration-300 
                         rounded-xl md:rounded-md shadow-lg min-h-[44px]"
              >
                <span className="flex items-center">
                  <AcademicCapIcon className="w-6 h-6 mr-2 md:hidden" />
                  Start Learning
                </span>
              </Link>
              <Link 
                to="/chronicles"
                className="button w-full md:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-[#D4AF37] 
                         text-[#FFF8E7] font-cinzel text-lg hover:bg-[#D4AF37] hover:text-[#2C1810] active:bg-[#8B7355] 
                         transition-colors duration-300 rounded-xl md:rounded-md shadow-lg min-h-[44px]"
              >
                <span className="flex items-center">
                  <BookOpenIcon className="w-6 h-6 mr-2 md:hidden" />
                  View Timeline
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FFF8E7] to-transparent"></div>
      </section>

      {/* Fun Facts Section with Divine Hall 2 */}
      <section className="chronicles-section py-12 md:py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-cinzel-decorative text-[#2C1810] mb-8 md:mb-12">Daily Fun Facts</h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 place-items-center">
              <motion.div 
                className="divine-card"
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-cinzel text-[#2C1810] mb-3 flex items-center justify-center">
                  <span className="mr-2">Did You Know?</span> 
                  <span className="text-2xl">🤔</span>
                </h3>
                <p className="font-cormorant text-lg text-[#2C1810]">
                  Bitcoin, the first cryptocurrency, was created in 2009 by someone using the name Satoshi Nakamoto!
                </p>
              </motion.div>
              <motion.div 
                className="divine-card"
                whileTap={{ scale: 0.98 }}
              >
                <h3 className="text-xl font-cinzel text-[#2C1810] mb-3 flex items-center justify-center">
                  <span className="mr-2">Fun Fact!</span>
                  <span className="text-2xl">⭐</span>
                </h3>
                <p className="font-cormorant text-lg text-[#2C1810]">
                  The first real-world Bitcoin purchase was for two pizzas. They cost 10,000 Bitcoin!
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Learning Section with Divine Hall 4 */}
      <section className="library-section py-24 text-[#FFF8E7]">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <h2 className="text-4xl font-cinzel-decorative text-center mb-12">Your Learning Adventure</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 place-items-center">
            <motion.div 
              className="divine-card p-8 relative"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src="/images/laurel.svg" alt="" className="laurel-left" />
              <h3 className="text-2xl font-cinzel text-[#2C1810] mb-4">Daily Tweets</h3>
              <p className="font-cormorant text-lg text-[#2C1810]">
                Follow our friendly bot for exciting daily facts about crypto history!
              </p>
            </motion.div>
            <motion.div 
              className="divine-card p-8 relative"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src="/images/laurel.svg" alt="" className="laurel-left" />
              <h3 className="text-2xl font-cinzel text-[#2C1810] mb-4">Ask Questions</h3>
              <p className="font-cormorant text-lg text-[#2C1810]">
                Curious about something? Ask away! We explain everything in simple terms.
              </p>
            </motion.div>
            <motion.div 
              className="divine-card p-8 relative"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src="/images/laurel.svg" alt="" className="laurel-left" />
              <h3 className="text-2xl font-cinzel text-[#2C1810] mb-4">Learn & Play</h3>
              <p className="font-cormorant text-lg text-[#2C1810]">
                Join fun activities and games that make learning about crypto history exciting!
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
