import { createContext, useContext, useState } from 'react';
import { students, initializeMealStatus } from '../data/students';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [mealStatus, setMealStatus] = useState(initializeMealStatus());

  const login = (userData) => {
    if (userData.role === 'admin') {
      setUser(userData);
      setIsAdmin(true);
      return true;
    }

    // For student login, find the student and verify credentials
    const student = students.find(s => s.email === userData.email);
    if (student) {
      setUser({ ...student, role: 'student' });
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