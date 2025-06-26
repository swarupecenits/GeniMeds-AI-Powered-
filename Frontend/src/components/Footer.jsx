import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-teal-600 to-blue-600 text-white py-12">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Branding & Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              <span className="text-2xl font-bold tracking-tight">Genimeds</span>
            </Link>
            <p className="text-sm text-teal-100">
              Genimeds is your AI-powered health companion, simplifying healthcare with prescription analysis, generic alternatives, and personalized insights.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-teal-100 hover:text-white transition-colors duration-200"
                  aria-label="Home page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-teal-100 hover:text-white transition-colors duration-200"
                  aria-label="About page"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/medicine"
                  className="text-teal-100 hover:text-white transition-colors duration-200"
                  aria-label="Medicine page"
                >
                  Medicine
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-teal-100 hover:text-white transition-colors duration-200"
                  aria-label="Contact page"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/login"
                  className="text-teal-100 hover:text-white transition-colors duration-200"
                  aria-label="Login page"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-teal-100 hover:text-white transition-colors duration-200"
                  aria-label="Register page"
                >
                  Register
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Social Media */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
            <ul className="space-y-2 mb-4">
              <li>
                <a
                  href="mailto:support@genimeds.com"
                  className="text-teal-100 hover:text-white transition-colors duration-200"
                  aria-label="Email support"
                >
                  support@genimeds.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+1234567890"
                  className="text-teal-100 hover:text-white transition-colors duration-200"
                  aria-label="Phone support"
                >
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-100 hover:text-white transition-colors duration-200"
                aria-label="Follow us on X"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-100 hover:text-white transition-colors duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-100 hover:text-white transition-colors duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072c-4.95.089-6.563 2.209-6.652 6.663C.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.089 4.953 2.209 6.564 6.663 6.652C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.954-.089 6.564-2.209 6.652-6.663C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.668-.072-4.948-.089-4.953-2.209-6.563-6.663-6.652C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Notice */}
        <div className="mt-8 pt-8 border-t border-teal-500 text-center">
          <p className="text-sm text-teal-100">
            &copy; {currentYear} Genimeds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;