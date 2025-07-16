// Simple utility for combining class names
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Type for class values (to match clsx interface)
export type ClassValue = string | number | boolean | undefined | null | ClassArray | ClassDictionary;
export type ClassDictionary = Record<string, any>;
export type ClassArray = ClassValue[];