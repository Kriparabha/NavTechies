import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, Calendar, Clock, IndianRupee, ChevronDown } from 'lucide-react';

const ItineraryFilter = ({ filters, categories, onFilterChange, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category: category === filters.category ? '' : category });
  };

  const handleDurationChange = (min, max) => {
    onFilterChange({ ...filters, duration_min: min, duration_max: max });
  };

  const handlePriceChange = (price) => {
    onFilterChange({ ...filters, price_max: price });
  };

  const clearFilters = () => {
    onClear();
    setIsExpanded(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Filter className="w-5 h-5 text-primary-600" />
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <ChevronDown className={`w-5 h-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Filter Content */}
      <AnimatePresence>
        {(isExpanded || window.innerWidth >= 768) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-6"
          >
            {/* Category Filter */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Category</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      filters.category === category
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <Clock className="w-4 h-4 text-gray-600" />
                <h4 className="font-medium text-gray-900">Duration</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '0-60 min', min: 0, max: 60 },
                  { label: '60-120 min', min: 60, max: 120 },
                  { label: '120-180 min', min: 120, max: 180 },
                  { label: '180-240 min', min: 180, max: 240 },
                ].map((duration) => (
                  <button
                    key={duration.label}
                    onClick={() => handleDurationChange(duration.min, duration.max)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      filters.duration_min == duration.min && filters.duration_max == duration.max
                        ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <IndianRupee className="w-4 h-4 text-gray-600" />
                <h4 className="font-medium text-gray-900">Max Price</h4>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[500, 1000, 2000].map((price) => (
                  <button
                    key={price}
                    onClick={() => handlePriceChange(price)}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                      filters.price_max == price
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ₹{price}
                  </button>
                ))}
              </div>
              <div className="mt-3">
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="100"
                  value={filters.price_max || 0}
                  onChange={(e) => handlePriceChange(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gradient-to-r [&::-webkit-slider-thumb]:from-primary-500 [&::-webkit-slider-thumb]:to-secondary-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>₹{filters.price_max || 0}</span>
                  <span>₹5000</span>
                </div>
              </div>
            </div>

            {/* Clear Filters */}
            {(filters.category || filters.duration_min || filters.duration_max || filters.price_max) && (
              <div className="pt-4 border-t border-gray-200">
                <button
                  onClick={clearFilters}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-medium rounded-lg hover:from-gray-200 hover:to-gray-300 transition-all"
                >
                  <X size={16} />
                  <span>Clear All Filters</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItineraryFilter;