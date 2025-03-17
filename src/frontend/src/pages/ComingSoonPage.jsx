import { motion } from 'framer-motion';

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-[#FFF8E7] flex items-center justify-center py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-6xl font-cinzel-decorative text-[#2C1810] mb-6">
            K-12 Crypto History Education
          </h1>
          <div className="divine-card max-w-3xl mx-auto p-8">
            <img src="/images/owl.svg" alt="Clio" className="w-24 h-24 mx-auto mb-6" />
            <p className="text-xl font-cormorant text-[#2C1810] mb-8">
              Join Clio, your friendly crypto history teacher, on an exciting educational journey!
              We're creating a special space where K-12 students can learn about cryptocurrency
              and blockchain technology through fun, interactive lessons and daily activities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="divine-card p-6">
                <h3 className="font-cinzel text-lg text-[#2C1810] mb-3">Daily Fun Facts</h3>
                <p className="font-cormorant text-[#8B7355]">
                  Start each day with an exciting crypto history fact, explained in kid-friendly terms!
                </p>
              </div>
              <div className="divine-card p-6">
                <h3 className="font-cinzel text-lg text-[#2C1810] mb-3">Interactive Q&A</h3>
                <p className="font-cormorant text-[#8B7355]">
                  Ask questions and get friendly, easy-to-understand answers about crypto history.
                </p>
              </div>
              <div className="divine-card p-6">
                <h3 className="font-cinzel text-lg text-[#2C1810] mb-3">Educational Tweets</h3>
                <p className="font-cormorant text-[#8B7355]">
                  Follow our Twitter bot for daily educational content about cryptocurrency history!
                </p>
              </div>
            </div>
            <div className="divine-card bg-[#2C1810] p-6 max-w-2xl mx-auto">
              <h3 className="font-cinzel text-lg text-[#D4AF37] mb-3">Coming Soon</h3>
              <p className="font-cormorant text-[#FFF8E7]">
                We're working with educators to create engaging content that makes crypto history
                accessible and fun for K-12 students. Stay tuned for our launch!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
