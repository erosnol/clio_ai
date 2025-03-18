import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon, InformationCircleIcon } from '@heroicons/react/24/outline';

const memeData = [
  {
    id: 1,
    title: "HODL Origins",
    image: "/images/memes/hodl.jpg",
    year: "2013",
    description: "The famous 'HODL' typo that became crypto's most iconic term",
    historicalContext: "Born from a Bitcoin forum post where a trader misspelled 'hold', creating crypto's favorite motto"
  },
  {
    id: 2,
    title: "Bitcoin Pizza Day",
    image: "/images/memes/pizza.jpg",
    year: "2010",
    description: "Two pizzas worth 10,000 BTC - The most expensive pizzas in history!",
    historicalContext: "The first real-world Bitcoin transaction, worth millions today"
  },
  {
    id: 3,
    title: "To The Moon! 🚀",
    image: "/images/memes/moon.jpg",
    year: "2017",
    description: "When crypto prices skyrocket, we're all going to the moon!",
    historicalContext: "Represents the optimistic spirit of crypto investors during bull markets"
  }
];

export default function MemeVault() {
  const [currentMeme, setCurrentMeme] = useState(0);
  const [showInfo, setShowInfo] = useState(false);

  const nextMeme = () => {
    setCurrentMeme((prev) => (prev + 1) % memeData.length);
    setShowInfo(false);
  };

  const prevMeme = () => {
    setCurrentMeme((prev) => (prev - 1 + memeData.length) % memeData.length);
    setShowInfo(false);
  };

  return (
    <div className="min-h-screen bg-[#FFF8E7] pt-safe-top pb-safe-bottom">
      <div className="container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl md:text-5xl font-cinzel-decorative text-center text-[#2C1810] mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Crypto Meme Vault
        </motion.h1>
        
        <div className="max-w-2xl mx-auto">
          <motion.div 
            className="relative aspect-square bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Meme Display */}
            <img 
              src={memeData[currentMeme].image} 
              alt={memeData[currentMeme].title}
              className="w-full h-full object-cover"
            />
            
            {/* Info Overlay */}
            <motion.div 
              className={`absolute inset-0 bg-black/70 p-6 flex flex-col justify-center items-center text-white
                         ${showInfo ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              initial={false}
              animate={{ opacity: showInfo ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-cinzel mb-2">{memeData[currentMeme].title}</h3>
              <p className="text-lg font-cormorant mb-4">{memeData[currentMeme].year}</p>
              <p className="text-center font-cormorant text-lg mb-4">{memeData[currentMeme].description}</p>
              <p className="text-center font-cormorant text-base italic">{memeData[currentMeme].historicalContext}</p>
            </motion.div>
          </motion.div>

          {/* Controls */}
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevMeme}
              className="p-3 rounded-full bg-divine-gold text-divine-brown hover:bg-[#B4941F] 
                       active:bg-[#8B7355] transition-colors duration-300"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-3 rounded-full bg-divine-gold text-divine-brown hover:bg-[#B4941F] 
                       active:bg-[#8B7355] transition-colors duration-300"
            >
              <InformationCircleIcon className="w-6 h-6" />
            </button>

            <button
              onClick={nextMeme}
              className="p-3 rounded-full bg-divine-gold text-divine-brown hover:bg-[#B4941F] 
                       active:bg-[#8B7355] transition-colors duration-300"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
