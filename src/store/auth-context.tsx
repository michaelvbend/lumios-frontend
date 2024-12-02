import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  isLoggedIn: false,
  login: (token: string) => {},
  logout: () => {},
});

interface AuthContextProps {
  token: string;
  isLoggedIn: boolean;
  login: (token: string) => void;
  logout: () => void;
}

interface AuthContextProviderProps {
  children: React.ReactNode;
}

function AuthContextProvider(props: AuthContextProviderProps) {
  const [token, setToken] = useState<string>('');

  function login(token: string) {
    setToken(token);
    AsyncStorage.setItem('token', token);
  }

  function logout() {
    setToken('');
    AsyncStorage.removeItem('token');
  }

  const value: AuthContextProps = {
    token,
    isLoggedIn: !!token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
