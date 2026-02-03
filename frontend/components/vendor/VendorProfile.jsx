import React from 'react';
import { motion } from 'framer-motion';
import {
  Star,
  MapPin,
  Clock,
  IndianRupee,
  Award,
  CheckCircle,
  Users,
  Calendar,
  Globe,
  Mail,
  Phone,
  Shield,
  Edit
} from 'lucide-react';

const VendorProfile = ({ vendor, isOwnProfile = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur-sm border-4 border-white/30 flex items-center justify-center">
              <span className="text-white text-5xl font-bold">
                {vendor.business_name?.charAt(0) || 'V'}
              </span>
            </div>
            {vendor.verification_status === 'verified' && (
              <div className="absolute -bottom-2 -right-2">
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{vendor.business_name}</h1>
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <div className="flex items-center">
                    <Star className="fill-yellow-400 text-yellow-400 w-5 h-5" />
                    <span className="font-bold ml-1">{vendor.rating}</span>
                    <span className="opacity-90 text-sm ml-1">({vendor.total_reviews} reviews)</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    vendor.verification_status === 'verified'
                      ? 'bg-white/20'
                      : 'bg-yellow-500/20'
                  }`}>
                    {vendor.verification_status}
                  </span>
                </div>
              </div>

              {isOwnProfile && (
                <button className="mt-4 md:mt-0 px-6 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors">
                  <Edit className="w-4 h-4 inline mr-2" />
                  Edit Profile
                </button>
              )}
            </div>

            <p className="text-white/90 text-lg mb-6 max-w-3xl">
              {vendor.description || 'Experienced local guide specializing in authentic heritage experiences'}
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{vendor.experience_years || 5}+</div>
                <div className="text-white/80 text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">₹{vendor.hourly_rate || 1500}</div>
                <div className="text-white/80 text-sm">Hourly Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{vendor.total_reviews || 124}</div>
                <div className="text-white/80 text-sm">Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-white/80 text-sm">Completion Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                {vendor.description || 'Passionate about sharing the rich cultural heritage of Assam with visitors from around the world. With years of experience and deep local knowledge, I create memorable experiences that go beyond typical tourist attractions.'}
              </p>
            </div>
          </div>

          {/* Expertise */}
          {vendor.expertise && vendor.expertise.length > 0 && (
            <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Areas of Expertise</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {vendor.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-xl">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-medium text-gray-900">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {vendor.languages && vendor.languages.length > 0 && (
            <div className="bg-white rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Languages Spoken</h2>
              <div className="flex flex-wrap gap-3">
                {vendor.languages.map((lang, index) => (
                  <div key={index} className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-lg">
                    <Globe className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{lang}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
            <div className="space-y-4">
              {vendor.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{vendor.email}</p>
                  </div>
                </div>
              )}

              {vendor.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium text-gray-900">{vendor.phone}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium text-gray-900">Guwahati, Assam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badges */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Identity Verified</p>
                  <p className="text-sm text-gray-600">Government ID checked</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Background Check</p>
                  <p className="text-sm text-gray-600">Completed screening</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Local Expert</p>
                  <p className="text-sm text-gray-600">{vendor.experience_years || 5}+ years experience</p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Info */}
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Information</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Hourly Rate</span>
                </div>
                <span className="text-2xl font-bold gradient-text">₹{vendor.hourly_rate || 1500}</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Response Time</span>
                </div>
                <span className="font-bold text-gray-900">Within 24 hours</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Group Size</span>
                </div>
                <span className="font-bold text-gray-900">Up to 8 people</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700">Availability</span>
                </div>
                <span className="font-bold text-gray-900">Flexible</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default VendorProfile;