import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Search, Filter, Heart, Star, Leaf, Moon, Sun, Focus, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { strains as strainDatabase } from '../data/strains';
import { useApp } from '../contexts/AppContext';

export default function StandardizedExploreSearch() {
  const { selectStrain, toggleSaveStrain, isStrainSaved } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedEffects, setSelectedEffects] = useState<string[]>([]);
  const [thcRange, setThcRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Using comprehensive strain database
  const mockStrains = strainDatabase;

  const categories = [
    { id: 'all', name: 'All Strains', icon: <Leaf className="w-5 h-5" /> },
    { id: 'sleep', name: 'Sleep & Relaxation', icon: <Moon className="w-5 h-5" /> },
    { id: 'energy', name: 'Energy & Focus', icon: <Sun className="w-5 h-5" /> },
    { id: 'creativity', name: 'Creativity & Mood', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'focus', name: 'Focus & Productivity', icon: <Focus className="w-5 h-5" /> }
  ];

  const effects = [
    'relaxed', 'happy', 'euphoric', 'energetic', 'focused', 'creative', 'sleepy', 'uplifted', 'hungry'
  ];

  const handleEffectToggle = (effect: string) => {
    setSelectedEffects(prev => 
      prev.includes(effect) 
        ? prev.filter(e => e !== effect)
        : [...prev, effect]
    );
  };

  const filterStrains = () => {
    return mockStrains.filter(strain => {
      const matchesSearch = searchTerm === '' || 
        strain.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        strain.effects.some(effect => effect.toLowerCase().includes(searchTerm.toLowerCase())) ||
        strain.flavors.some(flavor => flavor.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesType = selectedType === 'all' || strain.type === selectedType;
      
      const matchesEffects = selectedEffects.length === 0 || 
        selectedEffects.some(effect => strain.effects.includes(effect));
      
      const matchesThc = thcRange === 'all' || 
        (thcRange === 'low' && strain.thc <= 15) ||
        (thcRange === 'medium' && strain.thc > 15 && strain.thc <= 20) ||
        (thcRange === 'high' && strain.thc > 20);
      
      const matchesCategory = selectedCategory === 'all' ||
        (selectedCategory === 'sleep' && strain.effects.includes('sleepy')) ||
        (selectedCategory === 'energy' && strain.effects.includes('energetic')) ||
        (selectedCategory === 'creativity' && strain.effects.includes('creative')) ||
        (selectedCategory === 'focus' && strain.effects.includes('focused'));
      
      return matchesSearch && matchesType && matchesEffects && matchesThc && matchesCategory;
    });
  };

  const filteredStrains = filterStrains();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="section-header">
        <h1 className="section-title">Explore Cannabis Strains</h1>
        <p className="section-subtitle">Discover and search through our extensive strain database.</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <Input
              placeholder="Search strains, effects, or flavors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 border-green-200 focus:border-green-500 rounded-xl"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="cannabis-button-secondary h-12 px-6"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Categories */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {categories.map(category => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-3 whitespace-nowrap px-6 py-3 rounded-xl transition-all duration-200 ${
                selectedCategory === category.id 
                  ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
                  : 'border-green-200 text-green-700 hover:bg-green-50'
              }`}
            >
              {category.icon}
              {category.name}
            </Button>
          ))}
        </div>

        {/* Filters */}
        {showFilters && (
          <Card className="strain-card">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="indica">Indica</SelectItem>
                      <SelectItem value="sativa">Sativa</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">THC Level</label>
                  <Select value={thcRange} onValueChange={setThcRange}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="low">Low (0-15%)</SelectItem>
                      <SelectItem value="medium">Medium (15-20%)</SelectItem>
                      <SelectItem value="high">High (20%+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Effects</label>
                  <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto">
                    {effects.map(effect => (
                      <Badge
                        key={effect}
                        variant={selectedEffects.includes(effect) ? "default" : "outline"}
                        className="cursor-pointer"
                        onClick={() => handleEffectToggle(effect)}
                      >
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredStrains.length} strain{filteredStrains.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStrains.map(strain => (
          <Card key={strain.id} className="strain-card">
            <div className="relative">
              <div className="w-full h-52 bg-gradient-to-br from-green-100 to-green-200 rounded-t-lg overflow-hidden">
                <img 
                  src={strain.image} 
                  alt={strain.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full p-2"
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
            
            <CardContent className="strain-card-content">
              <div className="strain-header">
                <h3 className="strain-title">{strain.name}</h3>
                <Badge variant="outline" className="capitalize border-green-200 text-green-700">
                  {strain.type}
                </Badge>
              </div>
              
              <div className="strain-meta">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{strain.rating}</span>
                </div>
                <div className="flex items-center">
                  <Leaf className="w-4 h-4 mr-1 text-green-600" />
                  <span>{strain.thc}% THC</span>
                </div>
              </div>
              
              <div className="strain-effects">
                {strain.effects.slice(0, 3).map(effect => (
                  <span key={effect} className="effect-badge">
                    {effect}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {strain.description}
              </p>
              
              <Button 
                onClick={() => selectStrain(strain)}
                className="w-full cannabis-button-primary"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStrains.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-600">No strains found matching your criteria.</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}