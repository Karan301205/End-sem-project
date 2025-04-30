import { createContext, useContext, useState, useEffect } from 'react';
import { students, initializeMealStatus } from '../data/students';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mealStatus, setMealStatus] = useState(initializeMealStatus());

  const login = (email, password) => {
    if (email === 'admin123' && password === 'admin000') {
      setUser({ email: 'admin123', role: 'admin' });
      setIsAdmin(true);
      return true;
    }

    const student = students.find(s => s.email === email);
    if (student) {
      setUser(student);
      setIsAdmin(false);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
  };

  const updateMealStatus = (studentEmail, mealType, status) => {
    setMealStatus(prev => ({
      ...prev,
      [studentEmail]: {
        ...prev[studentEmail],
        [mealType]: status
      }
    }));
  };

  return (
    <AppContext.Provider value={{
      user,
      isAdmin,
      mealStatus,
      login,
      logout,
      updateMealStatus
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 