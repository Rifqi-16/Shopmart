'use client';

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">About ShopSmart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Founded with a vision to revolutionize online shopping, ShopSmart has grown from a small startup to a trusted e-commerce destination. We believe in making quality products accessible to everyone while providing an exceptional shopping experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We strive to provide our customers with the best online shopping experience possible through our commitment to:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-gray-600 dark:text-gray-300">
                <li>Offering high-quality products at competitive prices</li>
                <li>Providing exceptional customer service</li>
                <li>Ensuring secure and convenient shopping</li>
                <li>Maintaining transparency in all our operations</li>
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Why Choose Us?</h2>
              <div className="grid grid-cols-1 gap-6">
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Quality Assurance</h3>
                  <p className="text-gray-600 dark:text-gray-300">Every product in our catalog is carefully selected and verified for quality.</p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Secure Shopping</h3>
                  <p className="text-gray-600 dark:text-gray-300">Your security is our priority. We use industry-standard SSL encryption for all transactions.</p>
                </div>
                <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-2">Customer Support</h3>
                  <p className="text-gray-600 dark:text-gray-300">Our dedicated support team is available to assist you with any questions or concerns.</p>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Ready to Start Shopping?</h2>
          <Link
            href="/products"
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Explore Our Products
          </Link>
        </div>
      </div>
    </div>
  );
}