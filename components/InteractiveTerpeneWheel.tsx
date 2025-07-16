import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Beaker, 
  Leaf, 
  Palette, 
  Nose, 
  Brain,
  Heart,
  Eye,
  Zap,
  Moon
} from 'lucide-react';

export default function InteractiveTerpeneWheel() {
  const [selectedTerpene, setSelectedTerpene] = useState<string | null>(null);
  const [hoveredTerpene, setHoveredTerpene] = useState<string | null>(null);

  const terpenes = [
    {
      id: 'myrcene',
      name: 'Myrcene',
      description: 'The most common terpene in cannabis, known for its sedating effects.',
      aroma: 'Earthy, musky, herbal',
      effects: ['Relaxing', 'Sedating', 'Muscle relaxant'],
      benefits: ['Sleep aid', 'Pain relief', 'Anti-inflammatory'],
      color: '#8B4513',
      position: { x: 50, y: 20 },
      icon: <Moon className="w-4 h-4" />
    },
    {
      id: 'limonene',
      name: 'Limonene',
      description: 'Citrusy terpene that promotes mood elevation and stress relief.',
      aroma: 'Citrus, lemon, orange',
      effects: ['Uplifting', 'Mood-enhancing', 'Energizing'],
      benefits: ['Stress relief', 'Mood boost', 'Antimicrobial'],
      color: '#FFA500',
      position: { x: 85, y: 35 },
      icon: <Zap className="w-4 h-4" />
    },
    {
      id: 'pinene',
      name: 'Pinene',
      description: 'Pine-scented terpene that promotes alertness and memory retention.',
      aroma: 'Pine, fresh, woody',
      effects: ['Alertness', 'Memory retention', 'Focus'],
      benefits: ['Cognitive function', 'Bronchodilator', 'Anti-inflammatory'],
      color: '#228B22',
      position: { x: 80, y: 70 },
      icon: <Brain className="w-4 h-4" />
    },
    {
      id: 'linalool',
      name: 'Linalool',
      description: 'Floral terpene with calming and anti-anxiety properties.',
      aroma: 'Lavender, floral, sweet',
      effects: ['Calming', 'Anti-anxiety', 'Sedating'],
      benefits: ['Anxiety relief', 'Sleep aid', 'Anti-seizure'],
      color: '#9370DB',
      position: { x: 15, y: 70 },
      icon: <Heart className="w-4 h-4" />
    },
    {
      id: 'caryophyllene',
      name: 'Caryophyllene',
      description: 'Spicy terpene that acts as a cannabinoid and reduces inflammation.',
      aroma: 'Spicy, peppery, woody',
      effects: ['Anti-inflammatory', 'Pain relief', 'Gastroprotective'],
      benefits: ['Pain management', 'Inflammation reduction', 'Digestive health'],
      color: '#CD853F',
      position: { x: 20, y: 35 },
      icon: <Leaf className="w-4 h-4" />
    },
    {
      id: 'terpinolene',
      name: 'Terpinolene',
      description: 'Complex terpene with both uplifting and calming effects.',
      aroma: 'Piney, floral, herbal',
      effects: ['Uplifting', 'Antioxidant', 'Sedating'],
      benefits: ['Mood balance', 'Antioxidant protection', 'Sleep support'],
      color: '#4682B4',
      position: { x: 50, y: 80 },
      icon: <Eye className="w-4 h-4" />
    },
    {
      id: 'humulene',
      name: 'Humulene',
      description: 'Woody terpene known for appetite suppression and anti-inflammatory effects.',
      aroma: 'Woody, earthy, spicy',
      effects: ['Appetite suppressant', 'Anti-inflammatory', 'Antibacterial'],
      benefits: ['Weight management', 'Inflammation control', 'Immune support'],
      color: '#8FBC8F',
      position: { x: 75, y: 50 },
      icon: <Beaker className="w-4 h-4" />
    },
    {
      id: 'ocimene',
      name: 'Ocimene',
      description: 'Sweet terpene with antiviral and antifungal properties.',
      aroma: 'Sweet, herbal, woody',
      effects: ['Uplifting', 'Decongestant', 'Antiseptic'],
      benefits: ['Respiratory health', 'Antiviral protection', 'Mood enhancement'],
      color: '#FFB6C1',
      position: { x: 25, y: 50 },
      icon: <Nose className="w-4 h-4" />
    }
  ];

  const currentTerpene = selectedTerpene ? terpenes.find(t => t.id === selectedTerpene) : null;
  const displayTerpene = hoveredTerpene ? terpenes.find(t => t.id === hoveredTerpene) : currentTerpene;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Interactive Terpene Wheel
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore cannabis terpenes and their unique aromas, effects, and therapeutic benefits.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Terpene Wheel */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Terpene Wheel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-square bg-gradient-to-br from-green-50 to-purple-50 rounded-full p-8">
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-green-200">
                  <Beaker className="w-8 h-8 text-green-600" />
                </div>
              </div>

              {/* Terpene Points */}
              {terpenes.map((terpene) => (
                <div
                  key={terpene.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-125"
                  style={{ 
                    left: `${terpene.position.x}%`, 
                    top: `${terpene.position.y}%` 
                  }}
                  onClick={() => setSelectedTerpene(terpene.id)}
                  onMouseEnter={() => setHoveredTerpene(terpene.id)}
                  onMouseLeave={() => setHoveredTerpene(null)}
                >
                  <div 
                    className={`w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white border-4 transition-all ${
                      selectedTerpene === terpene.id ? 'border-white scale-125' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: terpene.color }}
                  >
                    {terpene.icon}
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1">
                    <span className="text-xs font-medium text-gray-700 whitespace-nowrap">
                      {terpene.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Terpene Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Nose className="w-5 h-5" />
              Terpene Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {displayTerpene ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white"
                    style={{ backgroundColor: displayTerpene.color }}
                  >
                    {displayTerpene.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {displayTerpene.name}
                  </h3>
                  <p className="text-gray-600">{displayTerpene.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Nose className="w-4 h-4 mr-2" />
                      Aroma Profile
                    </h4>
                    <p className="text-gray-600">{displayTerpene.aroma}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Brain className="w-4 h-4 mr-2" />
                      Effects
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {displayTerpene.effects.map((effect, index) => (
                        <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {effect}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Potential Benefits
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {displayTerpene.benefits.map((benefit, index) => (
                        <Badge key={index} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Find Strains with {displayTerpene.name}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Beaker className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Select a Terpene
                </h3>
                <p className="text-gray-600">
                  Click on any terpene in the wheel to learn about its properties and effects.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Terpene List */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Terpenes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {terpenes.map((terpene) => (
            <Card 
              key={terpene.id} 
              className={`cursor-pointer transition-all hover:shadow-lg ${
                selectedTerpene === terpene.id ? 'ring-2 ring-green-500' : ''
              }`}
              onClick={() => setSelectedTerpene(terpene.id)}
            >
              <CardContent className="p-4 text-center">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-white"
                  style={{ backgroundColor: terpene.color }}
                >
                  {terpene.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{terpene.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{terpene.aroma}</p>
                <div className="flex flex-wrap justify-center gap-1">
                  {terpene.effects.slice(0, 2).map((effect, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}