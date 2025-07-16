import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Search, Filter, Star, Heart } from 'lucide-react';
import { strains as strainDatabase } from '../data/strains';
import { useApp } from '../contexts/AppContext';
import type { Strain } from '../types';

export function ExploreSearch() {
  const { selectStrain, toggleSaveStrain, isStrainSaved } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStrains, setFilteredStrains] = useState<Strain[]>(strainDatabase);
  const [selectedType, setSelectedType] = useState<'all' | 'indica' | 'sativa' | 'hybrid'>('all');

  useEffect(() => {
    let filtered = strainDatabase;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(strain =>
        strain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strain.effects.some(effect => effect.toLowerCase().includes(searchTerm.toLowerCase())) ||
        strain.flavors.some(flavor => flavor.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(strain => strain.type === selectedType);
    }

    setFilteredStrains(filtered);
  }, [searchTerm, selectedType]);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sativa': return 'bg-green-100 text-green-800';
      case 'indica': return 'bg-purple-100 text-purple-800';
      case 'hybrid': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Explore Cannabis Strains</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Search and filter through our comprehensive database of cannabis strains
        </p>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search strains, effects, or flavors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="text-sm font-medium text-gray-700 py-2">Filter by type:</span>
          {(['all', 'indica', 'sativa', 'hybrid'] as const).map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(type)}
              className={selectedType === type ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            Search Results ({filteredStrains.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStrains.map((strain) => (
            <Card key={strain.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
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
          ))}
        </div>

        {filteredStrains.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No strains found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExploreSearch;