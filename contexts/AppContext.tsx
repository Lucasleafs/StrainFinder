import React, { createContext, useContext, useState, useEffect } from 'react';

// Types for our application state
interface UserPreferences {
  experience: string;
  interests: string[];
  goals: string[];
  consumptionMethods: string[];
  medicalNeeds: string[];
  preferredTime: string;
  flavorPreferences: string[];
  thcTolerance: string;
  medicalConditions: string[];
}

interface Strain {
  id: string;
  name: string;
  type: string;
  thc: number;
  cbd: number;
  [key: string]: any;
}

interface Edible {
  id: string;
  name: string;
  type: string;
  thc: number;
  cbd: number;
  [key: string]: any;
}

interface AppContextType {
  // Age and Onboarding State
  isAgeVerified: boolean;
  setIsAgeVerified: (verified: boolean) => void;
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  
  // User Preferences
  userPreferences: UserPreferences;
  setUserPreferences: (preferences: UserPreferences) => void;
  
  // Navigation
  currentView: string;
  setCurrentView: (view: string) => void;
  
  // Selected Items
  selectedStrain: Strain | null;
  selectStrain: (strain: Strain) => void;
  selectedEdible: Edible | null;
  selectEdible: (edible: Edible) => void;
  
  // Saved Items
  savedStrains: string[];
  savedConcentrates: string[];
  savedEdibles: string[];
  savedCartridges: string[];
  
  // Save/Unsave Functions
  toggleSaveStrain: (strainId: string) => void;
  toggleSaveConcentrate: (concentrateId: string) => void;
  toggleSaveEdible: (edibleId: string) => void;
  toggleSaveCartridge: (cartridgeId: string) => void;
  
  // Check if saved
  isStrainSaved: (strainId: string) => boolean;
  isConcentrateSaved: (concentrateId: string) => boolean;
  isEdibleSaved: (edibleId: string) => boolean;
  isCartridgeSaved: (cartridgeId: string) => boolean;
  
