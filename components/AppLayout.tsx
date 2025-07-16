import React, { Suspense } from 'react';
import { Toaster } from 'sonner';
import Navigation from './Navigation';
import EnhancedLoadingSpinner from './EnhancedLoadingSpinner';
import SEOHead from './SEOHead';
import { useApp } from '../contexts/AppContext';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export default function AppLayout({ children, title, description }: AppLayoutProps) {
  const { comparisonList } = useApp();
  const [showComparison, setShowComparison] = React.useState(false);

  return (
    <>
      <SEOHead title={title} description={description} />
      
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-purple-50">
        <Navigation 
          comparisonCount={comparisonList.length}
          onShowComparison={() => setShowComparison(true)}
        />
        
        <div className="pt-20">
          <Suspense fallback={<EnhancedLoadingSpinner variant="cannabis" fullScreen />}>
            {children}
          </Suspense>
        </div>
        
        {/* Comparison Modal would go here */}
        
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)'
            }
          }}
        />
      </main>
    </>
  );
}