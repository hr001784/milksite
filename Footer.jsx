import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Fresh Milk Delivery</h3>
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">Providing fresh, high-quality milk directly to your doorstep.</p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1 sm:space-y-2 text-sm sm:text-base">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/products" className="hover:text-gray-300">Products</Link></li>
              <li><Link to="/about" className="hover:text-gray-300">About Us</Link></li>
              <li><Link to="/why-choose-us" className="hover:text-gray-300">Why Choose Us</Link></li>
              <li><Link to="/contact" className="hover:text-gray-300">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Contact Us</h3>
            <p className="mb-1 sm:mb-2 text-sm sm:text-base">123 Dairy Lane</p>
            <p className="mb-1 sm:mb-2 text-sm sm:text-base">Milk City, MC 12345</p>
            <p className="mb-1 sm:mb-2 text-sm sm:text-base">Phone: (123) 456-7890</p>
            <p className="mb-1 sm:mb-2 text-sm sm:text-base">Email: info@freshmilk.com</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-4 sm:pt-6 text-center">
          <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} Fresh Milk Delivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}