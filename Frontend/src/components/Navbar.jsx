import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-teal-500 to-blue-600 shadow-lg p-4 sticky top-0 z-50">
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

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <Link
              to="/"
              className="text-white font-medium text-lg hover:text-teal-200 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-white font-medium text-lg hover:text-teal-200 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="text-white font-medium text-lg hover:text-teal-200 transition-colors duration-300"
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;