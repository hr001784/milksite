import { CheckCircle, Truck, Shield, Clock, Star, Heart } from 'lucide-react'

const WhyChooseUs = () => {
  const reasons = [
    {
      icon: "✅",
      title: "Reasonable Price",
      description: "We offer competitive prices without compromising on quality. Our direct farm-to-consumer model eliminates middlemen, ensuring you get the best value for your money.",
      features: [
        "No middleman markup",
        "Bulk purchase discounts",
        "Subscription savings",
        "Transparent pricing"
      ]
    },
    {
      icon: "🥛",
      title: "Fresh and Natural Milk",
      description: "Our milk comes directly from our own farms, ensuring maximum freshness and purity. No artificial preservatives, just pure natural goodness.",
      features: [
        "Farm-fresh quality",
        "No artificial preservatives",
        "Natural processing",
        "Daily collection"
      ]
    },
    {
      icon: "🏡",
      title: "Home Delivery from Dairy Farms",
      description: "Convenient doorstep delivery from our certified dairy farms. Save time and effort while enjoying fresh dairy products at your convenience.",
      features: [
        "Doorstep delivery",
        "Flexible timing",
        "Real-time tracking",
        "Contactless delivery"
      ]
    }
  ]

  const additionalBenefits = [
    {
      icon: <Shield size={24} />,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality checks to ensure it meets our high standards."
    },
    {
      icon: <Clock size={24} />,
      title: "Timely Delivery",
      description: "We understand the importance of time. Our delivery team ensures your orders reach you on schedule."
    },
    {
      icon: <Star size={24} />,
      title: "Customer Satisfaction",
      description: "Your satisfaction is our priority. We go the extra mile to ensure you're happy with our service."
    },
    {
      icon: <Heart size={24} />,
      title: "Health Focus",
      description: "We prioritize your health by providing pure, unadulterated dairy products."
    }
  ]

  return (
    <div className="min-h-screen bg-milk-cream">
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Us?</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what makes MilkBook the preferred choice for thousands of families 
              seeking quality dairy products delivered to their doorstep.
            </p>
          </div>
        </div>
      </section>

      {/* Main Reasons */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {reasons.map((reason, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
              }`}>
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-milk-blue rounded-full flex items-center justify-center mr-4">
                      <span className="text-2xl">{reason.icon}</span>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">{reason.title}</h2>
                  </div>
                  <p className="text-lg text-gray-600 mb-6">{reason.description}</p>
                  <ul className="space-y-3">
                    {reason.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <CheckCircle className="text-green-500 mr-3" size={20} />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                  <div className="bg-white p-8 rounded-lg shadow-lg">
                    <div className="w-full h-64 bg-milk-blue rounded-lg flex items-center justify-center">
                      <span className="text-6xl">{reason.icon}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Additional Benefits</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Beyond our core offerings, we provide additional value to enhance your experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalBenefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-dairy-brown rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {benefit.icon}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-dairy-brown mb-2">10,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-dairy-brown mb-2">5+</div>
              <div className="text-gray-600">Years of Service</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-dairy-brown mb-2">50+</div>
              <div className="text-gray-600">Dairy Farms</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-dairy-brown mb-2">4.8★</div>
              <div className="text-gray-600">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-dairy-brown">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Join thousands of satisfied customers who have made MilkBook their trusted dairy partner
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-dairy-brown px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-dairy-brown transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default WhyChooseUs 