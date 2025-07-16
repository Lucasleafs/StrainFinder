import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, Leaf, Heart } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { strains } from '../data/strains';

export default function SimpleRecommendations() {
  const { selectStrain, toggleSaveStrain, isStrainSaved } = useApp();

  // Get a few sample strains to display
  const recommendedStrains = strains.slice(0, 6);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Cannabis Strain Recommendations
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the perfect cannabis strains based on your preferences and needs. 
          Our curated selection helps you find strains for relaxation, creativity, and wellness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedStrains.map(strain => (
          <Card key={strain.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={strain.image} 
                alt={strain.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Fallback to a solid color background if image fails
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
                }}
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                onClick={() => toggleSaveStrain(strain.id)}
              >
                <Heart 
                  className={`w-4 h-4 ${
                    isStrainSaved(strain.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600'
                  }`} 
                />
              </Button>
            </div>
            
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{strain.name}</CardTitle>
                <Badge variant="outline" className="capitalize border-green-200 text-green-700">
                  {strain.type}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{strain.rating}</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="w-4 h-4 mr-1 text-green-600" />
                  <span>{strain.thc}% THC</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-1">
                {strain.effects.slice(0, 3).map(effect => (
                  <span 
                    key={effect} 
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-50 text-green-700 border border-green-200"
                  >
                    {effect}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-gray-600 line-clamp-2">
                {strain.description}
              </p>
              
              <Button 
                onClick={() => selectStrain(strain)}
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <p className="text-gray-600 mb-4">
          Looking for more personalized recommendations?
        </p>
        <Button 
          variant="outline" 
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          Complete Preference Quiz
        </Button>
      </div>
    </div>
  );
}