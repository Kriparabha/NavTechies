import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Clock,
  UserCheck,
  CreditCard,
  MapPin,
  Shield
} from 'lucide-react';

const BookingStatus = ({ status = 'confirmed', currentStep = 1 }) => {
  const steps = [
    { key: 'booked', label: 'Booked', icon: <CheckCircle /> },
    { key: 'confirmed', label: 'Confirmed', icon: <UserCheck /> },
    { key: 'paid', label: 'Paid', icon: <CreditCard /> },
    { key: 'meeting', label: 'Meeting Point', icon: <MapPin /> },
    { key: 'completed', label: 'Completed', icon: <Shield /> },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-6">Booking Status</h3>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200 rounded-full">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full"
          />
        </div>

        {/* Steps */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const isActive = index < currentStep;
            const isCurrent = index === currentStep - 1;

            return (
              <div key={step.key} className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 relative z-10 ${
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-400'
                  } ${isCurrent ? 'ring-4 ring-primary-200' : ''}`}
                >
                  {step.icon}
                </motion.div>
                <span className={`text-sm font-medium ${
                  isActive ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Status Message */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl"
      >
        <div className="flex items-center space-x-3">
          {currentStep === 1 && (
            <>
              <Clock className="w-5 h-5 text-yellow-600" />
              <div>
                <p className="font-medium text-gray-900">Awaiting Confirmation</p>
                <p className="text-sm text-gray-600">Your host will confirm within 24 hours</p>
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <UserCheck className="w-5 h-5 text-green-600" />
              <div>
                <p className="font-medium text-gray-900">Booking Confirmed</p>
                <p className="text-sm text-gray-600">Your experience is confirmed!</p>
              </div>
            </>
          )}
          {currentStep >= 3 && (
            <>
              <Shield className="w-5 h-5 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">Ready to Go</p>
                <p className="text-sm text-gray-600">Check meeting point details below</p>
              </div>
            </>
          )}
        </div>
      </motion.div>

      {/* Next Steps */}
      <div className="mt-6 space-y-3">
        <h4 className="font-medium text-gray-900">Next Steps:</h4>
        <ul className="space-y-2">
          {currentStep === 1 && (
            <>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Wait for host confirmation</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-gray-300" />
                <span>Complete payment</span>
              </li>
            </>
          )}
          {currentStep === 2 && (
            <>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Booking confirmed ✓</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Complete payment</span>
              </li>
            </>
          )}
          {currentStep === 3 && (
            <>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Payment completed ✓</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <span>Check meeting point details</span>
              </li>
            </>
          )}
          {currentStep >= 4 && (
            <>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>All set! ✓</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>Check support page for safety info</span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookingStatus;