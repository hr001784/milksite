import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle } from 'lucide-react'

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1920&h=1080&fit=crop"
            alt="Buffalo in dairy farm"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Fresh Milk at Your Doorstep
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Experience the pure taste of fresh buffalo milk delivered directly from our farms to your home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
              >
                <span>View Products</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/about"
                className="btn-secondary text-lg px-8 py-4"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose MilkBook?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We bring you the finest quality dairy products with unmatched convenience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-milk-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reasonable Price</h3>
              <p className="text-gray-600">
                Get premium quality dairy products at competitive prices, ensuring value for your money
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-milk-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🥛</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fresh and Natural</h3>
              <p className="text-gray-600">
                Pure, unadulterated milk and dairy products straight from our farms to your table
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-milk-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🏡</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Home Delivery</h3>
              <p className="text-gray-600">
                Convenient doorstep delivery from dairy farms, saving you time and effort
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-milk-cream">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Experience Fresh Milk?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of satisfied customers who trust MilkBook for their daily dairy needs
          </p>
          <Link
            to="/products"
            className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2"
          >
            <span>Start Shopping</span>
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home 