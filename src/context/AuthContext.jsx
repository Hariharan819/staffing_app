import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export  const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch('https://app.blogpal.ai/ipartnerStaffingV1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Store token and user data
      localStorage.setItem('token', data[0].token);
      localStorage.setItem('userData', JSON.stringify({
        id: data[1].userData[0],
        email: data[1].userData[1],
        type: data[1].userData[2],
        profileImage: data[1].userData[3],
        isActive: data[1].userData[4],
        name: data[1].userData[5]
      }));
      
      setUser({
        id: data[1].userData[0],
        email: data[1].userData[1],
        type: data[1].userData[2],
        profileImage: data[1].userData[3],
        isActive: data[1].userData[4],
        name: data[1].userData[5]
      });

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      const response = await fetch('https://app.blogpal.ai/ipartnerStaffingV1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "X-Requested-With": "XMLHttpRequest",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};