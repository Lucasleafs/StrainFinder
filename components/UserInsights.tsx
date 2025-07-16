import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  Heart, 
  Zap, 
  Leaf, 
  BarChart3, 
  Target,
  Clock,
  Award
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export default function UserInsights() {
  const { 
    savedStrains, 
    savedConcentrates, 
    savedEdibles, 
    savedCartridges,
    userProfile 
  } = useApp();

  const insights = useMemo(() => {
    const allFavorites = [
      ...savedStrains,
      ...savedConcentrates,
      ...savedEdibles,
      ...savedCartridges
    ];

    // Effect preferences analysis
    const effectCounts: Record<string, number> = {};
    allFavorites.forEach(item => {
      item.effects?.forEach(effect => {
        effectCounts[effect] = (effectCounts[effect] || 0) + 1;
      });
    });

    const sortedEffects = Object.entries(effectCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);

    // THC/CBD preferences
    const thcLevels = allFavorites.map(item => item.thc).filter(Boolean);
    const cbdLevels = allFavorites.map(item => item.cbd).filter(Boolean);
    
    const avgThc = thcLevels.length > 0 ? thcLevels.reduce((a, b) => a + b, 0) / thcLevels.length : 0;
    const avgCbd = cbdLevels.length > 0 ? cbdLevels.reduce((a, b) => a + b, 0) / cbdLevels.length : 0;

    // Product type preferences
    const productTypes = {
      strains: savedStrains.length,
      concentrates: savedConcentrates.length,
      edibles: savedEdibles.length,
      cartridges: savedCartridges.length
    };

    // Price range analysis
    const prices = allFavorites
      .map(item => parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0'))
      .filter(price => price > 0);
    
    const avgPrice = prices.length > 0 ? prices.reduce((a, b) => a + b, 0) / prices.length : 0;
    const priceRange = prices.length > 0 ? {
      min: Math.min(...prices),
      max: Math.max(...prices)
    } : { min: 0, max: 0 };

    // Flavor preferences
    const flavorCounts: Record<string, number> = {};
    allFavorites.forEach(item => {
      const flavors = item.flavorProfile || item.flavors || [];
      flavors.forEach(flavor => {
        flavorCounts[flavor] = (flavorCounts[flavor] || 0) + 1;
      });
    });

    const topFlavors = Object.entries(flavorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 8);

    // Rating preferences
    const ratings = allFavorites.map(item => item.rating).filter(Boolean);
    const avgRating = ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    return {
      totalFavorites: allFavorites.length,
      effectPreferences: sortedEffects,
      potencyProfile: {
        avgThc: Math.round(avgThc * 10) / 10,
        avgCbd: Math.round(avgCbd * 10) / 10,
        thcRange: thcLevels.length > 0 ? {
          min: Math.min(...thcLevels),
          max: Math.max(...thcLevels)
        } : { min: 0, max: 0 }
      },
      productTypePreferences: productTypes,
      priceProfile: {
        avgPrice: Math.round(avgPrice * 100) / 100,
        range: priceRange
      },
      flavorPreferences: topFlavors,
      qualityPreference: Math.round(avgRating * 10) / 10
    };
  }, [savedStrains, savedConcentrates, savedEdibles, savedCartridges]);

  const getProductTypeIcon = (type: string) => {
    switch (type) {
      case 'strains': return <Leaf className="w-4 h-4" />;
      case 'concentrates': return <Zap className="w-4 h-4" />;
      case 'edibles': return <Heart className="w-4 h-4" />;
      case 'cartridges': return <Zap className="w-4 h-4" />;
      default: return <BarChart3 className="w-4 h-4" />;
    }
  };

  const getInsightRecommendations = () => {
    const recommendations = [];

    if (insights.potencyProfile.avgThc > 20) {
      recommendations.push({
        type: 'caution',
        title: 'High THC Preference',
        message: 'You prefer high-potency products. Consider starting with smaller doses when trying new products.'
      });
    }

    if (insights.potencyProfile.avgCbd > 5) {
      recommendations.push({
        type: 'wellness',
        title: 'CBD Enthusiast',
        message: 'You enjoy CBD benefits. Look for balanced products or CBD-dominant strains for wellness.'
      });
    }

    if (insights.productTypePreferences.edibles > insights.totalFavorites * 0.4) {
      recommendations.push({
        type: 'preference',
        title: 'Edible Lover',
        message: 'You prefer edibles. Try different onset times and explore micro-dosing options.'
      });
    }

    return recommendations;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="section-header">
        <h1 className="section-title flex items-center">
          <BarChart3 className="w-8 h-8 mr-3 text-blue-600" />
          Your Cannabis Insights
        </h1>
        <p className="section-subtitle">Discover your preferences and get personalized recommendations</p>
      </div>

      {insights.totalFavorites === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No data available yet</h3>
            <p className="text-gray-600">
              Start saving products to your favorites to see personalized insights
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{insights.totalFavorites}</div>
                  <div className="text-sm text-gray-600">Total Favorites</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{insights.potencyProfile.avgThc}%</div>
                  <div className="text-sm text-gray-600">Avg THC Preference</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Award className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{insights.qualityPreference}</div>
                  <div className="text-sm text-gray-600">Quality Standard</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold">${insights.priceProfile.avgPrice}</div>
                  <div className="text-sm text-gray-600">Avg Price Point</div>
                </CardContent>
              </Card>
            </div>

            {/* Product Type Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Product Type Preferences</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(insights.productTypePreferences).map(([type, count]) => {
                    const percentage = insights.totalFavorites > 0 ? (count / insights.totalFavorites) * 100 : 0;
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getProductTypeIcon(type)}
                          <span className="ml-2 capitalize">{type}</span>
                        </div>
                        <div className="flex items-center space-x-4 flex-1 max-w-md">
                          <Progress value={percentage} className="flex-1" />
                          <span className="text-sm font-medium w-12 text-right">
                            {count} ({Math.round(percentage)}%)
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Effect Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Favorite Effects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {insights.effectPreferences.map(([effect, count]) => (
                      <div key={effect} className="flex items-center justify-between">
                        <Badge variant="outline" className="capitalize">
                          {effect}
                        </Badge>
                        <div className="flex items-center space-x-2">
                          <Progress 
                            value={(count / insights.totalFavorites) * 100} 
                            className="w-24"
                          />
                          <span className="text-sm text-gray-600">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Flavor Preferences */}
              <Card>
                <CardHeader>
                  <CardTitle>Flavor Profile</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {insights.flavorPreferences.map(([flavor, count]) => (
                      <Badge 
                        key={flavor} 
                        variant="secondary"
                        className="capitalize"
                      >
                        {flavor} ({count})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Potency Profile */}
            <Card>
              <CardHeader>
                <CardTitle>Potency Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">THC Preferences</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-medium">{insights.potencyProfile.avgThc}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Range:</span>
                        <span className="font-medium">
                          {insights.potencyProfile.thcRange.min}% - {insights.potencyProfile.thcRange.max}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3">CBD Preferences</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Average:</span>
                        <span className="font-medium">{insights.potencyProfile.avgCbd}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {getInsightRecommendations().map((rec, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        rec.type === 'caution' ? 'bg-yellow-500' :
                        rec.type === 'wellness' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`} />
                      <div>
                        <h4 className="font-medium mb-1">{rec.title}</h4>
                        <p className="text-sm text-gray-600">{rec.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}