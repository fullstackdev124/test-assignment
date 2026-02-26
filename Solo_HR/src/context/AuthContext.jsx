import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getToken, setToken, fetchMe, login as apiLogin, register as apiRegister } from '../utils/api';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = useCallback(async () => {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    const me = await fetchMe(token);
    if (me) setUser(me);
    else setToken(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setToken(data.access_token);
    const me = await fetchMe(data.access_token);
    setUser(me);
  };

  const register = async (email, username, password) => {
    await apiRegister(email, username, password);
    await login(email, password);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
