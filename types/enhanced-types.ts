// Enhanced type definitions with new product categories and features
export interface Strain {
  id: string;
  name: string;
  type: 'indica' | 'sativa' | 'hybrid';
  thc: number;
  cbd: number;
  cbg?: number;
  cbn?: number;
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
  // Enhanced terpene profile
  terpeneProfile?: {
    myrcene: number;
    limonene: number;
    pinene: number;
    caryophyllene: number;
    humulene: number;
    linalool: number;
    terpinolene?: number;
    ocimene?: number;
    bisabolol?: number;
  };
  // Additional metadata
  harvestDate?: Date;
  batchNumber?: string;
  organicCertified?: boolean;
  labResults?: LabResult[];
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
  // Enhanced data
  terpeneProfile?: TerpeneProfile;
  productionDate?: Date;
  expirationDate?: Date;
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
  // Enhanced nutrition info
  nutritionFacts?: NutritionFacts;
  allergens?: string[];
}

export interface Cartridge {
  id: string;
  name: string;
  type: 'distillate' | 'live_resin' | 'rosin' | 'CO2_oil' | 'full_spectrum';
  brand: string;
  size: string;
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
  // Enhanced vape data
  oilColor?: string;
  viscosity?: 'thin' | 'medium' | 'thick';
  compatibility?: string[];
}

// New product categories
export interface Topical {
  id: string;
  name: string;
  type: 'lotion' | 'balm' | 'patch' | 'spray' | 'gel' | 'serum' | 'suppository' | 'rub';
  brand: string;
  thc: number;
  cbd: number;
  application: 'topical' | 'transdermal' | 'sublingual' | 'vaginal';
  coverage: 'localized' | 'broad area' | 'spot treatment' | 'full body' | 'facial' | 'targeted' | 'internal' | 'systemic';
  duration: string;
  onsetTime: string;
  ingredients: string[];
  targetAreas: string[];
  effects: string[];
  medicalUses: string[];
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  dispensaries: string[];
  labTested: boolean;
  waterResistant?: boolean;
  organicCertified?: boolean;
  spf?: number;
  skinType?: string[];
}

export interface PreRoll {
  id: string;
  name: string;
  type: 'flower' | 'infused' | 'hash' | 'blunt' | 'mini';
  brand: string;
  strain: string;
  strainType: 'indica' | 'sativa' | 'hybrid';
  weight: string;
  thc: number;
  cbd: number;
  quantity: number;
  paperType: 'hemp' | 'rice' | 'tobacco leaf' | 'wood pulp';
  filter: 'crutch' | 'glass tip' | 'ceramic tip' | 'none';
  infusedWith?: string;
  effects: string[];
  flavors: string[];
  description: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  dispensaries: string[];
  labTested: boolean;
  burnTime?: string;
  packaged: boolean;
  // Enhanced smoking data
  smoothness?: number;
  potency?: number;
  evenBurn?: boolean;
}

// Enhanced review system
export interface EnhancedReview {
  id: string;
  userId: string;
  userName: string;
  itemId: string;
  itemType: 'strain' | 'concentrate' | 'edible' | 'cartridge' | 'topical' | 'preroll';
  rating: number;
  title: string;
  content: string;
  effects: string[];
  helpfulCount: number;
  createdAt: Date;
  verified: boolean;
  // Enhanced review data
  consumptionMethod: ConsumptionMethod;
  dosage: string;
  duration: DurationTracking;
  effectsTimeline: EffectTimeline[];
  medicalConditions?: MedicalCondition[];
  sideEffects?: string[];
  wouldRecommend: boolean;
  photos?: string[];
  verifiedPurchase: boolean;
  reportedCount: number;
  // Detailed ratings
  detailedRatings: {
    flavor: number;
    effects: number;
    value: number;
    quality: number;
  };
}

// Supporting interfaces
export interface TerpeneProfile {
  myrcene: number;
  limonene: number;
  pinene: number;
  caryophyllene: number;
  humulene: number;
  linalool: number;
  terpinolene?: number;
  ocimene?: number;
  bisabolol?: number;
  total: number;
}

export interface LabResult {
  type: 'cannabinoids' | 'terpenes' | 'pesticides' | 'microbials' | 'heavy_metals' | 'residual_solvents';
  testDate: Date;
  labName: string;
  results: { [key: string]: number | string };
  passed: boolean;
  certificate?: string;
}

export interface NutritionFacts {
  calories: number;
  totalFat: number;
  saturatedFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbs: number;
  fiber: number;
  sugars: number;
  protein: number;
  servingSize: string;
}

export interface ConsumptionMethod {
  method: 'smoking' | 'vaping' | 'edibles' | 'topicals' | 'sublingual' | 'dabbing';
  device?: string;
  temperature?: number;
  setting?: string;
}

export interface DurationTracking {
  onset: number; // minutes
  peak: number; // minutes
  total: number; // minutes
}

export interface EffectTimeline {
  time: number; // minutes after consumption
  effects: string[];
  intensity: number; // 1-10 scale
  notes?: string;
}

