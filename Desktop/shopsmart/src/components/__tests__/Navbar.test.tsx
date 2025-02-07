import { render, screen } from '@testing-library/react';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Navbar from '../Navbar';

// Mock modules
jest.mock('@/store/authStore');
const mockAuthStore = jest.mocked(useAuthStore);

jest.mock('next-themes', () => ({
  useTheme: jest.fn(() => ({
    theme: 'light',
    setTheme: jest.fn()
  }))
}));

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: mockPush
  }))
}));

describe('Navbar', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme
    });
    mockAuthStore.mockReturnValue({
      isAuthenticated: false,
      user: null,
      logout: jest.fn()
    });
  });

  it('should set mounted to true after component mounts', () => {
    const { rerender } = render(<Navbar />);
    
    // Initial render should show loading state or fallback
    expect(screen.queryByRole('button', { name: /toggle theme/i })).toBeInTheDocument();
    
    // Rerender to simulate useEffect completion
    rerender(<Navbar />);
    
    // After mounting, theme toggle should be visible and functional
    const themeButton = screen.getByRole('button', { name: /toggle theme/i });
    expect(themeButton).toBeInTheDocument();
  });

  it('should render logo and navigation links', () => {
    render(<Navbar />);
    
    expect(screen.getByText('ShopSmart')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('should render login button when not authenticated', () => {
    render(<Navbar />);
    
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });

  it('should render user info and logout button when authenticated', () => {
    mockAuthStore.mockReturnValue({
      isAuthenticated: true,
      user: { name: 'Test User' },
      logout: jest.fn()
    });

    render(<Navbar />);
    
    expect(screen.getByText('Test User')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    expect(screen.queryByText('Login')).not.toBeInTheDocument();
  });
});