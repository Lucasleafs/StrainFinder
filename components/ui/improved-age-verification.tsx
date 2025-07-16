"use client";

import * as React from "react";
import { Calendar, Check, X, Shield, AlertTriangle, CalendarIcon } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import { Label } from "./label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { Badge } from "./badge";
import { cn } from "./utils";

interface ImprovedAgeVerificationProps {
  onVerified: (isVerified: boolean) => void;
  minAge?: number;
  className?: string;
}

export function ImprovedAgeVerification({
  onVerified,
  minAge = 21,
  className
}: ImprovedAgeVerificationProps) {
  const [month, setMonth] = React.useState<string>('');
  const [day, setDay] = React.useState<string>('');
  const [year, setYear] = React.useState<string>('');
  const [isVerifying, setIsVerifying] = React.useState(false);
  const [error, setError] = React.useState('');

  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - minAge;

  // Generate month options
  const months = [
    { value: '01', label: 'January', short: 'Jan' },
    { value: '02', label: 'February', short: 'Feb' },
    { value: '03', label: 'March', short: 'Mar' },
    { value: '04', label: 'April', short: 'Apr' },
    { value: '05', label: 'May', short: 'May' },
    { value: '06', label: 'June', short: 'Jun' },
    { value: '07', label: 'July', short: 'Jul' },
    { value: '08', label: 'August', short: 'Aug' },
    { value: '09', label: 'September', short: 'Sep' },
    { value: '10', label: 'October', short: 'Oct' },
    { value: '11', label: 'November', short: 'Nov' },
    { value: '12', label: 'December', short: 'Dec' },
  ];

  // Generate year options
  const years = React.useMemo(() => {
    const yearArray = [];
    for (let y = maxYear; y >= minYear; y--) {
      yearArray.push({ value: y.toString(), label: y.toString() });
    }
    return yearArray;
  }, [minYear, maxYear]);

  // Generate day options - now works with just month, defaulting to current year for calculation
  const getDaysInMonth = (monthValue: string, yearValue?: string) => {
    if (!monthValue) return [];
    
    // Use provided year or current year for day calculation
    const calcYear = yearValue ? parseInt(yearValue) : currentYear;
    const daysInMonth = new Date(calcYear, parseInt(monthValue), 0).getDate();
    
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

  // Handle day reset when month/year changes and current day is invalid
  React.useEffect(() => {
    if (month && day) {
      const availableDays = getDaysInMonth(month, year);
      const dayExists = availableDays.some(d => d.value === day);
      
      if (!dayExists) {
        setDay('');
      }
    }
  }, [month, year, day]);

  // Clear error when user starts making changes
  React.useEffect(() => {
    if (error && (month || day || year)) {
      setError('');
    }
  }, [month, day, year, error]);

  const getFieldStatus = (field: 'month' | 'day' | 'year') => {
    switch (field) {
      case 'month':
        return month ? 'complete' : 'empty';
      case 'day':
        return day ? 'complete' : month ? 'ready' : 'waiting';
      case 'year':
        return year ? 'complete' : 'empty';
      default:
        return 'empty';
    }
  };

  const getFieldHelperText = (field: 'month' | 'day' | 'year') => {
    const status = getFieldStatus(field);
    
    switch (field) {
      case 'month':
        return status === 'empty' ? 'Start here' : '';
      case 'day':
        return status === 'waiting' ? 'Month first' : 
               status === 'ready' ? 'Select day' : '';
      case 'year':
        return status === 'empty' ? 'Birth year' : '';
      default:
        return '';
    }
  };

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
          <Label className="text-sm font-medium text-gray-700 mb-3 flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2 text-gray-500" />
            Date of Birth
          </Label>
          
          {/* Side-by-Side Layout: Month - Day - Year */}
          <div className="space-y-4">
            {/* Field Labels Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-600">Month</Label>
                {getFieldHelperText('month') && (
                  <span className="text-xs text-blue-600 hidden sm:inline">{getFieldHelperText('month')}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-600">Day</Label>
                {getFieldHelperText('day') && (
                  <span className={cn(
                    "text-xs hidden sm:inline",
                    getFieldStatus('day') === 'ready' ? "text-blue-600" : "text-gray-500"
                  )}>
                    {getFieldHelperText('day')}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <Label className="text-xs text-gray-600">Year</Label>
                {getFieldHelperText('year') && (
                  <span className="text-xs text-gray-500 hidden sm:inline">{getFieldHelperText('year')}</span>
                )}
              </div>
            </div>

            {/* Mobile Helper Text */}
            <div className="sm:hidden">
              {getFieldStatus('month') === 'empty' && (
                <p className="text-xs text-blue-600">Start by selecting your birth month</p>
              )}
              {getFieldStatus('day') === 'ready' && (
                <p className="text-xs text-blue-600">Now select the day</p>
              )}
              {getFieldStatus('day') === 'waiting' && (
                <p className="text-xs text-gray-500">Select month first</p>
              )}
            </div>

            {/* Date Fields Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {/* Month Selection */}
              <Select value={month} onValueChange={setMonth}>
                <SelectTrigger className={cn(
                  "h-11 transition-all duration-200",
                  getFieldStatus('month') === 'complete' ? "border-green-300 bg-green-50" : "border-gray-200"
                )}>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      <div className="flex items-center justify-between w-full">
                        <span className="hidden sm:inline">{m.label}</span>
                        <span className="sm:hidden">{m.short}</span>
                        <span className="text-xs text-gray-500 ml-2 hidden sm:inline">{m.short}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Day Selection */}
              <Select 
                value={day} 
                onValueChange={setDay} 
                disabled={!month}
              >
                <SelectTrigger className={cn(
                  "h-11 transition-all duration-200",
                  !month ? "border-gray-200 bg-gray-50 cursor-not-allowed" :
                  getFieldStatus('day') === 'complete' ? "border-green-300 bg-green-50" : 
                  "border-gray-200"
                )}>
                  <SelectValue placeholder={month ? "Day" : "--"} />
                </SelectTrigger>
                <SelectContent>
                  {days.map((d) => (
                    <SelectItem key={d.value} value={d.value}>
                      {d.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Year Selection */}
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger className={cn(
                  "h-11 transition-all duration-200",
                  getFieldStatus('year') === 'complete' ? "border-green-300 bg-green-50" : "border-gray-200"
                )}>
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

        {/* Progress Indicator */}
        {(month || day || year) && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-2">
              <div className="flex space-x-2">
                <div className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  month ? "bg-green-500" : "bg-gray-300"
                )} />
                <div className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  day ? "bg-green-500" : month ? "bg-blue-300" : "bg-gray-300"
                )} />
                <div className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  year ? "bg-green-500" : "bg-gray-300"
                )} />
              </div>
              <span className="text-xs text-gray-600">
                {[month, day, year].filter(Boolean).length} of 3 complete
              </span>
            </div>
            {isComplete && (
              <Badge variant="outline" className="text-xs bg-green-50 border-green-300 text-green-700">
                Ready to verify
              </Badge>
            )}
          </div>
        )}

        {/* Age Display */}
        {isComplete && (
          <div className={cn(
            "p-4 rounded-xl border text-center transition-all duration-300 animate-slide-up",
            isEligible 
              ? "bg-green-50 border-green-200 shadow-sm" 
              : "bg-red-50 border-red-200"
          )}>
            <div className="flex items-center justify-center space-x-2 mb-2">
              {isEligible ? (
                <Check className="w-5 h-5 text-green-600" />
              ) : (
                <X className="w-5 h-5 text-red-500" />
              )}
              <span className={cn(
                "font-medium",
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
            {isEligible ? (
              <p className="text-sm text-green-600">
                You are eligible to access this application.
              </p>
            ) : (
              <p className="text-sm text-red-600">
                You must be at least {minAge} years old to continue.
              </p>
            )}
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 animate-slide-up">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
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
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl" 
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
              {isEligible ? "Verify Age & Continue" : 
               !isComplete ? "Complete Birth Date" : "Not Eligible"}
            </div>
          )}
        </Button>

        {/* Quick Verify for Demo */}
        <div className="text-center pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-3">For demo purposes only</p>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleQuickVerify}
            disabled={isVerifying}
            className="text-xs hover:bg-gray-50"
          >
            I Am {minAge}+ (Skip Verification)
          </Button>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-gray-50 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center mb-2">
          <Shield className="w-4 h-4 text-gray-600 mr-2" />
          <span className="text-sm font-medium text-gray-700">Privacy Protected</span>
        </div>
        <p className="text-xs text-gray-600 leading-relaxed">
          Your birth date is used only for age verification and is not stored. We respect your privacy and comply with all applicable laws.
        </p>
      </div>
    </div>
  );
}