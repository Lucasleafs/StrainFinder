import React from 'react';

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  userId?: string;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  private queue: AnalyticsEvent[] = [];
  private isEnabled: boolean = true;

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private constructor() {
    // Initialize analytics service
    this.init();
  }

  private init() {
    // In production, initialize your analytics service here
    // Examples: Google Analytics, Mixpanel, Amplitude, etc.
    console.log('Analytics service initialized');
  }

  track(event: AnalyticsEvent) {
    if (!this.isEnabled) return;

    // Add timestamp
    const enrichedEvent = {
      ...event,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };

    // In development, just log to console
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', enrichedEvent);
    }

    // In production, send to your analytics service
    this.sendEvent(enrichedEvent);
  }

  private sendEvent(event: any) {
    // Mock sending to analytics service
    // In production, replace with actual service calls
    this.queue.push(event);
    
    // Process queue if it gets too large
    if (this.queue.length > 10) {
      this.flushQueue();
    }
  }

  private flushQueue() {
    // In production, batch send events to your analytics service
    console.log('Flushing analytics queue:', this.queue);
    this.queue = [];
  }

  setUserId(userId: string) {
    this.track({
      action: 'user_identified',
      category: 'user',
      label: userId
    });
  }

  disable() {
    this.isEnabled = false;
  }

  enable() {
    this.isEnabled = true;
  }
}

// Custom hook for analytics
export function useAnalytics() {
  const analytics = React.useMemo(() => AnalyticsService.getInstance(), []);

  const trackEvent = React.useCallback((event: Omit<AnalyticsEvent, 'timestamp'>) => {
    analytics.track(event);
  }, [analytics]);

  const trackPageView = React.useCallback((page: string) => {
    analytics.track({
      action: 'page_view',
      category: 'navigation',
      label: page
    });
  }, [analytics]);

  const trackStrainView = React.useCallback((strainId: string, strainName: string) => {
    analytics.track({
      action: 'strain_viewed',
      category: 'product',
      label: `${strainId}:${strainName}`
    });
  }, [analytics]);

  const trackSearch = React.useCallback((query: string, resultsCount: number) => {
    analytics.track({
      action: 'search_performed',
      category: 'search',
      label: query,
      value: resultsCount
    });
  }, [analytics]);

  const trackFavorite = React.useCallback((itemId: string, itemType: string, action: 'add' | 'remove') => {
    analytics.track({
      action: `favorite_${action}`,
      category: 'engagement',
      label: `${itemType}:${itemId}`
    });
  }, [analytics]);

  return {
    trackEvent,
    trackPageView,
    trackStrainView,
    trackSearch,
    trackFavorite,
    setUserId: analytics.setUserId.bind(analytics),
    disable: analytics.disable.bind(analytics),
    enable: analytics.enable.bind(analytics)
  };
}

// Analytics provider component
export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const analytics = useAnalytics();

  React.useEffect(() => {
    // Track initial page view
    analytics.trackPageView(window.location.pathname);
  }, [analytics]);

  return <>{children}</>;
}

export default AnalyticsService;