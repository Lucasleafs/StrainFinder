import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Search, Filter, Heart, Star, Zap, Moon, Sun } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { cartridgeDatabase, cartridgeTypes } from '../data/cartridges';
import { useApp } from '../contexts/AppContext';

export default function CartridgesExplore() {
  const { selectCartridge, toggleSaveCartridge, isCartridgeSaved } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'sativa': return <Sun className="w-4 h-4" />;
      case 'indica': return <Moon className="w-4 h-4" />;
      case 'hybrid': return <Zap className="w-4 h-4" />;
      default: return <Zap className="w-4 h-4" />;
    }
  };

  const formatTypeLabel = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const filterCartridges = () => {
    return cartridgeDatabase.filter(cartridge => {
      const matchesSearch = searchTerm === '' || 
        cartridge.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cartridge.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cartridge.strainOrigin.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || cartridge.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  };

  const filteredCartridges = filterCartridges();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="section-header">
        <h1 className="section-title">Vape Cartridges</h1>
        <p className="section-subtitle">Premium cannabis cartridges for convenient, discreet consumption</p>
      </div>

      {/* Search and Filter Bar */}
      <div className="mb-8 space-y-6">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
            <Input
              placeholder="Search cartridges, brands, or strains..."
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

        {/* Type Filter */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          <Button
            key="all"
            variant={selectedType === 'all' ? "default" : "outline"}
            onClick={() => setSelectedType('all')}
            className={`whitespace-nowrap px-6 py-3 rounded-xl transition-all duration-200 ${
              selectedType === 'all' 
                ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
                : 'border-green-200 text-green-700 hover:bg-green-50'
            }`}
          >
            All Types
          </Button>
          {cartridgeTypes.map(type => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => setSelectedType(type)}
              className={`whitespace-nowrap px-6 py-3 rounded-xl transition-all duration-200 ${
                selectedType === type 
                  ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' 
                  : 'border-green-200 text-green-700 hover:bg-green-50'
              }`}
            >
              {formatTypeLabel(type)}
            </Button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          {filteredCartridges.length} cartridge{filteredCartridges.length !== 1 ? 's' : ''} found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCartridges.map(cartridge => (
          <Card key={cartridge.id} className="strain-card">
            <div className="relative">
              <ImageWithFallback
                src={cartridge.image}
                alt={cartridge.name}
                productType="cartridge"
                className="w-full h-52 object-cover"
              />
              <Button
                size="sm"
                variant="ghost"
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full p-2"
                onClick={() => toggleSaveCartridge(cartridge.id)}
              >
                <Heart 
                  className={`w-4 h-4 ${
                    isCartridgeSaved(cartridge.id) 
                      ? 'fill-red-500 text-red-500' 
                      : 'text-gray-600'
                  }`} 
                />
              </Button>
              <div className="absolute top-3 left-3 space-y-1">
                <Badge className="bg-purple-600 text-white">
                  {cartridge.thc}% THC
                </Badge>
                <Badge className="bg-blue-600 text-white flex items-center">
                  {getTypeIcon(cartridge.strainType)}
                  <span className="ml-1">{cartridge.strainType}</span>
                </Badge>
              </div>
            </div>
            
            <CardContent className="strain-card-content">
              <div className="strain-header">
                <h3 className="strain-title">{cartridge.name}</h3>
                <Badge variant="outline" className="capitalize border-green-200 text-green-700">
                  {cartridge.type.replace('_', ' ')}
                </Badge>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                by {cartridge.brand} • {cartridge.size}
              </div>
              
              <div className="strain-meta">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span>{cartridge.rating}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {cartridge.strainOrigin}
                </div>
              </div>
              
              <div className="strain-effects">
                {cartridge.effects.slice(0, 3).map(effect => (
                  <span key={effect} className="effect-badge">
                    {effect}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed mb-3">
                {cartridge.description}
              </p>
              
              <div className="flex justify-between items-center mb-3">
                <span className="cannabis-price">{cartridge.price}</span>
                <span className="text-sm text-gray-500">{cartridge.hardware.replace('_', ' ')}</span>
              </div>
              
              <Button 
                onClick={() => selectCartridge(cartridge)}
                className="w-full cannabis-button-primary"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCartridges.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <p className="text-gray-600">No cartridges found matching your criteria.</p>
          <p className="text-sm text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}