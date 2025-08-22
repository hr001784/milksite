import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { LogOut, Package, CheckCircle, User, Mail, Home, Phone, MapPin, Edit, Plus, Trash2, Camera } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useCart } from '../contexts/CartContext'

const Profile = () => {
  const { user, signOut, updateUserProfile } = useAuth()
  const { cart } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  
  // State for active section and tabs
  const [activeSection, setActiveSection] = useState('account')
  const [activeTab, setActiveTab] = useState('pending')
  const [highlightNewOrder, setHighlightNewOrder] = useState(false)
  
  // Check for new order parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (searchParams.get('newOrder') === 'true') {
      setActiveSection('orders')
      setActiveTab('pending')
      setHighlightNewOrder(true)
      
      // Remove the query parameter
      navigate('/profile', { replace: true })
      
      // Reset highlight after 5 seconds
      setTimeout(() => {
        setHighlightNewOrder(false)
      }, 5000)
    }
  }, [location, navigate])
  
  // State for editing mode
  const [isEditing, setIsEditing] = useState(false)
  const [editingAddressId, setEditingAddressId] = useState(null)
  const [showAddAddressForm, setShowAddAddressForm] = useState(false)
  
  // Mock orders data - in a real app, this would come from an API
  const [orders, setOrders] = useState({
    pending: [],
    completed: []
  })
  
  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('milkbook-orders')
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    } else {
      // Initialize with empty orders
      const emptyOrders = {
        pending: [],
        completed: []
      }
      setOrders(emptyOrders)
      localStorage.setItem('milkbook-orders', JSON.stringify(emptyOrders))
    }
  }, [])
  
  // Account details
  const [accountDetails, setAccountDetails] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    dateJoined: 'January 15, 2023',
    avatar: user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'
  })
  
  // Update account details when user data changes
  useEffect(() => {
    if (user) {
      setAccountDetails(prevDetails => ({
        ...prevDetails,
        name: user.name || prevDetails.name,
        email: user.email || prevDetails.email,
        avatar: user.avatar || prevDetails.avatar
      }))
    }
  }, [user])
  
  // Temporary state for editing account details
  const [editedAccountDetails, setEditedAccountDetails] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: ''
  })
  
  // Mock delivery addresses - starting with empty array
  const [addresses, setAddresses] = useState([])
  
  // Temporary state for editing address
  const [editedAddress, setEditedAddress] = useState({
    id: null,
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    isDefault: false
  })
  
  // Start editing profile
  const handleEditProfile = () => {
    setEditedAccountDetails({
      name: accountDetails.name,
      email: accountDetails.email,
      phone: accountDetails.phone,
      avatar: accountDetails.avatar
    })
    setIsEditing(true)
  }
  
  // Save profile changes
  const handleSaveProfile = () => {
    const updatedDetails = {
      name: editedAccountDetails.name,
      email: editedAccountDetails.email,
      phone: editedAccountDetails.phone,
      avatar: editedAccountDetails.avatar
    }
    
    // Update account details locally
    setAccountDetails({
      ...accountDetails,
      ...updatedDetails
    })
    
    // Update user profile in AuthContext and localStorage
    updateUserProfile({
      name: editedAccountDetails.name,
      email: editedAccountDetails.email,
      avatar: editedAccountDetails.avatar
    })
    
    setIsEditing(false)
  }
  
  // Cancel profile editing
  const handleCancelEdit = () => {
    setIsEditing(false)
  }
  
  // Handle avatar change
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedAccountDetails({
          ...editedAccountDetails,
          avatar: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Show add address form
  const handleShowAddAddressForm = () => {
    setEditedAddress({
      id: Date.now(), // Generate a unique ID
      name: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      isDefault: addresses.length === 0 // Make default if it's the first address
    })
    setShowAddAddressForm(true)
  }
  
  // Save new address
  const handleSaveNewAddress = () => {
    // Validate required fields
    if (!editedAddress.name || !editedAddress.address || !editedAddress.city || 
        !editedAddress.state || !editedAddress.pincode || !editedAddress.phone) {
      alert('Please fill in all required fields')
      return
    }
    
    setAddresses([...addresses, editedAddress])
    setShowAddAddressForm(false)
  }
  
  // Cancel adding new address
  const handleCancelAddAddress = () => {
    setShowAddAddressForm(false)
  }
  
  // Start editing address
  const handleEditAddress = (address) => {
    setEditedAddress({
      id: address.id,
      name: address.name,
      address: address.address,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
      phone: address.phone,
      isDefault: address.isDefault
    })
    setEditingAddressId(address.id)
  }
  
  // Save address changes
  const handleSaveAddress = () => {
    const updatedAddresses = addresses.map(addr => 
      addr.id === editedAddress.id ? editedAddress : addr
    )
    setAddresses(updatedAddresses)
    setEditingAddressId(null)
  }
  
  // Cancel address editing
  const handleCancelAddressEdit = () => {
    setEditingAddressId(null)
  }
  
  // Set address as default
  const handleSetDefaultAddress = (id) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    }))
    setAddresses(updatedAddresses)
  }
  
  // Remove address
  const handleRemoveAddress = (id) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id)
    setAddresses(updatedAddresses)
  }

  useEffect(() => {
    // Simulate fetching orders from an API
    // In a real app, you would fetch this data from your backend
    const mockPendingOrders = [
      {
        id: 'ORD-001',
        date: '2023-05-15',
        items: [
          { name: 'Fresh Buffalo Milk', quantity: 2, price: 80 },
          { name: 'Fresh Curd', quantity: 1, price: 60 }
        ],
        total: 220,
        status: 'Processing'
      },
      {
        id: 'ORD-002',
        date: '2023-05-18',
        items: [
          { name: 'Pure Ghee', quantity: 1, price: 450 }
        ],
        total: 450,
        status: 'Shipped'
      }
    ]

    const mockCompletedOrders = [
      {
        id: 'ORD-003',
        date: '2023-05-01',
        items: [
          { name: 'Fresh Cow Milk', quantity: 3, price: 70 },
          { name: 'Paneer', quantity: 2, price: 120 }
        ],
        total: 450,
        status: 'Delivered',
        deliveryDate: '2023-05-03'
      },
      {
        id: 'ORD-004',
        date: '2023-04-25',
        items: [
          { name: 'Butter', quantity: 2, price: 90 },
          { name: 'Fresh Buffalo Milk', quantity: 2, price: 80 }
        ],
        total: 340,
        status: 'Delivered',
        deliveryDate: '2023-04-27'
      }
    ]

    setOrders({
      pending: mockPendingOrders,
      completed: mockCompletedOrders
    })
  }, [])

  const handleLogout = () => {
    signOut()
    navigate('/')
  }

  if (!user) {
    navigate('/signin')
    return null
  }

  return (
    <div className="min-h-screen bg-milk-cream py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Profile Sidebar */}
            <div className="md:w-1/3 bg-dairy-brown text-white p-6">
              <div className="flex flex-col items-center text-center mb-8">
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  className="w-24 h-24 rounded-full border-4 border-white mb-4"
                />
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-milk-cream">{user.email}</p>
              </div>
              
              <div className="space-y-4">
                <button 
                  onClick={() => setActiveSection('account')} 
                  className={`flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg transition-colors ${activeSection === 'account' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  <User className="h-5 w-5" />
                  <span>Account Details</span>
                </button>
                <button 
                  onClick={() => setActiveSection('orders')} 
                  className={`flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg transition-colors ${activeSection === 'orders' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  <Package className="h-5 w-5" />
                  <span>My Orders</span>
                </button>

                <button 
                  onClick={() => setActiveSection('addresses')} 
                  className={`flex items-center space-x-3 w-full text-left py-2 px-3 rounded-lg transition-colors ${activeSection === 'addresses' ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'}`}
                >
                  <MapPin className="h-5 w-5" />
                  <span>Delivery Addresses</span>
                </button>
              </div>
              
              <div className="mt-12">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center space-x-2 bg-white text-dairy-brown py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:w-2/3 p-6">
              {/* Account Details Section */}
              {activeSection === 'account' && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h1>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-lg font-medium">Personal Information</h2>
                      {!isEditing ? (
                        <button 
                          onClick={handleEditProfile}
                          className="flex items-center text-dairy-brown hover:text-dairy-brown-dark"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          <span>Edit</span>
                        </button>
                      ) : (
                        <div className="flex space-x-2">
                          <button 
                            onClick={handleSaveProfile}
                            className="flex items-center text-green-600 hover:text-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span>Save</span>
                          </button>
                          <button 
                            onClick={handleCancelEdit}
                            className="flex items-center text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            <span>Cancel</span>
                          </button>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      {/* Profile Photo */}
                      <div className="flex flex-col items-center space-y-3">
                        <div className="relative">
                          <img 
                            src={isEditing ? editedAccountDetails.avatar : accountDetails.avatar} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover border-4 border-dairy-brown"
                          />
                          {isEditing && (
                            <div className="absolute bottom-0 right-0">
                              <label htmlFor="avatar-upload" className="cursor-pointer bg-dairy-brown text-white p-2 rounded-full hover:bg-opacity-90 transition-colors">
                                <Camera size={16} />
                                <input 
                                  id="avatar-upload" 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={handleAvatarChange}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                        {isEditing && (
                          <p className="text-sm text-gray-500">Click the camera icon to change photo</p>
                        )}
                      </div>
                      
                      {/* User Details */}
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
                          {!isEditing ? (
                            <p className="text-gray-900">{accountDetails.name}</p>
                          ) : (
                            <input
                              type="text"
                              value={editedAccountDetails.name}
                              onChange={(e) => setEditedAccountDetails({...editedAccountDetails, name: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                            />
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Email Address</label>
                          {!isEditing ? (
                            <p className="text-gray-900">{accountDetails.email}</p>
                          ) : (
                            <input
                              type="email"
                              value={editedAccountDetails.email}
                              onChange={(e) => setEditedAccountDetails({...editedAccountDetails, email: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                            />
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Phone Number</label>
                          {!isEditing ? (
                            <p className="text-gray-900">{accountDetails.phone}</p>
                          ) : (
                            <input
                              type="tel"
                              value={editedAccountDetails.phone}
                              onChange={(e) => setEditedAccountDetails({...editedAccountDetails, phone: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                            />
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Date Joined</label>
                          <p className="text-gray-900">{accountDetails.dateJoined}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 pt-6 border-t border-gray-200">
                      <h3 className="text-lg font-medium mb-4">Password & Security</h3>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg transition-colors">
                        Change Password
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Orders Section */}
              {activeSection === 'orders' && (
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>
                  
                  {/* Tabs */}
                  <div className="flex border-b border-gray-200 mb-6">
                    <button
                      className={`py-2 px-4 font-medium ${activeTab === 'pending' ? 'text-dairy-brown border-b-2 border-dairy-brown' : 'text-gray-500 hover:text-dairy-brown'}`}
                      onClick={() => setActiveTab('pending')}
                    >
                      Pending Orders
                    </button>
                    <button
                      className={`py-2 px-4 font-medium ${activeTab === 'completed' ? 'text-dairy-brown border-b-2 border-dairy-brown' : 'text-gray-500 hover:text-dairy-brown'}`}
                      onClick={() => setActiveTab('completed')}
                    >
                      Completed Orders
                    </button>
                  </div>
                  
                  {/* Orders List */}
                  <div className="space-y-6">
                    {orders[activeTab].length > 0 ? (
                      orders[activeTab].map((order, index) => (
                        <div 
                          key={order.id} 
                          className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow ${highlightNewOrder && activeTab === 'pending' && index === 0 ? 'ring-2 ring-dairy-brown animate-pulse' : ''}`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-medium text-gray-900">{order.id}</h3>
                              <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                            </div>
                            <div className="flex items-center">
                              {activeTab === 'pending' ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                  <Package className="h-3 w-3 mr-1" />
                                  {order.status}
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  {order.status}
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-4 mt-4">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">Order Items</h4>
                            <ul className="space-y-2">
                              {order.items.map((item, index) => (
                                <li key={index} className="flex justify-between text-sm">
                                  <span>{item.quantity} x {item.name}</span>
                                  <span>₹{item.price * item.quantity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div className="border-t border-gray-200 pt-4 mt-4">
                            {order.discount > 0 ? (
                              <>
                                <div className="flex justify-between text-sm">
                                  <span>Subtotal:</span>
                                  <span>₹{order.subtotal}</span>
                                </div>
                                <div className="flex justify-between text-sm text-green-600">
                                  <span>Discount (5%):</span>
                                  <span>-₹{order.discount}</span>
                                </div>
                                <div className="flex justify-between font-medium mt-2">
                                  <span>Total:</span>
                                  <span className="font-bold text-dairy-brown">₹{order.total}</span>
                                </div>
                              </>
                            ) : (
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Total</span>
                                <span className="font-bold text-dairy-brown">₹{order.total}</span>
                              </div>
                            )}
                          </div>
                          
                          {activeTab === 'completed' && (
                            <div className="border-t border-gray-200 pt-4 mt-4 text-sm text-gray-500">
                              Delivered on {order.deliveryDate}
                            </div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Package className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
                        <p className="text-gray-500">
                          {activeTab === 'pending' 
                            ? "You don't have any pending orders at the moment."
                            : "You don't have any completed orders yet."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Notifications Section Removed */}
              
              {/* Delivery Addresses Section */}
              {activeSection === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Delivery Addresses</h1>
                    <button 
                      onClick={handleShowAddAddressForm}
                      className="flex items-center bg-dairy-brown text-white py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      <span>Add New Address</span>
                    </button>
                  </div>
                  
                  {/* Add Address Form */}
                  {showAddAddressForm && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
                      <h3 className="font-medium text-gray-900 mb-4">Add New Address</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                          <input
                            type="text"
                            value={editedAddress.name}
                            onChange={(e) => setEditedAddress({...editedAddress, name: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                          <input
                            type="tel"
                            value={editedAddress.phone}
                            onChange={(e) => setEditedAddress({...editedAddress, phone: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                          <input
                            type="text"
                            value={editedAddress.address}
                            onChange={(e) => setEditedAddress({...editedAddress, address: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
                          <input
                            type="text"
                            value={editedAddress.city}
                            onChange={(e) => setEditedAddress({...editedAddress, city: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
                          <input
                            type="text"
                            value={editedAddress.state}
                            onChange={(e) => setEditedAddress({...editedAddress, state: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500 mb-1">Pincode</label>
                          <input
                            type="text"
                            value={editedAddress.pincode}
                            onChange={(e) => setEditedAddress({...editedAddress, pincode: e.target.value})}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={handleSaveNewAddress}
                          className="flex items-center text-green-600 hover:text-green-700"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span>Save</span>
                        </button>
                        <button 
                          onClick={handleCancelAddAddress}
                          className="flex items-center text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          <span>Cancel</span>
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {addresses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {addresses.map(address => (
                        <div key={address.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
                          {editingAddressId === address.id ? (
                            <div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                                  <input
                                    type="text"
                                    value={editedAddress.name}
                                    onChange={(e) => setEditedAddress({...editedAddress, name: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-500 mb-1">Phone</label>
                                  <input
                                    type="tel"
                                    value={editedAddress.phone}
                                    onChange={(e) => setEditedAddress({...editedAddress, phone: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                                  />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="block text-sm font-medium text-gray-500 mb-1">Address</label>
                                  <input
                                    type="text"
                                    value={editedAddress.address}
                                    onChange={(e) => setEditedAddress({...editedAddress, address: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-500 mb-1">City</label>
                                  <input
                                    type="text"
                                    value={editedAddress.city}
                                    onChange={(e) => setEditedAddress({...editedAddress, city: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-500 mb-1">State</label>
                                  <input
                                    type="text"
                                    value={editedAddress.state}
                                    onChange={(e) => setEditedAddress({...editedAddress, state: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                                  />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-gray-500 mb-1">Pincode</label>
                                  <input
                                    type="text"
                                    value={editedAddress.pincode}
                                    onChange={(e) => setEditedAddress({...editedAddress, pincode: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dairy-brown focus:border-transparent"
                                  />
                                </div>
                              </div>
                              <div className="flex justify-end space-x-2">
                                <button 
                                  onClick={handleSaveAddress}
                                  className="flex items-center text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="h-4 w-4 mr-1" />
                                  <span>Save</span>
                                </button>
                                <button 
                                  onClick={handleCancelAddressEdit}
                                  className="flex items-center text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4 mr-1" />
                                  <span>Cancel</span>
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              {address.isDefault && (
                                <span className="absolute top-4 right-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-dairy-brown text-white">
                                  Default
                                </span>
                              )}
                              
                              <h3 className="font-medium text-gray-900 mb-1">{address.name}</h3>
                              <p className="text-gray-700 mb-3">{address.address}</p>
                              <p className="text-gray-700 mb-3">{address.city}, {address.state} - {address.pincode}</p>
                              <p className="text-gray-700 mb-4">{address.phone}</p>
                              
                              <div className="flex space-x-3 mt-2">
                                <button 
                                  onClick={() => handleEditAddress(address)}
                                  className="text-dairy-brown hover:text-dairy-brown-dark text-sm flex items-center"
                                >
                                  <Edit className="h-3 w-3 mr-1" />
                                  Edit
                                </button>
                                {!address.isDefault && (
                                  <>
                                    <span className="text-gray-300">|</span>
                                    <button 
                                      onClick={() => handleSetDefaultAddress(address.id)}
                                      className="text-dairy-brown hover:text-dairy-brown-dark text-sm"
                                    >
                                      Set as default
                                    </button>
                                    <span className="text-gray-300">|</span>
                                    <button 
                                      onClick={() => handleRemoveAddress(address.id)}
                                      className="text-red-600 hover:text-red-700 text-sm flex items-center"
                                    >
                                      <Trash2 className="h-3 w-3 mr-1" />
                                      Remove
                                    </button>
                                  </>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No addresses found</h3>
                      <p className="text-gray-500">You haven't added any delivery addresses yet.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile