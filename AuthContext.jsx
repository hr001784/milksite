import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Function to update user profile
  const updateUserProfile = (updatedUserData) => {
    const updatedUser = { ...user, ...updatedUserData };
    setUser(updatedUser);
    localStorage.setItem('milkbook-user', JSON.stringify(updatedUser));
    return { success: true };
  }

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('milkbook-user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
  }, [])

  const signIn = (email, password) => {
    // Mock authentication - in a real app, this would be an API call
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
    
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem('milkbook-user', JSON.stringify(mockUser))
    return { success: true }
  }

  const signUp = (name, email, password) => {
    // Mock registration - in a real app, this would be an API call
    const mockUser = {
      id: Date.now(),
      name: name,
      email: email,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    }
    
    setUser(mockUser)
    setIsAuthenticated(true)
    localStorage.setItem('milkbook-user', JSON.stringify(mockUser))
    return { success: true }
  }

  const signOut = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('milkbook-user')
  }

  const value = {
    user,
    isAuthenticated,
    signIn,
    signUp,
    signOut,
    updateUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}