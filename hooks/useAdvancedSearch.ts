import { useState, useMemo, useCallback } from 'react';
import { useDebounce } from './useDebounce';

export interface SearchFilters {
  searchTerm: string;
  type: string;
  minThc?: number;
  maxThc?: number;
  minCbd?: number;
  maxCbd?: number;
  effects: string[];
  flavors: string[];
  priceRange: [number, number];
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface UseAdvancedSearchProps<T> {
  data: T[];
  searchFields: (keyof T)[];
  defaultFilters: Partial<SearchFilters>;
}

export function useAdvancedSearch<T extends Record<string, any>>({
  data,
  searchFields,
  defaultFilters
}: UseAdvancedSearchProps<T>) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: '',
    type: 'all',
    effects: [],
    flavors: [],
    priceRange: [0, 100],
    sortBy: 'rating',
    sortOrder: 'desc',
    ...defaultFilters
  });

  const debouncedSearchTerm = useDebounce(filters.searchTerm, 300);

  const filteredData = useMemo(() => {
    let filtered = data.filter(item => {
      // Text search
      const matchesSearch = debouncedSearchTerm === '' || 
        searchFields.some(field => {
          const value = item[field];
          if (typeof value === 'string') {
            return value.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
          }
          if (Array.isArray(value)) {
            return value.some(v => 
              typeof v === 'string' && v.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
            );
          }
          return false;
        });

      // Type filter
      const matchesType = filters.type === 'all' || item.type === filters.type;

      // THC range filter
      const matchesThc = (!filters.minThc || item.thc >= filters.minThc) &&
                        (!filters.maxThc || item.thc <= filters.maxThc);

      // CBD range filter
      const matchesCbd = (!filters.minCbd || item.cbd >= filters.minCbd) &&
                        (!filters.maxCbd || item.cbd <= filters.maxCbd);

      // Effects filter
      const matchesEffects = filters.effects.length === 0 || 
        (item.effects && filters.effects.some(effect => item.effects.includes(effect)));

      // Flavors filter (for products that have flavor profiles)
      const matchesFlavors = filters.flavors.length === 0 || 
        (item.flavorProfile && filters.flavors.some(flavor => item.flavorProfile.includes(flavor))) ||
        (item.flavors && filters.flavors.some(flavor => item.flavors.includes(flavor)));

      // Price range filter
      const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0');
      const matchesPrice = price >= filters.priceRange[0] && price <= filters.priceRange[1];

      return matchesSearch && matchesType && matchesThc && matchesCbd && 
             matchesEffects && matchesFlavors && matchesPrice;
    });

    // Sorting
    filtered.sort((a, b) => {
      let aVal = a[filters.sortBy];
      let bVal = b[filters.sortBy];

      if (filters.sortBy === 'price') {
        aVal = parseFloat(a.price?.replace(/[^0-9.]/g, '') || '0');
        bVal = parseFloat(b.price?.replace(/[^0-9.]/g, '') || '0');
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return filters.sortOrder === 'asc' 
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return filters.sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }

      return 0;
    });

    return filtered;
  }, [data, debouncedSearchTerm, filters, searchFields]);

  const updateFilter = useCallback(<K extends keyof SearchFilters>(
    key: K, 
    value: SearchFilters[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      type: 'all',
      effects: [],
      flavors: [],
      priceRange: [0, 100],
      sortBy: 'rating',
      sortOrder: 'desc',
      ...defaultFilters
    });
  }, [defaultFilters]);

  const getFilterSummary = useCallback(() => {
    const activeFilters = [];
    if (filters.searchTerm) activeFilters.push(`Search: "${filters.searchTerm}"`);
    if (filters.type !== 'all') activeFilters.push(`Type: ${filters.type}`);
    if (filters.effects.length > 0) activeFilters.push(`Effects: ${filters.effects.join(', ')}`);
    if (filters.flavors.length > 0) activeFilters.push(`Flavors: ${filters.flavors.join(', ')}`);
    if (filters.minThc || filters.maxThc) {
      activeFilters.push(`THC: ${filters.minThc || 0}-${filters.maxThc || 100}%`);
    }
    return activeFilters;
  }, [filters]);

  return {
    filters,
    filteredData,
    updateFilter,
    resetFilters,
    getFilterSummary,
    resultCount: filteredData.length
  };
}