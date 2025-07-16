import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { CheckCircle, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function OnboardingFlow() {
  const { setHasCompletedOnboarding, setUserPreferences } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState({
    experience: '',
    interests: [] as string[],
    medicalNeeds: [] as string[],
    preferredTime: '',
    goals: [] as string[]
  });

  const steps = [
    {
      title: "Welcome to StrainMatch!",
      subtitle: "Let's personalize your cannabis experience",
      content: "welcome"
    },
    {
      title: "What's your experience level?",
      subtitle: "This helps us recommend appropriate strains",
      content: "experience"
    },
    {
      title: "What interests you most?",
      subtitle: "Select all that apply",
      content: "interests"
    },
    {
      title: "Any medical considerations?",
      subtitle: "Help us find strains that may benefit you",
      content: "medical"
    },
    {
      title: "When do you typically consume?",
      subtitle: "We'll suggest strains for the right time",
      content: "timing"
    },
    {
      title: "What are your goals?",
      subtitle: "Let's tailor recommendations to your needs",
      content: "goals"
    },
    {
      title: "You're all set!",
      subtitle: "Let's find your perfect strains",
      content: "complete"
    }
  ];

  const experienceLevels = [
    { id: 'beginner', label: 'Beginner', desc: 'New to cannabis' },
    { id: 'intermediate', label: 'Intermediate', desc: 'Some experience' },
    { id: 'experienced', label: 'Experienced', desc: 'Regular user' },
    { id: 'expert', label: 'Expert', desc: 'Very knowledgeable' }
  ];

  const interestOptions = [
    'Relaxation', 'Pain Relief', 'Sleep Aid', 'Focus & Creativity', 
    'Social Use', 'Appetite', 'Anxiety Relief', 'Energy Boost'
  ];

  const medicalOptions = [
    'Chronic Pain', 'Anxiety', 'Depression', 'Insomnia', 'PTSD',
    'Migraines', 'Arthritis', 'Nausea', 'Appetite Loss', 'None'
  ];

  const timingOptions = [
    { id: 'morning', label: 'Morning', desc: 'Start the day' },
    { id: 'afternoon', label: 'Afternoon', desc: 'Midday boost' },
    { id: 'evening', label: 'Evening', desc: 'Wind down' },
    { id: 'night', label: 'Night', desc: 'Before bed' },
    { id: 'varies', label: 'It varies', desc: 'Different times' }
  ];

  const goalOptions = [
    'Better Sleep', 'Stress Relief', 'Pain Management', 'Enhanced Creativity',
    'Social Confidence', 'Appetite Improvement', 'Focus Enhancement', 'General Wellness'
  ];

  const handleSelection = (key: string, value: string | string[]) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const toggleArraySelection = (key: string, value: string) => {
    setPreferences(prev => ({
      ...prev,
      [key]: prev[key as keyof typeof prev].includes(value)
        ? (prev[key as keyof typeof prev] as string[]).filter(item => item !== value)
        : [...(prev[key as keyof typeof prev] as string[]), value]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return preferences.experience !== '';
      case 2: return preferences.interests.length > 0;
      case 3: return preferences.medicalNeeds.length > 0;
      case 4: return preferences.preferredTime !== '';
      case 5: return preferences.goals.length > 0;
      default: return true;
    }
  };

  const handleComplete = () => {
    setUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    localStorage.setItem('onboardingComplete', 'true');
    setHasCompletedOnboarding(true);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50/30 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between mb-4">
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {steps.length}
            </div>
            <div className="text-sm text-gray-500">
              {Math.round(progress)}% complete
            </div>
          </div>
          <Progress value={progress} className="mb-4" />
          <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
          <p className="text-gray-600">{steps[currentStep].subtitle}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Welcome Step */}
          {currentStep === 0 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Sparkles className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-4">
                <p className="text-lg">
                  We'll ask you a few questions to personalize your cannabis recommendations.
                </p>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Personalized strains</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Safety information</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Educational content</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Product reviews</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Experience Level */}
          {currentStep === 1 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {experienceLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => handleSelection('experience', level.id)}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    preferences.experience === level.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-semibold">{level.label}</div>
                  <div className="text-sm text-gray-600">{level.desc}</div>
                </button>
              ))}
            </div>
          )}

          {/* Interests */}
          {currentStep === 2 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {interestOptions.map((interest) => (
                <Badge
                  key={interest}
                  variant={preferences.interests.includes(interest) ? "default" : "outline"}
                  className={`p-3 cursor-pointer text-center justify-center ${
                    preferences.interests.includes(interest)
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'hover:bg-green-50'
                  }`}
                  onClick={() => toggleArraySelection('interests', interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          )}

          {/* Medical Needs */}
          {currentStep === 3 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {medicalOptions.map((need) => (
                <Badge
                  key={need}
                  variant={preferences.medicalNeeds.includes(need) ? "default" : "outline"}
                  className={`p-3 cursor-pointer text-center justify-center ${
                    preferences.medicalNeeds.includes(need)
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'hover:bg-green-50'
                  }`}
                  onClick={() => toggleArraySelection('medicalNeeds', need)}
                >
                  {need}
                </Badge>
              ))}
            </div>
          )}

          {/* Timing */}
          {currentStep === 4 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timingOptions.map((timing) => (
                <button
                  key={timing.id}
                  onClick={() => handleSelection('preferredTime', timing.id)}
                  className={`p-4 border rounded-lg text-left transition-all ${
                    preferences.preferredTime === timing.id
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <div className="font-semibold">{timing.label}</div>
                  <div className="text-sm text-gray-600">{timing.desc}</div>
                </button>
              ))}
            </div>
          )}

          {/* Goals */}
          {currentStep === 5 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {goalOptions.map((goal) => (
                <Badge
                  key={goal}
                  variant={preferences.goals.includes(goal) ? "default" : "outline"}
                  className={`p-3 cursor-pointer text-center justify-center ${
                    preferences.goals.includes(goal)
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'hover:bg-green-50'
                  }`}
                  onClick={() => toggleArraySelection('goals', goal)}
                >
                  {goal}
                </Badge>
              ))}
            </div>
          )}

          {/* Complete */}
          {currentStep === 6 && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <div className="space-y-4">
                <p className="text-lg">
                  Perfect! We've created your personalized profile.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 text-left space-y-2">
                  <div className="font-semibold">Your Profile Summary:</div>
                  <div className="text-sm space-y-1">
                    <div>Experience: {preferences.experience}</div>
                    <div>Interests: {preferences.interests.join(', ')}</div>
                    <div>Goals: {preferences.goals.join(', ')}</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(prev => prev - 1)}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={!canProceed()}
                className="flex items-center bg-green-600 hover:bg-green-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                className="flex items-center bg-green-600 hover:bg-green-700"
              >
                Get Started
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OnboardingFlow;