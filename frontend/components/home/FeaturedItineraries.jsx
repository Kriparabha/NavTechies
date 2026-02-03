import React from 'react';
import { motion } from 'framer-motion';
import ItineraryCard from '../itineraries/ItineraryCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const FeaturedItineraries = ({ itineraries }) => {
  if (!itineraries || itineraries.length === 0) {
    return (
      <div className="text-center py-12">
        <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-600">No featured itineraries available</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {itineraries.map((itinerary, index) => (
          <ItineraryCard
            key={itinerary.id}
            itinerary={itinerary}
            index={index}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center mt-12"
      >
        <Link
          to="/itineraries"
          className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>View All Experiences</span>
          <ArrowRight size={20} />
        </Link>
      </motion.div>
    </div>
  );
};

export default FeaturedItineraries;