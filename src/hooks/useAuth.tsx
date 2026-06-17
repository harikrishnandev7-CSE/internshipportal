import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: 'student' | 'company') => boolean;
  register: (name: string, email: string, password: string, role: 'student' | 'company') => boolean;
  logout: () => void;
}

const DEMO_USERS: Record<string, { password: string; user: User }> = {
  'student@demo.com': {
    password: 'password123',
    user: {
      id: 's1',
      name: 'Alex Johnson',
      email: 'student@demo.com',
      role: 'student',
      avatar: '',
    },
  },
  'company@demo.com': {
    password: 'password123',
    user: {
      id: 'c1',
      name: 'TechCorp Inc.',
      email: 'company@demo.com',
      role: 'company',
      avatar: '',
    },
  },
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('internx-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email: string, password: string, role: 'student' | 'company') => {
    const account = DEMO_USERS[email.toLowerCase()];
    if (account && account.password === password && account.user.role === role) {
      setUser(account.user);
      localStorage.setItem('internx-user', JSON.stringify(account.user));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((name: string, email: string, password: string, role: 'student' | 'company') => {
    const key = email.toLowerCase();
    if (DEMO_USERS[key]) return false;
    const newUser: User = {
      id: role === 'student' ? `s${Date.now()}` : `c${Date.now()}`,
      name,
      email: key,
      role,
    };
    DEMO_USERS[key] = { password, user: newUser };
    setUser(newUser);
    localStorage.setItem('internx-user', JSON.stringify(newUser));
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('internx-user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
