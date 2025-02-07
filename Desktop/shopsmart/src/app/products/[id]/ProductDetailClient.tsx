'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';

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

export default function ProductDetailClient({ product }: { product: Product }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [feedback, setFeedback] = useState({ message: '', type: '' });
  const addItem = useCartStore((state) => state.addItem);

  const showFeedback = (message: string, type: string) => {
    setFeedback({ message, type });
    setTimeout(() => setFeedback({ message: '', type: '' }), 3000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="mb-6 text-blue-600 dark:text-blue-400 hover:underline flex items-center"
      >
        ← Back to Products
      </button>

      {feedback.message && (
        <div
          className={`mb-6 p-4 rounded-lg ${feedback.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
        >
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={product.images[selectedImage] || 'https://via.placeholder.com/600'}
              alt={product.title}
              width={600}
              height={400}
              className="w-full h-96 object-cover transform transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex space-x-2 overflow-x-auto py-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all duration-200 transform hover:scale-105 ${selectedImage === index ? 'border-blue-500 scale-105' : 'border-transparent'}`}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{product.title}</h1>
            <p className="text-2xl text-blue-600 dark:text-blue-400 font-bold">${product.price}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{product.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Category</h2>
            <span className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-700 dark:text-gray-300">
              {product.category.name}
            </span>
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            onClick={() => {
              const cartItem = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images[0]
              };
              addItem(cartItem);
              showFeedback('Product added to cart successfully!', 'success');
            }}
          >
            Add to Cart
          </button>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure Shopping</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              We use industry-standard SSL encryption to ensure your transaction is secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}