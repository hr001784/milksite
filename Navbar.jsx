import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart, User, LogOut, Menu, X } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const { getCartCount, setIsCartOpen } = useCart()
  const { isAuthenticated, user, signOut } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-dairy-brown rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🐃</span>
            </div>
            <span className="text-xl font-bold text-dairy-brown">MilkBook</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-dairy-brown transition-colors">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-dairy-brown transition-colors">
              About
            </Link>
            <Link to="/why-choose-us" className="text-gray-700 hover:text-dairy-brown transition-colors">
              Why Choose Us
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-dairy-brown transition-colors">
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-dairy-brown hover:bg-gray-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Right side - Auth & Cart */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-gray-700 hover:text-dairy-brown transition-colors"
            >
              <ShoppingCart size={24} />
              {getCartCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              )}
            </button>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <Link to="/profile" className="flex items-center space-x-2">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-sm text-gray-700 hidden sm:block">
                    {user?.name}
                  </span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/signin"
                  className="flex items-center space-x-1 text-gray-700 hover:text-dairy-brown transition-colors"
                >
                  <User size={16} />
                  <span className="hidden sm:block">Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 py-2">
            <div className="flex flex-col space-y-2 px-4 py-2">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-dairy-brown transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-dairy-brown transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                to="/why-choose-us" 
                className="text-gray-700 hover:text-dairy-brown transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Why Choose Us
              </Link>
              <Link 
                to="/contact" 
                className="text-gray-700 hover:text-dairy-brown transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/products" 
                className="text-gray-700 hover:text-dairy-brown transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              {isAuthenticated && (
                <Link 
                  to="/profile" 
                  className="text-gray-700 hover:text-dairy-brown transition-colors py-2 px-3 rounded-md hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  My Profile
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar