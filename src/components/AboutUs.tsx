import React from 'react';
import { Building, Users, Award, Target } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">About Piyo Store</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Our Story</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Founded in 2024, Piyo Store has grown from a small startup to become one of Indonesia's leading digital subscription marketplaces. 
              Our mission is to make premium digital services accessible to everyone through affordable and reliable subscription packages.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="flex items-start">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mr-4">
                  <Building className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Company</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Based in Jakarta, we serve customers across Indonesia with a commitment to excellence and customer satisfaction.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full mr-4">
                  <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Our Team</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Our dedicated team of experts works tirelessly to provide you with the best subscription services and support.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Why Choose Us?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full mr-4">
                  <Award className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quality Assurance</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    We verify all our subscription packages to ensure you receive genuine, high-quality services.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full mr-4">
                  <Target className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Customer Focus</h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Your satisfaction is our priority. We offer responsive customer support and flexible warranty options.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Our Vision</h3>
              <p className="text-gray-700 dark:text-gray-300">
                To become the most trusted digital subscription marketplace in Indonesia, making premium services accessible to everyone while maintaining the highest standards of quality and customer service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;