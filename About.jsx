import { Users, Heart, Award, Target } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-milk-cream">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">About MilkBook</h1>
              <p className="text-lg text-gray-600 mb-6">
                We are passionate about bringing the purest, freshest dairy products directly from our farms to your doorstep. 
                Our journey began with a simple mission: to make quality dairy products accessible to every household.
              </p>
              <p className="text-lg text-gray-600">
                With decades of experience in dairy farming and a commitment to quality, we ensure that every product 
                that reaches your table meets the highest standards of purity and freshness.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=400&fit=crop"
                alt="Dairy farm"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to becoming a trusted name in dairy products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-milk-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Origins</h3>
              <p className="text-gray-600">
                Started as a small family dairy farm in 1995, we've grown to serve thousands of families 
                while maintaining the same commitment to quality and freshness.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-milk-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Growth</h3>
              <p className="text-gray-600">
                From a single farm to a network of certified dairy farms, we've expanded our reach 
                while keeping our core values intact.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-milk-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Our Future</h3>
              <p className="text-gray-600">
                Committed to innovation and sustainability, we're building a future where quality dairy 
                products are accessible to everyone.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-dairy-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Quality First</h3>
              <p className="text-gray-600 text-sm">
                We never compromise on the quality of our products, ensuring the best for our customers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dairy-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Customer Focus</h3>
              <p className="text-gray-600 text-sm">
                Our customers are at the heart of everything we do, and their satisfaction is our priority.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dairy-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600 text-sm">
                We strive for excellence in every aspect of our business, from farm to delivery.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-dairy-brown rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-white" size={24} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                We embrace new technologies and methods to improve our products and services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-4">
                To provide the highest quality dairy products while ensuring accessibility, 
                convenience, and affordability for every family.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Deliver fresh, pure dairy products</li>
                <li>• Maintain the highest quality standards</li>
                <li>• Provide exceptional customer service</li>
                <li>• Support sustainable farming practices</li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
              <p className="text-gray-600 mb-4">
                To become the most trusted and preferred dairy brand, known for quality, 
                innovation, and customer satisfaction across the region.
              </p>
              <ul className="space-y-2 text-gray-600">
                <li>• Expand our reach to serve more families</li>
                <li>• Lead innovation in dairy technology</li>
                <li>• Build lasting relationships with customers</li>
                <li>• Contribute to community development</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About 