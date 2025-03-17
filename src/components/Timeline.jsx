import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Significant crypto events that shaped history
const timelineEvents = [
  {
    year: 2008,
    date: "October 31, 2008",
    title: "The Birth of Bitcoin",
    description: "Satoshi Nakamoto publishes the Bitcoin whitepaper, introducing the concept of a decentralized digital currency. This foundational document laid out the principles that would revolutionize the financial world.",
    impact: 95,
    icon: "scroll",
    type: "Genesis"
  },
  {
    year: 2009,
    date: "January 3, 2009",
    title: "Genesis Block Mined",
    description: "The first Bitcoin block (Genesis Block) is mined by Satoshi Nakamoto, marking the birth of the Bitcoin network.",
    impact: 90,
    icon: "cube",
    type: "Milestone"
  },
  {
    year: 2010,
    date: "May 22, 2010",
    title: "Bitcoin Pizza Day",
    description: "Laszlo Hanyecz makes the first real-world Bitcoin transaction, buying two pizzas for 10,000 BTC.",
    impact: 85,
    icon: "pizza-slice",
    type: "Cultural"
  },
  {
    year: 2011,
    date: "February 9, 2011",
    title: "Bitcoin Reaches Parity",
    description: "Bitcoin reaches parity with the US Dollar for the first time, trading at $1.00.",
    impact: 80,
    icon: "dollar-sign",
    type: "Market"
  },
  {
    year: 2013,
    date: "November 29, 2013",
    title: "The First Major Bull Run",
    description: "Bitcoin surpasses $1,000 for the first time, marking its first major price milestone and attracting global attention.",
    impact: 85,
    icon: "chart-line",
    type: "Market"
  },
  {
    year: 2015,
    date: "July 30, 2015",
    title: "Ethereum Launch",
    description: "Ethereum launches, introducing smart contracts and programmable blockchain technology to the world.",
    impact: 90,
    icon: "code",
    type: "Innovation"
  },
  {
    year: 2017,
    date: "December 17, 2017",
    title: "Crypto Goes Mainstream",
    description: "Bitcoin reaches nearly $20,000, triggering widespread media coverage and mainstream adoption discussions.",
    impact: 88,
    icon: "globe",
    type: "Cultural"
  },
  {
    year: 2021,
    date: "April 14, 2021",
    title: "Coinbase Goes Public",
    description: "Coinbase becomes the first major crypto company to go public, listing on the NASDAQ and marking crypto's integration with traditional finance.",
    impact: 85,
    icon: "building",
    type: "Milestone"
  },
  {
    year: 2021,
    date: "September 7, 2021",
    title: "El Salvador's Bitcoin Law",
    description: "El Salvador becomes the first country to adopt Bitcoin as legal tender, setting a precedent for national cryptocurrency adoption.",
    impact: 87,
    icon: "flag",
    type: "Legal"
  },
  {
    year: 2022,
    date: "September 15, 2022",
    title: "Ethereum Merge",
    description: "Ethereum completes 'The Merge' to Proof of Stake, reducing its energy consumption by ~99.95% and transforming blockchain sustainability.",
    impact: 92,
    icon: "leaf",
    type: "Innovation"
  }
];

const Timeline = () => {
  const timelineRef = useRef(null);
  const eventsRef = useRef([]);

  useEffect(() => {
    // Animate timeline events on scroll
    eventsRef.current.forEach((event, index) => {
      gsap.from(event, {
        scrollTrigger: {
          trigger: event,
          start: "top center+=100",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        x: index % 2 === 0 ? -50 : 50,
        duration: 1,
        ease: "power2.out"
      });
    });

    // Animate timeline line
    gsap.from(".timeline-line", {
      scrollTrigger: {
        trigger: timelineRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1
      },
      scaleY: 0,
      transformOrigin: "top center"
    });
  }, []);

  return (
    <div ref={timelineRef} className="relative py-20 px-4 bg-divine-pattern">
      {/* Timeline title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="font-cinzel text-4xl text-clio-gold mb-4">Sacred Timeline of Crypto</h2>
        <p className="font-cormorant text-xl text-gray-700">Journey through the divine moments that shaped digital currency</p>
      </motion.div>

      {/* Timeline line */}
      <div className="absolute left-1/2 top-40 bottom-20 w-1 bg-clio-gold/20">
        <div className="timeline-line absolute inset-0 bg-gradient-to-b from-clio-gold/60 via-clio-gold/40 to-clio-gold/60" />
      </div>

      {/* Timeline events */}
      <div className="relative max-w-7xl mx-auto">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={event.date}
            ref={el => eventsRef.current[index] = el}
            className={`flex items-center mb-20 ${
              index % 2 === 0 ? "flex-row" : "flex-row-reverse"
            }`}
          >
            {/* Event content */}
            <div className={`w-5/12 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8"}`}>
              <div className="bg-scroll-texture backdrop-blur-sm p-6 rounded-lg shadow-scroll hover:shadow-divine transition-all duration-300 transform hover:-translate-y-1">
                {/* Event header with scroll motif */}
                <div className="flex items-center gap-2 mb-3">
                  <i className="fas fa-scroll text-clio-gold opacity-70" />
                  <div className="font-cinzel text-clio-gold text-sm">{event.date}</div>
                </div>
                
                {/* Event title with divine glow */}
                <h3 className="font-cinzel text-xl text-gray-800 mb-3 golden-glow">{event.title}</h3>
                
                {/* Event description with elegant styling */}
                <p className="font-cormorant text-gray-600 leading-relaxed">{event.description}</p>
                
                {/* Event type indicator */}
                <div className="mt-3 flex items-center gap-2">
                  <i className={`fas fa-${event.icon} text-clio-gold/70`} />
                  <span className="text-sm font-cinzel text-clio-gold/70">{event.type}</span>
                </div>
                <div className="mt-4 flex items-center justify-end gap-2">
                  <span className="text-sm text-gray-500">Impact:</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-clio-gold"
                      style={{ width: `${event.impact}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Event marker */}
            <div className="w-2/12 flex justify-center">
              <div className="w-8 h-8 rounded-full bg-clio-gold shadow-divine flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <i className={`fas fa-${event.icon} text-white text-sm`} />
              </div>
            </div>

            {/* Empty space for alignment */}
            <div className="w-5/12" />
          </motion.div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white/50 to-transparent" />
    </div>
  );
};

export default Timeline;
