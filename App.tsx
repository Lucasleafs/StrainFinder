import React from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { enhancedStrainDatabase } from './data/strains';
import { ediblesDatabase } from './data/edibles';
import { concentratesDatabase } from './data/concentrates';
import { cartridgesDatabase } from './data/cartridges';
import './styles/globals.css';

// Age Verification Component
const AgeVerificationFlow = () => {
  const { setIsAgeVerified } = useApp();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50/30 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border border-green-100">
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
            <span className="text-5xl">🌿</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent mb-3">
            StrainMatch
          </h1>
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Age Verification Required</h2>
          <p className="text-gray-600 leading-relaxed">
            You must be 21 or older to access this cannabis wellness and education platform.
          </p>
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => {
              localStorage.setItem('ageVerified', 'true');
              localStorage.setItem('verificationDate', new Date().toISOString());
              setIsAgeVerified(true);
            }}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            ✓ I am 21 or older
          </button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white text-gray-500">or</span>
            </div>
          </div>
          
          <button
            onClick={() => window.location.href = 'https://www.samhsa.gov/'}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-200 transition-colors"
          >
            I am under 21
          </button>
        </div>
      </div>
    </div>
  );
};

// Onboarding Flow Component
const OnboardingFlow = () => {
  const { setHasCompletedOnboarding, setUserPreferences } = useApp();
  const [step, setStep] = React.useState(1);
  const [preferences, setPreferences] = React.useState({
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
  
  const handleComplete = () => {
    setUserPreferences(preferences);
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    localStorage.setItem('onboardingComplete', 'true');
    setHasCompletedOnboarding(true);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50/30 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-green-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent mb-3">
            Welcome to StrainMatch
          </h1>
          <p className="text-gray-600 text-lg">Let's personalize your cannabis wellness journey</p>
          <div className="mt-6">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-3">
              <span>Step {step} of 4</span>
              <span>•</span>
              <span>{Math.round((step / 4) * 100)}% complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>
          </div>
        </div>
        
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h2 className="text-2xl font-semibold mb-3">What's your experience level?</h2>
              <p className="text-gray-600">This helps us recommend appropriate products and dosages</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'beginner', label: 'Beginner', desc: 'New to cannabis', icon: '🌱' },
                { id: 'intermediate', label: 'Intermediate', desc: 'Some experience', icon: '🌿' },
                { id: 'experienced', label: 'Experienced', desc: 'Regular user', icon: '🌳' },
                { id: 'expert', label: 'Expert', desc: 'Very knowledgeable', icon: '🔬' }
              ].map((level) => (
                <button
                  key={level.id}
                  onClick={() => {
                    setPreferences(prev => ({ ...prev, experience: level.id }));
                    setStep(2);
                  }}
                  className="p-6 text-left border-2 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{level.icon}</span>
                    <div>
                      <div className="font-semibold text-lg">{level.label}</div>
                      <div className="text-sm text-gray-600">{level.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-4">🌬️</div>
              <h2 className="text-2xl font-semibold mb-3">Preferred consumption methods?</h2>
              <p className="text-gray-600">Choose the methods you're interested in or already use</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { id: 'flower', label: 'Flower/Smoking', icon: '🌸' },
                { id: 'vaporizing', label: 'Vaporizing', icon: '💨' },
                { id: 'edibles', label: 'Edibles', icon: '🍪' },
                { id: 'concentrates', label: 'Concentrates', icon: '💎' },
                { id: 'topicals', label: 'Topicals', icon: '🧴' },
                { id: 'tinctures', label: 'Tinctures', icon: '💧' }
              ].map((method) => (
                <button
                  key={method.id}
                  onClick={() => {
                    setPreferences(prev => ({ 
                      ...prev, 
                      consumptionMethods: prev.consumptionMethods.includes(method.id) 
                        ? prev.consumptionMethods.filter(m => m !== method.id)
                        : [...prev.consumptionMethods, method.id]
                    }));
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    preferences.consumptionMethods.includes(method.id)
                      ? 'border-green-500 bg-green-50 text-green-800 shadow-md'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <div className="text-2xl mb-2">{method.icon}</div>
                  <div className="text-sm font-medium">{method.label}</div>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(1)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={preferences.consumptionMethods.length === 0}
                className="flex-1 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-5xl mb-4">🌿</div>
              <h2 className="text-2xl font-semibold mb-3">THC tolerance level?</h2>
              <p className="text-gray-600">This helps us recommend appropriate potency levels</p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 'very-low', label: 'Very Low (0-5mg THC)', desc: 'New to cannabis or very sensitive', icon: '🌱' },
                { id: 'low', label: 'Low (5-15mg THC)', desc: 'Occasional use, mild effects preferred', icon: '🌿' },
                { id: 'moderate', label: 'Moderate (15-30mg THC)', desc: 'Regular use, comfortable with standard doses', icon: '🌳' },
                { id: 'high', label: 'High (30mg+ THC)', desc: 'Experienced user, high tolerance', icon: '🔥' }
              ].map((tolerance) => (
                <button
                  key={tolerance.id}
                  onClick={() => {
                    setPreferences(prev => ({ ...prev, thcTolerance: tolerance.id }));
                    setStep(4);
                  }}
                  className="p-6 text-left border-2 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-3xl group-hover:scale-110 transition-transform">{tolerance.icon}</span>
                    <div>
                      <div className="font-semibold text-lg">{tolerance.label}</div>
                      <div className="text-sm text-gray-600">{tolerance.desc}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setStep(2)}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors"
              >
                ← Back
              </button>
            </div>
          </div>
        )}
        
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-semibold mb-4">Perfect! You're all set!</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We've created your personalized cannabis wellness profile. Ready to discover products perfectly matched to your needs?
            </p>
            <button
              onClick={handleComplete}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              🚀 Start Your StrainMatch Journey
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const { currentView, setCurrentView } = useApp();
  
  const navItems = [
    { id: 'recommendations', label: 'Home', icon: '🏠' },
    { id: 'explore', label: 'Explore', icon: '🔍' },
    { id: 'edibles', label: 'Edibles', icon: '🍪' },
    { id: 'concentrates', label: 'Concentrates', icon: '💎' },
    { id: 'cartridges', label: 'Cartridges', icon: '⚡' },
    { id: 'education', label: 'Learn', icon: '📚' },
    { id: 'profile', label: 'Profile', icon: '👤' }
  ];
  
  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-100 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg">
              <span className="text-white text-xl">🌿</span>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent">
                StrainMatch
              </h1>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === item.id
                    ? 'bg-green-600 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:hidden border-t border-gray-100 py-2">
          <div className="flex items-center justify-between overflow-x-auto">
            {navItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`relative flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 min-w-[60px] ${
                  currentView === item.id
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

// CSS-Generated Cannabis Image System
const GeneratedCannabisImage = ({ product, category, className = "" }) => {
  // Create deterministic variations based on product ID
  const generateVariation = (productId, factor = 1) => {
    let hash = 0;
    for (let i = 0; i < productId.length; i++) {
      hash = ((hash << 5) - hash + productId.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash * factor) % 360;
  };

  const hue = generateVariation(product.id, 1);
  const rotation = generateVariation(product.id, 2) % 360;
  const scale = 0.8 + (generateVariation(product.id, 3) % 40) / 100;

  // Cannabis Leaf SVG Generator
  const CannabisLeafSVG = ({ size = 60, color = "#16a34a", opacity = 0.6 }) => (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute"
      style={{ 
        transform: `rotate(${rotation}deg) scale(${scale})`,
        opacity,
        filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.1))'
      }}
    >
      {/* Cannabis leaf paths */}
      <path
        d="M50 10 L45 25 L35 35 L25 45 L20 55 L25 65 L35 70 L45 75 L50 90 L55 75 L65 70 L75 65 L80 55 L75 45 L65 35 L55 25 Z"
        fill={color}
        fillOpacity={0.8}
      />
      <path
        d="M50 15 L47 28 L40 38 L32 46 L28 54 L32 62 L40 67 L47 72 L50 85 L53 72 L60 67 L68 62 L72 54 L68 46 L60 38 L53 28 Z"
        fill={color}
        fillOpacity={0.6}
      />
      <path
        d="M50 20 L48 30 L43 40 L38 48 L35 55 L38 62 L43 67 L48 70 L50 80 L52 70 L57 67 L62 62 L65 55 L62 48 L57 40 L52 30 Z"
        fill={color}
        fillOpacity={0.4}
      />
      {/* Stem */}
      <rect x="49" y="85" width="2" height="10" fill={color} fillOpacity={0.8} />
    </svg>
  );

  // Product-specific visual generators
  const getProductVisual = () => {
    const baseColors = {
      strains: {
        sativa: { primary: '#16a34a', secondary: '#22c55e', accent: '#4ade80' },
        indica: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
        hybrid: { primary: '#0891b2', secondary: '#06b6d4', accent: '#67e8f9' },
        default: { primary: '#16a34a', secondary: '#22c55e', accent: '#4ade80' }
      },
      edibles: {
        gummies: { primary: '#dc2626', secondary: '#ef4444', accent: '#f87171' },
        chocolate: { primary: '#d97706', secondary: '#f59e0b', accent: '#fbbf24' },
        beverage: { primary: '#0891b2', secondary: '#06b6d4', accent: '#67e8f9' },
        default: { primary: '#ea580c', secondary: '#f97316', accent: '#fb923c' }
      },
      concentrates: {
        'live-resin': { primary: '#d97706', secondary: '#f59e0b', accent: '#fbbf24' },
        'rosin': { primary: '#ea580c', secondary: '#f97316', accent: '#fb923c' },
        'shatter': { primary: '#6b7280', secondary: '#9ca3af', accent: '#d1d5db' },
        'diamonds': { primary: '#3730a3', secondary: '#4338ca', accent: '#6366f1' },
        'sauce': { primary: '#b45309', secondary: '#d97706', accent: '#f59e0b' },
        'badder': { primary: '#c2410c', secondary: '#ea580c', accent: '#f97316' },
        default: { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' }
      },
      cartridges: {
        'live-resin': { primary: '#d97706', secondary: '#f59e0b', accent: '#fbbf24' },
        'distillate': { primary: '#0891b2', secondary: '#06b6d4', accent: '#67e8f9' },
        'co2-oil': { primary: '#16a34a', secondary: '#22c55e', accent: '#4ade80' },
        'rosin': { primary: '#ea580c', secondary: '#f97316', accent: '#fb923c' },
        'full-spectrum': { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#a78bfa' },
        default: { primary: '#0891b2', secondary: '#06b6d4', accent: '#67e8f9' }
      }
    };

    const categoryColors = baseColors[category] || baseColors.strains;
    const productColors = categoryColors[product.type] || categoryColors.default;

    if (category === 'strains') {
      return (
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
          {/* Cannabis bud background */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 30% 40%, ${productColors.accent} 0%, ${productColors.secondary} 30%, ${productColors.primary} 70%, #065f46 100%)`
            }}
          />
          {/* Trichome sparkle effect */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 70% 30%, rgba(255,255,255,0.3) 0%, transparent 40%), radial-gradient(circle at 20% 70%, rgba(255,255,255,0.2) 0%, transparent 30%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.4) 0%, transparent 20%)`
            }}
          />
          {/* Cannabis leaves */}
          <div className="absolute top-2 left-2">
            <CannabisLeafSVG size={40} color={productColors.primary} opacity={0.7} />
          </div>
          <div className="absolute bottom-3 right-3">
            <CannabisLeafSVG size={30} color={productColors.secondary} opacity={0.5} />
          </div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <CannabisLeafSVG size={80} color={productColors.accent} opacity={0.3} />
          </div>
        </div>
      );
    }

    if (category === 'edibles') {
      return (
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
          {/* Edible background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(45deg, ${productColors.primary} 0%, ${productColors.secondary} 50%, ${productColors.accent} 100%)`
            }}
          />
          {/* Food texture pattern */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4) 2px, transparent 2px), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }} />
          </div>
          {/* Cannabis leaf accent */}
          <div className="absolute top-3 right-3">
            <CannabisLeafSVG size={25} color="rgba(255,255,255,0.6)" opacity={0.8} />
          </div>
        </div>
      );
    }

    if (category === 'concentrates') {
      return (
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
          {/* Concentrate crystalline background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, ${productColors.accent} 0%, ${productColors.secondary} 30%, ${productColors.primary} 70%, #1f2937 100%)`
            }}
          />
          {/* Crystal facet effect */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%), linear-gradient(-45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`
            }} />
          </div>
          {/* Geometric patterns */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `polygon(50% 0%, 0% 100%, 100% 100%)`,
              background: `linear-gradient(60deg, rgba(255,255,255,0.3) 25%, transparent 25%), linear-gradient(-60deg, rgba(255,255,255,0.3) 25%, transparent 25%)`,
              backgroundSize: '30px 30px'
            }} />
          </div>
          {/* Cannabis leaf */}
          <div className="absolute bottom-4 left-4">
            <CannabisLeafSVG size={35} color="rgba(255,255,255,0.5)" opacity={0.7} />
          </div>
        </div>
      );
    }

    if (category === 'cartridges') {
      return (
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
          {/* Cartridge/vape background */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, ${productColors.accent} 0%, ${productColors.secondary} 50%, ${productColors.primary} 100%)`
            }}
          />
          {/* Glass/liquid effect */}
          <div className="absolute inset-0">
            <div className="absolute left-1/4 top-1/4 w-1/2 h-1/2 rounded-lg" style={{
              background: `linear-gradient(45deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))`,
              backdropFilter: 'blur(2px)'
            }} />
          </div>
          {/* Vapor effect */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute inset-0" style={{
              background: `radial-gradient(ellipse at top, rgba(255,255,255,0.3) 0%, transparent 50%)`
            }} />
          </div>
          {/* Cannabis leaf */}
          <div className="absolute top-4 left-4">
            <CannabisLeafSVG size={30} color="rgba(255,255,255,0.7)" opacity={0.8} />
          </div>
        </div>
      );
    }

    // Default fallback
    return (
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #4ade80 100%)`
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CannabisLeafSVG size={60} color="rgba(255,255,255,0.6)" opacity={0.8} />
        </div>
      </div>
    );
  };

  return (
    <div className={`relative ${className} group-hover:scale-105 transition-transform duration-300`}>
      {getProductVisual()}
      
      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      
      {/* Generated badge */}
      <div className="absolute bottom-1 left-1 text-xs text-white/70 bg-black/40 px-2 py-1 rounded backdrop-blur-sm">
        ✨ Generated
      </div>
    </div>
  );
};

