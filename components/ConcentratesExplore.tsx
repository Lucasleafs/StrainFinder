import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, Star, MapPin, Beaker, Droplet, TestTube, CheckCircle, XCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { concentrateDatabase, concentrateTypes, extractionMethods } from '../data/concentrates';
import { useApp } from '../contexts/AppContext';

export default function ConcentratesExplore() {
  const { selectConcentrate, toggleSaveConcentrate, isConcentrateSaved } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedExtraction, setSelectedExtraction] = useState('all');
  const [sortBy, setSortBy] = useState('thc');
  const [showSolventFree, setShowSolventFree] = useState(false);

  const filteredConcentrates = useMemo(() => {
    let filtered = concentrateDatabase.filter(concentrate => {
      const matchesSearch = concentrate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           concentrate.strainOrigin.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           concentrate.flavorProfile.some(flavor => 
                             flavor.toLowerCase().includes(searchTerm.toLowerCase())
                           );
      
      const matchesType = selectedType === 'all' || concentrate.type === selectedType;
      const matchesExtraction = selectedExtraction === 'all' || concentrate.extractionMethod === selectedExtraction;
      const matchesSolventFree = !showSolventFree || concentrate.solventFree;
      
      return matchesSearch && matchesType && matchesExtraction && matchesSolventFree;
    });

    // Sort results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'thc':
          return b.thc - a.thc;
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedType, selectedExtraction, sortBy, showSolventFree]);

  const getTypeColor = (type: string) => {
    const colors: { [key: string]: string } = {
      'shatter': 'bg-amber-100 text-amber-800 border-amber-200',
      'wax': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'live_resin': 'bg-green-100 text-green-800 border-green-200',
      'rosin': 'bg-purple-100 text-purple-800 border-purple-200',
      'budder': 'bg-orange-100 text-orange-800 border-orange-200',
      'crumble': 'bg-red-100 text-red-800 border-red-200',
      'sauce': 'bg-blue-100 text-blue-800 border-blue-200',
      'diamonds': 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'hash': 'bg-gray-100 text-gray-800 border-gray-200',
      'distillate': 'bg-pink-100 text-pink-800 border-pink-200'
    };
    return colors[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const formatTypeLabel = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="section-header">
        <h1 className="section-title">Cannabis Concentrates</h1>
        <p className="section-subtitle">Premium extracts and concentrates for experienced consumers</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm text-green-700 mb-2">Search</label>
            <Input
              placeholder="Search concentrates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-green-200 focus:border-green-400"
            />
          </div>
          
          <div>
            <label className="block text-sm text-green-700 mb-2">Type</label>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="all" value="all">All Types</SelectItem>
                {concentrateTypes.map(type => (
                  <SelectItem key={type} value={type}>
                    {formatTypeLabel(type)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-green-700 mb-2">Extraction</label>
            <Select value={selectedExtraction} onValueChange={setSelectedExtraction}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="all" value="all">All Methods</SelectItem>
                {extractionMethods.map(method => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm text-green-700 mb-2">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem key="thc" value="thc">THC %</SelectItem>
                <SelectItem key="rating" value="rating">Rating</SelectItem>
                <SelectItem key="price" value="price">Price</SelectItem>
                <SelectItem key="name" value="name">Name</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showSolventFree}
              onChange={(e) => setShowSolventFree(e.target.checked)}
              className="w-4 h-4 text-green-600 border-green-300 rounded focus:ring-green-500"
            />
            <span className="text-sm text-green-700">Solvent-free only</span>
          </label>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4 flex justify-between items-center">
        <p className="text-green-700">
          Found {filteredConcentrates.length} concentrates
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredConcentrates.map(concentrate => (
          <Card key={concentrate.id} className="strain-card hover:shadow-lg transition-all duration-200">
            <div className="relative">
              <ImageWithFallback
                src={concentrate.image}
                alt={concentrate.name}
                productType="concentrate"
                className="w-full h-52 object-cover"
              />
              <div className="absolute top-3 right-3 space-y-2">
                <Button
                  size="sm"
                  variant="ghost"
                  className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full p-2"
                  onClick={() => toggleSaveConcentrate(concentrate.id)}
                >
                  <Heart 
                    className={`w-4 h-4 ${
                      isConcentrateSaved(concentrate.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-600'
                    }`} 
                  />
                </Button>
                <div className="bg-purple-600 text-white px-3 py-1.5 rounded-full text-xs shadow-sm">
                  {concentrate.thc}% THC
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <Badge className={`${getTypeColor(concentrate.type)} text-xs`}>
                  {concentrate.type.replace('_', ' ')}
                </Badge>
              </div>
            </div>
            
            <CardContent className="strain-card-content">
              <div className="strain-header">
                <h3 className="strain-title">{concentrate.name}</h3>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className="text-xs border-purple-200 text-purple-700">
                    {concentrate.extractionMethod}
                  </Badge>
                  {concentrate.solventFree && (
                    <CheckCircle className="w-4 h-4 text-green-600" title="Solvent-free" />
                  )}
                </div>
              </div>
              
              <div className="strain-meta">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{concentrate.rating}</span>
                </div>
                <div className="text-muted-foreground">{concentrate.reviews} reviews</div>
                <div className="flex items-center">
                  <Beaker className="w-4 h-4 mr-1 text-purple-600" />
                  <span>{concentrate.price}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-green-700">THC</span>
                  <span className="text-xs text-green-700">CBD</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">{concentrate.thc}%</span>
                  <span className="text-sm">{concentrate.cbd}%</span>
                </div>
              </div>
              
              <div className="strain-effects">
                {concentrate.effects.slice(0, 3).map(effect => (
                  <span key={effect} className="effect-badge">
                    {effect}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                {concentrate.description}
              </p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-xs text-muted-foreground">
                  <TestTube className="w-3 h-3 mr-1" />
                  <span>From: {concentrate.strainOrigin}</span>
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Droplet className="w-3 h-3 mr-1" />
                  <span>Consistency: {concentrate.consistency.replace('-', ' ')}</span>
                </div>
                {concentrate.terpenesPreserved && (
                  <div className="flex items-center text-xs text-green-600">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    <span>Terpenes preserved</span>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-1" />
                  {concentrate.dispensaries.length} locations
                </div>
                <Button 
                  onClick={() => selectConcentrate(concentrate)}
                  className="cannabis-button-primary"
                >
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredConcentrates.length === 0 && (
        <div className="text-center py-12">
          <Beaker className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg text-gray-600 mb-2">No concentrates found</h3>
          <p className="text-gray-500">Try adjusting your filters or search terms</p>
        </div>
      )}
    </div>
  );
}