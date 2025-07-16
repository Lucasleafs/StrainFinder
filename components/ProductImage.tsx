import React from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ProductImageProps {
  src: string;
  alt: string;
  productType: 'strain' | 'concentrate' | 'edible' | 'cartridge';
  className?: string;
}

const ProductImage: React.FC<ProductImageProps> = ({ src, alt, productType, className = '' }) => {
  const getFallbackContent = () => {
    const baseClasses = "w-full h-full flex items-center justify-center bg-gradient-to-br text-white text-center p-4";
    
    switch (productType) {
      case 'strain':
        return (
          <div className={`${baseClasses} from-green-600 to-green-800`}>
            <div>
              <div className="text-4xl mb-2">🌿</div>
              <div className="text-sm font-medium">{alt}</div>
              <div className="text-xs opacity-75 mt-1">Cannabis Flower</div>
            </div>
          </div>
        );
      case 'concentrate':
        return (
          <div className={`${baseClasses} from-amber-600 to-amber-800`}>
            <div>
              <div className="text-4xl mb-2">🫙</div>
              <div className="text-sm font-medium">{alt}</div>
              <div className="text-xs opacity-75 mt-1">Cannabis Concentrate</div>
            </div>
          </div>
        );
      case 'edible':
        return (
          <div className={`${baseClasses} from-purple-600 to-purple-800`}>
            <div>
              <div className="text-4xl mb-2">🍯</div>
              <div className="text-sm font-medium">{alt}</div>
              <div className="text-xs opacity-75 mt-1">Cannabis Edible</div>
            </div>
          </div>
        );
      case 'cartridge':
        return (
          <div className={`${baseClasses} from-blue-600 to-blue-800`}>
            <div>
              <div className="text-4xl mb-2">🖊️</div>
              <div className="text-sm font-medium">{alt}</div>
              <div className="text-xs opacity-75 mt-1">Vape Cartridge</div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} from-gray-600 to-gray-800`}>
            <div>
              <div className="text-4xl mb-2">🌱</div>
              <div className="text-sm font-medium">{alt}</div>
              <div className="text-xs opacity-75 mt-1">Cannabis Product</div>
            </div>
          </div>
        );
    }
  };

  // Generate Lorem Flickr URL with relevant keywords
  const generateLoremFlickrUrl = (productName: string, productType: string) => {
    const keywords = {
      strain: ['nature', 'plant', 'green', 'botanical', 'leaf', 'herbs', 'garden', 'organic'],
      concentrate: ['amber', 'gold', 'honey', 'crystal', 'glass', 'texture', 'abstract', 'liquid'],
      edible: ['food', 'candy', 'colorful', 'dessert', 'sweet', 'gummy', 'treats', 'snacks'],
      cartridge: ['technology', 'modern', 'device', 'sleek', 'minimalist', 'gadget', 'electronic', 'blue']
    };
    
    const typeKeywords = keywords[productType as keyof typeof keywords] || keywords.strain;
    const randomKeyword = typeKeywords[Math.floor(productName.length % typeKeywords.length)];
    
    // Create a seed from the product name for consistency
    let seed = 0;
    for (let i = 0; i < productName.length; i++) {
      const char = productName.charCodeAt(i);
      seed = ((seed << 5) - seed) + char;
      seed = seed & seed; // Convert to 32-bit integer
    }
    const uniqueId = Math.abs(seed) % 10000;
    
    return `https://loremflickr.com/400/300/${randomKeyword}?random=${uniqueId}`;
  };

  // Use the provided src or generate Lorem Flickr URL
  const imageUrl = src.includes('loremflickr') ? src : generateLoremFlickrUrl(alt, productType);

  return (
    <div className={`relative overflow-hidden rounded-lg ${className}`}>
      <ImageWithFallback
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-cover"
        fallback={getFallbackContent()}
      />
    </div>
  );
};

export default ProductImage;