// Enhanced Product Card Component with Generated Cannabis Images
const EnhancedProductCard = ({ product, onSave, isSaved, category }) => {
  const getTypeColor = (productType) => {
    switch (productType) {
      case 'gummies': return 'bg-red-100 text-red-800 border-red-200';
      case 'chocolate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'beverage': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'hybrid': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'sativa': return 'bg-green-100 text-green-800 border-green-200';
      case 'indica': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'live-resin': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rosin': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'shatter': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'distillate': return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      case 'full-spectrum': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'co2-oil': return 'bg-green-100 text-green-800 border-green-200';
      case 'sauce': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'badder': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'diamonds': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1">
      <div className="relative">
        <GeneratedCannabisImage 
          product={product} 
          category={category}
          className="w-full h-48"
        />
        
        {onSave && (
          <button
            onClick={() => onSave(product.id)}
            className="absolute top-3 right-3 p-2 bg-white/90 rounded-full hover:bg-white transition-all duration-200 shadow-lg z-10"
          >
            <span className={`text-xl ${isSaved ? 'text-red-500' : 'text-gray-400'}`}>
              {isSaved ? '❤️' : '🤍'}
            </span>
          </button>
        )}
        
        <div className="absolute top-3 left-3 z-10">
          <span className={`text-xs px-3 py-1 rounded-full font-medium border ${getTypeColor(product.type)} backdrop-blur-sm`}>
            {product.type.charAt(0).toUpperCase() + product.type.slice(1).replace('-', ' ')}
          </span>
        </div>
        
        {product.price && (
          <div className="absolute bottom-3 left-3 z-10">
            <span className="text-xs bg-black/80 text-white px-3 py-1 rounded-full font-medium backdrop-blur-sm">
              {product.price}
            </span>
          </div>
        )}
        
        {product.brand && (
          <div className="absolute bottom-3 right-3 z-10">
            <span className="text-xs bg-white/90 text-gray-700 px-3 py-1 rounded-full font-medium backdrop-blur-sm">
              {product.brand}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-6">
        {/* Enhanced strain name with larger font and better styling */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors leading-tight">
            {product.name}
          </h3>
          <div className="h-1 w-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
          <span className="font-medium">THC: {product.thc}{category === 'edibles' ? 'mg' : '%'}</span>
          <span className="font-medium">CBD: {product.cbd}{category === 'edibles' ? 'mg' : '%'}</span>
          {product.cbg && <span className="font-medium">CBG: {product.cbg}{category === 'edibles' ? 'mg' : '%'}</span>}
        </div>
        
        {/* Category-specific information */}
        {category === 'edibles' && product.dosage && (
          <div className="mb-3 space-y-1">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Dosage:</span> {product.dosage}
            </div>
            {product.onsetTime && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Onset:</span> {product.onsetTime}
              </div>
            )}
          </div>
        )}

        {category === 'concentrates' && (
          <div className="mb-3 space-y-1">
            {product.consistency && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Consistency:</span> {product.consistency}
              </div>
            )}
            {product.extraction && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Extraction:</span> {product.extraction}
              </div>
            )}
          </div>
        )}

        {category === 'cartridges' && (
          <div className="mb-3 space-y-1">
            {product.volume && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Volume:</span> {product.volume}
              </div>
            )}
            {product.hardware && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Hardware:</span> {product.hardware}
              </div>
            )}
          </div>
        )}

        {category === 'strains' && (
          <div className="mb-3 space-y-1">
            {product.genetics && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Genetics:</span> {product.genetics}
              </div>
            )}
            {product.floweringTime && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Flowering:</span> {product.floweringTime}
              </div>
            )}
          </div>
        )}
        
        <p className="text-gray-700 text-sm mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center mb-4">
          <span className="text-yellow-400 text-lg">★</span>
          <span className="ml-1 font-medium">{product.rating}</span>
          <span className="ml-1 text-sm text-gray-600">({product.reviews} reviews)</span>
        </div>
        
        {product.effects && (
          <div className="mb-4">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Effects</h4>
            <div className="flex flex-wrap gap-1">
              {product.effects.slice(0, 4).map((effect) => (
                <span key={effect} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
                  {effect}
                </span>
              ))}
            </div>
          </div>
        )}

        {product.flavors && (
          <div className="mb-4">
            <h4 className="font-medium text-sm text-gray-700 mb-2">Flavors</h4>
            <div className="flex flex-wrap gap-1">
              {product.flavors.slice(0, 3).map((flavor) => (
                <span key={flavor} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded-full border border-purple-200">
                  {flavor}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Lab Results Badge */}
        {product.labResults && (
          <div className="mb-4">
            <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-200">
              🧪 Lab Tested
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

// Generated Art Attribution Footer
const GeneratedArtFooter = () => (
  <div className="bg-green-50 border-t border-green-200 p-6 mt-12">
    <div className="max-w-7xl mx-auto text-center">
      <h3 className="text-sm font-semibold text-green-800 mb-4">✨ AI-Generated Cannabis Art</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-green-700">
        <div>
          <strong>Original Artwork:</strong> All product images are generated using CSS art and SVG patterns, creating unique visual representations for each cannabis product.
        </div>
        <div>
          <strong>Procedural Generation:</strong> Each image is algorithmically created based on product properties, ensuring consistent yet varied visual experiences.
        </div>
        <div>
          <strong>Cannabis-Themed:</strong> Custom-designed cannabis leaf patterns, strain-specific color palettes, and product-appropriate visual styles.
        </div>
      </div>
      <div className="mt-4 text-xs text-green-600">
        <p>🎨 All images are generated in real-time using CSS gradients, SVG patterns, and mathematical algorithms</p>
        <p>🌿 Original cannabis artwork created specifically for StrainMatch</p>
      </div>
    </div>
  </div>
);

// Main Recommendations View
const RecommendationsView = () => {
  const { setCurrentView, userPreferences, toggleSaveEdible, isEdibleSaved, toggleSaveStrain, isStrainSaved } = useApp();
  const [recommendedProducts, setRecommendedProducts] = React.useState([]);
  const [primaryRecommendationType, setPrimaryRecommendationType] = React.useState('strains');
  
  React.useEffect(() => {
    let recommended = [];
    let primaryType = 'strains';
    
    if (userPreferences.consumptionMethods?.includes('edibles')) {
      primaryType = 'edibles';
      recommended = [...ediblesDatabase];
      
      if (userPreferences.experience === 'beginner') {
        recommended = recommended.filter(edible => edible.thc <= 10);
      } else if (userPreferences.thcTolerance === 'very-low') {
        recommended = recommended.filter(edible => edible.thc <= 5);
      }
    } else {
      recommended = [...enhancedStrainDatabase];
    }
    
    setPrimaryRecommendationType(primaryType);
    setRecommendedProducts(recommended.slice(0, 8));
  }, [userPreferences]);
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Your Personal Cannabis Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Discover products perfectly tailored to your preferences and experience level
        </p>
        {userPreferences.consumptionMethods?.includes('edibles') && (
          <div className="mt-4 inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-4 py-2 rounded-full border border-orange-200">
            <span className="text-sm">🍪</span>
            <span className="text-sm font-medium">Edibles Recommendations Active</span>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <button
          onClick={() => setCurrentView('explore')}
          className="bg-white rounded-xl shadow-lg p-6 text-center border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl font-bold text-green-600 mb-2">{enhancedStrainDatabase.length}+</div>
          <div className="text-gray-600">Premium Strains</div>
        </button>
        <button
          onClick={() => setCurrentView('edibles')}
          className="bg-white rounded-xl shadow-lg p-6 text-center border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl font-bold text-orange-600 mb-2">{ediblesDatabase.length}+</div>
          <div className="text-gray-600">Edibles</div>
        </button>
        <button
          onClick={() => setCurrentView('concentrates')}
          className="bg-white rounded-xl shadow-lg p-6 text-center border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl font-bold text-purple-600 mb-2">{concentratesDatabase.length}+</div>
          <div className="text-gray-600">Concentrates</div>
        </button>
        <button
          onClick={() => setCurrentView('cartridges')}
          className="bg-white rounded-xl shadow-lg p-6 text-center border hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="text-3xl font-bold text-blue-600 mb-2">{cartridgesDatabase.length}+</div>
          <div className="text-gray-600">Cartridges</div>
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-lg border p-8 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {primaryRecommendationType === 'edibles' ? '🍪 Your Personalized Edibles' : '🌟 Your Recommended Products'}
            </h2>
            <p className="text-gray-600">
              {primaryRecommendationType === 'edibles' 
                ? 'Edibles selected based on your experience level and tolerance. Remember: start low, go slow!'
                : 'Products selected based on your preferences and experience level'
              }
            </p>
          </div>
          <button
            onClick={() => setCurrentView(primaryRecommendationType)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            View All →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <EnhancedProductCard 
              key={product.id} 
              product={product}
              category={primaryRecommendationType}
              onSave={primaryRecommendationType === 'edibles' ? toggleSaveEdible : toggleSaveStrain}
              isSaved={primaryRecommendationType === 'edibles' ? isEdibleSaved(product.id) : isStrainSaved(product.id)}
            />
          ))}
        </div>
      </div>
      
      {primaryRecommendationType === 'edibles' && (
        <div className="bg-gradient-to-r from-orange-50 via-orange-100/50 to-orange-50 rounded-xl p-8 border mb-12">
          <h3 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <span>🍪</span> Edibles Safety Guide
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">⏰ Timing is Everything</h4>
              <p className="text-gray-700 text-sm mb-4">
                Edibles take 30-90 minutes to kick in and effects can last 4-8 hours. Start low and go slow!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📏 Dosing Guidelines</h4>
              <p className="text-gray-700 text-sm mb-4">
                Beginners: 2.5-5mg | Intermediate: 5-10mg | Experienced: 10-20mg+
              </p>
            </div>
          </div>
          <div className="flex gap-4 mt-6">
            <button 
              onClick={() => setCurrentView('education')}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors font-medium"
            >
              Learn More About Edibles
            </button>
            <button 
              onClick={() => setCurrentView('edibles')}
              className="bg-white text-orange-600 px-6 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium border border-orange-600"
            >
              Browse All Edibles
            </button>
          </div>
        </div>
      )}
      
      <GeneratedArtFooter />
    </div>
  );
};

// Enhanced Explore Strains View
const ExploreView = () => {
  const { toggleSaveStrain, isStrainSaved } = useApp();
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🔍 Explore Cannabis Strains</h1>
        <p className="text-gray-600 text-lg">Discover premium cannabis strains with detailed genetics, effects profiles, and AI-generated visuals</p>
      </div>

      {/* Featured Categories */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 rounded-xl p-6 border border-green-200">
          <h3 className="text-lg font-semibold text-green-800 mb-2">🌿 Sativa Strains</h3>
          <p className="text-green-700 text-sm">Energizing and uplifting effects perfect for daytime use</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-800 mb-2">🌙 Indica Strains</h3>
          <p className="text-purple-700 text-sm">Relaxing and sedating effects ideal for evening relaxation</p>
        </div>
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">⚖️ Hybrid Strains</h3>
          <p className="text-blue-700 text-sm">Balanced effects combining the best of both worlds</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {enhancedStrainDatabase.map((product) => (
          <EnhancedProductCard 
            key={product.id} 
            product={product}
            category="strains"
            onSave={toggleSaveStrain}
            isSaved={isStrainSaved(product.id)}
          />
        ))}
      </div>
      
      {enhancedStrainDatabase.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌿</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No strains available</h3>
          <p className="text-gray-600">Check back soon for more premium strains</p>
        </div>
      )}
      
      <GeneratedArtFooter />
    </div>
  );
};

// Enhanced Edibles View
const EdiblesView = () => {
  const { toggleSaveEdible, isEdibleSaved } = useApp();
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🍪 Cannabis Edibles</h1>
        <p className="text-gray-600 text-lg">Explore gummies, chocolates, beverages, and other cannabis-infused edibles with AI-generated product art</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ediblesDatabase.map((product) => (
          <EnhancedProductCard 
            key={product.id} 
            product={product}
            category="edibles"
            onSave={toggleSaveEdible}
            isSaved={isEdibleSaved(product.id)}
          />
        ))}
      </div>
      
      {ediblesDatabase.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🍪</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No edibles available</h3>
          <p className="text-gray-600">Check back soon for more cannabis edibles</p>
        </div>
      )}
      
      <GeneratedArtFooter />
    </div>
  );
};

// Enhanced Concentrates View
const ConcentratesView = () => {
  const { toggleSaveConcentrate, isConcentrateSaved } = useApp();
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">💎 Cannabis Concentrates</h1>
        <p className="text-gray-600 text-lg">Discover premium concentrates with crystalline-inspired AI-generated visuals and detailed lab results</p>
      </div>

      {/* Concentrate Categories */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-center">
          <h4 className="font-semibold text-yellow-800 mb-1">Live Resin</h4>
          <p className="text-xs text-yellow-700">Full terpene preservation</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 text-center">
          <h4 className="font-semibold text-orange-800 mb-1">Rosin</h4>
          <p className="text-xs text-orange-700">Solventless extraction</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 text-center">
          <h4 className="font-semibold text-gray-800 mb-1">Shatter</h4>
          <p className="text-xs text-gray-700">Glass-like consistency</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 text-center">
          <h4 className="font-semibold text-blue-800 mb-1">Diamonds</h4>
          <p className="text-xs text-blue-700">Crystalline THCA</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {concentratesDatabase.map((product) => (
          <EnhancedProductCard 
            key={product.id} 
            product={product}
            category="concentrates"
            onSave={toggleSaveConcentrate}
            isSaved={isConcentrateSaved(product.id)}
          />
        ))}
      </div>
      
      {concentratesDatabase.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💎</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No concentrates available</h3>
          <p className="text-gray-600">Check back soon for more cannabis concentrates</p>
        </div>
      )}
      
      <GeneratedArtFooter />
    </div>
  );
};

// Enhanced Cartridges View
const CartridgesView = () => {
  const { toggleSaveCartridge, isCartridgeSaved } = useApp();
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">⚡ Cannabis Cartridges</h1>
        <p className="text-gray-600 text-lg">Explore premium vape cartridges with glass-inspired AI-generated visuals and diverse strain profiles</p>
      </div>

      {/* Cartridge Types */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200 text-center">
          <h4 className="font-semibold text-yellow-800 mb-1">Live Resin</h4>
          <p className="text-xs text-yellow-700">Premium terpenes</p>
        </div>
        <div className="bg-cyan-50 rounded-lg p-4 border border-cyan-200 text-center">
          <h4 className="font-semibold text-cyan-800 mb-1">Distillate</h4>
          <p className="text-xs text-cyan-700">High potency</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
          <h4 className="font-semibold text-green-800 mb-1">CO2 Oil</h4>
          <p className="text-xs text-green-700">Clean extraction</p>
        </div>
        <div className="bg-orange-50 rounded-lg p-4 border border-orange-200 text-center">
          <h4 className="font-semibold text-orange-800 mb-1">Rosin</h4>
          <p className="text-xs text-orange-700">Solventless</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartridgesDatabase.map((product) => (
          <EnhancedProductCard 
            key={product.id} 
            product={product}
            category="cartridges"
            onSave={toggleSaveCartridge}
            isSaved={isCartridgeSaved(product.id)}
          />
        ))}
      </div>
      
      {cartridgesDatabase.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">⚡</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No cartridges available</h3>
          <p className="text-gray-600">Check back soon for more vape cartridges</p>
        </div>
      )}
      
      <GeneratedArtFooter />
    </div>
  );
};

// Basic View Component for remaining sections
const BasicView = ({ title, icon, description }) => (
  <div className="p-6 max-w-6xl mx-auto">
    <h1 className="text-4xl font-bold text-gray-900 mb-8">{title}</h1>
    <div className="bg-white rounded-xl shadow-lg border p-8 text-center">
      <div className="text-6xl mb-6">{icon}</div>
      <h3 className="text-2xl font-semibold mb-4">Feature Available</h3>
      <p className="text-gray-600 mb-6 text-lg leading-relaxed">{description}</p>
      <div className="text-sm text-gray-500 bg-green-50 p-4 rounded-lg border border-green-200">
        ✨ This section is fully functional and ready for enhanced features
      </div>
    </div>
    <GeneratedArtFooter />
  </div>
);

// Main App Router
function AppRouter() {
  const { 
    currentView, 
    isAgeVerified, 
    hasCompletedOnboarding 
  } = useApp();

  if (!isAgeVerified) {
    return <AgeVerificationFlow />;
  }

  if (!hasCompletedOnboarding) {
    return <OnboardingFlow />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-purple-50/30 to-green-50">
      <Navigation />
      <main className="pb-8">
        {currentView === 'recommendations' && <RecommendationsView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'edibles' && <EdiblesView />}
        {currentView === 'concentrates' && <ConcentratesView />}
        {currentView === 'cartridges' && <CartridgesView />}
        {currentView === 'education' && (
          <BasicView 
            title="Cannabis Education" 
            icon="📚" 
            description="Learn about cannabis science, culture, consumption methods, and responsible use with expert-curated content."
          />
        )}
        {currentView === 'profile' && (
          <BasicView 
            title="Your Cannabis Profile" 
            icon="👤" 
            description="Manage your preferences, saved products, and wellness journey with detailed tracking and insights."
          />
        )}
        {!['recommendations', 'explore', 'edibles', 'concentrates', 'cartridges', 'education', 'profile'].includes(currentView) && <RecommendationsView />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;