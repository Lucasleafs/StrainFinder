// Comprehensive type definitions for the entire app
export interface Strain {
  id: string;
  name: string;
  type: 'indica' | 'sativa' | 'hybrid';
  thc: number;
  cbd: number;
  effects: string[];
  flavors: string[];
  medicalUses: string[];
  genetics: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  dispensaries: string[];
  price?: string;
  growDifficulty?: 'easy' | 'moderate' | 'difficult';
  floweringTime?: string;
  yield?: string;
}

export interface Concentrate {
  id: string;
  name: string;
  type: 'shatter' | 'wax' | 'live_resin' | 'rosin' | 'budder' | 'crumble' | 'sauce' | 'diamonds' | 'hash' | 'distillate';
  extractionMethod: 'BHO' | 'CO2' | 'Rosin Press' | 'Ice Water' | 'Ethanol' | 'Distillation';
  consistency: 'glass-like' | 'waxy' | 'sauce-like' | 'crystalline' | 'crumbly' | 'butter-like' | 'liquid' | 'powder' | 'pressed';
  thc: number;
  cbd: number;
  terpenesPreserved: boolean;
  flavorProfile: string[];
  effects: string[];
  strainOrigin: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  dispensaries: string[];
  labTested: boolean;
  solventFree: boolean;
}

export interface Edible {
  id: string;
  name: string;
  type: 'gummies' | 'chocolate' | 'cookies' | 'beverages' | 'mints' | 'hard_candy' | 'baked_goods' | 'savory' | 'capsules' | 'tinctures';
  brand: string;
  thc: number;
  cbd: number;
  servingSize: string;
  servingsPerPackage: number;
  totalThc: number;
  totalCbd: number;
  onsetTime: string;
  duration: string;
  effects: string[];
  flavors: string[];
  ingredients: string[];
  strainOrigin?: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  dispensaries: string[];
  labTested: boolean;
  vegan?: boolean;
  glutenFree?: boolean;
  sugarFree?: boolean;
}

export interface Cartridge {
  id: string;
  name: string;
  type: 'distillate' | 'live_resin' | 'rosin' | 'CO2_oil' | 'full_spectrum';
  brand: string;
  size: string; // 0.5g, 1g, etc.
  thc: number;
  cbd: number;
  strainType: 'indica' | 'sativa' | 'hybrid';
  extractionMethod: 'CO2' | 'BHO' | 'Distillation' | 'Rosin Press';
  hardware: '510_thread' | 'pax_era' | 'proprietary';
  flavorProfile: string[];
  effects: string[];
  strainOrigin: string;
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  dispensaries: string[];
  labTested: boolean;
  addedTerpenes: boolean;
  naturalTerpenes: boolean;
}

export interface UserPreferences {
  desiredEffects: string[];
  medicalConditions?: string[];
  experienceLevel: 'beginner' | 'intermediate' | 'experienced';
  preferredConsumptionMethod: 'smoking' | 'vaping' | 'edibles' | 'concentrates';
  thcTolerance: 'low' | 'medium' | 'high';
  preferredTimeOfUse: 'morning' | 'afternoon' | 'evening' | 'night';
  avoidEffects?: string[];
  budgetRange?: 'low' | 'medium' | 'high';
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  itemId: string;
  itemType: 'strain' | 'concentrate' | 'edible' | 'cartridge';
  rating: number;
  title: string;
  content: string;
  effects: string[];
  helpfulCount: number;
  createdAt: Date;
  verified: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email?: string;
  preferences: UserPreferences;
  savedStrains: string[];
  savedConcentrates: string[];
  savedEdibles: string[];
  savedCartridges: string[];
  reviews: Review[];
  moodJournal: MoodEntry[];
  createdAt: Date;
  lastActive: Date;
}

export interface MoodEntry {
  id: string;
  date: Date;
  strainId?: string;
  concentrateId?: string;
  edibleId?: string;
  cartridgeId?: string;
  mood: 'great' | 'good' | 'okay' | 'poor';
  effects: string[];
  notes: string;
  dosage?: string;
  consumptionMethod: string;
}

export interface Dispensary {
  id: string;
  name: string;
  address: string;
  phone: string;
  website?: string;
  rating: number;
  verified: boolean;
  delivery: boolean;
  pickup: boolean;
  hours: {
    [key: string]: string;  // day: hours
  };
}

export interface SearchFilters {
  type?: 'all' | 'indica' | 'sativa' | 'hybrid';
  thcRange?: [number, number];
  cbdRange?: [number, number];
  effects?: string[];
  flavors?: string[];
  medicalUses?: string[];
  priceRange?: 'all' | 'low' | 'medium' | 'high';
  rating?: number;
  availability?: 'all' | 'in-stock' | 'delivery';
}

export interface AppState {
  user: UserProfile | null;
  currentView: string;
  selectedStrain: Strain | null;
  selectedConcentrate: Concentrate | null;
  selectedEdible: Edible | null;
  selectedCartridge: Cartridge | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: SearchFilters;
}

export type ViewType = 
  | 'onboarding' 
  | 'recommendations' 
  | 'explore' 
  | 'concentrates' 
  | 'edibles'
  | 'cartridges'
  | 'profile' 
  | 'detail' 
  | 'concentrate-detail'
  | 'edible-detail'
  | 'cartridge-detail'
  | 'dispensaries'
  | 'journal';