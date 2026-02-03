import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  Users,
  IndianRupee,
  CreditCard,
  Lock,
  AlertCircle,
  ChevronRight
} from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ itinerary, bookingData, setBookingData, onSubmit, user, isAuthenticated }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots] = useState(['09:00', '11:00', '14:00', '16:00']);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setBookingData({ ...bookingData, date: date.toISOString().split('T')[0] });
  };

  const calculateTotal = () => {
    const basePrice = itinerary.price_per_person;
    const numberOfPeople = bookingData.numberOfPeople || 1;
    return basePrice * numberOfPeople;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl shadow-xl sticky top-8"
    >
      {/* Price Header */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white p-6 rounded-t-2xl">
        <div className="flex items-center justify-between mb-2">
          <div className="text-2xl font-bold">₹{itinerary.price_per_person}</div>
          <div className="text-sm opacity-90">per person</div>
        </div>
        <p className="text-white/90">Instant confirmation • Free cancellation</p>
      </div>

      <form onSubmit={onSubmit} className="p-6">
        {/* Date Selection */}
        <div className="mb-6">
          <label className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
            <Calendar size={18} />
            <span>Select Date</span>
          </label>
          <div className="relative">
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
              dateFormat="MMMM d, yyyy"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
              placeholderText="Select a date"
            />
          </div>
        </div>

        {/* Time Selection */}
        <div className="mb-6">
          <label className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
            <Clock size={18} />
            <span>Select Time</span>
          </label>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((time) => (
              <button
                key={time}
                type="button"
                onClick={() => setBookingData({ ...bookingData, time })}
                className={`px-4 py-3 rounded-lg font-medium transition-all ${
                  bookingData.time === time
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        {/* Number of People */}
        <div className="mb-6">
          <label className="flex items-center space-x-2 text-gray-700 font-medium mb-3">
            <Users size={18} />
            <span>Number of People</span>
          </label>
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => {
                if (bookingData.numberOfPeople > 1) {
                  setBookingData({ ...bookingData, numberOfPeople: bookingData.numberOfPeople - 1 });
                }
              }}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-l-lg text-gray-700 font-bold text-xl"
            >
              −
            </button>
            <div className="flex-1 text-center py-3 bg-gray-50 font-bold text-lg">
              {bookingData.numberOfPeople || 1}
            </div>
            <button
              type="button"
              onClick={() => {
                if (bookingData.numberOfPeople < (itinerary.max_group_size || 8)) {
                  setBookingData({ ...bookingData, numberOfPeople: bookingData.numberOfPeople + 1 });
                }
              }}
              className="w-12 h-12 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-r-lg text-gray-700 font-bold text-xl"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Maximum group size: {itinerary.max_group_size || 8} people
          </p>
        </div>

        {/* Special Requests */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-3">
            Special Requests (Optional)
          </label>
          <textarea
            value={bookingData.specialRequests || ''}
            onChange={(e) => setBookingData({ ...bookingData, specialRequests: e.target.value })}
            placeholder="Any dietary restrictions, accessibility needs, or special requirements..."
            className="w-full h-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none"
            maxLength={500}
          />
          <div className="text-right text-sm text-gray-500 mt-1">
            {bookingData.specialRequests?.length || 0}/500
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-gray-50 rounded-xl p-4 mb-6">
          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Price per person</span>
              <span>₹{itinerary.price_per_person}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Number of people</span>
              <span>× {bookingData.numberOfPeople || 1}</span>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <div className="flex items-center">
                  <IndianRupee size={18} className="mr-1" />
                  <span>{calculateTotal()}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-1">Inclusive of all taxes</p>
            </div>
          </div>
        </div>

        {/* Authentication Check */}
        {!isAuthenticated ? (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-yellow-800 font-medium mb-2">Sign in required</p>
                <p className="text-yellow-700 text-sm">
                  Please sign in or create an account to book this experience.
                </p>
                <Link
                  to="/login"
                  className="inline-block mt-3 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-medium"
                >
                  Sign In Now
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {user?.full_name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Booking as {user?.full_name}</p>
                <p className="text-sm text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Info */}
        <div className="flex items-center justify-between mb-6 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-blue-800">Secure Payment</p>
              <p className="text-sm text-blue-700">SSL encrypted • Razorpay</p>
            </div>
          </div>
          <Lock className="w-5 h-5 text-blue-600" />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isAuthenticated || !bookingData.date || !bookingData.time}
          className="w-full btn-primary flex items-center justify-center text-lg py-4"
        >
          {isAuthenticated ? (
            <>
              Book Now
              <ChevronRight className="ml-2" />
            </>
          ) : (
            'Sign In to Book'
          )}
        </button>

        {/* Cancellation Policy */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            <Lock className="w-3 h-3 inline mr-1" />
            Free cancellation up to 24 hours before the experience
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingForm;