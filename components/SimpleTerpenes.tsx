import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Beaker, Leaf, Nose, Brain } from 'lucide-react';

export default function SimpleTerpenes() {
  const [selectedTerpene, setSelectedTerpene] = useState<string | null>(null);

  const terpenes = [
    {
      id: 'myrcene',
      name: 'Myrcene',
      aroma: 'Earthy, musky',
      effects: ['Relaxing', 'Sedating'],
      color: 'bg-amber-100 text-amber-800',
      description: 'The most common terpene in cannabis, known for its sedating effects.'
    },
    {
      id: 'limonene',
      name: 'Limonene',
      aroma: 'Citrus, lemon',
      effects: ['Uplifting', 'Mood-enhancing'],
      color: 'bg-yellow-100 text-yellow-800',
      description: 'Citrusy terpene that promotes mood elevation and stress relief.'
    },
    {
      id: 'pinene',
      name: 'Pinene',
      aroma: 'Pine, woody',
      effects: ['Alertness', 'Focus'],
      color: 'bg-green-100 text-green-800',
      description: 'Pine-scented terpene that promotes alertness and memory retention.'
    },
    {
      id: 'linalool',
      name: 'Linalool',
      aroma: 'Lavender, floral',
      effects: ['Calming', 'Anti-anxiety'],
      color: 'bg-purple-100 text-purple-800',
      description: 'Floral terpene with calming and anti-anxiety properties.'
    }
  ];

  const selectedTerpeneData = selectedTerpene ? terpenes.find(t => t.id === selectedTerpene) : null;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Cannabis Terpenes
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Discover the aromatic compounds that give cannabis its unique flavors and effects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Terpene List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Common Terpenes</h2>
          <div className="space-y-4">
            {terpenes.map((terpene) => (
              <Card 
                key={terpene.id} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTerpene === terpene.id ? 'ring-2 ring-green-500' : ''
                }`}
                onClick={() => setSelectedTerpene(terpene.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <Beaker className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{terpene.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{terpene.aroma}</p>
                      <div className="flex flex-wrap gap-1">
                        {terpene.effects.map((effect, index) => (
                          <Badge key={index} variant="outline" className={terpene.color}>
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Terpene Details */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Terpene Details</h2>
          <Card>
            <CardContent className="p-6">
              {selectedTerpeneData ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Beaker className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedTerpeneData.name}
                    </h3>
                    <p className="text-gray-600">{selectedTerpeneData.description}</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Nose className="w-4 h-4 mr-2" />
                        Aroma Profile
                      </h4>
                      <p className="text-gray-600">{selectedTerpeneData.aroma}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                        <Brain className="w-4 h-4 mr-2" />
                        Effects
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTerpeneData.effects.map((effect, index) => (
                          <Badge key={index} variant="outline" className={selectedTerpeneData.color}>
                            {effect}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Find Strains with {selectedTerpeneData.name}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-12">
                  <Beaker className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Terpene
                  </h3>
                  <p className="text-gray-600">
                    Click on any terpene to learn about its properties and effects.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}