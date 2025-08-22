import { useState } from 'react'
import { ShoppingCart, Star } from 'lucide-react'
import { products } from '../data/products'
import { useCart } from '../contexts/CartContext'

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const { addToCart } = useCart()

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'milk', name: 'Milk' },
    { id: 'ghee', name: 'Ghee' },
    { id: 'curd', name: 'Curd' },
    { id: 'paneer', name: 'Paneer' },
    { id: 'butter', name: 'Butter' }
  ]

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  const handleAddToCart = (product) => {
    addToCart(product)
    // Show a brief success message (you could add a toast notification here)
  }

  return (
    <div className="min-h-screen bg-milk-cream">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Fresh dairy products delivered to your doorstep</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex flex-nowrap md:flex-wrap gap-2 min-w-max md:min-w-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-dairy-brown text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card group">
              {/* Product Image */}
              <div className="relative overflow-hidden rounded-t-xl">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {product.inStock && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    In Stock
                  </div>
                )}
                <div className="absolute top-2 right-2 flex items-center space-x-1 bg-white bg-opacity-90 rounded-full px-2 py-1">
                  <Star size={12} className="text-yellow-400 fill-current" />
                  <span className="text-xs font-medium">4.8</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{product.name}</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-lg font-bold text-dairy-brown">₹{product.price}</span>
                    <span className="text-sm text-gray-500 ml-1">/{product.unit}</span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">🥛</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Products