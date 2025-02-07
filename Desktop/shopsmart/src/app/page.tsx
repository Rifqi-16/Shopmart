'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShieldCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

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

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products?offset=0&limit=8');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setError('Failed to load featured products');
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ShopSmart</h1>
            <p className="text-xl mb-8">Discover amazing products at unbeatable prices</p>
            <Link
              href="/products"
              className="inline-block bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Products</h2>
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">{error}</div>
          )}
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group block bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      src={product.images[0] || 'https://via.placeholder.com/300'}
                      alt={product.title}
                      className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">${product.price}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{product.category.name}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start space-x-4">
              <ShieldCheckIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Shopping</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Shop with confidence knowing that your transactions are protected by industry-standard SSL encryption.
                </p>
              </div>
            </div>
            <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg flex items-start space-x-4">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">24/7 Customer Support</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our dedicated support team is here to help you with any questions or concerns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
