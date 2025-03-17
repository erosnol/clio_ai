import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const cryptoEvents = [
  {
    date: '2009-01-03',
    title: 'The Genesis Block',
    description: 'The birth of Bitcoin, as Satoshi Nakamoto mines the first block.',
    icon: '🌟'
  },
  {
    date: '2010-05-22',
    title: 'The Pizza Transaction',
    description: 'Two pizzas purchased for 10,000 BTC, marking the first real-world Bitcoin transaction.',
    icon: '🍕'
  },
  {
    date: '2011-02-09',
    title: 'Dollar Parity',
    description: 'Bitcoin reaches parity with the US Dollar, a significant milestone.',
    icon: '💰'
  },
  {
    date: '2013-11-29',
    title: 'Bitcoin Surpasses $1,000',
    description: 'Bitcoin price reaches $1,000 for the first time.',
    icon: '📈'
  },
  {
    date: '2015-07-30',
    title: 'Ethereum Genesis',
    description: 'Ethereum network launches, introducing smart contracts to the world.',
    icon: '💎'
  }
];

export default function ScrollingParchments() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);

  return (
    <div ref={containerRef} className="min-h-[80vh] relative">
      <h2 className="text-4xl font-cinzel-decorative text-center text-[#2C1810] mb-16">
        Sacred Chronicles
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cryptoEvents.map((event, index) => (
          <motion.div
            key={event.date}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            style={{ y, opacity }}
            className="divine-card relative p-8"
          >
            <img src="/images/laurel.svg" alt="" className="laurel-left" />
            <img src="/images/laurel.svg" alt="" className="laurel-right" />
            <div className="text-center mb-4">
              <span className="text-3xl">{event.icon}</span>
            </div>
            <h3 className="text-xl font-cinzel text-[#2C1810] mb-2">{event.title}</h3>
            <p className="text-sm font-cinzel text-[#8B7355] mb-4">{event.date}</p>
            <p className="font-cormorant text-lg text-[#2C1810]">
              {event.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
