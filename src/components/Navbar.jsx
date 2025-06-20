import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav className="p-4 bg-gray-100 shadow-md mb-6">
      <ul className="flex space-x-6">
        <li><Link to="/" className="text-blue-600 font-medium">Home</Link></li>
        <li><Link to="/profile" className="text-blue-600 font-medium">Profile</Link></li>
        <li><Link to="/about" className="text-blue-600 font-medium">About</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar
