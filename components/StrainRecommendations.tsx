import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Heart, TrendingUp, Sparkles, ChevronRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { strains } from '../data/strains';
import { getRandomStrains, getTopRatedStrains } from '../data/strains';

export function StrainRecommendations() {
  const { 
    userPreferences, 
    selectStrain, 
    toggleSaveStrain, 
    isStrainSaved,
    setCurrentView 
  } = useApp();
  
  const [personalizedStrains, setPersonalizedStrains] = useState(getRandomStrains(6));
  const [trendingStrains, setTrendingStrains] = useState(getTopRatedStrains(4));

  useEffect(() => {
    // Generate personalized recommendations based on user preferences
    if (userPreferences) {
      const filtered = strains.filter(strain => {
        // Match interests with effects
        const interestMatch = userPreferences.interests?.some(interest => 
          strain.effects.some(effect => 
            effect.toLowerCase().includes(interest.toLowerCase()) ||
            interest.toLowerCase().includes(effect.toLowerCase())
          )
        );

        // Match medical needs
        const medicalMatch = userPreferences.medicalNeeds?.some(need => 
          strain.medicalUses.some(use => 
            use.toLowerCase().includes(need.toLowerCase()) ||
            need.toLowerCase().includes(use.toLowerCase())
          )
        );

        return interestMatch || medicalMatch;
      });

      if (filtered.length >= 6) {
        setPersonalizedStrains(filtered.slice(0, 6));
      } else {
        setPersonalizedStrains([...filtered, ...getRandomStrains(6 - filtered.length)]);
      }
    }
  }, [userPreferences]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sativa': return 'bg-green-100 text-green-800';
      case 'indica': return 'bg-purple-100 text-purple-800';
      case 'hybrid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StrainCard = ({ strain }: { strain: typeof strains[0] }) => (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={strain.image}
          alt={strain.name}
          className="h-40 w-full object-cover rounded-t-lg"
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop&crop=center`;
          }}
        />
        <div className="absolute top-4 right-4">
          <Button
            size="sm"
            variant="secondary"
            className="h-8 w-8 p-0 bg-white/90 hover:bg-white"
            onClick={() => toggleSaveStrain(strain.id)}
          >
            <Heart className={`h-4 w-4 ${isStrainSaved(strain.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>
        <div className="absolute top-4 left-4">
          <Badge className={getTypeColor(strain.type)}>
            {strain.type.charAt(0).toUpperCase() + strain.type.slice(1)}
          </Badge>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg group-hover:text-green-600 transition-colors">
          {strain.name}
        </CardTitle>
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">{strain.rating}</span>
          <span className="text-sm text-gray-600">({strain.reviews} reviews)</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span>THC: {strain.thc}%</span>
          <span>CBD: {strain.cbd}%</span>
        </div>

        <p className="text-gray-700 text-sm line-clamp-2">{strain.description}</p>

        <div className="space-y-2">
          <h4 className="font-medium text-sm">Top Effects</h4>
          <div className="flex flex-wrap gap-1">
            {strain.effects.slice(0, 3).map((effect) => (
              <Badge key={effect} variant="outline" className="text-xs">
                {effect}
              </Badge>
            ))}
          </div>
        </div>

        <Button 
          className="w-full bg-green-600 hover:bg-green-700"
          onClick={() => selectStrain(strain)}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent">
          StrainMatch Recommendations
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover cannabis strains tailored to your preferences and needs
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          variant="outline"
          onClick={() => setCurrentView('explore')}
          className="h-16 flex-col space-y-1"
        >
          <div className="text-2xl">🔍</div>
          <span>Explore All</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentView('education')}
          className="h-16 flex-col space-y-1"
        >
          <div className="text-2xl">📚</div>
          <span>Learn More</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentView('terpenes')}
          className="h-16 flex-col space-y-1"
        >
          <div className="text-2xl">🧪</div>
          <span>Terpenes</span>
        </Button>
        <Button
          variant="outline"
          onClick={() => setCurrentView('profile')}
          className="h-16 flex-col space-y-1"
        >
          <div className="text-2xl">👤</div>
          <span>My Profile</span>
        </Button>
      </div>

      {/* Personalized Recommendations */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-green-600" />
            <h2 className="text-2xl font-semibold">Personalized for You</h2>
          </div>
          <Button variant="ghost" onClick={() => setCurrentView('explore')}>
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalizedStrains.map((strain) => (
            <StrainCard key={strain.id} strain={strain} />
          ))}
        </div>
      </section>

      {/* Trending Strains */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold">Trending Now</h2>
          </div>
          <Button variant="ghost" onClick={() => setCurrentView('explore')}>
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingStrains.map((strain) => (
            <StrainCard key={strain.id} strain={strain} />
          ))}
        </div>
      </section>

      {/* Educational CTA */}
      <section className="bg-gradient-to-r from-green-50 to-purple-50 rounded-xl p-8 text-center">
        <h3 className="text-2xl font-semibold mb-4">New to Cannabis?</h3>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Learn about different strains, effects, and consumption methods to make informed decisions.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => setCurrentView('education')} className="bg-green-600 hover:bg-green-700">
            Start Learning
          </Button>
          <Button variant="outline" onClick={() => setCurrentView('terpenes')}>
            Explore Terpenes
          </Button>
        </div>
      </section>
    </div>
  );
}

export default StrainRecommendations;