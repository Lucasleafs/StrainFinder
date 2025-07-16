import React from 'react';
import { ArrowLeft, Heart, Share2, Star, Zap, Settings, Shield, Gauge, Users, MapPin, Cpu } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Separator } from './ui/separator';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from 'sonner@2.0.3';

export default function CartridgeDetail() {
  const { state, setView, toggleSaveCartridge, isCartridgeSaved } = useApp();
  const cartridge = state.selectedCartridge;

  if (!cartridge) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">No cartridge selected</p>
        <Button onClick={() => setView('cartridges')} className="mt-4">
          Browse Cartridges
        </Button>
      </div>
    );
  }

  const isSaved = isCartridgeSaved(cartridge.id);

  const handleSave = () => {
    toggleSaveCartridge(cartridge.id);
    toast.success(isSaved ? 'Removed from saved cartridges' : 'Added to saved cartridges');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: cartridge.name,
        text: cartridge.description,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard');
    }
  };

  const getHardwareDisplayName = (hardware: string) => {
    switch (hardware) {
      case '510_thread':
        return '510 Thread';
      case 'pax_era':
        return 'PAX Era';
      case 'proprietary':
        return 'Proprietary';
      default:
        return hardware;
    }
  };

  const getStrainTypeColor = (type: string) => {
    switch (type) {
      case 'indica':
        return 'text-purple-600';
      case 'sativa':
        return 'text-green-600';
      case 'hybrid':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setView('cartridges')}
          className="text-gray-600"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cartridges
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
                  src={cartridge.image}
                  alt={cartridge.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-3">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{cartridge.name}</h1>
                  <p className="text-gray-600">by {cartridge.brand}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= cartridge.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {cartridge.rating} ({cartridge.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="capitalize">
                    {cartridge.type.replace('_', ' ')}
                  </Badge>
                  <Badge variant="outline" className={getStrainTypeColor(cartridge.strainType)}>
                    {cartridge.strainType}
                  </Badge>
                  {cartridge.labTested && (
                    <Badge variant="outline" className="text-green-600">
                      <Shield className="h-3 w-3 mr-1" />
                      Lab Tested
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    <Cpu className="h-3 w-3 mr-1" />
                    {getHardwareDisplayName(cartridge.hardware)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Gauge className="h-3 w-3 mr-1" />
                    {cartridge.size}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <div className="space-y-6">
          {/* Cannabinoid Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Cannabinoid Content
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">THC</p>
                  <p className="text-xl font-semibold text-green-600">{cartridge.thc}%</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">CBD</p>
                  <p className="text-xl font-semibold text-purple-600">{cartridge.cbd}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Extraction & Hardware */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Technical Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Extraction method</p>
                    <p className="font-medium">{cartridge.extractionMethod}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Hardware type</p>
                    <p className="font-medium">{getHardwareDisplayName(cartridge.hardware)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Size</p>
                    <p className="font-medium">{cartridge.size}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Strain type</p>
                    <p className={`font-medium capitalize ${getStrainTypeColor(cartridge.strainType)}`}>
                      {cartridge.strainType}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Natural terpenes</span>
                    <Badge variant={cartridge.naturalTerpenes ? 'default' : 'secondary'}>
                      {cartridge.naturalTerpenes ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Added terpenes</span>
                    <Badge variant={cartridge.addedTerpenes ? 'default' : 'secondary'}>
                      {cartridge.addedTerpenes ? 'Yes' : 'No'}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price */}
          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <p className="text-sm text-gray-600">Price</p>
                <p className="text-2xl font-bold text-green-600">{cartridge.price}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Effects and Flavor Profile */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Effects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cartridge.effects.map((effect) => (
                <Badge key={effect} variant="secondary" className="capitalize">
                  {effect}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Flavor Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {cartridge.flavorProfile.map((flavor) => (
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
          <p className="text-gray-700 leading-relaxed">{cartridge.description}</p>
          <p className="text-sm text-gray-600 mt-2">
            Based on strain: <span className="font-medium">{cartridge.strainOrigin}</span>
          </p>
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Usage Instructions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Hardware Compatibility</h4>
              <p className="text-sm text-blue-800">
                This cartridge is compatible with {getHardwareDisplayName(cartridge.hardware)} devices.
                {cartridge.hardware === '510_thread' && 
                  ' Make sure your battery is set to a low voltage (2.5-3.5V) for optimal flavor.'
                }
                {cartridge.hardware === 'pax_era' && 
                  ' Use the PAX app to control temperature and dosage for the best experience.'
                }
              </p>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-lg">
              <h4 className="font-medium text-amber-900 mb-2">Dosage Guidance</h4>
              <p className="text-sm text-amber-800">
                Start with 1-2 small puffs and wait 15-30 minutes to assess effects. 
                {cartridge.thc > 80 && ' This is a high-potency cartridge - use with caution.'}
              </p>
            </div>
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
            {cartridge.dispensaries.map((dispensary, index) => (
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
            Reviews ({cartridge.reviews})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Reviews coming soon!</p>
            <p className="text-sm">Be the first to review this cartridge.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}