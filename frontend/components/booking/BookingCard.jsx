import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  IndianRupee,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  AlertCircle,
  ChevronRight
} from 'lucide-react';

const BookingCard = ({ booking, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <ClockIcon className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
        {/* Status Header */}
        <div className={`px-6 py-3 flex items-center justify-between ${getStatusColor(booking.status)}`}>
          <div className="flex items-center space-x-2">
            {getStatusIcon(booking.status)}
            <span className="font-semibold capitalize">{booking.status}</span>
          </div>
          <div className="text-sm font-medium">
            Booking ID: {booking.id?.substring(0, 8) || 'N/A'}
          </div>
        </div>

        <div className="p-6">
          {/* Experience Info */}
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {booking.itinerary_title || 'Heritage Experience'}
              </h3>
              <div className="flex items-center space-x-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span className="text-sm">{booking.meeting_address || 'Guwahati'}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users size={16} />
                  <span className="text-sm">{booking.number_of_people || 1} people</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold gradient-text flex items-center">
                <IndianRupee size={20} className="mr-1" />
                {booking.total_amount || booking.amount || 0}
              </div>
              <div className="text-sm text-gray-500">Paid</div>
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <Calendar size={18} />
                <span className="font-medium">Date</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {new Date(booking.booking_date).toLocaleDateString('en-IN', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-gray-600 mb-2">
                <Clock size={18} />
                <span className="font-medium">Time</span>
              </div>
              <div className="text-lg font-bold text-gray-900">
                {booking.start_time || '09:00 AM'}
              </div>
            </div>
          </div>

          {/* Vendor Info */}
          {booking.vendor_name && (
            <div className="flex items-center space-x-3 mb-6 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold">
                  {booking.vendor_name?.charAt(0) || 'V'}
                </span>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">{booking.vendor_name}</h4>
                <p className="text-sm text-gray-600">Your local host</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-yellow-600">
                  <span className="font-bold mr-1">{booking.vendor_rating || '4.8'}</span>
                  <span className="text-sm">★</span>
                </div>
                <p className="text-xs text-gray-500">Rating</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-3">
            <Link
              to={`/booking/${booking.itinerary_id || booking.id}`}
              className="flex-1 btn-primary flex items-center justify-center"
            >
              View Details
              <ChevronRight className="ml-2" />
            </Link>

            {booking.status === 'pending' && (
              <button className="px-6 py-3 bg-red-50 text-red-600 font-semibold rounded-lg hover:bg-red-100 transition-colors">
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCard;