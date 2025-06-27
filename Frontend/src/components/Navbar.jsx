import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import defaultUserImg from '../assets/img11.png';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [healthDropdownOpen, setHealthDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();
  const healthDropdownRef = useRef();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));

    // Listen for user updates
    const handleUserUpdate = () => {
      const updatedUser = localStorage.getItem('user');
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener('user-updated', handleUserUpdate);
    return () => window.removeEventListener('user-updated', handleUserUpdate);
  }, []);

  useEffect(() => {
    // Also listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (healthDropdownRef.current && !healthDropdownRef.current.contains(event.target)) {
        setHealthDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setDropdownOpen(false);
      window.dispatchEvent(new Event('user-updated'));
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  return (
    <>
      {/* Overlay for closing navbar on outside click (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-tra md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
      <nav className="bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg p-5 lg:pl-36 lg:pr-36 sticky top-0 z-[999]">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
            <Link to="/" className="text-2xl font-bold text-white tracking-tight">
              Genimeds
            </Link>
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
            </svg>
          </button>

          {/* Navigation Links */}
          <ul
            className={`md:flex md:space-x-20 ${isOpen ? 'block' : 'hidden'} md:block absolute  md:static top-16 left-0 w-full md:w-auto transition-all duration-300 ease-in-out
              ${isOpen ? 'bg-gray-400 animate-slideDown' : 'bg-transparent'}`}
            style={{ zIndex: 50 }}
          >
            <li className="md:inline-block">
              <Link
                to="/"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </li>

            <li className="md:inline-block">
              <Link
                to="/about"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
            </li>
                        <li className="md:inline-block">
              <Link
                to="/medicine"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                Generic Med
              </Link>
            </li>
            
            {/* Health Features Dropdown */}
            <li className="relative md:inline-block" ref={healthDropdownRef}>
              <button
                onClick={() => setHealthDropdownOpen(!healthDropdownOpen)}
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0 flex items-center"
              >
                Health Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {healthDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-md shadow-lg z-50 py-2 border">
                  <Link
                    to="/chat"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    AI Health Chat
                  </Link>
                  <Link
                    to="/symptom-checker"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    Symptom Checker
                  </Link>
                  <Link
                    to="/find-doctors"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    Find Doctors
                  </Link>
                  <Link
                    to="/health-tracker"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    Health Tracker
                  </Link>
                  <Link
                    to="/mental-health"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    Mental Health
                  </Link>
                  <Link
                    to="/meditation"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    Meditation Zone
                  </Link>
                  <Link
                    to="/emergency-contacts"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    Emergency Contacts
                  </Link>
                </div>
              )}
            </li>
            
            <li className="md:inline-block">
              <Link
                to="/contact"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="md:inline-block">
              <Link
                to="/profile"
                className="block text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
            </li>
    <li className="relative md:inline-block" ref={dropdownRef}>
      {user ? (
        <div className="group relative inline-block">
          <button className="focus:outline-none" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <div className="relative w-8 h-8">
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-white"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white ${user.photoURL ? 'hidden' : 'flex'}`}
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  display: user.photoURL ? 'none' : 'flex'
                }}
              >
                {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-2 border">
              <div className="px-4 py-2 text-sm text-gray-800 font-semibold">{user.displayName}</div>
              <div className="px-4 text-sm text-gray-500">{user.email}</div>
              <hr className="my-2" />
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link to="/login" className="block px-4 py-6 md:px-0 md:py-0">
          <img
            src={defaultUserImg}
            alt="Login"
            className="w-8 h-8 rounded-full object-cover border-2 border-white"
          />
        </Link>
      )}
    </li>


          </ul>
        </div>

        {/* Inline CSS for animation */}
        <style>
          {`
            @keyframes slideDown {
              0% {
                opacity: 0;
                transform: translateY(-20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-slideDown {
              animation: slideDown 0.4s ease-in-out forwards;
            }
          `}
        </style>
      </nav>
    </>
  );
}

export default Navbar;