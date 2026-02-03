import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  Shield,
  Phone,
  Clock,
  Navigation,
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Download
} from 'lucide-react';

const SafetyMap = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [filter, setFilter] = useState('all');

  const meetingPoints = [
    {
      id: 1,
      name: 'Kamakhya Temple Main Gate',
      type: 'temple',
      safetyScore: 9,
      address: 'Kamakhya Temple Main Gate, Nilachal Hill, Guwahati',
      coordinates: { lat: 26.1665, lng: 91.7065 },
      description: 'Main entrance of the Kamakhya Temple, well-lit and crowded area with security presence.',
      features: ['24/7 Security', 'Police Booth', 'Public Transport', 'Well-lit'],
      contact: '0361-2547100',
      hours: '5:00 AM - 10:00 PM',
      distance: '0.5 km',
      rating: 4.8,
    },
    {
      id: 2,
      name: 'Kachari Ghat',
      type: 'riverfront',
      safetyScore: 8,
      address: 'Brahmaputra Riverfront near Kachari Ghat, Guwahati',
      coordinates: { lat: 26.1839, lng: 91.7464 },
      description: 'Popular riverfront location with police patrol and tourist assistance center.',
      features: ['Tourist Police', 'CCTV', 'First Aid', 'Public Toilets'],
      contact: '0361-2547200',
      hours: '6:00 AM - 8:00 PM',
      distance: '1.2 km',
      rating: 4.6,
    },
    {
      id: 3,
      name: 'Dighalipukhuri Park Entrance',
      type: 'park',
      safetyScore: 7,
      address: 'Dighalipukhuri Park Entrance, Guwahati',
      coordinates: { lat: 26.1864, lng: 91.7432 },
      description: 'Main park entrance with security guards and well-maintained public area.',
      features: ['Security Guards', 'Public Lighting', 'Near Police Station', 'Medical Help'],
      contact: '0361-2547300',
      hours: '6:00 AM - 9:00 PM',
      distance: '2.1 km',
      rating: 4.5,
    },
    {
      id: 4,
      name: 'Pan Bazaar Police Station',
      type: 'police',
      safetyScore: 10,
      address: 'Pan Bazaar Police Station, GS Road, Guwahati',
      coordinates: { lat: 26.1870, lng: 91.7440 },
      description: '24/7 police station with tourist assistance desk and emergency services.',
      features: ['24/7 Police', 'Emergency Services', 'Tourist Help Desk', 'Secure Parking'],
      contact: '100',
      hours: '24/7',
      distance: '1.8 km',
      rating: 4.9,
    },
    {
      id: 5,
      name: 'Guwahati Railway Station',
      type: 'transport',
      safetyScore: 8,
      address: 'Guwahati Railway Station, Paltan Bazaar',
      coordinates: { lat: 26.1852, lng: 91.7511 },
      description: 'Main railway station with GRP police, CCTV surveillance, and tourist help desk.',
      features: ['GRP Police', 'CCTV', 'Tourist Counter', 'Medical Room'],
      contact: '0361-2547131',
      hours: '24/7',
      distance: '2.5 km',
      rating: 4.4,
    },
  ];

  const filterOptions = [
    { id: 'all', label: 'All Points', count: meetingPoints.length },
    { id: 'temple', label: 'Temples', count: meetingPoints.filter(p => p.type === 'temple').length },
    { id: 'riverfront', label: 'Riverfront', count: meetingPoints.filter(p => p.type === 'riverfront').length },
    { id: 'police', label: 'Police Stations', count: meetingPoints.filter(p => p.type === 'police').length },
    { id: 'park', label: 'Parks', count: meetingPoints.filter(p => p.type === 'park').length },
    { id: 'transport', label: 'Transport', count: meetingPoints.filter(p => p.type === 'transport').length },
  ];

  const filteredPoints = filter === 'all'
    ? meetingPoints
    : meetingPoints.filter(point => point.type === filter);

  const getSafetyColor = (score) => {
    if (score >= 9) return 'bg-green-100 text-green-800';
    if (score >= 7) return 'bg-yellow-100 text-yellow-800';
    if (score >= 5) return 'bg-orange-100 text-orange-800';
    return 'bg-red-100 text-red-800';
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'temple': return '🛕';
      case 'riverfront': return '🌊';
      case 'park': return '🌳';
      case 'police': return '👮';
      case 'transport': return '🚆';
      default: return '📍';
    }
  };

  const getSafetyLevel = (score) => {
    if (score >= 9) return 'Very Safe';
    if (score >= 7) return 'Safe';
    if (score >= 5) return 'Moderate';
    return 'Caution';
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Safe Meeting Points Map</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Pre-verified safe locations in Guwahati for meeting your local hosts
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-green-600">
            {meetingPoints.filter(p => p.safetyScore >= 9).length}
          </div>
          <div className="text-gray-600">Very Safe Points</div>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-blue-600">{meetingPoints.length}</div>
          <div className="text-gray-600">Total Points</div>
        </div>
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-yellow-600">24/7</div>
          <div className="text-gray-600">Police Access</div>
        </div>
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
          <div className="text-2xl font-bold text-purple-600">4.7</div>
          <div className="text-gray-600">Avg Safety Rating</div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Map & Points */}
        <div className="lg:col-span-2 space-y-6">
          {/* Filters */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Meeting Points</h3>
                <p className="text-gray-600">Filter by location type</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg font-medium">
                  <Download size={16} />
                  <span>Download Map</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {filterOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setFilter(option.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    filter === option.id
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option.label} ({option.count})
                </button>
              ))}
            </div>
          </div>

          {/* Map Visualization */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Guwahati Safety Map</h3>
                <p className="text-gray-300">Showing {filteredPoints.length} safe meeting points</p>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="text-sm">Very Safe (9-10)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <span className="text-sm">Safe (7-8)</span>
                </div>
              </div>
            </div>

            {/* Simple Map Representation */}
            <div className="relative h-96 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden">
              {/* Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-green-900/20" />

              {/* River */}
              <div className="absolute top-1/2 left-0 right-0 h-24 bg-gradient-to-r from-blue-500/30 to-cyan-500/30" />

              {/* Points */}
              {filteredPoints.map((point) => {
                // Simple positioning logic for demo
                const left = 20 + (point.id * 15) % 70;
                const top = 20 + (point.id * 10) % 70;

                return (
                  <motion.button
                    key={point.id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: point.id * 0.1 }}
                    onClick={() => setSelectedPoint(point)}
                    className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg transform hover:scale-110 transition-all ${
                      point.safetyScore >= 9 ? 'bg-green-500' :
                      point.safetyScore >= 7 ? 'bg-yellow-500' :
                      'bg-orange-500'
                    }`}
                    style={{ left: `${left}%`, top: `${top}%` }}
                  >
                    {getTypeIcon(point.type)}
                    <div className={`absolute -top-2 -right-2 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      getSafetyColor(point.safetyScore)
                    }`}>
                      {point.safetyScore}
                    </div>
                  </motion.button>
                );
              })}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">Click points for details</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Navigation className="w-4 h-4" />
                    <span className="text-sm">View directions in Google Maps</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Points List */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-gray-900">All Meeting Points</h3>
            {filteredPoints.map((point) => (
              <motion.div
                key={point.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => setSelectedPoint(point)}
                className={`bg-white rounded-xl shadow-lg p-4 cursor-pointer hover:shadow-xl transition-all ${
                  selectedPoint?.id === point.id ? 'ring-2 ring-primary-500' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="text-3xl">{getTypeIcon(point.type)}</div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">{point.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{point.address}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSafetyColor(point.safetyScore)}`}>
                          {getSafetyLevel(point.safetyScore)} ({point.safetyScore}/10)
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          {point.distance} away
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                          ⭐ {point.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Heart className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Point Details */}
        <div className="space-y-6">
          {/* Selected Point Details */}
          {selectedPoint ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden"
            >
              {/* Header */}
              <div className={`p-6 text-white ${
                selectedPoint.safetyScore >= 9 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                selectedPoint.safetyScore >= 7 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                'bg-gradient-to-r from-orange-500 to-red-500'
              }`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">{getTypeIcon(selectedPoint.type)}</div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{selectedPoint.safetyScore}/10</div>
                    <div className="text-sm opacity-90">{getSafetyLevel(selectedPoint.safetyScore)}</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-2">{selectedPoint.name}</h3>
                <p className="opacity-90">{selectedPoint.address}</p>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedPoint.description}</p>
                </div>

                {/* Safety Features */}
                <div>
                  <h4 className="font-bold text-gray-900 mb-3">Safety Features</h4>
                  <div className="space-y-2">
                    {selectedPoint.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact & Hours */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Phone size={16} />
                      <span className="font-medium">Contact</span>
                    </div>
                    <div className="font-bold text-gray-900">{selectedPoint.contact}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-gray-600 mb-2">
                      <Clock size={16} />
                      <span className="font-medium">Hours</span>
                    </div>
                    <div className="font-bold text-gray-900">{selectedPoint.hours}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full btn-primary flex items-center justify-center">
                    <Navigation className="w-5 h-5 mr-2" />
                    Get Directions
                  </button>
                  <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium">
                    <Heart className="w-5 h-5" />
                    <span>Save to Favorites</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 text-center">
              <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">Select a Meeting Point</h3>
              <p className="text-gray-600">
                Click on any meeting point on the map to see detailed safety information
              </p>
            </div>
          )}

          {/* Safety Tips */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-600" />
              <h3 className="font-bold text-gray-900">Safety Guidelines</h3>
            </div>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>Always meet at verified safe points</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>Share your live location with trusted contacts</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>Verify host identity before meeting</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                <span>Keep emergency numbers saved on speed dial</span>
              </li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Emergency Contacts</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Police</div>
                  <div className="text-sm text-gray-600">Emergency</div>
                </div>
                <a href="tel:100" className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600">
                  Call 100
                </a>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Ambulance</div>
                  <div className="text-sm text-gray-600">Medical Emergency</div>
                </div>
                <a href="tel:102" className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600">
                  Call 102
                </a>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">Tourist Police</div>
                  <div className="text-sm text-gray-600">Guwahati</div>
                </div>
                <a href="tel:03612547100" className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                  Call Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SafetyMap;