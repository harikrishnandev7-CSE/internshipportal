import { createContext, useContext, useState, useCallback } from 'react';

const DEMO_USERS = {
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

const AuthContext = createContext({
  user: null,
  login: () => false,
  register: () => false,
  logout: () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('internx-user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback((email, password, role) => {
    const account = DEMO_USERS[email.toLowerCase()];
    if (account && account.password === password && account.user.role === role) {
      setUser(account.user);
      localStorage.setItem('internx-user', JSON.stringify(account.user));
      return true;
    }
    return false;
  }, []);

  const register = useCallback((name, email, password, role) => {
    const key = email.toLowerCase();
    if (DEMO_USERS[key]) return false;
    const newUser = {
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
