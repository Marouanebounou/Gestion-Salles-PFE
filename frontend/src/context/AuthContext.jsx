import { createContext, useContext, useState, useCallback } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/authApi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [role, setRole] = useState(() => localStorage.getItem('role'));

  const loginDemo = useCallback(() => {
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('role', 'UTILISATEUR');
    setToken('demo-token');
    setRole('UTILISATEUR');
  }, []);

  const login = useCallback(async (email, password) => {
    const { data } = await apiLogin({ email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    setToken(data.token);
    setRole(data.role);
  }, []);

  const signup = useCallback(async (nom, email, password) => {
    await apiRegister({ nom, email, password });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, role, login, loginDemo, signup, logout, isAdmin: role === 'ADMIN' }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
