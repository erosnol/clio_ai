import { motion } from 'framer-motion';
import { useState } from 'react';

const cryptoEras = [
  {
    era: 'Genesis Era',
    years: '2008-2013',
    events: [
      {
        date: '2008-10-31',
        title: 'The Sacred Whitepaper',
        description: 'Satoshi Nakamoto unveils the Bitcoin whitepaper, laying the foundation for a new financial paradigm.',
      },
      {
        date: '2009-01-03',
        title: 'The First Block',
        description: 'The Bitcoin genesis block is mined, marking the birth of the first cryptocurrency.',
      },
      {
        date: '2010-05-22',
        title: 'The First Exchange',
        description: 'The first real-world Bitcoin transaction: two pizzas for 10,000 BTC.',
      }
    ]
  },
  {
    era: 'Enlightenment Era',
    years: '2013-2017',
    events: [
      {
        date: '2013-11-27',
        title: 'The Thousand Mark',
        description: 'Bitcoin reaches $1,000 for the first time, a testament to growing adoption.',
      },
      {
        date: '2015-07-30',
        title: 'The Rise of Ethereum',
        description: 'Ethereum launches, introducing smart contracts and a new era of blockchain possibilities.',
      },
      {
        date: '2016-07-16',
        title: 'The Great Halving',
        description: 'Bitcoin undergoes its second halving, reducing block rewards to 12.5 BTC.',
      }
    ]
  },
  {
    era: 'Golden Era',
    years: '2017-2021',
    events: [
      {
        date: '2017-12-17',
        title: 'The Great Bull Run',
        description: 'Bitcoin reaches nearly $20,000, capturing global attention.',
      },
      {
        date: '2020-05-11',
        title: 'The Third Halving',
        description: 'Bitcoin block rewards are reduced to 6.25 BTC, continuing the deflationary schedule.',
      },
      {
        date: '2021-11-10',
        title: 'The All-Time Peak',
        description: 'Bitcoin reaches its highest price of $69,000, marking a historic milestone.',
      }
    ]
  }
];

export default function ChroniclesPage() {
  const [selectedEra, setSelectedEra] = useState(cryptoEras[0]);

  return (
    <div className="min-h-screen bg-[#FFF8E7] py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-cinzel-decorative text-[#2C1810] mb-6">
            Sacred Chronicles
          </h1>
          <p className="text-xl font-cormorant text-[#8B7355] max-w-3xl mx-auto">
            Explore the divine timeline of cryptocurrency history, from the genesis block to the present day.
            Each era marks a significant chapter in our collective journey.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Era Navigation */}
          <div className="lg:w-1/4">
            <div className="sticky top-8">
              <h2 className="text-2xl font-cinzel text-[#2C1810] mb-6">Eras of Wisdom</h2>
              <div className="space-y-4">
                {cryptoEras.map((era) => (
                  <motion.button
                    key={era.era}
                    onClick={() => setSelectedEra(era)}
                    className={`w-full text-left p-4 rounded-lg transition-all ${
                      selectedEra.era === era.era
                        ? 'bg-[#D4AF37] text-[#2C1810]'
                        : 'bg-white/50 text-[#8B7355] hover:bg-white/80'
                    }`}
                    whileHover={{ x: 5 }}
                  >
                    <h3 className="font-cinzel text-lg">{era.era}</h3>
                    <p className="font-cormorant">{era.years}</p>
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {/* Events Timeline */}
          <div className="lg:w-3/4">
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#D4AF37] opacity-30"></div>
              
              {selectedEra.events.map((event, index) => (
                <motion.div
                  key={event.date}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="relative pl-8 pb-12"
                >
                  <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-[#D4AF37] -translate-x-[3px]"></div>
                  <div className="divine-card p-6">
                    <time className="text-sm font-cinzel text-[#8B7355]">{event.date}</time>
                    <h3 className="text-xl font-cinzel text-[#2C1810] mt-2 mb-3">{event.title}</h3>
                    <p className="font-cormorant text-lg text-[#2C1810]">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
