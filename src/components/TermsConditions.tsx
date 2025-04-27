import React from 'react';

const TermsConditions: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Terms and Conditions</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="prose dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300">
                These Terms and Conditions govern your use of Piyo Store and the services we provide. By using our website and services, you accept these terms and conditions in full.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">2. Service Description</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Piyo Store provides digital subscription services for various platforms. We act as a reseller of subscription packages and are not directly affiliated with the service providers.
              </p>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">3. Purchase and Payment</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>All prices are listed in Indonesian Rupiah (IDR)</li>
                <li>Payment must be completed before service activation</li>
                <li>Prices may change without prior notice</li>
                <li>Refunds are subject to our warranty policy</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">4. Warranty Policy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Different warranty levels are available:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>No Warranty: No replacement or refund available</li>
                <li>Limited Warranty: Replacement available under specific conditions</li>
                <li>Full Warranty: Full replacement guarantee for the subscription period</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">5. User Responsibilities</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Users must:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>Provide accurate information for purchases</li>
                <li>Not share account credentials with unauthorized users</li>
                <li>Follow the terms of service of the subscription platforms</li>
                <li>Report any issues promptly to customer service</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">6. Limitation of Liability</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Piyo Store is not responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>Service interruptions by platform providers</li>
                <li>Changes in platform features or pricing</li>
                <li>User violations of platform terms</li>
                <li>Loss of access due to user negligence</li>
              </ul>
            </section>
            
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">7. Changes to Terms</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We reserve the right to modify these terms at any time. Continued use of our services after changes constitutes acceptance of the new terms.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">8. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300">
                For questions about these terms, please contact us through:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mt-2">
                <li>WhatsApp: +62 123-4567-8900</li>
                <li>Email: support@piyostore.com</li>
                <li>Address: 123 Subscription Street, Jakarta, Indonesia</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;