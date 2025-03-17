import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const ScrollingParchments = () => {
  const [scrolls, setScrolls] = useState([]);

  useEffect(() => {
    // Generate random scroll positions
    const newScrolls = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 0.5,
      delay: Math.random() * 5,
    }));
    setScrolls(newScrolls);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {scrolls.map((scroll) => (
        <motion.div
          key={scroll.id}
          className="absolute"
          initial={{
            x: scroll.x,
            y: scroll.y,
            rotate: scroll.rotation,
            scale: scroll.scale,
            opacity: 0,
          }}
          animate={{
            y: [scroll.y, scroll.y - 200, scroll.y],
            rotate: [scroll.rotation, scroll.rotation + 45, scroll.rotation],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 20,
            delay: scroll.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-40 h-56 bg-parchment rounded-lg shadow-xl transform -rotate-6">
            <div className="w-full h-full bg-clio-parchment rounded-lg p-4 font-cormorant text-sm opacity-80">
              {/* Decorative lines to simulate text */}
              <div className="space-y-2">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-1 bg-gray-400 opacity-30"
                    style={{ width: `${30 + Math.random() * 70}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
      
      {/* Owl companion */}
      <motion.div
        className="absolute top-1/4 right-1/4"
        animate={{
          y: [0, -30, 0],
          x: [0, 30, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <img
          src="/images/owl.png"
          alt="Clio's owl companion"
          className="w-24 h-24 opacity-60"
        />
      </motion.div>
    </div>
  );
};

export default ScrollingParchments;
