import { render, screen } from '@testing-library/react';
import ProductDetailPage from '../page';
import ProductDetailClient from '../ProductDetailClient';

// Mock the ProductDetailClient component
jest.mock('../ProductDetailClient', () => {
  return jest.fn(() => <div>Mocked ProductDetailClient</div>);
});

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'Test Description',
  images: ['image1.jpg', 'image2.jpg'],
  category: {
    id: 1,
    name: 'Test Category'
  }
};

// Mock fetch with proper typing
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockProduct)
  })
) as jest.Mock;

describe('ProductDetailPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and renders product details', async () => {
    const params = { id: '1' };
    const page = await ProductDetailPage({ params });
    render(page);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.escuelajs.co/api/v1/products/1',
      expect.any(Object)
    );
    expect(ProductDetailClient).toHaveBeenCalledWith(
      {
        product: {
          id: 1,
          title: "Test Product",
          description: "Test Description",
          price: 99.99,
          category: { id: 1, name: "Test Category" },
          images: ["image1.jpg", "image2.jpg"]
        }
      },
      undefined
    );
  });

  it('handles fetch error', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve({
        ok: false
      })
    );

    const params = { id: '1' };
    
    await expect(ProductDetailPage({ params })).rejects.toThrow('Failed to fetch product');
  });
});