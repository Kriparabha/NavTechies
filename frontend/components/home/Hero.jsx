import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Star, Users, ChevronRight } from 'lucide-react';

const Hero = () => {
  const stats = [
    { value: '50+', label: 'Heritage Experiences', icon: <MapPin className="text-primary-500" /> },
    { value: '4.8', label: 'Average Rating', icon: <Star className="text-yellow-500" /> },
    { value: '2-4', label: 'Hour Experiences', icon: <Clock className="text-green-500" /> },
    { value: '100+', label: 'Local Vendors', icon: <Users className="text-purple-500" /> },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-100/[0.04] bg-[size:20px_20px]" />

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-10 left-10 w-24 h-24 rounded-full bg-gradient-to-r from-primary-200 to-secondary-200 blur-3xl opacity-50"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-gradient-to-r from-secondary-200 to-accent-200 blur-3xl opacity-50"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block text-gray-900">Discover the Soul of</span>
              <span className="gradient-text">Guwahati</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Immerse yourself in authentic 2-4 hour heritage experiences with verified local artisans,
              guides, and cultural hosts. Book instantly, explore safely.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/itineraries"
                className="btn-primary inline-flex items-center justify-center group"
              >
                Explore Experiences
                <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/vendor-dashboard"
                className="btn-secondary inline-flex items-center justify-center"
              >
                Become a Local Host
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="glass-card rounded-2xl p-6 text-center card-hover"
              >
                <div className="flex justify-center mb-3">
                  <div className="p-3 rounded-full bg-white shadow-lg">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,112C960,128,1056,160,1152,160C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;