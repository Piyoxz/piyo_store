import { Product } from '../types';
import { Music, Tv, Video, Lightbulb, Tablet, Gamepad2 } from 'lucide-react';

// Helper function to get icon by platform type
export const getPlatformIcon = (platform: string) => {
  const lowerPlatform = platform.toLowerCase();
  if (lowerPlatform.includes('spotify') || lowerPlatform.includes('music')) return Music;
  if (lowerPlatform.includes('netflix') || lowerPlatform.includes('tv')) return Tv;
  if (lowerPlatform.includes('youtube')) return Video;
  if (lowerPlatform.includes('canva') || lowerPlatform.includes('design')) return Lightbulb;
  if (lowerPlatform.includes('ipad') || lowerPlatform.includes('tablet')) return Tablet;
  if (lowerPlatform.includes('game') || lowerPlatform.includes('xbox') || lowerPlatform.includes('playstation')) return Gamepad2;
  return Lightbulb;
};

export const mockProducts: Product[] = [
  {
    id: '1',
    platform: 'Spotify Premium',
    logo: 'spotify',
    packages: [
      {
        name: 'Individual 1 Month',
        price: 'Rp 29.000',
        warranty: 'No Warranty'
      },
      {
        name: 'Individual 3 Months',
        price: 'Rp 79.000',
        warranty: 'Full Warranty'
      },
      {
        name: 'Family Plan 1 Month',
        price: 'Rp 49.000',
        warranty: 'Limited Warranty'
      }
    ],
    notes: [
      'Seller account',
      'Indonesia region'
    ]
  },
  {
    id: '2',
    platform: 'Apple Music',
    logo: 'apple-music',
    packages: [
      {
        name: 'Individual 1 Month',
        price: 'Rp 25.000',
        warranty: 'Limited Warranty'
      },
      {
        name: 'Family Plan 1 Month',
        price: 'Rp 45.000',
        warranty: 'Full Warranty'
      }
    ],
    notes: [
      'Works on iPhone & Android',
      'High quality streaming'
    ]
  },
  {
    id: '3',
    platform: 'Netflix',
    logo: 'netflix',
    packages: [
      {
        name: 'Basic Plan 1 Month',
        price: 'Rp 59.000',
        warranty: 'No Warranty'
      },
      {
        name: 'Standard Plan 1 Month',
        price: 'Rp 89.000',
        warranty: 'Limited Warranty'
      },
      {
        name: 'Premium Plan 1 Month',
        price: 'Rp 129.000',
        warranty: 'Full Warranty'
      }
    ],
    notes: [
      'Shared account',
      'HD & 4K streaming'
    ]
  },
  {
    id: '4',
    platform: 'YouTube Premium',
    logo: 'youtube',
    packages: [
      {
        name: 'Individual 1 Month',
        price: 'Rp 19.000',
        warranty: 'No Warranty'
      },
      {
        name: 'Family Plan 1 Month',
        price: 'Rp 39.000',
        warranty: 'Limited Warranty'
      }
    ],
    notes: [
      'Ad-free viewing',
      'Background play',
      'Download videos'
    ]
  },
  {
    id: '5',
    platform: 'Canva Pro',
    logo: 'canva',
    packages: [
      {
        name: 'Individual Monthly',
        price: 'Rp 49.000',
        warranty: 'Limited Warranty'
      },
      {
        name: 'Individual Yearly',
        price: 'Rp 399.000',
        warranty: 'Full Warranty'
      }
    ],
    notes: [
      'Premium templates',
      'Magic resize',
      'Background remover'
    ]
  },
  {
    id: '6',
    platform: 'Xbox Game Pass',
    logo: 'xbox',
    packages: [
      {
        name: 'PC Game Pass 1 Month',
        price: 'Rp 69.000',
        warranty: 'Limited Warranty'
      },
      {
        name: 'Ultimate 1 Month',
        price: 'Rp 99.000',
        warranty: 'Full Warranty'
      }
    ],
    notes: [
      'Hundreds of games',
      'Day one releases',
      'EA Play included with Ultimate'
    ]
  }
];

export const users = [
  {
    username: 'admin',
    password: 'admin123',
    isAdmin: true
  }
];