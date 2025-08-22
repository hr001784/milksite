import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [lastOrder, setLastOrder] = useState(null)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('milkbook-cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('milkbook-cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prevCart, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
    
    // Apply 5% discount if order count is more than 10
    const orderCount = cart.reduce((count, item) => count + item.quantity, 0)
    const discountPercentage = orderCount > 10 ? 5 : 0
    const discountAmount = (subtotal * discountPercentage) / 100
    
    return {
      subtotal,
      discountPercentage,
      discountAmount,
      total: subtotal - discountAmount
    }
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

// Create a new order from the cart items
  const createOrder = () => {
    if (cart.length === 0) return null
    
    const { subtotal, discount, total } = getCartTotal()
    
    const newOrder = {
      id: 'ORD-' + Math.floor(Math.random() * 100000),
      date: new Date().toLocaleDateString(),
      status: 'Processing',
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      subtotal,
      discount,
      total
    }
    
    // Save to localStorage
    const savedOrders = localStorage.getItem('milkbook-orders')
    let orders = savedOrders ? JSON.parse(savedOrders) : { pending: [], completed: [] }
    
    // Add to pending orders
    orders.pending.push(newOrder)
    localStorage.setItem('milkbook-orders', JSON.stringify(orders))
    
    // Save as last order
    setLastOrder(newOrder)
    
    return newOrder
  }

  // Context value
  const value = {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
    createOrder,
    lastOrder
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}