import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Timeline from '../components/Timeline';

const EducationPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes, categoriesRes] = await Promise.all([
          axios.get('/api/events'),
          axios.get('/api/categories')
        ]);
        setEvents(eventsRes.data.events);
        setCategories(categoriesRes.data.categories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-divine-pattern pt-20">
      {/* Classical columns background */}
      <div className="fixed inset-0 flex justify-around pointer-events-none opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-8 h-full bg-gradient-to-b from-clio-column to-transparent"
          />
        ))}
      </div>

      {/* Header with divine glow */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center py-12"
      >
        <div className="absolute inset-0 bg-wisdom-aura" />
        <h1 className="relative font-cinzel text-4xl md:text-5xl text-clio-gold mb-4 shadow-divine">
          Journey Through Crypto History
        </h1>
        <p className="relative font-cormorant text-xl md:text-2xl text-scroll-brown max-w-2xl mx-auto px-4">
          Explore the fascinating world of cryptocurrency, guided by the Muse of History
        </p>
      </motion.div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 mb-12">
        <div className="flex flex-wrap justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(183, 121, 31, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-3 rounded-full font-cinzel text-sm shadow-scroll transition-all duration-300 ${selectedCategory === 'all' ? 'bg-clio-gold text-white' : 'bg-scroll-texture text-scroll-brown hover:shadow-divine'}`}
            onClick={() => setSelectedCategory('all')}
          >
            All Adventures
          </motion.button>
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(183, 121, 31, 0.3)' }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-cinzel text-sm shadow-scroll transition-all duration-300 ${selectedCategory === category.id ? 'bg-clio-gold text-white' : 'bg-scroll-texture text-scroll-brown hover:shadow-divine'}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sacred Timeline */}
      <Timeline />

      {/* Detailed Events */}
      <div className="max-w-4xl mx-auto px-4 pb-20 mt-20">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-cinzel text-3xl text-clio-gold text-center mb-12"
        >
          Divine Chronicles
        </motion.h2>
        <div className="space-y-12">
          {events
            .filter(event => selectedCategory === 'all' || event.category === selectedCategory)
            .map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-divine-pattern rounded-xl p-6 shadow-scroll hover:shadow-divine transition-all duration-500 animate-unfurl"
              >
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Date Column */}
                  <div className="md:w-1/4">
                    <div className="font-cinzel text-clio-gold text-lg">{event.date}</div>
                    <div className="mt-2 inline-block px-3 py-1 rounded-full bg-clio-gold/10 text-sm font-cormorant">
                      {categories.find(c => c.id === event.category)?.name || event.category}
                    </div>
                  </div>
                  
                  {/* Content Column */}
                  <div className="md:w-3/4">
                    <h3 className="font-cinzel text-2xl text-gray-800 mb-3">{event.title}</h3>
                    <p className="font-cormorant text-lg text-gray-700 mb-4">{event.description}</p>
                    
                    {/* Key Terms */}
                    <div className="mt-4">
                      <h4 className="font-cinzel text-lg text-clio-gold mb-2">Key Terms</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {event.keyTerms.map((term, i) => (
                          <div key={i} className="bg-clio-gold/5 rounded-lg p-3">
                            <div className="font-cinzel text-sm text-clio-gold">{term.term}</div>
                            <div className="font-cormorant text-gray-700">{term.definition}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Fun Facts */}
                    <div className="mt-6">
                      <h4 className="font-cinzel text-lg text-clio-gold mb-2">Fun Facts</h4>
                      <ul className="list-disc list-inside space-y-2">
                        {event.funFacts.map((fact, i) => (
                          <li key={i} className="font-cormorant text-gray-700">{fact}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Thinking Points */}
                    <div className="mt-6">
                      <h4 className="font-cinzel text-lg text-clio-gold mb-2">Think About It</h4>
                      <div className="space-y-2">
                        {event.thinkingPoints.map((point, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-clio-gold">🤔</span>
                            <p className="font-cormorant text-gray-700">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EducationPage;
