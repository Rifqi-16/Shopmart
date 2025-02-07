import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('Navigation Handler', () => {
  const mockRouter = {
    push: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  it('should navigate to login page when called', () => {
    const TestComponent = () => {
      const router = useRouter();
      return (
        <button onClick={() => router.push('/auth/login')}>
          Go to Login
        </button>
      );
    };

    render(<TestComponent />);
    
    const button = screen.getByText('Go to Login');
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/auth/login');
  });

  it('should handle multiple navigation attempts', () => {
    const TestComponent = () => {
      const router = useRouter();
      return (
        <button onClick={() => router.push('/auth/login')}>
          Go to Login
        </button>
      );
    };

    render(<TestComponent />);
    
    const button = screen.getByText('Go to Login');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledTimes(2);
    expect(mockRouter.push).toHaveBeenLastCalledWith('/auth/login');
  });

  it('should work with async/await', async () => {
    const TestComponent = () => {
      const router = useRouter();
      return (
        <button onClick={async () => {
          await router.push('/auth/login');
        }}>
          Go to Login
        </button>
      );
    };

    render(<TestComponent />);
    
    const button = screen.getByText('Go to Login');
    await fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledTimes(1);
    expect(mockRouter.push).toHaveBeenCalledWith('/auth/login');
  });
});