import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { SimpleAgeVerification } from './ui/simple-age-verification';
import { Separator } from './ui/separator';
import { Leaf, User, Clock, Shield, Star, Lock, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

function SimplifiedAgeVerification() {
  const { setIsAgeVerified } = useApp();
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerified = (verified: boolean) => {
    if (verified) {
      setIsAgeVerified(true);
    }
  };

  const handleQuickVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsAgeVerified(true);
      setIsVerifying(false);
    }, 500);
  };

  return (
    <div className="min-h-screen cannabis-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-lg wellness-card">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="icon-circle bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-h2 text-gradient-cannabis">
            StrainMatch
          </CardTitle>
          <CardDescription className="text-subtitle">
            Cannabis Strain Recommendations & Education
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-3">
            <div className="stat-card p-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="icon-circle bg-blue-100 p-2 mb-2 mx-auto">
                <User className="w-3 h-3 text-blue-600" />
              </div>
              <div className="text-xs font-semibold text-blue-700">Adult Only</div>
              <div className="text-xs text-blue-600 mt-1">21+ Required</div>
            </div>
            <div className="stat-card p-3 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="icon-circle bg-green-100 p-2 mb-2 mx-auto">
                <Clock className="w-3 h-3 text-green-600" />
              </div>
              <div className="text-xs font-semibold text-green-700">Quick Process</div>
              <div className="text-xs text-green-600 mt-1">30 seconds</div>
            </div>
            <div className="stat-card p-3 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="icon-circle bg-purple-100 p-2 mb-2 mx-auto">
                <Lock className="w-3 h-3 text-purple-600" />
              </div>
              <div className="text-xs font-semibold text-purple-700">Secure</div>
              <div className="text-xs text-purple-600 mt-1">Private</div>
            </div>
          </div>

          {/* Simplified Age Verification */}
          <SimpleAgeVerification 
            onVerified={handleVerified}
            minAge={21}
          />

          {/* Legal Compliance Notice */}
          <div className="bg-gray-50 rounded-xl p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Legal Compliance</span>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                By entering, you certify that you are 21+ years of age and agree to use cannabis responsibly in accordance with local and state laws.
              </p>
              <p className="text-xs text-gray-500">
                Cannabis products have not been evaluated by the FDA and are not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default SimplifiedAgeVerification;