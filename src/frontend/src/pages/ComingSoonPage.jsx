import { motion } from 'framer-motion';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center py-20">
      <div className="container mx-auto px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center w-full"
        >
          <h1 className="text-4xl md:text-6xl font-cinzel-decorative text-[#2C1810] mb-4 md:mb-6">
            K-12 Crypto History Education
          </h1>
          <div className="divine-card w-full max-w-6xl mx-auto p-6 md:p-12 flex flex-col items-center bg-opacity-95 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FFF8E7] via-[#FFF1D6] to-[#F5E6D3] opacity-60 rounded-xl md:rounded-2xl backdrop-blur-sm transition-all duration-300 hover:opacity-70 motion-safe:animate-gradient" />
            <div className="relative z-10 w-full max-w-5xl mx-auto">
              <motion.div 
              className="flex flex-col md:flex-row md:items-start md:gap-12 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.img 
                src="/images/owl.svg" 
                alt="Clio" 
                className="w-24 h-24 md:w-32 md:h-32 mx-auto md:mx-0 mb-4 md:mb-0 flex-shrink-0" 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              />
              <div className="flex flex-col md:max-w-3xl">
                <p className="text-lg md:text-2xl font-cormorant text-[#2C1810] leading-relaxed text-center md:text-left">
                  Join Clio, your friendly crypto history teacher, on an exciting educational journey!
                  We're creating a special space where K-12 students can learn about cryptocurrency
                  and blockchain technology through fun, interactive lessons and daily activities.
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12 w-full max-w-5xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="divine-card p-6 md:p-8 hover:transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-cinzel text-lg md:text-xl text-[#2C1810] mb-3 md:mb-4">Daily Fun Facts</h3>
                <p className="font-cormorant text-base md:text-lg text-[#8B7355] leading-relaxed">
                  Start each day with an exciting crypto history fact, explained in kid-friendly terms!
                </p>
              </div>
              <div className="divine-card p-6 md:p-8 hover:transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-cinzel text-lg md:text-xl text-[#2C1810] mb-3 md:mb-4">Interactive Q&A</h3>
                <p className="font-cormorant text-base md:text-lg text-[#8B7355] leading-relaxed">
                  Ask questions and get friendly, easy-to-understand answers about crypto history.
                </p>
              </div>
              <div className="divine-card p-6 md:p-8 hover:transform hover:-translate-y-1 transition-transform duration-300">
                <h3 className="font-cinzel text-lg md:text-xl text-[#2C1810] mb-3 md:mb-4">Educational Tweets</h3>
                <p className="font-cormorant text-base md:text-lg text-[#8B7355] leading-relaxed">
                  Follow our Twitter bot for daily educational content about cryptocurrency history!
                </p>
              </div>
            </motion.div>
            <motion.div 
              className="divine-card p-6 md:p-8 max-w-3xl w-full mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
            >
              <h3 className="font-cinzel text-lg md:text-xl text-[#D4AF37] mb-3 md:mb-4 text-center">Coming Soon</h3>
              <p className="font-cormorant text-base md:text-lg text-[#FFF8E7] leading-relaxed text-center">
                We're working with educators to create engaging content that makes crypto history
                accessible and fun for K-12 students. Stay tuned for our launch!
              </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
