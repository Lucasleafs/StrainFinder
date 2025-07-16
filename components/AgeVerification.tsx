import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { format } from 'date-fns';
import { CalendarIcon, Shield, AlertTriangle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function AgeVerification() {
  const { setIsAgeVerified } = useApp();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [error, setError] = useState('');

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    setError('');
    
    const age = calculateAge(date);
    
    if (age >= 21) {
      localStorage.setItem('ageVerified', 'true');
      localStorage.setItem('verificationDate', new Date().toISOString());
      setIsAgeVerified(true);
    } else {
      setError(`You must be 21 or older to access this site. You are currently ${age} years old.`);
    }
  };

  const handleQuickVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    localStorage.setItem('verificationDate', new Date().toISOString());
    setIsAgeVerified(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50/30 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">Age Verification</CardTitle>
          <p className="text-gray-600">
            You must be 21 or older to access cannabis information
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Button 
              onClick={handleQuickVerify}
              className="w-full bg-green-600 hover:bg-green-700"
              size="lg"
            >
              I am 21 or older
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or verify with birth date</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowCalendar(!showCalendar)}
              className="w-full justify-start"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Select your birth date'}
            </Button>
            
            {showCalendar && (
              <div className="border rounded-lg p-4">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => date > new Date()}
                  initialFocus
                  defaultMonth={new Date(2002, 0)}
                />
              </div>
            )}
            
            {error && (
              <div className="flex items-start space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>

          <Button 
            variant="ghost" 
            onClick={() => window.location.href = 'https://www.samhsa.gov/'}
            className="w-full text-gray-600"
          >
            I am under 21
          </Button>
          
          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>This site provides information about cannabis for adults 21+</p>
            <p>By continuing, you certify that you are of legal age</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AgeVerification;