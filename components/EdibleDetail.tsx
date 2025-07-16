import React from 'react';
import { ArrowLeft, Heart, Share2, Star, Clock, Pill, ChefHat, Shield, Leaf, Users, MapPin } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export default function EdibleDetail() {
  const { state, setView, toggleSaveEdible, isEdibleSaved } = useApp();
  const edible = state.selectedEdible;

  if (!edible) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No edible selected</p>
        <Button onClick={() => setView('edibles')} className="mt-4">
          Browse Edibles
        </Button>
      </div>
    );
  }

  const isSaved = isEdibleSaved(edible.id);

  const handleSave = () => {
    toggleSaveEdible(edible.id);
    toast.success(isSaved ? 'Removed from saved edibles' : 'Added to saved edibles');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: edible.name,
        text: edible.description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const getDietaryInfo = () => {
    const info = [];
    if (edible.vegan) info.push('Vegan');
    if (edible.glutenFree) info.push('Gluten-Free');
    if (edible.sugarFree) info.push('Sugar-Free');
    return info;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setView('edibles')}
          className="text-gray-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Edibles
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSave}
            className={isSaved ? 'text-red-600' : ''}
          >
            <Heart className={`h-4 w-4 mr-2 ${isSaved ? 'fill-current' : ''}`} />
            {isSaved ? 'Saved' : 'Save'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image and Basic Info */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="aspect-video mb-4 rounded-lg overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={edible.image}
                  alt={edible.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{edible.name}</h1>
                  <p className="text-gray-600">by {edible.brand}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= edible.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {edible.rating} ({edible.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="capitalize">
                    {edible.type.replace('_', ' ')}
                  </Badge>
                  {edible.labTested && (
                    <Badge variant="outline" className="text-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Lab Tested
                    </Badge>
                  )}
                </div>

                {getDietaryInfo().length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {getDietaryInfo().map((info) => (
                      <Badge key={info} variant="outline" className="text-xs">
                        <Leaf className="h-3 w-3 mr-1" />
                        {info}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Dosage Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Pill className="h-5 w-5 mr-2" />
                Dosage Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">THC per serving</p>
                  <p className="text-xl font-semibold text-green-600">{edible.thc}mg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CBD per serving</p>
                  <p className="text-xl font-semibold text-purple-600">{edible.cbd}mg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Serving size</p>
                  <p className="font-medium">{edible.servingSize}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Servings per package</p>
                  <p className="font-medium">{edible.servingsPerPackage}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total THC</p>
                  <p className="font-medium">{edible.totalThc}mg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total CBD</p>
                  <p className="font-medium">{edible.totalCbd}mg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Timing & Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Onset time</p>
                  <p className="font-medium">{edible.onsetTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Duration</p>
                  <p className="font-medium">{edible.duration}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-2xl font-bold text-green-600">{edible.price}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Effects and Flavors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Effects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {edible.effects.map((effect) => (
                <Badge key={effect} variant="secondary" className="capitalize">
                  {effect}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flavors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {edible.flavors.map((flavor) => (
                <Badge key={flavor} variant="outline" className="capitalize">
                  {flavor}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Description */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{edible.description}</p>
          {edible.strainOrigin && (
            <p className="text-sm text-gray-600 mt-2">
              Based on strain: <span className="font-medium">{edible.strainOrigin}</span>
            </p>
          )}
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChefHat className="h-5 w-5 mr-2" />
            Ingredients
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {edible.ingredients.map((ingredient, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {ingredient}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Dispensaries */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="h-5 w-5 mr-2" />
            Available At
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {edible.dispensaries.map((dispensary, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{dispensary}</p>
                <p className="text-sm text-gray-600">Contact for availability</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews Section */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Reviews ({edible.reviews})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Reviews coming soon!</p>
            <p className="text-sm">Be the first to review this edible.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}