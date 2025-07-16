import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Search, Filter, Star, Trash2, Share2, Download } from 'lucide-react';
import ProductImage from './ProductImage';
import { useApp } from '../contexts/AppContext';
import { useAdvancedSearch } from '../hooks/useAdvancedSearch';

export default function FavoritesManager() {
  const { 
    savedStrains, 
    savedConcentrates, 
    savedEdibles, 
    savedCartridges,
    toggleSaveStrain,
    toggleSaveConcentrate,
    toggleSaveEdible,
    toggleSaveCartridge,
    selectStrain,
    selectConcentrate,
    selectEdible,
    selectCartridge
  } = useApp();
  
  const [activeTab, setActiveTab] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  // Combine all saved products
  const allFavorites = useMemo(() => [
    ...savedStrains.map(item => ({ ...item, productType: 'strain' as const })),
    ...savedConcentrates.map(item => ({ ...item, productType: 'concentrate' as const })),
    ...savedEdibles.map(item => ({ ...item, productType: 'edible' as const })),
    ...savedCartridges.map(item => ({ ...item, productType: 'cartridge' as const }))
  ], [savedStrains, savedConcentrates, savedEdibles, savedCartridges]);

  const {
    filters,
    filteredData,
    updateFilter,
    resetFilters,
    getFilterSummary
  } = useAdvancedSearch({
    data: allFavorites,
    searchFields: ['name', 'effects', 'flavorProfile', 'flavors'],
    defaultFilters: { type: activeTab }
  });

  const handleRemoveFromFavorites = (item: any) => {
    switch (item.productType) {
      case 'strain':
        toggleSaveStrain(item.id);
        break;
      case 'concentrate':
        toggleSaveConcentrate(item.id);
        break;
      case 'edible':
        toggleSaveEdible(item.id);
        break;
      case 'cartridge':
        toggleSaveCartridge(item.id);
        break;
    }
  };

  const handleViewDetails = (item: any) => {
    switch (item.productType) {
      case 'strain':
        selectStrain(item);
        break;
      case 'concentrate':
        selectConcentrate(item);
        break;
      case 'edible':
        selectEdible(item);
        break;
      case 'cartridge':
        selectCartridge(item);
        break;
    }
  };

  const exportFavorites = () => {
    const dataStr = JSON.stringify(allFavorites, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'my-favorites.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const getProductsByType = (type: string) => {
    if (type === 'all') return filteredData;
    return filteredData.filter(item => item.productType === type);
  };

  const renderProductCard = (item: any) => (
    <Card key={`${item.productType}-${item.id}`} className="strain-card group">
      <div className="relative">
        <ProductImage
          src={item.image}
          alt={item.name}
          productType={item.productType}
          className="w-full h-48 object-cover"
        />
        
        <div className="absolute top-3 right-3 flex gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => handleRemoveFromFavorites(item)}
          >
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-sm rounded-full p-2"
          >
            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
          </Button>
        </div>
        
        <div className="absolute top-3 left-3">
          <Badge className="bg-purple-600 text-white capitalize">
            {item.productType}
          </Badge>
        </div>
        
        <div className="absolute bottom-3 right-3">
          <Badge className="bg-green-600 text-white">
            {item.thc}% THC
          </Badge>
        </div>
      </div>
      
      <CardContent className="strain-card-content">
        <div className="strain-header">
          <h3 className="strain-title">{item.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm">{item.rating}</span>
          </div>
        </div>
        
        <div className="strain-effects mb-3">
          {item.effects.slice(0, 3).map((effect: string) => (
            <span key={effect} className="effect-badge">
              {effect}
            </span>
          ))}
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {item.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="cannabis-price">{item.price}</span>
          <Button 
            onClick={() => handleViewDetails(item)}
            className="cannabis-button-primary"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderTabContent = (type: string) => {
    const products = getProductsByType(type);
    
    if (products.length === 0) {
      return (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            No {type === 'all' ? '' : type} favorites yet
          </h3>
          <p className="text-gray-600 mb-4">
            Start exploring and save products you love to see them here
          </p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(renderProductCard)}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="section-header">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="section-title flex items-center">
              <Heart className="w-8 h-8 mr-3 text-red-500" />
              My Favorites
            </h1>
            <p className="section-subtitle">Manage your saved cannabis products</p>
          </div>
          
          <div className="flex gap-2">
            {allFavorites.length > 0 && (
              <>
                <Button variant="outline" onClick={exportFavorites}>
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      {allFavorites.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{savedStrains.length}</div>
              <div className="text-sm text-gray-600">Strains</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-amber-600">{savedConcentrates.length}</div>
              <div className="text-sm text-gray-600">Concentrates</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{savedEdibles.length}</div>
              <div className="text-sm text-gray-600">Edibles</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{savedCartridges.length}</div>
              <div className="text-sm text-gray-600">Cartridges</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search and Filters */}
      {allFavorites.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 mb-8">
          <div className="flex gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
              <Input
                placeholder="Search your favorites..."
                value={filters.searchTerm}
                onChange={(e) => updateFilter('searchTerm', e.target.value)}
                className="pl-12 border-green-200 focus:border-green-400"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
            </Button>
            {getFilterSummary().length > 0 && (
              <Button variant="ghost" onClick={resetFilters}>
                Clear Filters
              </Button>
            )}
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
              <div>
                <label className="block text-sm text-green-700 mb-2">Sort By</label>
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="border-green-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="thc">THC Content</SelectItem>
                    <SelectItem value="price">Price</SelectItem>
                    <SelectItem value="name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm text-green-700 mb-2">THC Range</label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minThc || ''}
                    onChange={(e) => updateFilter('minThc', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="border-green-200"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxThc || ''}
                    onChange={(e) => updateFilter('maxThc', e.target.value ? parseInt(e.target.value) : undefined)}
                    className="border-green-200"
                  />
                </div>
              </div>
            </div>
          )}

          {getFilterSummary().length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <div className="text-sm text-gray-600 mb-2">Active Filters:</div>
              <div className="flex flex-wrap gap-2">
                {getFilterSummary().map((filter, index) => (
                  <Badge key={index} variant="secondary">
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Favorites Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All ({allFavorites.length})</TabsTrigger>
          <TabsTrigger value="strain">Strains ({savedStrains.length})</TabsTrigger>
          <TabsTrigger value="concentrate">Concentrates ({savedConcentrates.length})</TabsTrigger>
          <TabsTrigger value="edible">Edibles ({savedEdibles.length})</TabsTrigger>
          <TabsTrigger value="cartridge">Cartridges ({savedCartridges.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">{renderTabContent('all')}</TabsContent>
        <TabsContent value="strain">{renderTabContent('strain')}</TabsContent>
        <TabsContent value="concentrate">{renderTabContent('concentrate')}</TabsContent>
        <TabsContent value="edible">{renderTabContent('edible')}</TabsContent>
        <TabsContent value="cartridge">{renderTabContent('cartridge')}</TabsContent>
      </Tabs>
    </div>
  );
}