import { useState, useEffect } from 'react';

export function useAgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkVerification = () => {
      try {
        const verificationStatus = localStorage.getItem('strainmatch_age_verified');
        const verificationDate = localStorage.getItem('strainmatch_verification_date');
        
        if (verificationStatus === 'true' && verificationDate) {
          const verificationTime = new Date(verificationDate);
          const now = new Date();
          const hoursDiff = (now.getTime() - verificationTime.getTime()) / (1000 * 60 * 60);
          
          // Verification expires after 24 hours
          if (hoursDiff < 24) {
            setIsVerified(true);
          } else {
            // Clear expired verification
            localStorage.removeItem('strainmatch_age_verified');
            localStorage.removeItem('strainmatch_verification_date');
          }
        }
      } catch (error) {
        console.error('Error checking age verification:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkVerification();
  }, []);

  const setVerified = () => {
    try {
      localStorage.setItem('strainmatch_age_verified', 'true');
      localStorage.setItem('strainmatch_verification_date', new Date().toISOString());
      setIsVerified(true);
    } catch (error) {
      console.error('Error setting age verification:', error);
    }
  };

  return { isVerified, isLoading, setVerified };
}