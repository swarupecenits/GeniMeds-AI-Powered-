import { Link } from 'react-router-dom';
import { useState } from 'react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg p-5 lg:pl-36 lg:pr-36 sticky top-0 z-50">
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
          className={`md:flex md:space-x-20 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 w-full md:w-auto transition-all duration-300 ease-in-out
            ${isOpen ? 'bg-gradient-to-r from-teal-600 to-blue-700 animate-slideDown' : 'bg-transparent'}`}
        >
          <li className="md:inline-block">
            <Link
              to="/"
              className="block text-white font-medium text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="md:inline-block">
            <Link
              to="/about"
              className="block text-white font-medium text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
          </li>
          <li className="md:inline-block">
            <Link
              to="/contact"
              className="block text-white font-medium text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li className="md:inline-block">
            <Link
              to="/profile"
              className="block text-white font-medium text-center text-lg hover:text-teal-200 transition-colors duration-300 px-4 py-6 md:px-0 md:py-0"
              onClick={() => setIsOpen(false)}
            >
              Profile
            </Link>
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
  );
}

export default Navbar;