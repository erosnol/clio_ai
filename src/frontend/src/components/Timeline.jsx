import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function Timeline() {
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    const events = timeline.querySelectorAll('.timeline-event');

    gsap.fromTo(events, 
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: timeline,
          start: "top center",
          end: "bottom center",
          scrub: 1
        }
      }
    );
  }, []);

  const events = [
    {
      year: '2009',
      title: 'Genesis Block',
      description: 'Bitcoin network comes alive with the mining of the genesis block.',
      icon: '🌟'
    },
    {
      year: '2010',
      title: 'Bitcoin Pizza Day',
      description: 'First real-world Bitcoin transaction: Two pizzas for 10,000 BTC.',
      icon: '🍕'
    },
    {
      year: '2011',
      title: 'Dollar Parity',
      description: 'Bitcoin reaches parity with the US Dollar.',
      icon: '💵'
    },
    {
      year: '2013',
      title: 'Cyprus Bank Crisis',
      description: 'Bitcoin gains attention during the Cyprus financial crisis.',
      icon: '🏦'
    }
  ];

  return (
    <div ref={timelineRef} className="relative py-20">
      <div className="absolute left-1/2 h-full w-1 bg-primary-200 transform -translate-x-1/2" />
      
      {events.map((event, index) => (
        <motion.div
          key={event.year}
          className="timeline-event relative mb-16"
          initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.2 }}
        >
          <div className={`flex items-center ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}>
            <div className="w-5/12" />
            <div className="relative flex items-center justify-center w-2/12">
              <div className="h-12 w-12 rounded-full bg-primary-500 flex items-center justify-center text-2xl">
                {event.icon}
              </div>
            </div>
            <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
              <div className="bg-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-primary-600">{event.year}</h3>
                <h4 className="text-lg font-semibold text-gray-800 mt-2">{event.title}</h4>
                <p className="text-gray-600 mt-2">{event.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
