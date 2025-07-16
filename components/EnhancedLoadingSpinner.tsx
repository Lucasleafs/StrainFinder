import React from 'react';
import { Leaf, Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  message?: string;
  fullScreen?: boolean;
  variant?: 'default' | 'cannabis' | 'minimal';
}

export default function EnhancedLoadingSpinner({ 
  size = 'md', 
  message, 
  fullScreen = false,
  variant = 'default'
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-gradient-to-br from-green-50 to-purple-50 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  if (variant === 'minimal') {
    return (
      <div className={containerClasses}>
        <Loader2 className={`${sizeClasses[size]} animate-spin text-green-600`} />
      </div>
    );
  }

  if (variant === 'cannabis') {
    return (
      <div className={containerClasses}>
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-purple-600 rounded-full flex items-center justify-center">
              <Leaf className="w-8 h-8 text-white animate-pulse" />
            </div>
            <div className="absolute inset-0 rounded-full border-4 border-green-200 border-t-green-600 animate-spin" />
          </div>
          {message && (
            <p className="text-green-700 font-medium animate-pulse">{message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={containerClasses}>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-2">
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-3 h-3 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
        {message && (
          <p className="text-green-700 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
}