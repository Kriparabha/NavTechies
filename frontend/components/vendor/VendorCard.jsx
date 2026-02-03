// src/components/vendor/VendorCard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Star,
  IndianRupee,
  Clock,
  Users,
  Shield,
  ChevronRight,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Award,
  BookOpen,
  User
} from 'lucide-react';

const VendorCard = ({ vendor, index }) => {
  const [expanded, setExpanded] = useState(false);

  // Render star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} size={16} className="text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
    >
      {/* Card Header */}
      <div className="p-6">
        {/* Business Name and Verification */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-xl font-bold text-gray-900">{vendor.business_name}</h3>
              {vendor.verification_status === 'verified' && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  <Shield size={12} className="mr-1" />
                  Verified
                </span>
              )}
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>
          </div>
        </div>

        {/* Rating and Experience */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {renderStars(vendor.rating)}
              <span className="ml-2 font-semibold text-gray-900">{vendor.rating}</span>
              <span className="text-gray-500 text-sm">({vendor.total_reviews} reviews)</span>
            </div>
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock size={16} />
              <span className="text-sm">{vendor.experience_years}+ years</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-primary-600 font-bold">
            <IndianRupee size={20} />
            <span className="text-xl">{vendor.hourly_rate.toLocaleString()}</span>
            <span className="text-sm text-gray-500">/hour</span>
          </div>
        </div>

        {/* Expertise Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {vendor.expertise.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
              >
                {skill}
              </span>
            ))}
            {vendor.expertise.length > 3 && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                +{vendor.expertise.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Users size={16} />
            <span className="text-sm">Speaks: {vendor.languages.join(', ')}</span>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center text-primary-600 hover:text-primary-700 font-medium mb-4"
        >
          {expanded ? 'Show Less' : 'View Details'}
          <ChevronRight
            size={16}
            className={`ml-1 transition-transform ${expanded ? 'rotate-90' : ''}`}
          />
        </button>

        {/* Expanded Details */}
        {expanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-gray-100 pt-4 space-y-4"
          >
            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone size={18} className="text-gray-400" />
                <span className="text-sm">{vendor.phone}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail size={18} className="text-gray-400" />
                <span className="text-sm truncate">{vendor.email}</span>
              </div>
            </div>

            {/* All Expertise */}
            <div>
              <h4 className="font-medium text-gray-900 mb-2">All Expertise</h4>
              <div className="flex flex-wrap gap-2">
                {vendor.expertise.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <Link
              to={`/vendors/${vendor.id}`}
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg hover:from-primary-600 hover:to-secondary-600 transition-colors shadow-sm"
            >
              <User size={18} />
              <span className="font-medium">View Profile & Book</span>
            </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default VendorCard;