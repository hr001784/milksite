import { useState } from 'react'
import { X, Plus, Minus, Trash2, CreditCard, CheckCircle } from 'lucide-react'
import { useCart } from '../contexts/CartContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    clearCart,
    createOrder
  } = useCart()
  
  const navigate = useNavigate()
  
  // Payment states
  const [showPaymentOptions, setShowPaymentOptions] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  
  // Get cart totals with discount
  const cartTotals = getCartTotal()
  
  const handleProceedToPayment = () => {
    setShowPaymentOptions(true)
  }
  
  const handlePaymentSelect = (method) => {
    setSelectedPayment(method)
  }
  
  const handlePaymentProcess = () => {
    if (!selectedPayment) {
      alert('Please select a payment method')
      return
    }
    
    setIsProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setPaymentComplete(true)
      
      // Create order from cart items
      const newOrder = createOrder()
      console.log('New order created:', newOrder)
      
      // Simulate redirect to orders page
      setTimeout(() => {
        clearCart()
        setIsCartOpen(false)
        navigate('/profile?newOrder=true')
      }, 2000)
    }, 2000)
  }

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => setIsCartOpen(false)}
      />
      
      {/* Cart Drawer */}
      <div className="absolute right-0 top-0 h-full w-full sm:w-4/5 md:w-3/5 lg:max-w-md bg-white shadow-xl">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Shopping Cart</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-4">🛒</div>
                <p className="text-gray-500">Your cart is empty</p>
                <p className="text-sm text-gray-400">Add some products to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4 mb-3 sm:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.unit}</p>
                        <p className="text-dairy-brown font-semibold">₹{item.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end space-x-2 mt-2 sm:mt-0">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-500 hover:text-dairy-brown"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-500 hover:text-dairy-brown"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-red-500 hover:text-red-700 ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t p-6">
              {!showPaymentOptions ? (
                // Cart Summary
                <div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">₹{cartTotals.subtotal.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Discount ({cartTotals.discountPercentage}%):</span>
                      <span className="font-medium text-green-600">-₹{cartTotals.discountAmount.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-xl font-bold text-dairy-brown">₹{cartTotals.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full py-3 bg-dairy-brown text-white rounded-lg hover:bg-opacity-90 transition-colors"
                  >
                    Proceed to Payment
                  </button>
                  
                  <button
                    onClick={clearCart}
                    className="w-full mt-2 text-sm text-gray-500 hover:text-red-500"
                  >
                    Clear Cart
                  </button>
                </div>
              ) : isProcessing ? (
                // Payment Processing
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-dairy-brown mx-auto mb-4"></div>
                  <p className="text-gray-700 font-medium">Processing your payment...</p>
                  <p className="text-gray-500 text-sm mt-2">Please do not close this window</p>
                </div>
              ) : paymentComplete ? (
                // Payment Complete
                <div className="text-center py-8">
                  <div className="mx-auto mb-4 text-green-500">
                    <CheckCircle size={48} className="mx-auto" />
                  </div>
                  <p className="text-gray-700 font-medium text-lg">Payment Successful!</p>
                  <p className="text-gray-500 text-sm mt-2">Redirecting to your orders...</p>
                </div>
              ) : (
                // Payment Options
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">Select Payment Method</h3>
                  
                  <div className="space-y-3 mb-6">
                    {['PayTM', 'PhonePe', 'GPay', 'Credit/Debit Card'].map(method => (
                      <div 
                        key={method}
                        onClick={() => handlePaymentSelect(method)}
                        className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${selectedPayment === method ? 'border-dairy-brown bg-dairy-cream bg-opacity-20' : 'border-gray-200 hover:bg-gray-50'}`}
                      >
                        <div className="h-6 w-6 mr-3 flex items-center justify-center">
                          <CreditCard size={20} className={selectedPayment === method ? 'text-dairy-brown' : 'text-gray-400'} />
                        </div>
                        <span className={selectedPayment === method ? 'font-medium text-dairy-brown' : 'text-gray-700'}>{method}</span>
                        {selectedPayment === method && (
                          <div className="ml-auto h-5 w-5 bg-dairy-brown rounded-full flex items-center justify-center">
                            <CheckCircle size={14} className="text-white" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-gray-600">Total Amount:</span>
                      <span className="text-xl font-bold text-dairy-brown">₹{cartTotals.total.toFixed(2)}</span>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowPaymentOptions(false)}
                        className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={handlePaymentProcess}
                        className="flex-1 py-2 bg-dairy-brown text-white rounded-lg hover:bg-opacity-90 transition-colors"
                      >
                        Pay Now
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart