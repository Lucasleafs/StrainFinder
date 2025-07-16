import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  Leaf, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  SkipForward, 
  User, 
  Target, 
  Heart, 
  Coffee, 
  Moon, 
  Settings,
  Sparkles,
  Award
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { UserPreferences, UserProfile } from '../types';
import { toast } from 'sonner@2.0.3';

const STEPS = [
  { 
    id: 'welcome', 
    title: 'Welcome to StrainMatch', 
    description: 'Your personalized cannabis companion',
    icon: <Sparkles className="w-6 h-6" />
  },
  { 
    id: 'experience', 
    title: 'Experience Level', 
    description: 'Help us understand your background',
    icon: <User className="w-6 h-6" />
  },
  { 
    id: 'effects', 
    title: 'Desired Effects', 
    description: 'What are you looking to achieve?',
    icon: <Target className="w-6 h-6" />
  },
  { 
    id: 'medical', 
    title: 'Medical Needs', 
    description: 'Any specific conditions? (Optional)',
    icon: <Heart className="w-6 h-6" />
  },
  { 
    id: 'consumption', 
    title: 'Consumption Method', 
    description: 'How do you prefer to consume?',
    icon: <Coffee className="w-6 h-6" />
  },
  { 
    id: 'tolerance', 
    title: 'THC Tolerance', 
    description: 'What\'s your comfort level?',
    icon: <Settings className="w-6 h-6" />
  },
  { 
    id: 'timing', 
    title: 'When do you use?', 
    description: 'Preferred time of day',
    icon: <Moon className="w-6 h-6" />
  },
  { 
    id: 'preferences', 
    title: 'Final Preferences', 
    description: 'Any additional preferences?',
    icon: <Settings className="w-6 h-6" />
  },
  { 
    id: 'complete', 
    title: 'All Set!', 
    description: 'Your profile is ready',
    icon: <Award className="w-6 h-6" />
  }
];

const DESIRED_EFFECTS = [
  { id: 'relaxed', label: 'Relaxed', emoji: '😌', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'euphoric', label: 'Euphoric', emoji: '😊', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
  { id: 'happy', label: 'Happy', emoji: '😄', color: 'bg-green-50 text-green-700 border-green-200' },
  { id: 'creative', label: 'Creative', emoji: '🎨', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'focused', label: 'Focused', emoji: '🎯', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'energetic', label: 'Energetic', emoji: '⚡', color: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'uplifted', label: 'Uplifted', emoji: '🌟', color: 'bg-pink-50 text-pink-700 border-pink-200' },
  { id: 'sleepy', label: 'Sleepy', emoji: '😴', color: 'bg-slate-50 text-slate-700 border-slate-200' },
  { id: 'hungry', label: 'Hungry', emoji: '🍽️', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'giggly', label: 'Giggly', emoji: '😂', color: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'talkative', label: 'Talkative', emoji: '💬', color: 'bg-cyan-50 text-cyan-700 border-cyan-200' },
  { id: 'aroused', label: 'Aroused', emoji: '💕', color: 'bg-rose-50 text-rose-700 border-rose-200' }
];

const MEDICAL_CONDITIONS = [
  { id: 'none', label: 'None - I don\'t use cannabis for medical purposes', emoji: '✨' },
  { id: 'anxiety', label: 'Anxiety', emoji: '😰' },
  { id: 'depression', label: 'Depression', emoji: '😔' },
  { id: 'chronic pain', label: 'Chronic Pain', emoji: '🩹' },
  { id: 'insomnia', label: 'Insomnia', emoji: '😴' },
  { id: 'stress', label: 'Stress', emoji: '😤' },
  { id: 'ADHD', label: 'ADHD', emoji: '🧠' },
  { id: 'PTSD', label: 'PTSD', emoji: '💭' },
  { id: 'epilepsy', label: 'Epilepsy', emoji: '⚡' },
  { id: 'cancer', label: 'Cancer', emoji: '🎗️' },
  { id: 'arthritis', label: 'Arthritis', emoji: '🦴' },
  { id: 'migraines', label: 'Migraines', emoji: '🤕' },
  { id: 'nausea', label: 'Nausea', emoji: '🤢' },
  { id: 'appetite loss', label: 'Appetite Loss', emoji: '🍽️' },
  { id: 'muscle spasms', label: 'Muscle Spasms', emoji: '💪' },
  { id: 'glaucoma', label: 'Glaucoma', emoji: '👁️' }
];

const AVOID_EFFECTS = [
  { id: 'anxious', label: 'Anxiety', emoji: '😰' },
  { id: 'paranoid', label: 'Paranoia', emoji: '👀' },
  { id: 'dizzy', label: 'Dizziness', emoji: '😵' },
  { id: 'dry mouth', label: 'Dry Mouth', emoji: '👄' },
  { id: 'dry eyes', label: 'Dry Eyes', emoji: '👁️' },
  { id: 'headache', label: 'Headaches', emoji: '🤕' },
  { id: 'couch lock', label: 'Couch Lock', emoji: '🛋️' },
  { id: 'racing thoughts', label: 'Racing Thoughts', emoji: '🏃‍♂️' }
];

export default function EnhancedOnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<UserPreferences>>({
    desiredEffects: [],
    medicalConditions: [],
    avoidEffects: []
  });
  const { setUserProfile, setHasCompletedOnboarding } = useApp();

  const currentStepData = STEPS[currentStep];
  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkipPersonalization = () => {
    const defaultPreferences: UserPreferences = {
      desiredEffects: ['relaxed', 'happy'],
      medicalConditions: ['none'],
      experienceLevel: 'intermediate',
      preferredConsumptionMethod: 'smoking',
      thcTolerance: 'medium',
      preferredTimeOfUse: 'evening',
      avoidEffects: [],
      budgetRange: 'medium'
    };

    const userProfile: UserProfile = {
      id: Date.now().toString(),
      name: 'User',
      preferences: defaultPreferences,
      savedStrains: [],
      savedConcentrates: [],
      savedEdibles: [],
      savedCartridges: [],
      reviews: [],
      moodJournal: [],
      createdAt: new Date(),
      lastActive: new Date()
    };

    setUserProfile(userProfile);
    setHasCompletedOnboarding(true);
    toast.success('Welcome to StrainMatch! You can update your preferences anytime in your profile.');
  };

  const handleComplete = () => {
    if (!isCurrentStepValid()) {
      toast.error('Please complete all required fields');
      return;
    }

    let medicalConditions = preferences.medicalConditions || [];
    if (medicalConditions.includes('none') && medicalConditions.length > 1) {
      medicalConditions = medicalConditions.filter(condition => condition !== 'none');
    }

    const userPreferences: UserPreferences = {
      desiredEffects: preferences.desiredEffects || [],
      medicalConditions: medicalConditions,
      experienceLevel: preferences.experienceLevel || 'beginner',
      preferredConsumptionMethod: preferences.preferredConsumptionMethod || 'smoking',
      thcTolerance: preferences.thcTolerance || 'low',
      preferredTimeOfUse: preferences.preferredTimeOfUse || 'evening',
      avoidEffects: preferences.avoidEffects || [],
      budgetRange: preferences.budgetRange || 'medium'
    };

    const userProfile: UserProfile = {
      id: Date.now().toString(),
      name: 'User',
      preferences: userPreferences,
      savedStrains: [],
      savedConcentrates: [],
      savedEdibles: [],
      savedCartridges: [],
      reviews: [],
      moodJournal: [],
      createdAt: new Date(),
      lastActive: new Date()
    };

    setUserProfile(userProfile);
    setHasCompletedOnboarding(true);
    toast.success('🎉 Welcome to StrainMatch! Your personalized recommendations are ready.');
  };

  const isCurrentStepValid = (): boolean => {
    switch (STEPS[currentStep].id) {
      case 'experience':
        return !!preferences.experienceLevel;
      case 'effects':
        return (preferences.desiredEffects?.length || 0) > 0;
      case 'consumption':
        return !!preferences.preferredConsumptionMethod;
      case 'tolerance':
        return !!preferences.thcTolerance;
      case 'timing':
        return !!preferences.preferredTimeOfUse;
      default:
        return true;
    }
  };

  const updatePreferences = (key: keyof UserPreferences, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayItem = (key: keyof UserPreferences, item: string) => {
    const currentArray = (preferences[key] as string[]) || [];
    
    if (key === 'medicalConditions') {
      if (item === 'none') {
        updatePreferences(key, ['none']);
        return;
      } else {
        const filteredArray = currentArray.filter(i => i !== 'none');
        const newArray = filteredArray.includes(item)
          ? filteredArray.filter(i => i !== item)
          : [...filteredArray, item];
        updatePreferences(key, newArray);
        return;
      }
    }

    const newArray = currentArray.includes(item)
      ? currentArray.filter(i => i !== item)
      : [...currentArray, item];
    updatePreferences(key, newArray);
  };

  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Leaf className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gradient-cannabis">Welcome to StrainMatch</h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Get personalized cannabis strain recommendations based on your unique preferences, 
                experience level, and wellness goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="wellness-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-green-800 mb-2">Personalized Matches</h3>
                  <p className="text-sm text-green-700">
                    Find strains that perfectly match your desired effects and experience level
                  </p>
                </CardContent>
              </Card>
              
              <Card className="wellness-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-blue-800 mb-2">Medical Support</h3>
                  <p className="text-sm text-blue-700">
                    Get recommendations tailored to your specific medical needs and conditions
                  </p>
                </CardContent>
              </Card>
              
              <Card className="wellness-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-purple-800 mb-2">Preference Learning</h3>
                  <p className="text-sm text-purple-700">
                    Our system learns and adapts to provide better recommendations over time
                  </p>
                </CardContent>
              </Card>
              
              <Card className="wellness-card">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-orange-800 mb-2">Expert Insights</h3>
                  <p className="text-sm text-orange-700">
                    Access detailed strain information, effects, and user reviews
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <SkipForward className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">Want to explore right away?</span>
                </div>
                <p className="text-sm text-blue-700 mb-4 text-center">
                  You can skip the personalization and browse all products immediately. 
                  You can always set up your profile later.
                </p>
                <Button
                  variant="outline"
                  onClick={handleSkipPersonalization}
                  className="w-full cannabis-button-secondary"
                >
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip Setup & Browse Now
                </Button>
              </CardContent>
            </Card>
          </div>
        );

      case 'experience':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold">What's your experience level?</h3>
              <p className="text-gray-600">This helps us recommend appropriate potency and strains</p>
            </div>
            
            <RadioGroup 
              value={preferences.experienceLevel} 
              onValueChange={(value) => updatePreferences('experienceLevel', value)}
              className="space-y-4"
            >
              {[
                { 
                  value: 'beginner', 
                  label: 'Beginner', 
                  desc: 'New to cannabis or occasional use (less than once a week)',
                  emoji: '🌱',
                  color: 'border-green-200 hover:bg-green-50'
                },
                { 
                  value: 'intermediate', 
                  label: 'Intermediate', 
                  desc: 'Regular user with some experience (weekly use)',
                  emoji: '🌿',
                  color: 'border-blue-200 hover:bg-blue-50'
                },
                { 
                  value: 'experienced', 
                  label: 'Experienced', 
                  desc: 'Very familiar with cannabis effects (daily or frequent use)',
                  emoji: '🍃',
                  color: 'border-purple-200 hover:bg-purple-50'
                }
              ].map((option) => (
                <div key={option.value} className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all ${option.color} ${preferences.experienceLevel === option.value ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-3">{option.emoji}</span>
                      <div>
                        <div className="font-semibold text-lg">{option.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'effects':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold">What effects are you looking for?</h3>
              <p className="text-gray-600">Select all that apply - this helps us find your perfect match</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {DESIRED_EFFECTS.map((effect) => (
                <div key={effect.id} className="relative">
                  <Checkbox
                    id={effect.id}
                    checked={preferences.desiredEffects?.includes(effect.id)}
                    onCheckedChange={() => toggleArrayItem('desiredEffects', effect.id)}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={effect.id}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:scale-105 ${
                      preferences.desiredEffects?.includes(effect.id) 
                        ? `${effect.color} ring-2 ring-green-500 shadow-lg` 
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-2xl mb-2">{effect.emoji}</span>
                    <span className="font-medium text-sm text-center">{effect.label}</span>
                  </Label>
                </div>
              ))}
            </div>
            
            {preferences.desiredEffects && preferences.desiredEffects.length > 0 && (
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                    <span className="font-medium text-green-800">Selected Effects ({preferences.desiredEffects.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.desiredEffects.map((effectId) => {
                      const effect = DESIRED_EFFECTS.find(e => e.id === effectId);
                      return effect ? (
                        <Badge key={effectId} className={effect.color}>
                          {effect.emoji} {effect.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'medical':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold">Do you use cannabis for medical purposes?</h3>
              <p className="text-gray-600">This information helps us recommend strains with appropriate therapeutic benefits</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MEDICAL_CONDITIONS.map((condition) => (
                <div key={condition.id} className="relative">
                  <Checkbox
                    id={condition.id}
                    checked={preferences.medicalConditions?.includes(condition.id)}
                    onCheckedChange={() => toggleArrayItem('medicalConditions', condition.id)}
                    className="sr-only"
                  />
                  <Label
                    htmlFor={condition.id}
                    className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      preferences.medicalConditions?.includes(condition.id) 
                        ? 'bg-blue-50 border-blue-300 ring-2 ring-blue-500' 
                        : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl mr-3">{condition.emoji}</span>
                    <span className="font-medium text-sm">{condition.label}</span>
                  </Label>
                </div>
              ))}
            </div>
            
            {preferences.medicalConditions && preferences.medicalConditions.length > 0 && (
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-center mb-3">
                    <Heart className="w-5 h-5 text-blue-600 mr-2" />
                    <span className="font-medium text-blue-800">Medical Conditions Selected</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {preferences.medicalConditions.map((conditionId) => {
                      const condition = MEDICAL_CONDITIONS.find(c => c.id === conditionId);
                      return condition ? (
                        <Badge key={conditionId} variant="secondary" className="bg-blue-100 text-blue-700">
                          {condition.emoji} {condition.id === 'none' ? 'None' : condition.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        );

      case 'consumption':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coffee className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold">How do you prefer to consume cannabis?</h3>
              <p className="text-gray-600">Different methods have different onset times and effects</p>
            </div>
            
            <RadioGroup 
              value={preferences.preferredConsumptionMethod} 
              onValueChange={(value) => updatePreferences('preferredConsumptionMethod', value)}
              className="space-y-4"
            >
              {[
                { 
                  value: 'smoking', 
                  label: 'Smoking', 
                  desc: 'Joints, pipes, bongs - Fast onset, shorter duration',
                  emoji: '🚬',
                  color: 'border-red-200 hover:bg-red-50'
                },
                { 
                  value: 'vaping', 
                  label: 'Vaping', 
                  desc: 'Dry herb or oil vaporizers - Smooth, controlled dosing',
                  emoji: '💨',
                  color: 'border-blue-200 hover:bg-blue-50'
                },
                { 
                  value: 'edibles', 
                  label: 'Edibles', 
                  desc: 'Gummies, chocolates, beverages - Long-lasting effects',
                  emoji: '🍪',
                  color: 'border-green-200 hover:bg-green-50'
                },
                { 
                  value: 'concentrates', 
                  label: 'Concentrates', 
                  desc: 'Wax, shatter, live resin - High potency, experienced users',
                  emoji: '💎',
                  color: 'border-purple-200 hover:bg-purple-50'
                }
              ].map((option) => (
                <div key={option.value} className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all ${option.color} ${preferences.preferredConsumptionMethod === option.value ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-3">{option.emoji}</span>
                      <div>
                        <div className="font-semibold text-lg">{option.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'tolerance':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold">What's your THC tolerance level?</h3>
              <p className="text-gray-600">This helps us recommend appropriate potency levels</p>
            </div>
            
            <RadioGroup 
              value={preferences.thcTolerance} 
              onValueChange={(value) => updatePreferences('thcTolerance', value)}
              className="space-y-4"
            >
              {[
                { 
                  value: 'low', 
                  label: 'Low THC (Under 15%)', 
                  desc: 'Prefer mild effects, new to THC, or infrequent user',
                  emoji: '🌱',
                  color: 'border-green-200 hover:bg-green-50'
                },
                { 
                  value: 'medium', 
                  label: 'Medium THC (15-25%)', 
                  desc: 'Comfortable with moderate effects, regular user',
                  emoji: '🌿',
                  color: 'border-yellow-200 hover:bg-yellow-50'
                },
                { 
                  value: 'high', 
                  label: 'High THC (25%+)', 
                  desc: 'Prefer strong effects, experienced user with high tolerance',
                  emoji: '🔥',
                  color: 'border-red-200 hover:bg-red-50'
                }
              ].map((option) => (
                <div key={option.value} className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all ${option.color} ${preferences.thcTolerance === option.value ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-3">{option.emoji}</span>
                      <div>
                        <div className="font-semibold text-lg">{option.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'timing':
        return (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Moon className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold">When do you typically use cannabis?</h3>
              <p className="text-gray-600">Different times call for different effects and strain types</p>
            </div>
            
            <RadioGroup 
              value={preferences.preferredTimeOfUse} 
              onValueChange={(value) => updatePreferences('preferredTimeOfUse', value)}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {[
                { 
                  value: 'morning', 
                  label: 'Morning', 
                  desc: 'Start the day, energy boost, focus',
                  emoji: '🌅',
                  color: 'border-yellow-200 hover:bg-yellow-50'
                },
                { 
                  value: 'afternoon', 
                  label: 'Afternoon', 
                  desc: 'Midday break, social activities, creativity',
                  emoji: '☀️',
                  color: 'border-orange-200 hover:bg-orange-50'
                },
                { 
                  value: 'evening', 
                  label: 'Evening', 
                  desc: 'Wind down, relaxation, social time',
                  emoji: '🌆',
                  color: 'border-blue-200 hover:bg-blue-50'
                },
                { 
                  value: 'night', 
                  label: 'Night', 
                  desc: 'Sleep aid, deep relaxation, end of day',
                  emoji: '🌙',
                  color: 'border-purple-200 hover:bg-purple-50'
                }
              ].map((option) => (
                <div key={option.value} className={`flex items-start space-x-4 p-4 rounded-xl border-2 transition-all ${option.color} ${preferences.preferredTimeOfUse === option.value ? 'ring-2 ring-green-500 bg-green-50' : ''}`}>
                  <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor={option.value} className="flex items-center cursor-pointer">
                      <span className="text-2xl mr-3">{option.emoji}</span>
                      <div>
                        <div className="font-semibold text-lg">{option.label}</div>
                        <div className="text-sm text-gray-600 mt-1">{option.desc}</div>
                      </div>
                    </Label>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Settings className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold">Final preferences</h3>
              <p className="text-gray-600">Let's fine-tune your recommendations</p>
            </div>
            
            <div className="space-y-8">
              {/* Effects to Avoid */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center">
                  <span className="text-2xl mr-3">🚫</span>
                  Effects to avoid (Optional)
                </h4>
                <p className="text-sm text-gray-600 -mt-2">Select any effects you'd prefer to avoid</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {AVOID_EFFECTS.map((effect) => (
                    <div key={effect.id} className="relative">
                      <Checkbox
                        id={`avoid-${effect.id}`}
                        checked={preferences.avoidEffects?.includes(effect.id)}
                        onCheckedChange={() => toggleArrayItem('avoidEffects', effect.id)}
                        className="sr-only"
                      />
                      <Label
                        htmlFor={`avoid-${effect.id}`}
                        className={`flex flex-col items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                          preferences.avoidEffects?.includes(effect.id) 
                            ? 'bg-red-50 border-red-300 ring-2 ring-red-500' 
                            : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50'
                        }`}
                      >
                        <span className="text-lg mb-1">{effect.emoji}</span>
                        <span className="font-medium text-xs text-center">{effect.label}</span>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Range */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg flex items-center">
                  <span className="text-2xl mr-3">💰</span>
                  Budget Range
                </h4>
                <RadioGroup 
                  value={preferences.budgetRange} 
                  onValueChange={(value) => updatePreferences('budgetRange', value)}
                  className="space-y-3"
                >
                  {[
                    { value: 'low', label: 'Budget ($8-12/g)', desc: 'Good quality, affordable options' },
                    { value: 'medium', label: 'Mid-range ($12-18/g)', desc: 'Premium quality, great value' },
                    { value: 'high', label: 'Premium ($18+/g)', desc: 'Top-shelf, craft cannabis' }
                  ].map((option) => (
                    <div key={option.value} className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${preferences.budgetRange === option.value ? 'bg-green-50 border-green-300 ring-2 ring-green-500' : 'border-gray-200 hover:border-gray-300'}`}>
                      <RadioGroupItem value={option.value} id={`budget-${option.value}`} />
                      <Label htmlFor={`budget-${option.value}`} className="flex-1 cursor-pointer">
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-gray-600">{option.desc}</div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-8">
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg animate-bounce-in">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gradient-cannabis">🎉 You're all set!</h2>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
                Your personalized profile is ready! We've analyzed your preferences and we're excited to show you 
                strains that perfectly match your needs.
              </p>
            </div>
            
            <Card className="bg-gradient-to-r from-green-50 to-purple-50 border border-green-200 max-w-2xl mx-auto">
              <CardContent className="p-6">
                <div className="flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-green-600 mr-2" />
                  <span className="font-semibold text-green-800">Your Profile Summary</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-medium">Experience:</span>
                      <span className="ml-2 capitalize">{preferences.experienceLevel}</span>
                    </div>
                    <div className="flex items-center">
                      <Coffee className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-medium">Method:</span>
                      <span className="ml-2 capitalize">{preferences.preferredConsumptionMethod}</span>
                    </div>
                    <div className="flex items-center">
                      <Settings className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-medium">THC tolerance:</span>
                      <span className="ml-2 capitalize">{preferences.thcTolerance}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Moon className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-medium">Best time:</span>
                      <span className="ml-2 capitalize">{preferences.preferredTimeOfUse}</span>
                    </div>
                    <div className="flex items-center">
                      <Target className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-medium">Effects:</span>
                      <span className="ml-2">{preferences.desiredEffects?.length || 0} selected</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="font-medium">Medical:</span>
                      <span className="ml-2">
                        {preferences.medicalConditions?.includes('none') ? 'None' : 
                         preferences.medicalConditions?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen cannabis-gradient p-4 flex items-center justify-center">
      <Card className="w-full max-w-4xl wellness-card animate-fade-in">
        <CardHeader className="text-center space-y-6 pb-6">
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-md">
                {currentStepData.icon}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{currentStepData.title}</h1>
                <p className="text-gray-600">{currentStepData.description}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Progress value={progress} className="h-3 bg-gray-100" />
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Step {currentStep + 1} of {STEPS.length}</span>
                <span className="font-medium text-green-600">{Math.round(progress)}% Complete</span>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 px-6 pb-8">
          <div className="min-h-[400px]">
            {renderStepContent()}
          </div>

          <div className="flex justify-between pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="cannabis-button-secondary"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === STEPS.length - 1 ? (
              <Button
                onClick={handleComplete}
                className="cannabis-button-primary"
                size="lg"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Complete Setup
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!isCurrentStepValid()}
                className="cannabis-button-primary"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}