// Performance monitoring utilities
export class PerformanceMonitor {
  private static measurements: Record<string, number> = {};

  static startMeasurement(name: string) {
    this.measurements[name] = performance.now();
  }

  static endMeasurement(name: string): number {
    const startTime = this.measurements[name];
    if (!startTime) {
      console.warn(`No start measurement found for: ${name}`);
      return 0;
    }

    const duration = performance.now() - startTime;
    delete this.measurements[name];

    // Log slow operations in development
    if (process.env.NODE_ENV === 'development' && duration > 100) {
      console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  static measureFunction<T extends (...args: any[]) => any>(
    name: string,
    fn: T
  ): T {
    return ((...args: Parameters<T>) => {
      this.startMeasurement(name);
      const result = fn(...args);
      this.endMeasurement(name);
      return result;
    }) as T;
  }

  static measureAsyncFunction<T extends (...args: any[]) => Promise<any>>(
    name: string,
    fn: T
  ): T {
    return (async (...args: Parameters<T>) => {
      this.startMeasurement(name);
      try {
        const result = await fn(...args);
        this.endMeasurement(name);
        return result;
      } catch (error) {
        this.endMeasurement(name);
        throw error;
      }
    }) as T;
  }
}

// React hook for measuring component render time
export function useRenderTime(componentName: string) {
  React.useEffect(() => {
    const measurementName = `${componentName}_render`;
    PerformanceMonitor.startMeasurement(measurementName);
    
    return () => {
      PerformanceMonitor.endMeasurement(measurementName);
    };
  });
}

// Image optimization utilities
export function optimizeImageUrl(url: string, width?: number, height?: number, quality = 80): string {
  // For Lorem Flickr URLs, we can add size parameters
  if (url.includes('loremflickr.com')) {
    const baseUrl = url.split('?')[0];
    const params = new URLSearchParams();
    if (width && height) {
      // Replace the dimensions in the URL
      return baseUrl.replace(/\/\d+\/\d+\//, `/${width}/${height}/`) + `?quality=${quality}`;
    }
    return url;
  }
  
  // For other services, you'd implement their specific optimization parameters
  return url;
}

// Debounce utility for search and other operations
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    
    const callNow = immediate && !timeout;
    
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    
    if (callNow) func(...args);
  };
}

// Throttle utility for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading utility for images
export function setupLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        }
      });
    });

    // Observe all images with lazy class
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}