import React, { useState } from 'react'

// Data URL fallbacks - these will always work
const DATA_URL_FALLBACKS = {
  strain: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiM0YWRlODAiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+8J+MvyBDYW5uYWJpczwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+Rmxvd2VyPC90ZXh0Pgo8L3N2Zz4=',
  concentrate: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmYmJmMjQiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iYmxhY2siIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+8J+NriBDYW5uYWJpczwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iYmxhY2siIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+Q29uY2VudHJhdGU8L3RleHQ+Cjwvc3ZnPg==',
  edible: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiNmNDcyYjYiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+8J+NrCBDYW5uYWJpczwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjE2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+RWRpYmxlPC90ZXh0Pgo8L3N2Zz4=',
  cartridge: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiMzYjgyZjYiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjEzMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+8J+SqCBWYXBlPC90ZXh0PgogIDx0ZXh0IHg9IjIwMCIgeT0iMTYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjI0Ij5DYXJ0cmlkZ2U8L3RleHQ+Cjwvc3ZnPg==',
  default: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHJlY3Qgd2lkdGg9IjQwMCIgaGVpZ2h0PSIzMDAiIGZpbGw9IiM2YjcyODAiLz4KICA8dGV4dCB4PSIyMDAiIHk9IjE0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+8J+MvSBDYW5uYWJpczwvdGV4dD4KICA8dGV4dCB4PSIyMDAiIHk9IjE3MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyNCI+UHJvZHVjdDwvdGV4dD4KPC9zdmc+'
};

// Multiple fallback sources
const FALLBACK_SOURCES = [
  (productType: string) => `https://via.placeholder.com/400x300/4ade80/ffffff?text=${encodeURIComponent(productType === 'strain' ? 'Cannabis Flower' : productType === 'concentrate' ? 'Cannabis Extract' : productType === 'edible' ? 'Cannabis Edible' : productType === 'cartridge' ? 'Vape Cart' : 'Cannabis Product')}`,
  (productType: string) => `https://placehold.co/400x300/${productType === 'strain' ? '4ade80' : productType === 'concentrate' ? 'fbbf24' : productType === 'edible' ? 'f472b6' : productType === 'cartridge' ? '3b82f6' : '6b7280'}/ffffff?text=${encodeURIComponent(productType === 'strain' ? 'Cannabis Flower' : productType === 'concentrate' ? 'Cannabis Extract' : productType === 'edible' ? 'Cannabis Edible' : productType === 'cartridge' ? 'Vape Cart' : 'Cannabis Product')}`,
  (productType: string) => `https://dummyimage.com/400x300/${productType === 'strain' ? '4ade80' : productType === 'concentrate' ? 'fbbf24' : productType === 'edible' ? 'f472b6' : productType === 'cartridge' ? '3b82f6' : '6b7280'}/ffffff&text=${encodeURIComponent(productType === 'strain' ? 'Cannabis+Flower' : productType === 'concentrate' ? 'Cannabis+Extract' : productType === 'edible' ? 'Cannabis+Edible' : productType === 'cartridge' ? 'Vape+Cart' : 'Cannabis+Product')}`
];

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement> & { productType?: keyof typeof DATA_URL_FALLBACKS }) {
  const [currentSrcIndex, setCurrentSrcIndex] = useState(-1); // -1 means try original src first
  const [isLoading, setIsLoading] = useState(true);

  const { src, alt, style, className, productType = 'default', onLoad, onError, ...rest } = props;

  const handleError = () => {
    const nextIndex = currentSrcIndex + 1;
    
    if (nextIndex < FALLBACK_SOURCES.length) {
      // Try next fallback source
      setCurrentSrcIndex(nextIndex);
    } else {
      // Use data URL as final fallback
      setIsLoading(false);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.(arguments[0] as any);
  };

  // Determine current src
  let currentSrc: string;
  if (currentSrcIndex === -1) {
    // Try original source first
    currentSrc = src || DATA_URL_FALLBACKS[productType];
  } else if (currentSrcIndex < FALLBACK_SOURCES.length) {
    // Try fallback services
    currentSrc = FALLBACK_SOURCES[currentSrcIndex](productType);
  } else {
    // Final fallback to data URL
    currentSrc = DATA_URL_FALLBACKS[productType];
  }

  return (
    <div className="relative">
      {isLoading && (
        <div 
          className={`absolute inset-0 bg-gradient-to-br from-green-100 to-green-50 animate-pulse border border-green-200 rounded flex items-center justify-center ${className || ''}`}
          style={style}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 border-2 border-green-300 border-t-green-600 rounded-full animate-spin"></div>
            <div className="text-xs text-green-600">Loading...</div>
          </div>
        </div>
      )}
      <img 
        src={currentSrc} 
        alt={alt || "Cannabis product"} 
        className={`${className || ''} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        style={style} 
        {...rest} 
        onError={handleError}
        onLoad={handleLoad}
      />
    </div>
  );
}