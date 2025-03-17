import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
  const scrollRef = useRef(null);
  const owlRef = useRef(null);
  const scrollsRef = useRef([]);

  useEffect(() => {
    // Animate floating scrolls
    scrollsRef.current.forEach((scroll, index) => {
      gsap.to(scroll, {
        y: "random(-100, 100)",
        x: "random(-50, 50)",
        rotation: "random(-45, 45)",
        duration: "random(10, 20)",
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        delay: index * 0.2
      });
    });

    // Animate owl
    gsap.to(owlRef.current, {
      y: -30,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Parallax effect for background columns
    gsap.to(".column", {
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      },
      y: (i) => -100 - i * 50,
      ease: "none"
    });
  }, []);

  return (
    <div ref={scrollRef} className="min-h-screen relative overflow-hidden">
      {/* Classical columns */}
      <div className="absolute inset-0 flex justify-around pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="column w-8 h-full bg-gradient-to-b from-gray-200 to-gray-300 opacity-30"
          />
        ))}
      </div>

      {/* Hero section */}
      <div className="relative z-10 pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="font-cinzel text-6xl md:text-8xl text-clio-gold mb-6">
            CLIO
          </h1>
          <p className="font-cormorant text-2xl md:text-3xl text-gray-700 mb-12 max-w-2xl mx-auto">
            Keeper of Crypto History, Guardian of Digital Legacy
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <a
              href="/education"
              className="bg-clio-gold text-white px-8 py-4 rounded-full font-cinzel text-xl hover:bg-clio-gold-light transition-colors duration-300 shadow-lg"
            >
              Begin Your Journey
            </a>
          </motion.div>
        </motion.div>

        {/* Floating scrolls */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              ref={el => scrollsRef.current[i] = el}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            >
              <div className="w-32 h-40 bg-parchment rounded-lg shadow-xl opacity-30 transform -rotate-6" />
            </motion.div>
          ))}
        </div>

        {/* Owl companion */}
        <motion.div
          ref={owlRef}
          className="absolute top-1/4 right-1/4 w-24 h-24"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <i className="fas fa-owl text-6xl text-clio-gold opacity-70" />
        </motion.div>
      </div>

      {/* Decorative footer */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-clio-gold/10 to-transparent" />
    </div>
  );
};

export default LandingPage;
