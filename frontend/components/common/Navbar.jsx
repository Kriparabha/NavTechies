import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  MapPin,
  User,
  Menu,
  X,
  Compass,
  BookOpen,
  Shield,
  LogOut,
  Calendar,
  Users // Add this import
} from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated, isVendor } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Discover', path: '/', icon: <Compass size={20} /> },
    { name: 'Itineraries', path: '/itineraries', icon: <MapPin size={20} /> },
    { name: 'Local Hosts', path: '/vendors', icon: <Users size={20} /> }, // Changed from "Support"
    { name: 'Support', path: '/support', icon: <Shield size={20} /> },
  ];

  // Add vendor dashboard link for vendor users
  const userNavItems = isAuthenticated ? [
    ...navItems,
    ...(isVendor ? [{ name: 'My Dashboard', path: '/vendor-dashboard', icon: <BookOpen size={20} /> }] : [])
  ] : navItems;

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
              <Compass className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">Guwahati Heritage</h1>
              <p className="text-xs text-gray-500">Experience the soul of Assam</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {userNavItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-primary-600 hover:bg-primary-50 transition-colors"
              >
                {item.icon}
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative group ml-4">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gradient-to-r from-primary-50 to-secondary-50 hover:from-primary-100 hover:to-secondary-100 transition-all">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <span className="font-medium">{user?.full_name?.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-4 border-b border-gray-100">
                    <p className="font-medium text-gray-900">{user?.full_name}</p>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>

                  {/* Become a Vendor option for non-vendors */}
                  {!isVendor && (
                    <Link
                      to="/vendor-dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-left text-primary-600 hover:bg-primary-50"
                    >
                      <BookOpen size={16} />
                      <span>Become a Host</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-3 text-left text-gray-700 hover:bg-gray-50 rounded-b-lg"
                  >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/vendor-dashboard"
                  className="ml-4 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Become a Host
                </Link>
                {/* CHANGED: /login to /signin */}
                <Link
                  to="/signin"
                  className="ml-4 px-6 py-2 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-3 space-y-1">
              {userNavItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}

              {isAuthenticated ? (
                <>
                  <div className="px-4 py-3 border-t border-gray-100">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 flex items-center justify-center">
                        <User size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user?.full_name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                    </div>
                  </div>

                  {/* Become a Vendor option for non-vendors */}
                  {!isVendor && (
                    <Link
                      to="/vendor-dashboard"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-primary-600 hover:bg-primary-50 transition-colors"
                    >
                      <BookOpen size={20} />
                      <span className="font-medium">Become a Host</span>
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/vendor-dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                  >
                    <BookOpen size={20} />
                    <span className="font-medium">Become a Host</span>
                  </Link>
                  {/* CHANGED: /login to /signin */}
                  <Link
                    to="/signin"
                    onClick={() => setIsOpen(false)}
                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white font-semibold rounded-lg shadow-lg"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;