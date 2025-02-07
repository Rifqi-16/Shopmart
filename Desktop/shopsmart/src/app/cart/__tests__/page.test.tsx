import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../page';
import { useCartStore } from '@/store/cartStore';

// Mock modules
jest.mock('@/store/cartStore');
const mockCartStore = jest.mocked(useCartStore);

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush
  })
}));

describe('CartPage', () => {
  const mockItems = [
    {
      id: 1,
      title: 'Test Product',
      price: 99.99,
      quantity: 2,
      image: 'test.jpg'
    }
  ];

  const mockRemoveItem = jest.fn();
  const mockUpdateQuantity = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockCartStore.mockReturnValue({
      items: mockItems,
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity
    });
  });

  it('renders empty cart message when no items', () => {
    mockCartStore.mockReturnValue({
      items: [],
      removeItem: mockRemoveItem,
      updateQuantity: mockUpdateQuantity
    });

    render(<CartPage />);
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  it('renders cart items and calculates total correctly', () => {
    render(<CartPage />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    
    // Use more specific selector for total
    const subtotalElement = screen.getByText('Subtotal').nextElementSibling;
    expect(subtotalElement).toHaveTextContent('$199.98');
  });

  it('handles quantity updates', () => {
    render(<CartPage />);
    
    const increaseButton = screen.getByText('+');
    const decreaseButton = screen.getByText('-');

    fireEvent.click(increaseButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3);

    fireEvent.click(decreaseButton);
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 1);
  });

  it('handles item removal', () => {
    render(<CartPage />);
    
    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);
    
    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });

  it('navigates to checkout when clicking proceed button', () => {
    render(<CartPage />);
    
    const checkoutButton = screen.getByText('Proceed to Checkout');
    fireEvent.click(checkoutButton);
    
    expect(mockPush).toHaveBeenCalledWith('/checkout');
  });
});