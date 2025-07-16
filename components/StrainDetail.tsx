import React, { useState } from 'react';
import { ArrowLeft, Heart, Share2, ShoppingCart, Star, MapPin, Clock, Leaf, TestTube, Users, DollarSign } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { useApp } from '../contexts/AppContext';
import ProductImage from './ProductImage';

const StrainDetail: React.FC = () => {
  const { selectedStrain, setCurrentView, toggleSaveStrain, isStrainSaved } = useApp();
  const [isFavorite, setIsFavorite] = useState(false);
  
  const strain = selectedStrain;

  if (!strain) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-2">Strain not found</h2>
          <Button onClick={() => setCurrentView('home')}>
            Back to Recommendations
          </Button>
        </div>
      </div>
    );
  }

  const handleToggleFavorite = () => {
    toggleSaveStrain(strain.id);
    setIsFavorite(!isFavorite);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'sativa': return 'bg-green-100 text-green-800 border-green-200';
      case 'indica': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hybrid': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEffectColor = (effect: string) => {
    const colors = [
      'bg-emerald-100 text-emerald-700 border-emerald-200',
      'bg-teal-100 text-teal-700 border-teal-200',
      'bg-cyan-100 text-cyan-700 border-cyan-200',
      'bg-sky-100 text-sky-700 border-sky-200',
      'bg-indigo-100 text-indigo-700 border-indigo-200'
    ];
    return colors[effect.length % colors.length];
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setCurrentView('home')}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center gap-2 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleFavorite}
            className="flex items-center gap-2"
          >
            <Heart className={`h-4 w-4 ${isStrainSaved(strain.id) ? 'fill-red-500 text-red-500' : ''}`} />
            {isStrainSaved(strain.id) ? 'Favorited' : 'Favorite'}
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Image */}
        <div className="space-y-4">
          <ProductImage
            src={strain.image}
            alt={strain.name}
            productType="strain"
            className="h-96 w-full rounded-2xl"
          />
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{strain.thc}%</div>
                <div className="text-sm text-gray-600">THC</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{strain.cbd}%</div>
                <div className="text-sm text-gray-600">CBD</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <h1 className="text-4xl font-bold">{strain.name}</h1>
              <Badge className={getTypeColor(strain.type)}>
                {strain.type.charAt(0).toUpperCase() + strain.type.slice(1)}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{strain.rating}</span>
                <span className="text-gray-600">({strain.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-gray-600" />
                <span className="font-semibold">{strain.price}</span>
              </div>
            </div>

            <p className="text-gray-700 text-lg leading-relaxed">{strain.description}</p>
          </div>

          {/* Key Info Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium">{strain.floweringTime}</div>
                <div className="text-xs text-gray-600">Flowering Time</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <Leaf className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium">{strain.yield}</div>
                <div className="text-xs text-gray-600">Yield</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <TestTube className="h-6 w-6 mx-auto mb-2 text-gray-600" />
                <div className="text-sm font-medium">{strain.growDifficulty}</div>
                <div className="text-xs text-gray-600">Difficulty</div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 bg-green-600 hover:bg-green-700" size="lg">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Find Nearby
            </Button>
            <Button variant="outline" size="lg">
              <Users className="h-5 w-5 mr-2" />
              Reviews
            </Button>
          </div>
        </div>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="effects" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="effects">Effects & Flavors</TabsTrigger>
          <TabsTrigger value="genetics">Genetics</TabsTrigger>
          <TabsTrigger value="medical">Medical Uses</TabsTrigger>
          <TabsTrigger value="availability">Availability</TabsTrigger>
        </TabsList>

        <TabsContent value="effects" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  Effects
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {strain.effects.map((effect) => (
                    <Badge key={effect} className={getEffectColor(effect)}>
                      {effect}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">👅</span>
                  Flavors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {strain.flavors.map((flavor) => (
                    <Badge key={flavor} variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                      {flavor}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="genetics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🧬</span>
                Genetic Lineage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Parents</h4>
                  <p className="text-gray-700">{strain.genetics}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{strain.thc}%</div>
                    <div className="text-sm text-gray-600">THC Content</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{strain.cbd}%</div>
                    <div className="text-sm text-gray-600">CBD Content</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{strain.type}</div>
                    <div className="text-sm text-gray-600">Strain Type</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🏥</span>
                Medical Applications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700">
                  This strain may help with the following conditions. Always consult with a healthcare provider before using cannabis for medical purposes.
                </p>
                <div className="flex flex-wrap gap-2">
                  {strain.medicalUses.map((use) => (
                    <Badge key={use} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {use}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="availability" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Available Dispensaries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {strain.dispensaries.map((dispensary, index) => (
                  <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{dispensary}</h4>
                        <p className="text-sm text-gray-600">In stock • {strain.price}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Visit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StrainDetail;