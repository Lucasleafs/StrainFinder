"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw } from "lucide-react";
import { DayPicker } from "react-day-picker@8.10.1";
import { cn } from "./utils";
import { buttonVariants } from "./button";
import { Button } from "./button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";

export interface EnhancedCalendarProps extends React.ComponentProps<typeof DayPicker> {
  enableYearNavigation?: boolean;
  enableMonthNavigation?: boolean;
  enableQuickYear?: boolean;
  yearRange?: [number, number];
  onYearChange?: (year: number) => void;
  onMonthChange?: (month: number) => void;
}

function EnhancedCalendar({
  className,
  classNames,
  showOutsideDays = true,
  enableYearNavigation = true,
  enableMonthNavigation = true,
  enableQuickYear = true,
  yearRange,
  onYearChange,
  onMonthChange,
  ...props
}: EnhancedCalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(
    props.defaultMonth || new Date()
  );

  const currentYear = currentMonth.getFullYear();
  const currentMonthNumber = currentMonth.getMonth();

  // Calculate year range
  const defaultYearRange: [number, number] = [1920, new Date().getFullYear()];
  const [minYear, maxYear] = yearRange || defaultYearRange;

  // Generate year options (newest first for easier selection)
  const yearOptions = React.useMemo(() => {
    const years = [];
    for (let year = maxYear; year >= minYear; year--) {
      years.push(year);
    }
    return years;
  }, [minYear, maxYear]);

  // Month names
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearChange = (year: string) => {
    const newYear = parseInt(year);
    const newDate = new Date(newYear, currentMonthNumber, 1);
    setCurrentMonth(newDate);
    onYearChange?.(newYear);
  };

  const handleMonthChange = (month: string) => {
    const newMonth = parseInt(month);
    const newDate = new Date(currentYear, newMonth, 1);
    setCurrentMonth(newDate);
    onMonthChange?.(newMonth);
  };

  const handlePreviousMonth = () => {
    const newDate = new Date(currentYear, currentMonthNumber - 1, 1);
    setCurrentMonth(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentYear, currentMonthNumber + 1, 1);
    setCurrentMonth(newDate);
  };

  const handlePreviousYear = () => {
    const newDate = new Date(currentYear - 1, currentMonthNumber, 1);
    setCurrentMonth(newDate);
  };

  const handleNextYear = () => {
    const newDate = new Date(currentYear + 1, currentMonthNumber, 1);
    setCurrentMonth(newDate);
  };

  const resetToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
  };

  // Common year presets for age verification
  const getYearPresets = () => {
    const currentYear = new Date().getFullYear();
    return [
      { label: "I'm 21 (born in " + (currentYear - 21) + ")", value: currentYear - 21 },
      { label: "I'm 25 (born in " + (currentYear - 25) + ")", value: currentYear - 25 },
      { label: "I'm 30 (born in " + (currentYear - 30) + ")", value: currentYear - 30 },
      { label: "I'm 40 (born in " + (currentYear - 40) + ")", value: currentYear - 40 },
      { label: "I'm 50 (born in " + (currentYear - 50) + ")", value: currentYear - 50 },
      { label: "I'm 60+ (born before " + (currentYear - 60) + ")", value: currentYear - 65 },
    ];
  };

  return (
    <div className="space-y-4">
      {/* Enhanced Navigation Header */}
      <div className="flex flex-col space-y-3 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700 flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Select Your Birth Date
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetToToday}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
            Today
          </Button>
        </div>

        {/* Quick Year Selection */}
        {enableQuickYear && (
          <div className="space-y-2">
            <p className="text-xs text-gray-600">Quick selection:</p>
            <div className="grid grid-cols-2 gap-2">
              {getYearPresets().map((preset) => (
                <Button
                  key={preset.value}
                  variant="outline"
                  size="sm"
                  onClick={() => handleYearChange(preset.value.toString())}
                  className="text-xs py-1 h-8 justify-start"
                >
                  {preset.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Year and Month Selectors */}
        <div className="flex items-center space-x-2">
          {/* Year Navigation */}
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousYear}
              disabled={currentYear <= minYear}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-3 w-3" />
              <ChevronLeft className="h-3 w-3 -ml-2" />
            </Button>
            
            {enableYearNavigation ? (
              <Select value={currentYear.toString()} onValueChange={handleYearChange}>
                <SelectTrigger className="w-20 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-48">
                  {yearOptions.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="w-20 h-8 flex items-center justify-center text-sm font-medium">
                {currentYear}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextYear}
              disabled={currentYear >= maxYear}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-3 w-3" />
              <ChevronRight className="h-3 w-3 -ml-2" />
            </Button>
          </div>

          {/* Month Navigation */}
          <div className="flex items-center space-x-1 flex-1">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-3 w-3" />
            </Button>

            {enableMonthNavigation ? (
              <Select value={currentMonthNumber.toString()} onValueChange={handleMonthChange}>
                <SelectTrigger className="flex-1 h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {monthNames.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="flex-1 h-8 flex items-center justify-center text-sm font-medium">
                {monthNames[currentMonthNumber]}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextMonth}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <DayPicker
        month={currentMonth}
        onMonthChange={setCurrentMonth}
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row gap-2",
          month: "flex flex-col gap-4",
          caption: "flex justify-center pt-1 relative items-center w-full",
          caption_label: "text-sm font-medium",
          nav: "hidden", // We're using our custom navigation
          table: "w-full border-collapse space-x-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] text-center",
          row: "flex w-full mt-2",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
            props.mode === "range"
              ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
              : "[&:has([aria-selected])]:rounded-md",
          ),
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "size-9 p-0 font-normal aria-selected:opacity-100 hover:bg-green-50 hover:text-green-700 transition-colors",
          ),
          day_range_start: "day-range-start aria-selected:bg-green-600 aria-selected:text-white hover:bg-green-700",
          day_range_end: "day-range-end aria-selected:bg-green-600 aria-selected:text-white hover:bg-green-700",
          day_selected: "bg-green-600 text-white hover:bg-green-700 hover:text-white focus:bg-green-600 focus:text-white",
          day_today: "bg-blue-100 text-blue-700 font-semibold",
          day_outside: "day-outside text-muted-foreground opacity-50 aria-selected:text-muted-foreground",
          day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed",
          day_range_middle: "aria-selected:bg-green-100 aria-selected:text-green-700",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ className, ...props }) => (
            <ChevronLeft className={cn("size-4", className)} {...props} />
          ),
          IconRight: ({ className, ...props }) => (
            <ChevronRight className={cn("size-4", className)} {...props} />
          ),
        }}
        {...props}
      />
    </div>
  );
}

export { EnhancedCalendar };