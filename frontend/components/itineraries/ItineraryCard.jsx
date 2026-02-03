import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Clock,
  Users,
  Star,
  IndianRupee,
  ArrowRight,
  Heart
} from 'lucide-react';

const ItineraryCard = ({ itinerary, index }) => {
  const getCategoryColor = (category) => {
    const colors = {
      spiritual: 'bg-purple-100 text-purple-800',
      nature: 'bg-green-100 text-green-800',
      cultural: 'bg-yellow-100 text-yellow-800',
      culinary: 'bg-red-100 text-red-800',
      historical: 'bg-blue-100 text-blue-800',
      adventure: 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      easy: 'bg-green-100 text-green-800',
      moderate: 'bg-yellow-100 text-yellow-800',
      difficult: 'bg-red-100 text-red-800',
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={itinerary.image_url || 'https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=800'}
            alt={itinerary.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(itinerary.category)}`}>
              {itinerary.category}
            </span>
          </div>

          {/* Favorite Button */}
          <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
            <Heart size={20} className="text-gray-600 hover:text-red-500" />
          </button>

          {/* Vendor Info */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {itinerary.vendor?.business_name?.charAt(0) || 'G'}
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">
                    {itinerary.vendor?.business_name || 'Local Guide'}
                  </p>
                  <div className="flex items-center space-x-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs">
                      {itinerary.vendor?.rating || '4.8'} ({itinerary.vendor?.total_reviews || 124})
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {itinerary.title}
          </h3>

          <p className="text-gray-600 mb-4 flex-1 line-clamp-2">
            {itinerary.description}
          </p>

          {/* Highlights */}
          {itinerary.highlights && itinerary.highlights.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-1 h-4 bg-gradient-to-b from-primary-500 to-secondary-500 rounded-full" />
                <span className="text-sm font-medium text-gray-700">Highlights</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {itinerary.highlights.slice(0, 3).map((highlight, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                <Clock size={16} />
                <span className="text-sm font-medium">Duration</span>
              </div>
              <div className="text-lg font-bold gradient-text">
                {Math.floor(itinerary.duration_minutes / 60)}h {itinerary.duration_minutes % 60}m
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                <Users size={16} />
                <span className="text-sm font-medium">Group</span>
              </div>
              <div className="text-lg font-bold gradient-text">
                Max {itinerary.max_group_size || 8}
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center space-x-1 text-gray-600 mb-1">
                <IndianRupee size={16} />
                <span className="text-sm font-medium">Price</span>
              </div>
              <div className="text-lg font-bold gradient-text">
                ₹{itinerary.price_per_person}/person
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-auto">
            <Link
              to={`/booking/${itinerary.id}`}
              className="btn-primary flex-1 flex items-center justify-center group"
            >
              Book Now
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to={`/itineraries/${itinerary.id}`}
              className="btn-secondary flex items-center justify-center px-4"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItineraryCard;