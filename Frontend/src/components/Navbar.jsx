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
            <li className="relative md:inline-block w-full md:w-auto text-center" ref={healthDropdownRef}>
              <button
                onClick={() => setHealthDropdownOpen(!healthDropdownOpen)}
                className="w-full md:w-auto flex justify-center items-center text-white font-semibold text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
              >
                Health Tools
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {healthDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 mt-1 w-64 bg-white rounded-xl shadow-2xl z-50 py-2 border border-blue-200 animate-dropdown">
                  <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-t-xl mb-2"></div>
                  <Link
                    to="/chat"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200 group"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    <svg className="w-5 h-5 text-cyan-400 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    AI Health Chat
                  </Link>
                  <Link
                    to="/symptom-checker"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 group"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    <svg className="w-5 h-5 text-red-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Symptom Checker
                  </Link>
                  <Link
                    to="/find-doctors"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors duration-200 group"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    <svg className="w-5 h-5 text-green-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Find Doctors
                  </Link>
                  <Link
                    to="/health-tracker"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors duration-200 group"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    <svg className="w-5 h-5 text-purple-400 group-hover:text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    Health Tracker
                  </Link>
                  <Link
                    to="/mental-health"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200 group"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    <svg className="w-5 h-5 text-indigo-400 group-hover:text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                    Mental Health
                  </Link>
                  <Link
                    to="/meditation"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-teal-50 hover:text-teal-700 transition-colors duration-200 group"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    <svg className="w-5 h-5 text-teal-400 group-hover:text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    Meditation Zone
                  </Link>
                  <Link
                    to="/emergency-contacts"
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-pink-50 hover:text-pink-700 transition-colors duration-200 group"
                    onClick={() => {setHealthDropdownOpen(false); setIsOpen(false);}}
                  >
                    <svg className="w-5 h-5 text-pink-400 group-hover:text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
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
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl z-50 py-2 border border-blue-200 animate-dropdown">
              <div className="h-1 w-full bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded-t-xl mb-2"></div>
              <div className="flex items-center gap-3 px-4 py-2 min-w-0">
                {user.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-11 h-11 rounded-full object-cover border-2 border-cyan-400 flex-shrink-0" />
                ) : (
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg font-bold text-black bg-yellow-300 border-2 border-cyan-400 flex-shrink-0">
                    {user.displayName ? user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0,2) : user.email ? user.email.charAt(0).toUpperCase() : 'U'}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <div className="text-base font-semibold text-gray-800 truncate max-w-[160px]">{user.displayName}</div>
                  <div className="text-xs text-gray-500 break-all max-w-[160px]">{user.email}</div>
                </div>
              </div>
              <hr className="my-2 border-blue-100" />
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-cyan-50 hover:text-cyan-700 transition-colors duration-200 group"
                onClick={() => setDropdownOpen(false)}
              >
                <svg className="w-5 h-5 text-cyan-400 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Profile
              </Link>
              <button
                className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 group"
                onClick={handleLogout}
              >
                <svg className="w-5 h-5 text-red-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7" /></svg>
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

            @keyframes dropdown {
              0% { opacity: 0; transform: translateY(-10px) scale(0.98); }
              100% { opacity: 1; transform: translateY(0) scale(1); }
            }
            .animate-dropdown {
              animation: dropdown 0.25s cubic-bezier(0.4,0,0.2,1) forwards;
            }
          `}
        </style>
      </nav>
    </>
  );
}

export default Navbar;