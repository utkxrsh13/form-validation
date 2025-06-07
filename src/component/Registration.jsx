import React, { useState } from 'react';
import { Eye, EyeOff, User, Mail, Phone, MapPin, CreditCard, FileText } from 'lucide-react';

const Registration = () => {
const [currentPage, setCurrentPage] = useState('form');
  const [submittedData, setSubmittedData] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    countryCode: '+91',
    phoneNumber: '',
    country: '',
    city: '',
    panNumber: '',
    aadharNumber: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const countries = {
    'India': ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'],
    'USA': ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio'],
    'UK': ['London', 'Birmingham', 'Manchester', 'Glasgow', 'Liverpool', 'Leeds', 'Sheffield'],
    'Canada': ['Toronto', 'Montreal', 'Vancouver', 'Calgary', 'Edmonton', 'Ottawa', 'Winnipeg'],
    'Australia': ['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra']
  };

  const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+81', country: 'Japan' }
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
      case 'lastName':
        return value.trim().length < 2 ? 'Must be at least 2 characters' : '';
      
      case 'username':
        return !/^[a-zA-Z0-9_]{3,20}$/.test(value) ? 'Username must be 3-20 characters, letters, numbers, underscore only' : '';
      
      case 'email':
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? 'Enter a valid email address' : '';
      
      case 'password':
        return value.length < 8 ? 'Password must be at least 8 characters' : '';
      
      case 'phoneNumber':
        return !/^\d{10}$/.test(value) ? 'Phone number must be exactly 10 digits' : '';
      
      case 'country':
        return !value ? 'Please select a country' : '';
      
      case 'city':
        return !value ? 'Please select a city' : '';
      
      case 'panNumber':
        return !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value) ? 'PAN format: ABCDE1234F' : '';
      
      case 'aadharNumber':
        return !/^\d{12}$/.test(value) ? 'Aadhar number must be exactly 12 digits' : '';
      
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let processedValue = value;
    
    // Special processing for specific fields
    if (name === 'panNumber') {
      processedValue = value.toUpperCase();
    } else if (name === 'phoneNumber' || name === 'aadharNumber') {
      processedValue = value.replace(/\D/g, '');
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));

    // Clear city when country changes
    if (name === 'country') {
      setFormData(prev => ({
        ...prev,
        country: processedValue,
        city: ''
      }));
    }

    // Validate field and update errors
    const error = validateField(name, processedValue);
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '') && 
           Object.values(errors).every(error => error === '');
  };

  const handleSubmit = () => {
    if (validateAllFields() && isFormValid()) {
      setSubmittedData(formData);
      setCurrentPage('success');
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
      countryCode: '+91',
      phoneNumber: '',
      country: '',
      city: '',
      panNumber: '',
      aadharNumber: ''
    });
    setErrors({});
    setCurrentPage('form');
    setSubmittedData(null);
  };

  if (currentPage === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Registration Successful!</h1>
              <p className="text-gray-600">Your details have been submitted successfully.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </h2>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600">First Name</label>
                  <p className="text-gray-800 font-medium">{submittedData.firstName}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600">Last Name</label>
                  <p className="text-gray-800 font-medium">{submittedData.lastName}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600">Username</label>
                  <p className="text-gray-800 font-medium">{submittedData.username}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 flex items-center">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </label>
                  <p className="text-gray-800 font-medium">{submittedData.email}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 flex items-center">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  <p className="text-gray-800 font-medium">{submittedData.countryCode} {submittedData.phoneNumber}</p>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Location & Documents
                </h2>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600">Country</label>
                  <p className="text-gray-800 font-medium">{submittedData.country}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600">City</label>
                  <p className="text-gray-800 font-medium">{submittedData.city}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 flex items-center">
                    <CreditCard className="w-4 h-4 mr-2" />
                    PAN Number
                  </label>
                  <p className="text-gray-800 font-medium">{submittedData.panNumber}</p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <label className="block text-sm font-medium text-gray-600 flex items-center">
                    <FileText className="w-4 h-4 mr-2" />
                    Aadhar Number
                  </label>
                  <p className="text-gray-800 font-medium">{submittedData.aadharNumber}</p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={resetForm}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Register Another User
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-2 sm:p-4">
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
          <p className="text-gray-600 text-sm sm:text-base">Fill in your details to register</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Personal Information Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Personal Information
              </h2>
              
              {/* First Name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>

              {/* Username */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Username *
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.username ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12 ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>
                )}
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                Contact & Location
              </h2>

              {/* Phone Number */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone Number *
                </label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleInputChange}
                    className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {countryCodes.map(item => (
                      <option key={item.code} value={item.code}>
                        {item.code} ({item.country})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    maxLength="10"
                    className={`flex-1 px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="1234567890"
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  Country *
                </label>
                <select
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.country ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Country</option>
                  {Object.keys(countries).map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
                {errors.country && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.country}</p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                  City *
                </label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!formData.country}
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  } ${!formData.country ? 'bg-gray-100 cursor-not-allowed' : ''}`}
                >
                  <option value="">Select City</option>
                  {formData.country && countries[formData.country]?.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.city && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              {/* PAN Number */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                  <CreditCard className="w-4 h-4 mr-2" />
                  PAN Number *
                </label>
                <input
                  type="text"
                  name="panNumber"
                  value={formData.panNumber}
                  onChange={handleInputChange}
                  maxLength="10"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.panNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="ABCDE1234F"
                />
                {errors.panNumber && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.panNumber}</p>
                )}
              </div>

              {/* Aadhar Number */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Aadhar Number *
                </label>
                <input
                  type="text"
                  name="aadharNumber"
                  value={formData.aadharNumber}
                  onChange={handleInputChange}
                  maxLength="12"
                  className={`w-full px-3 sm:px-4 py-2 sm:py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    errors.aadharNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="123456789012"
                />
                {errors.aadharNumber && (
                  <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.aadharNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid()}
              className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-200 ${
                isFormValid()
                  ? 'bg-blue-500 hover:bg-blue-600 transform hover:scale-[1.02] shadow-lg'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              {isFormValid() ? 'Create Account' : 'Please fill all required fields'}
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Registration;