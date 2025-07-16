"use client";

import * as React from "react";
import { Calendar, Check, X, Shield, AlertTriangle } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Badge } from "./badge";
import { cn } from "./utils";

interface StandardizedSimpleAgeVerificationProps {
  onVerified: (isVerified: boolean) => void;
  minAge?: number;
  className?: string;
}

export function StandardizedSimpleAgeVerification({
  onVerified,
  minAge = 21,
  className
}: StandardizedSimpleAgeVerificationProps) {
  const [month, setMonth] = React.useState<string>('');
  const [day, setDay] = React.useState<string>('');
  const [year, setYear] = React.useState<string>('');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [error, setError] = React.useState('');

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - minAge;

  // Generate options
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
    { value: '12', label: 'December' },
  ];

  const years = React.useMemo(() => {
    const yearArray = [];
    for (let y = maxYear; y >= minYear; y--) {
      yearArray.push({ value: y.toString(), label: y.toString() });
    }
    return yearArray;
  }, [minYear, maxYear]);

  const getDaysInMonth = (month: string, year: string) => {
    if (!month || !year) return [];
    
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    const dayArray = [];
    for (let d = 1; d <= daysInMonth; d++) {
      const dayString = d.toString().padStart(2, '0');
      dayArray.push({ value: dayString, label: d.toString() });
    }
    return dayArray;
  };

  const days = React.useMemo(() => {
    return getDaysInMonth(month, year);
  }, [month, year]);

  const calculateAge = (birthMonth: string, birthDay: string, birthYear: string): number => {
    const today = new Date();
    const birthDate = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };

  const isComplete = month && day && year;
  const currentAge = isComplete ? calculateAge(month, day, year) : null;
  const isEligible = currentAge !== null && currentAge >= minAge;

  const handleVerify = () => {
    if (!isComplete) {
      setError('Please select your complete birth date.');
      return;
    }

    if (!isEligible) {
      setError(`You must be ${minAge} or older to continue.`);
      return;
    }

    setIsVerifying(true);
    setError('');

    // Simulate verification delay
    setTimeout(() => {
      onVerified(true);
      setIsVerifying(false);
    }, 1000);
  };

  const handleQuickVerify = () => {
    setIsVerifying(true);
    setTimeout(() => {
      onVerified(true);
      setIsVerifying(false);
    }, 500);
  };

  // Reset day if it's invalid for the selected month
  React.useEffect(() => {
    if (month && year && day) {
      const maxDays = getDaysInMonth(month, year).length;
      if (parseInt(day) > maxDays) {
        setDay('');
      }
    }
  }, [month, year, day]);

  return (
    <div className={cn("space-y-6", className)}>
      {/* Age Requirement Notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-start space-x-3">
          <div className="bg-amber-100 p-2 rounded-full">
            <Shield className="h-4 w-4 text-amber-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-amber-800">Age Verification Required</h4>
            <p className="text-xs text-amber-700 mt-1">
              You must be {minAge} or older to access this application. Please enter your birth date below.
            </p>
          </div>
        </div>
      </div>

      {/* Birth Date Inputs */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">
            Date of Birth
          </Label>
          
          <div className="grid grid-cols-3 gap-3">
            {/* Month */}
            <div>
              <Label className="text-xs text-gray-600 mb-1 block">Month</Label>
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Day */}
            <div>
              <Label className="text-xs text-gray-600 mb-1 block">Day</Label>
              <Select value={day} onValueChange={setDay} disabled={!month || !year}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Year */}
            <div>
              <Label className="text-xs text-gray-600 mb-1 block">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className="h-10">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {years.map((y) => (
                    <SelectItem key={y.value} value={y.value}>
                      {y.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Age Display */}
        {isComplete && (
          <div className={cn(
            "p-3 rounded-lg border text-center transition-colors",
            isEligible 
              ? "bg-green-50 border-green-200" 
              : "bg-red-50 border-red-200"
          )}>
            <div className="flex items-center justify-center space-x-2">
              {isEligible ? (
                <Check className="w-4 h-4 text-green-600" />
              ) : (
                <X className="w-4 h-4 text-red-500" />
              )}
              <span className={cn(
                "text-sm font-medium",
                isEligible ? "text-green-700" : "text-red-700"
              )}>
                Age: {currentAge} years old
              </span>
              <Badge 
                variant={isEligible ? "default" : "destructive"} 
                className="text-xs"
              >
                {isEligible ? "Eligible" : "Too Young"}
              </Badge>
            </div>
            {!isEligible && (
              <p className="text-xs text-red-600 mt-1">
                You must be at least {minAge} years old to continue.
              </p>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Verify Button */}
        <Button 
          onClick={handleVerify}
          disabled={isVerifying || !isEligible || !isComplete}
          className={cn(
            "w-full h-12 font-medium transition-all duration-200",
            isEligible 
              ? "bg-green-600 hover:bg-green-700 text-white" 
              : "bg-gray-300 cursor-not-allowed text-gray-500"
          )}
        >
          {isVerifying ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Verifying your age...
            </div>
          ) : (
            <div className="flex items-center justify-center">
              {isEligible && <Check className="w-4 h-4 mr-2" />}
              {isEligible ? "Verify Age & Continue" : "Complete Birth Date"}
            </div>
          )}
        </Button>

        {/* Quick Verify for Demo */}
        <div className="text-center pt-4 border-t">
          <p className="text-xs text-gray-500 mb-2">For demo purposes only</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleQuickVerify}
            disabled={isVerifying}
            className="text-xs"
          >
            I Am {minAge}+ (Skip Verification)
          </Button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 rounded-lg p-3 text-center">
        <div className="flex items-center justify-center mb-1">
          <Shield className="w-3 h-3 text-gray-600 mr-1" />
          <span className="text-xs font-medium text-gray-700">Privacy Protected</span>
        </div>
        <p className="text-xs text-gray-600">
          Your birth date is used only for age verification and is not stored.
        </p>
      </div>
    </div>
  );
}