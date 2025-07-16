import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Leaf, User, Clock, Shield, CheckCircle, Calendar } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

function StandardizedAgeVerification() {
  const { setIsAgeVerified } = useApp();
  const [birthMonth, setBirthMonth] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [birthYear, setBirthYear] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState('');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];
  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

  const handleVerification = () => {
    if (!birthMonth || !birthDay || !birthYear) {
      setError('Please select your complete birth date.');
      return;
    }

    const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
      ? age - 1 
      : age;

    if (actualAge < 21) {
      setError('You must be 21 years of age or older to access this content.');
      return;
    }

    setIsVerifying(true);
    setError('');
    
    setTimeout(() => {
      setIsAgeVerified(true);
      setIsVerifying(false);
    }, 1000);
  };

  const handleQuickVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      setIsAgeVerified(true);
      setIsVerifying(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50/30 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="h-8 w-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent">
            StrainMatch
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Cannabis Wellness & Education
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-xs font-semibold text-blue-700">Adult Only</div>
              <div className="text-xs text-blue-600">21+ Required</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-xs font-semibold text-green-700">Quick Process</div>
              <div className="text-xs text-green-600">30 Seconds</div>
            </div>
            <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-xs font-semibold text-purple-700">Secure</div>
              <div className="text-xs text-purple-600">Private</div>
            </div>
          </div>

          {/* Age Verification Form */}
          <div className="space-y-4">
            <div className="text-center mb-4">
              <Calendar className="w-6 h-6 text-gray-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800">Enter Your Birth Date</h3>
              <p className="text-sm text-gray-600">You must be 21+ to continue</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <Select value={birthMonth} onValueChange={setBirthMonth}>
                  <SelectTrigger>
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map(month => (
                      <SelectItem key={month.value} value={month.value}>
                        {month.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={birthDay} onValueChange={setBirthDay}>
                  <SelectTrigger>
                    <SelectValue placeholder="Day" />
                  </SelectTrigger>
                  <SelectContent>
                    {days.map(day => (
                      <SelectItem key={day} value={day}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={birthYear} onValueChange={setBirthYear}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map(year => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 text-center bg-red-50 p-3 rounded-lg">
                {error}
              </div>
            )}

            <Button 
              onClick={handleVerification}
              disabled={isVerifying || !birthMonth || !birthDay || !birthYear}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
            >
              {isVerifying ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Verify Age
                </div>
              )}
            </Button>

            {/* Quick Demo Access */}
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-2">For demo purposes only:</p>
              <Button 
                onClick={handleQuickVerify}
                variant="outline"
                size="sm"
                className="text-xs"
              >
                Demo Access (21+)
              </Button>
            </div>
          </div>

          {/* Legal Compliance Notice */}
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="w-4 h-4 text-gray-600 mr-2" />
              <span className="text-sm font-semibold text-gray-700">Legal Compliance</span>
            </div>
            <div className="space-y-2">
              <p className="text-xs text-gray-600 leading-relaxed">
                By entering, you certify that you are 21 years of age or older and agree to use cannabis responsibly in accordance with local and state laws.
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

export default StandardizedAgeVerification;