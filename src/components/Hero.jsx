import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Classical columns background */}
      <div className="absolute inset-0 flex justify-between z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="w-12 h-full bg-clio-column opacity-30"
            initial={{ height: 0 }}
            animate={{ height: '100%' }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4">
        <motion.h1
          className="font-cinzel text-6xl md:text-8xl text-clio-gold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          CLIO
        </motion.h1>
        
        <motion.p
          className="font-cormorant text-2xl md:text-3xl text-gray-700 mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Guardian of History, Keeper of Knowledge
        </motion.p>

        {/* Floating scrolls animation */}
        <motion.div
          className="absolute -z-10"
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <img
            src="/images/scroll.png"
            alt="Decorative scroll"
            className="w-64 opacity-20"
          />
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <a
            href="/timeline"
            className="inline-block bg-clio-gold text-white px-8 py-3 rounded-full font-cinzel text-lg hover:bg-clio-gold-light transition-colors duration-300 shadow-lg"
          >
            Explore Crypto History
          </a>
        </motion.div>
      </div>

      {/* Floating golden particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-clio-gold rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -20, 20],
              x: [null, -20, 20],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