export interface MedicalCondition {
  condition: string;
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: string[];
}

// Educational content interfaces
export interface EducationModule {
  id: string;
  title: string;
  category: 'basics' | 'consumption' | 'medical' | 'cultivation' | 'legal' | 'safety';
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // minutes
  content: string;
  images?: string[];
  videos?: string[];
  quiz?: Quiz;
  relatedModules?: string[];
}

export interface Quiz {
  id: string;
  questions: QuizQuestion[];
  passingScore: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

// Enhanced user preferences
export interface EnhancedUserPreferences {
  desiredEffects: string[];
  medicalConditions?: MedicalCondition[];
  experienceLevel: 'beginner' | 'intermediate' | 'experienced';
  preferredConsumptionMethod: ConsumptionMethod[];
  thcTolerance: 'low' | 'medium' | 'high';
  cbdPreference: 'none' | 'low' | 'balanced' | 'high';
  preferredTimeOfUse: 'morning' | 'afternoon' | 'evening' | 'night' | 'anytime';
  avoidEffects?: string[];
  budgetRange?: 'low' | 'medium' | 'high' | 'premium';
  flavorPreferences?: string[];
  brandPreferences?: string[];
  organicPreference?: boolean;
  localPreference?: boolean;
  // Advanced preferences
  terpenePreferences?: string[];
  cannabinoidPreferences?: string[];
  potencyPreference?: 'microdose' | 'low' | 'medium' | 'high' | 'extreme';
  sessionLength?: 'quick' | 'medium' | 'extended';
  socialPreference?: 'solo' | 'small group' | 'large group' | 'any';
}

// Enhanced app state
export interface EnhancedAppState {
  user: UserProfile | null;
  currentView: string;
  selectedStrain: Strain | null;
  selectedConcentrate: Concentrate | null;
  selectedEdible: Edible | null;
  selectedCartridge: Cartridge | null;
  selectedTopical: Topical | null;
  selectedPreRoll: PreRoll | null;
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  filters: EnhancedSearchFilters;
  // New state features
  educationProgress: { [moduleId: string]: number };
  recommendationEngine: RecommendationEngine;
  userJournal: JournalEntry[];
  favorites: {
    strains: string[];
    concentrates: string[];
    edibles: string[];
    cartridges: string[];
    topicals: string[];
    prerolls: string[];
  };
}

export interface EnhancedSearchFilters {
  category?: 'all' | 'strains' | 'concentrates' | 'edibles' | 'cartridges' | 'topicals' | 'prerolls';
  type?: 'all' | 'indica' | 'sativa' | 'hybrid';
  thcRange?: [number, number];
  cbdRange?: [number, number];
  effects?: string[];
  flavors?: string[];
  medicalUses?: string[];
  priceRange?: 'all' | 'low' | 'medium' | 'high' | 'premium';
  rating?: number;
  availability?: 'all' | 'in-stock' | 'delivery';
  // Enhanced filters
  terpenes?: string[];
  brands?: string[];
  organicOnly?: boolean;
  labTestedOnly?: boolean;
  location?: string;
  dispensary?: string;
  newArrivals?: boolean;
  onSale?: boolean;
  potencyLevel?: 'microdose' | 'low' | 'medium' | 'high' | 'extreme';
}

export interface RecommendationEngine {
  algorithm: 'collaborative' | 'content_based' | 'hybrid';
  confidence: number;
  lastUpdated: Date;
  userSimilarity: { [userId: string]: number };
  itemSimilarity: { [itemId: string]: number };
}

export interface JournalEntry {
  id: string;
  date: Date;
  productId: string;
  productType: 'strain' | 'concentrate' | 'edible' | 'cartridge' | 'topical' | 'preroll';
  consumptionMethod: ConsumptionMethod;
  dosage: string;
  effects: EffectTimeline[];
  mood: {
    before: MoodState;
    after: MoodState;
  };
  notes: string;
  rating: number;
  wouldUseAgain: boolean;
  sideEffects?: string[];
  medicalSymptoms?: {
    before: SymptomSeverity[];
    after: SymptomSeverity[];
  };
}

export interface MoodState {
  energy: number; // 1-10
  stress: number; // 1-10
  pain: number; // 1-10
  mood: number; // 1-10
  focus: number; // 1-10
  creativity: number; // 1-10
  social: number; // 1-10
  appetite: number; // 1-10
}

export interface SymptomSeverity {
  symptom: string;
  severity: number; // 1-10
}

export type ViewType = 
  | 'onboarding' 
  | 'recommendations' 
  | 'explore' 
  | 'concentrates' 
  | 'edibles'
  | 'cartridges'
  | 'topicals'
  | 'prerolls'
  | 'profile' 
  | 'detail' 
  | 'concentrate-detail'
  | 'edible-detail'
  | 'cartridge-detail'
  | 'topical-detail'
  | 'preroll-detail'
  | 'dispensaries'
  | 'journal'
  | 'education'
  | 'community'
  | 'favorites'
  | 'search-results';

// Export all interfaces
export type Product = Strain | Concentrate | Edible | Cartridge | Topical | PreRoll;