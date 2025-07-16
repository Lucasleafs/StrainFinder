import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { 
  ArrowLeft, 
  Star, 
  MapPin, 
  Beaker, 
  TestTube, 
  Droplet, 
  CheckCircle, 
  XCircle,
  Heart,
  Users,
  Clock,
  Thermometer
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useApp } from '../contexts/AppContext';

export default function ConcentrateDetail() {
  const { state, setView, toggleSaveConcentrate, isConcentrateSaved } = useApp();
  
  if (!state.selectedConcentrate) {
    return (
      <div className="p-6 max-w-4xl mx-auto text-center">
        <p className="text-gray-500">Concentrate not found</p>
        <Button onClick={() => setView('concentrates')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Concentrates
        </Button>
      </div>
    );
  }

  const concentrate = state.selectedConcentrate;
  const isSaved = isConcentrateSaved(concentrate.id);

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

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Button 
          variant="ghost" 
          onClick={() => setView('concentrates')}
          className="text-green-600 hover:text-green-700 hover:bg-green-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Concentrates
        </Button>
        <Button
          variant="outline"
          onClick={() => toggleSaveConcentrate(concentrate.id)}
          className={`${isSaved ? 'border-red-200 bg-red-50' : 'border-green-200'}`}
        >
          <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image and Basic Info */}
          <Card className="strain-card">
            <div className="relative">
              <ImageWithFallback
                src={concentrate.image}
                alt={concentrate.name}
                productType="concentrate"
                className="w-full h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${getTypeColor(concentrate.type)} text-sm`}>
                  {concentrate.type.replace('_', ' ')}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 space-y-2">
                <div className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm shadow-lg">
                  {concentrate.thc}% THC
                </div>
                {concentrate.solventFree && (
                  <div className="bg-green-600 text-white px-3 py-1.5 rounded-full text-xs shadow-lg flex items-center">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Solvent-free
                  </div>
                )}
              </div>
            </div>
            
            <CardContent className="strain-card-content">
              <div className="strain-header">
                <h1 className="text-3xl">{concentrate.name}</h1>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-lg">{concentrate.rating}</span>
                    <span className="text-muted-foreground ml-1">({concentrate.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-lg text-purple-600">
                    <Beaker className="w-5 h-5 mr-1" />
                    <span>{concentrate.price}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed mt-4">
                {concentrate.description}
              </p>
            </CardContent>
          </Card>

          {/* Extraction Details */}
          <Card className="strain-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TestTube className="w-5 h-5 mr-2 text-purple-600" />
                Extraction Details
              </CardTitle>
            </CardHeader>
            <CardContent className="strain-card-content space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm text-green-700 mb-1">Extraction Method</h4>
                  <p className="text-lg">{concentrate.extractionMethod}</p>
                </div>
                <div>
                  <h4 className="text-sm text-green-700 mb-1">Consistency</h4>
                  <p className="text-lg capitalize">{concentrate.consistency.replace('-', ' ')}</p>
                </div>
                <div>
                  <h4 className="text-sm text-green-700 mb-1">Strain Origin</h4>
                  <p className="text-lg">{concentrate.strainOrigin}</p>
                </div>
                <div>
                  <h4 className="text-sm text-green-700 mb-1">Lab Tested</h4>
                  <div className="flex items-center">
                    {concentrate.labTested ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className="ml-2">{concentrate.labTested ? 'Yes' : 'No'}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h4 className="text-sm text-green-700 mb-2">Quality Indicators</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <Droplet className="w-4 h-4 mr-2 text-blue-600" />
                    <span className="text-sm">
                      Terpenes: {concentrate.terpenesPreserved ? 'Preserved' : 'Not preserved'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                    <span className="text-sm">
                      Solvent-free: {concentrate.solventFree ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Flavor Profile */}
          <Card className="strain-card">
            <CardHeader>
              <CardTitle>Flavor Profile</CardTitle>
            </CardHeader>
            <CardContent className="strain-card-content">
              <div className="flex flex-wrap gap-2">
                {concentrate.flavorProfile.map(flavor => (
                  <span key={flavor} className="effect-badge">
                    {flavor}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Effects */}
          <Card className="strain-card">
            <CardHeader>
              <CardTitle>Effects</CardTitle>
            </CardHeader>
            <CardContent className="strain-card-content">
              <div className="flex flex-wrap gap-2">
                {concentrate.effects.map(effect => (
                  <span key={effect} className="effect-badge">
                    {effect}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Potency */}
          <Card className="strain-card">
            <CardHeader>
              <CardTitle>Potency</CardTitle>
            </CardHeader>
            <CardContent className="strain-card-content space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-green-700">THC</span>
                  <span className="text-sm">{concentrate.thc}%</span>
                </div>
                <Progress value={concentrate.thc} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-green-700">CBD</span>
                  <span className="text-sm">{concentrate.cbd}%</span>
                </div>
                <Progress value={concentrate.cbd * 10} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Availability */}
          <Card className="strain-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-green-600" />
                Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="strain-card-content">
              <p className="text-sm text-muted-foreground mb-3">
                Available at {concentrate.dispensaries.length} locations
              </p>
              <div className="space-y-2">
                {concentrate.dispensaries.slice(0, 5).map(dispensary => (
                  <div key={dispensary} className="flex items-center p-2 bg-green-50 rounded-lg">
                    <MapPin className="w-4 h-4 text-green-600 mr-2" />
                    <span className="text-sm">{dispensary}</span>
                  </div>
                ))}
                {concentrate.dispensaries.length > 5 && (
                  <p className="text-xs text-muted-foreground">
                    +{concentrate.dispensaries.length - 5} more locations
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage Tips */}
          <Card className="strain-card">
            <CardHeader>
              <CardTitle>Usage Tips</CardTitle>
            </CardHeader>
            <CardContent className="strain-card-content space-y-3">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="text-sm text-yellow-800 mb-1">⚠️ High Potency</h4>
                <p className="text-xs text-yellow-700">
                  Start with a very small amount. Effects can be intense and long-lasting.
                </p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <Thermometer className="w-4 h-4 mr-2 text-red-600" />
                  <span>Best consumed with a dab rig or vaporizer</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2 text-blue-600" />
                  <span>Effects typically last 1-3 hours</span>
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2 text-green-600" />
                  <span>Recommended for experienced users</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}