  // Search and Filters
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  activeFilters: Record<string, any>;
  setActiveFilters: (filters: Record<string, any>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Age and Onboarding State
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  
  // User Preferences
  const [userPreferences, setUserPreferences] = useState<UserPreferences>({
    experience: '',
    interests: [],
    goals: [],
    consumptionMethods: [],
    medicalNeeds: [],
    preferredTime: '',
    flavorPreferences: [],
    thcTolerance: '',
    medicalConditions: []
  });
  
  // Navigation
  const [currentView, setCurrentView] = useState('recommendations');
  
  // Selected Items
  const [selectedStrain, setSelectedStrain] = useState<Strain | null>(null);
  const [selectedEdible, setSelectedEdible] = useState<Edible | null>(null);
  
  // Saved Items
  const [savedStrains, setSavedStrains] = useState<string[]>([]);
  const [savedConcentrates, setSavedConcentrates] = useState<string[]>([]);
  const [savedEdibles, setSavedEdibles] = useState<string[]>([]);
  const [savedCartridges, setSavedCartridges] = useState<string[]>([]);
  
  // Search and Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  
  // Load saved data from localStorage on mount
  useEffect(() => {
    try {
      // Load age verification
      const ageVerified = localStorage.getItem('ageVerified');
      const verificationDate = localStorage.getItem('verificationDate');
      if (ageVerified === 'true' && verificationDate) {
        const dateVerified = new Date(verificationDate);
        const now = new Date();
        const daysDiff = (now.getTime() - dateVerified.getTime()) / (1000 * 3600 * 24);
        
        // Age verification expires after 30 days
        if (daysDiff < 30) {
          setIsAgeVerified(true);
        } else {
          localStorage.removeItem('ageVerified');
          localStorage.removeItem('verificationDate');
        }
      }
      
      // Load onboarding status
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      if (onboardingComplete === 'true') {
        setHasCompletedOnboarding(true);
      }
      
      // Load user preferences
      const savedPreferences = localStorage.getItem('userPreferences');
      if (savedPreferences) {
        setUserPreferences(JSON.parse(savedPreferences));
      }
      
      // Load saved items
      const savedStrainsData = localStorage.getItem('savedStrains');
      if (savedStrainsData) {
        setSavedStrains(JSON.parse(savedStrainsData));
      }
      
      const savedConcentratesData = localStorage.getItem('savedConcentrates');
      if (savedConcentratesData) {
        setSavedConcentrates(JSON.parse(savedConcentratesData));
      }
      
      const savedEdiblesData = localStorage.getItem('savedEdibles');
      if (savedEdiblesData) {
        setSavedEdibles(JSON.parse(savedEdiblesData));
      }
      
      const savedCartridgesData = localStorage.getItem('savedCartridges');
      if (savedCartridgesData) {
        setSavedCartridges(JSON.parse(savedCartridgesData));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
  }, []);
  
  // Save functions
  const toggleSaveStrain = (strainId: string) => {
    setSavedStrains(prev => {
      const newSaved = prev.includes(strainId)
        ? prev.filter(id => id !== strainId)
        : [...prev, strainId];
      localStorage.setItem('savedStrains', JSON.stringify(newSaved));
      return newSaved;
    });
  };
  
  const toggleSaveConcentrate = (concentrateId: string) => {
    setSavedConcentrates(prev => {
      const newSaved = prev.includes(concentrateId)
        ? prev.filter(id => id !== concentrateId)
        : [...prev, concentrateId];
      localStorage.setItem('savedConcentrates', JSON.stringify(newSaved));
      return newSaved;
    });
  };
  
  const toggleSaveEdible = (edibleId: string) => {
    setSavedEdibles(prev => {
      const newSaved = prev.includes(edibleId)
        ? prev.filter(id => id !== edibleId)
        : [...prev, edibleId];
      localStorage.setItem('savedEdibles', JSON.stringify(newSaved));
      return newSaved;
    });
  };
  
  const toggleSaveCartridge = (cartridgeId: string) => {
    setSavedCartridges(prev => {
      const newSaved = prev.includes(cartridgeId)
        ? prev.filter(id => id !== cartridgeId)
        : [...prev, cartridgeId];
      localStorage.setItem('savedCartridges', JSON.stringify(newSaved));
      return newSaved;
    });
  };
  
  // Check if saved functions
  const isStrainSaved = (strainId: string) => savedStrains.includes(strainId);
  const isConcentrateSaved = (concentrateId: string) => savedConcentrates.includes(concentrateId);
  const isEdibleSaved = (edibleId: string) => savedEdibles.includes(edibleId);
  const isCartridgeSaved = (cartridgeId: string) => savedCartridges.includes(cartridgeId);
  
  // Select functions
  const selectStrain = (strain: Strain) => {
    setSelectedStrain(strain);
  };
  
  const selectEdible = (edible: Edible) => {
    setSelectedEdible(edible);
  };
  
  const value: AppContextType = {
    // Age and Onboarding
    isAgeVerified,
    setIsAgeVerified,
    hasCompletedOnboarding,
    setHasCompletedOnboarding,
    
    // User Preferences
    userPreferences,
    setUserPreferences,
    
    // Navigation
    currentView,
    setCurrentView,
    
    // Selected Items
    selectedStrain,
    selectStrain,
    selectedEdible,
    selectEdible,
    
    // Saved Items
    savedStrains,
    savedConcentrates,
    savedEdibles,
    savedCartridges,
    
    // Save/Unsave Functions
    toggleSaveStrain,
    toggleSaveConcentrate,
    toggleSaveEdible,
    toggleSaveCartridge,
    
    // Check if saved
    isStrainSaved,
    isConcentrateSaved,
    isEdibleSaved,
    isCartridgeSaved,
    
    // Search and Filters
    searchTerm,
    setSearchTerm,
    activeFilters,
    setActiveFilters
  };
  
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};