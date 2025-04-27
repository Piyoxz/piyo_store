import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How do I purchase a subscription?",
      answer: "Simply browse our available packages, select the one you want, and click 'Order Now'. You'll be redirected to WhatsApp where our team will assist you with the purchase process."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfers, e-wallets (OVO, GoPay, DANA), and other digital payment solutions. Specific payment details will be provided during the ordering process."
    },
    {
      question: "How long does it take to receive my subscription?",
      answer: "Most subscriptions are activated within 1-24 hours after payment confirmation. The exact timing may vary depending on the service provider and package type."
    },
    {
      question: "What is your warranty policy?",
      answer: "We offer different warranty options depending on the package: No Warranty, Limited Warranty, and Full Warranty. The specific warranty terms are listed with each product package."
    },
    {
      question: "Can I upgrade my subscription package?",
      answer: "Yes, you can upgrade your subscription package. Contact our customer service through WhatsApp, and we'll help you with the upgrade process."
    },
    {
      question: "What happens if I have issues with my subscription?",
      answer: "If you experience any issues, contact our customer support immediately through WhatsApp. We'll help resolve the problem according to your package's warranty terms."
    },
    {
      question: "Are the subscriptions genuine?",
      answer: "Yes, all our subscriptions are genuine services. We work to ensure you receive authentic access to your chosen platform."
    },
    {
      question: "Can I share my subscription with others?",
      answer: "Sharing policies vary by platform and package type. Check the specific package details or contact our support team for clarification."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-medium text-gray-900 dark:text-white">{item.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                )}
              </button>
              
              <div 
                className={`px-6 transition-all duration-300 ${
                  openIndex === index ? 'py-4 border-t border-gray-200 dark:border-gray-700' : 'h-0 overflow-hidden'
                }`}
              >
                <p className="text-gray-700 dark:text-gray-300">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Still have questions?</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Can't find the answer you're looking for? Please contact our customer support team.
          </p>
          <a 
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-300"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;