import React from 'react';
import { motion } from 'framer-motion';
import { Users, Star, MapPin, Clock, Award, Heart } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-primary-500" />,
      value: '500+',
      label: 'Happy Travelers',
      description: 'Connected with local hosts',
      delay: 0.1,
    },
    {
      icon: <MapPin className="w-8 h-8 text-secondary-500" />,
      value: '50+',
      label: 'Heritage Experiences',
      description: 'Across Guwahati',
      delay: 0.2,
    },
    {
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      value: '4.8',
      label: 'Average Rating',
      description: 'From verified reviews',
      delay: 0.3,
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      value: '2-4',
      label: 'Hour Experiences',
      description: 'Perfect for short stays',
      delay: 0.4,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 mb-4 px-4 py-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full">
            <Heart className="w-4 h-4 text-primary-600" />
            <span className="text-primary-600 font-semibold text-sm">TRUSTED BY LOCALS & TRAVELERS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Numbers That Matter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join hundreds who've discovered authentic Assam through our platform
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: stat.delay }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 group-hover:from-primary-50 group-hover:to-secondary-50 transition-all mb-6 mx-auto">
                  {stat.icon}
                </div>
                <div className="text-center">
                  <div className="text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {stat.label}
                  </h3>
                  <p className="text-gray-600">
                    {stat.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Trust & Safety First
                </h3>
                <p className="text-gray-600">
                  All hosts are verified, experiences are insured, and payments are secure
                </p>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">Verified Hosts</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">SSL Secure</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-2">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">24/7 Support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Stats;