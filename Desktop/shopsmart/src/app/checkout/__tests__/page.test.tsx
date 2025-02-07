import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CheckoutPage from '../page';
import { useCartStore } from '@/store/cartStore';

// Mock modules
jest.mock('@/store/cartStore');
const mockCartStore = jest.mocked(useCartStore);

const mockRouter = {
  push: jest.fn()
};

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}));

describe('CheckoutPage', () => {
  const mockCartItems = [
    {
      id: 1,
      title: 'Test Product 1',
      price: 99.99,
      quantity: 2,
      image: 'test1.jpg'
    },
    {
      id: 2,
      title: 'Test Product 2',
      price: 49.99,
      quantity: 1,
      image: 'test2.jpg'
    }
  ];

  const mockClearCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockRouter.push.mockClear();
    mockCartStore.mockImplementation(() => ({
      items: mockCartItems,
      clearCart: mockClearCart
    }));
  });

  it('displays correct price format and calculations', () => {
    render(<CheckoutPage />);

    // Check individual item prices and quantities
    expect(screen.getByText(/\$99\.99 × 2/)).toBeInTheDocument();
    expect(screen.getByText(/\$49\.99 × 1/)).toBeInTheDocument();

    // Check subtotal (99.99 * 2 + 49.99 * 1 = 249.97)
    const subtotalElement = screen.getByText('Subtotal').nextElementSibling;
    expect(subtotalElement).toHaveTextContent('$249.97');

    // Check shipping cost
    const shippingElement = screen.getByText('Shipping').nextElementSibling;
    expect(shippingElement).toHaveTextContent('$10.00');

    // Check total (249.97 + 10 = 259.97)
    const totalElement = screen.getByText('Total').nextElementSibling;
    expect(totalElement).toHaveTextContent('$259.97');
  });

  it('displays correct item information', () => {
    render(<CheckoutPage />);

    mockCartItems.forEach(item => {
      expect(screen.getByText(item.title)).toBeInTheDocument();
      const image = screen.getByAltText(item.title) as HTMLImageElement;
      expect(image.src).toContain(item.image);
    });
  });

  it('updates total when cart is empty', () => {
    mockCartStore.mockReturnValue({
      items: [],
      clearCart: jest.fn()
    });
    
    render(<CheckoutPage />);

    expect(screen.getByText('Your Cart is Empty')).toBeInTheDocument();
    expect(screen.queryByText('Order Summary')).not.toBeInTheDocument();
  });
});