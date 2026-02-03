import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Clock,
  Users,
  IndianRupee,
  Star,
  Check,
  Shield,
  Calendar,
  Heart,
  Share2,
  AlertCircle
} from 'lucide-react';

const ItineraryDetail = ({ itinerary }) => {
  const getCategoryColor = (category) => {
    const colors = {
      spiritual: 'bg-purple-100 text-purple-800',
      nature: 'bg-green-100 text-green-800',
      cultural: 'bg-yellow-100 text-yellow-800',
      culinary: 'bg-red-100 text-red-800',
      historical: 'bg-blue-100 text-blue-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="relative rounded-2xl overflow-hidden">
        <img
          src={itinerary.image_url}
          alt={itinerary.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-4 py-2 rounded-full font-semibold ${getCategoryColor(itinerary.category)}`}>
              {itinerary.category}
            </span>
            <div className="flex items-center space-x-2 text-white">
              <Star className="fill-yellow-400 text-yellow-400" size={20} />
              <span className="font-bold">{itinerary.vendor?.rating || '4.8'}</span>
              <span className="text-white/80">({itinerary.vendor?.total_reviews || 124} reviews)</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {itinerary.title}
          </h1>

          <div className="flex items-center space-x-4 text-white/90">
            <div className="flex items-center space-x-2">
              <MapPin size={18} />
              <span>{itinerary.meeting_address}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={18} />
              <span>Verified Host</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-3">
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Heart className="w-5 h-5 text-white" />
          </button>
          <button className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 text-center">
          <Clock className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">
            {Math.floor(itinerary.duration_minutes / 60)}h {itinerary.duration_minutes % 60}m
          </div>
          <div className="text-gray-600">Duration</div>
        </div>

        <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-xl p-6 text-center">
          <Users className="w-8 h-8 text-secondary-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">
            Max {itinerary.max_group_size || 8}
          </div>
          <div className="text-gray-600">Group Size</div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
          <IndianRupee className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">
            ₹{itinerary.price_per_person}
          </div>
          <div className="text-gray-600">Per Person</div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
          <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <div className="text-2xl font-bold text-gray-900">Instant</div>
          <div className="text-gray-600">Booking</div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Experience</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          {itinerary.description}
        </p>
      </div>

      {/* Highlights */}
      {itinerary.highlights && itinerary.highlights.length > 0 && (
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience Highlights</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {itinerary.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0 mt-1">
                  <Check size={16} className="text-white" />
                </div>
                <span className="text-gray-800 font-medium">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* What's Included */}
      {(itinerary.inclusions || itinerary.exclusions) && (
        <div className="grid md:grid-cols-2 gap-8">
          {itinerary.inclusions && itinerary.inclusions.length > 0 && (
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-3">
                {itinerary.inclusions.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {itinerary.exclusions && itinerary.exclusions.length > 0 && (
            <div className="bg-white rounded-2xl p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Not Included</h3>
              <ul className="space-y-3">
                {itinerary.exclusions.map((item, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <X className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Safety Information */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
        <div className="flex items-center space-x-3 mb-6">
          <Shield className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-gray-900">Safety Information</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Meeting Point Safety</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>Public, well-lit location</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>Easy access to transportation</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>Verified local business premises</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-3">Host Verification</h4>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>Government ID verified</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>Background check completed</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-1" />
                <span>Training completed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ItineraryDetail;