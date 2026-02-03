// src/components/vendor/OnboardingForm.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Upload, Camera, User, Briefcase, Globe, Award, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

const OnboardingForm = ({ onSubmit, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Info
    businessName: '',
    fullName: '',
    email: '',
    phone: '',

    // Step 2: Expertise
    expertise: [],
    languages: [],
    experienceYears: '',
    description: '',

    // Step 3: Business Details
    hourlyRate: '',
    serviceAreas: [],
    availability: [],

    // Step 4: Documents
    idProof: null,
    addressProof: null,
    profilePhoto: null,
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      accountName: '',
    },

    // Step 5: Terms
    acceptTerms: false,
    acceptCodeOfConduct: false,
  });

  const expertiseOptions = [
    'Heritage Tours', 'Cultural Insights', 'Photography', 'Local History',
    'Food Tours', 'Nature Walks', 'Spiritual Guidance', 'Architecture',
    'Art & Crafts', 'Music & Dance', 'Adventure', 'Family Tours'
  ];

  const languageOptions = [
    'English', 'Assamese', 'Hindi', 'Bengali',
    'Bodo', 'Nepali', 'Other Local Dialects'
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleArrayToggle = (arrayName, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].includes(value)
        ? prev[arrayName].filter(item => item !== value)
        : [...prev[arrayName], value]
    }));
  };

  const handleFileUpload = (field, file) => {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('File size should be less than 5MB');
      return;
    }

    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                <User className="w-10 h-10 text-primary-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Business/Organization Name *
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., Heritage Walks Assam"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="you@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+91 12345 67890"
                  required
                />
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Expertise & Experience</h3>
              <p className="text-gray-600">What makes you a great host?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Areas of Expertise (Select all that apply) *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {expertiseOptions.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleArrayToggle('expertise', item)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.expertise.includes(item)
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Languages You Speak *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {languageOptions.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleArrayToggle('languages', lang)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.languages.includes(lang)
                        ? 'border-green-500 bg-green-50 text-green-700'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience *
                </label>
                <select
                  name="experienceYears"
                  value={formData.experienceYears}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                >
                  <option value="">Select</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, '10+'].map(num => (
                    <option key={num} value={num}>{num} year{num === 1 ? '' : 's'}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hourly Rate (₹) *
                </label>
                <input
                  type="number"
                  name="hourlyRate"
                  value={formData.hourlyRate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="e.g., 1500"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About You & Your Experience *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Share your story, why you love Guwahati, what makes your tours special..."
                required
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center">
                <Globe className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Service Details</h3>
              <p className="text-gray-600">Where and when can you host?</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Service Areas in Guwahati *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {['Kamakhya Temple Area', 'Umananda Island', 'Brahmaputra Riverfront',
                  'Pan Bazaar', 'Fancy Bazaar', 'Dispur', 'Zoo Road', 'Ganeshguri',
                  'Six Mile', 'Airport Area', 'All of Guwahati'].map((area) => (
                  <button
                    key={area}
                    type="button"
                    onClick={() => handleArrayToggle('serviceAreas', area)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.serviceAreas.includes(area)
                        ? 'border-purple-500 bg-purple-50 text-purple-700'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    {area}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Preferred Availability *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {['Weekdays', 'Weekends', 'Morning', 'Afternoon',
                  'Evening', 'Flexible', 'By Appointment'].map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => handleArrayToggle('availability', time)}
                    className={`px-4 py-3 rounded-lg border-2 text-sm font-medium transition-all ${formData.availability.includes(time)
                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                        : 'border-gray-200 hover:border-gray-300'
                      }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Group Size *
              </label>
              <select
                name="maxGroupSize"
                value={formData.maxGroupSize || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              >
                <option value="">Select maximum guests</option>
                {[1, 2, 4, 6, 8, 10, 12, 15, 20, 25].map(size => (
                  <option key={size} value={size}>{size} {size === 1 ? 'person' : 'people'}</option>
                ))}
              </select>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-yellow-100 flex items-center justify-center">
                <Shield className="w-10 h-10 text-yellow-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Verification & Documents</h3>
              <p className="text-gray-600">Upload required documents for verification</p>
            </div>

            <div className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Profile Photo *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-primary-400 transition-colors">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">
                    {formData.profilePhoto ? formData.profilePhoto.name : 'Upload a clear profile photo'}
                  </p>
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={(e) => handleFileUpload('profilePhoto', e.target.files[0])}
                    className="hidden"
                  />
                  <label
                    htmlFor="profilePhoto"
                    className="inline-block px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 cursor-pointer"
                  >
                    Choose Photo
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Government ID Proof *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.idProof ? formData.idProof.name : 'Aadhaar, PAN, or Passport'}
                    </p>
                    <input
                      type="file"
                      id="idProof"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('idProof', e.target.files[0])}
                      className="hidden"
                    />
                    <label
                      htmlFor="idProof"
                      className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer"
                    >
                      Upload Document
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Address Proof *
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      {formData.addressProof ? formData.addressProof.name : 'Utility bill or rental agreement'}
                    </p>
                    <input
                      type="file"
                      id="addressProof"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload('addressProof', e.target.files[0])}
                      className="hidden"
                    />
                    <label
                      htmlFor="addressProof"
                      className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer"
                    >
                      Upload Document
                    </label>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h4 className="font-medium text-gray-900 mb-4">Bank Details (For Payments)</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    name="bankDetails.accountName"
                    value={formData.bankDetails.accountName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      bankDetails: { ...prev.bankDetails, accountName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Account Holder Name"
                  />
                  <input
                    type="text"
                    name="bankDetails.accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      bankDetails: { ...prev.bankDetails, accountNumber: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="Account Number"
                  />
                  <input
                    type="text"
                    name="bankDetails.ifscCode"
                    value={formData.bankDetails.ifscCode}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      bankDetails: { ...prev.bankDetails, ifscCode: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                    placeholder="IFSC Code"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-purple-100 flex items-center justify-center">
                <Award className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Terms & Agreement</h3>
              <p className="text-gray-600">Review and accept our policies</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl max-h-60 overflow-y-auto">
                <h4 className="font-bold text-gray-900 mb-4">Code of Conduct for Hosts</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Provide accurate and honest information about your experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Respect cultural sensitivities and local traditions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Prioritize guest safety at all times</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Maintain professionalism in all interactions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Be punctual for scheduled experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Provide authentic local experiences</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Respect guest privacy and confidentiality</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to the <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and{' '}
                    <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a> of Guwahati Heritage
                  </span>
                </label>

                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    name="acceptCodeOfConduct"
                    checked={formData.acceptCodeOfConduct}
                    onChange={handleInputChange}
                    className="mt-1"
                    required
                  />
                  <span className="text-sm text-gray-700">
                    I agree to follow the Host Code of Conduct and provide authentic, safe experiences
                  </span>
                </label>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> Your application will be reviewed within 2-3 business days.
                  Once approved, you'll receive access to create and manage your experiences.
                </p>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Become a Host</h2>
          <p className="text-gray-600">Step {step} of 5</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {[1, 2, 3, 4, 5].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= num ? 'bg-primary-500 text-white' : 'bg-gray-200'}`}>
                {num}
              </div>
              <span className="text-xs mt-1 text-gray-600">
                {['Info', 'Expertise', 'Service', 'Documents', 'Terms'][num - 1]}
              </span>
            </div>
          ))}
        </div>
        <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary-500 transition-all duration-300"
            style={{ width: `${(step - 1) * 25}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {renderStep()}

        <div className="flex justify-between mt-12">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="px-8 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
          >
            {step === 5 ? 'Submit Application' : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default OnboardingForm;