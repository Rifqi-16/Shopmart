import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { StateCreator } from 'zustand';

interface User {
  id: number;
  email: string;
  name: string;
  avatar: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  // Remove the login method from here since it's defined in AuthActions
  logout: () => void;
}

interface AuthActions {
  init: () => void;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
}

type AuthStore = AuthState & AuthActions;

type AuthPersist = (config: StateCreator<AuthStore>, options: PersistOptions<AuthStore>) => StateCreator<AuthStore>;

const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}; SameSite=Lax`;
};

export const useAuthStore = create<AuthStore>(
  (persist as AuthPersist)(
    (set) => ({
      init: () => {
        const token = document.cookie.split('; ').find(row => row.startsWith('auth-token='))?.split('=')[1];
        if (token) {
          fetch('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }).then(async (response) => {
            if (response.ok) {
              const userData = await response.json();
              set({
                user: userData,
                token: token,
                isAuthenticated: true,
              });
            }
          });
        }
      },
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (email: string, password: string) => {
        try {
          const response = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            mode: 'cors',
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed');
          }

          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message || 'Invalid credentials');
          }

          const { access_token } = data;
          
          // Fetch user profile with the token
          const userResponse = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            },
          });

          if (!userResponse.ok) {
            throw new Error('Failed to authenticate user');
          }

          const userData = await userResponse.json();

          // Update state
          set({
            user: userData,
            token: access_token,
            isAuthenticated: true,
          });

          // Set cookie
          document.cookie = `auth-token=${access_token}; path=/; max-age=86400; SameSite=Lax`;
          
        } catch (error) {
          console.error('Login error:', error);
          throw error;
        }
      },
      register: async (email: string, name: string, password: string) => {
        try {
          const response = await fetch('https://api.escuelajs.co/api/v1/users/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              name,
              password,
              avatar: 'https://picsum.photos/800',
            }),
          });

          if (!response.ok) throw new Error('Registration failed');

          // After successful registration, log the user in
          const loginResponse = await fetch('https://api.escuelajs.co/api/v1/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!loginResponse.ok) throw new Error('Auto-login failed');

          const { access_token } = await loginResponse.json();

          // Fetch user data
          const userResponse = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
            headers: {
              'Authorization': `Bearer ${access_token}`,
            },
          });

          if (!userResponse.ok) throw new Error('Failed to fetch user data');

          const userData = await userResponse.json();

          set({
            user: userData,
            token: access_token,
            isAuthenticated: true,
          });

          document.cookie = `auth-token=${access_token}; path=/; max-age=86400`;
        } catch (error) {
          console.error('Registration error:', error);
          throw error;
        }
      },
      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
        document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);