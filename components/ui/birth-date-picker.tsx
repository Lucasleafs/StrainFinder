import React, { useState, useEffect } from 'react';

interface BirthDatePickerProps {
  value?: Date;
  onChange: (date: Date | undefined) => void;
  placeholder?: string;
  minAge?: number;
  maxAge?: number;
  className?: string;
  required?: boolean;
}

export function BirthDatePicker({
  value,
  onChange,
  placeholder = "Select your birth date",
  minAge = 0,
  maxAge = 100,
  className = '',
  required = false
}: BirthDatePickerProps) {
  const [month, setMonth] = useState<string>('');
  const [day, setDay] = useState<string>('');
  const [year, setYear] = useState<string>('');

  // Initialize from value prop
  useEffect(() => {
    if (value) {
      setMonth((value.getMonth() + 1).toString().padStart(2, '0'));
      setDay(value.getDate().toString().padStart(2, '0'));
      setYear(value.getFullYear().toString());
    } else {
      setMonth('');
      setDay('');
      setYear('');
    }
  }, [value]);

  // Update parent when individual fields change
  useEffect(() => {
    if (month && day && year) {
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      if (isValidDate(date, month, day, year)) {
        onChange(date);
      } else {
        onChange(undefined);
      }
    } else {
      onChange(undefined);
    }
  }, [month, day, year, onChange]);

  // Generate options for dropdowns
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

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = i + 1;
    return { value: day.toString().padStart(2, '0'), label: day.toString() };
  });

  const currentYear = new Date().getFullYear();
  const startYear = currentYear - maxAge;
  const endYear = currentYear - minAge;
  const years = Array.from({ length: endYear - startYear + 1 }, (_, i) => {
    const year = endYear - i;
    return { value: year.toString(), label: year.toString() };
  });

  const selectClassName = `w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm bg-white ${
    required && (!month || !day || !year) ? 'border-red-300' : ''
  }`;

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="grid grid-cols-3 gap-3">
        {/* Month Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Month {required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className={selectClassName}
            required={required}
          >
            <option value="">Month</option>
            {months.map(monthOption => (
              <option key={monthOption.value} value={monthOption.value}>
                {monthOption.label}
              </option>
            ))}
          </select>
        </div>

        {/* Day Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Day {required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className={selectClassName}
            required={required}
          >
            <option value="">Day</option>
            {days.map(dayOption => (
              <option key={dayOption.value} value={dayOption.value}>
                {dayOption.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year Selector */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Year {required && <span className="text-red-500">*</span>}
          </label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className={selectClassName}
            required={required}
          >
            <option value="">Year</option>
            {years.map(yearOption => (
              <option key={yearOption.value} value={yearOption.value}>
                {yearOption.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {month && day && year && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Selected: {months.find(m => m.value === month)?.label} {day}, {year}
          </p>
        </div>
      )}
    </div>
  );
}

// Utility function to validate birth date
function isValidDate(date: Date, month: string, day: string, year: string): boolean {
  const monthNum = parseInt(month);
  const dayNum = parseInt(day);
  const yearNum = parseInt(year);
  
  return date.getFullYear() === yearNum && 
         date.getMonth() === monthNum - 1 && 
         date.getDate() === dayNum;
}

// Utility function to calculate age from birth date
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

export default BirthDatePicker;