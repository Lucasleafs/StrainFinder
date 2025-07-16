import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Heart, Share2, ShoppingCart, Star, MapPin, DollarSign, TrendingUp, Sparkles, Filter } from 'lucide-react';
import { strains as strainDatabase } from '../data/strains';
import { getRecommendations } from '../utils/recommendations';
import { useApp } from '../contexts/AppContext';
import { ProductCard, SectionHeader, LoadingState, EmptyState, StatsCard } from './ui/enhanced-components';
import ProductImage from './ProductImage';
import type { Strain } from '../types';

const EnhancedStrainRecommendations: React.FC = () => {
  const { 
    userProfile, 
    setCurrentView, 
    selectStrain, 
    toggleSaveStrain, 
    isStrainSaved,
    recentlyViewed 
  } = useApp();
  
  const [recommendations, setRecommendations] = useState<Strain[]>([]);
  const [featuredStrains, setFeaturedStrains] = useState<Strain[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      if (userProfile?.preferences) {
        const recommended = getRecommendations(userProfile.preferences, strainDatabase);
        setRecommendations(recommended);
        setFeaturedStrains(recommended.slice(0, 3));
      } else {
        // Show popular strains if no preferences
        const popular = strainDatabase
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 12);
        setRecommendations(popular);
        setFeaturedStrains(popular.slice(0, 3));
      }
      setIsLoading(false);
    }, 800);
  }, [userProfile?.preferences]);

  const handleViewDetails = (strainId: string) => {
    const strain = strainDatabase.find(s => s.id === strainId);
    if (strain) {
      selectStrain(strain);
    }
  };

  const handleLike = (strainId: string) => {
    toggleSaveStrain(strainId);
  };

  const handleShare = (strainId: string) => {
    // Implement sharing functionality
    console.log('Share strain:', strainId);
  };

  const getEffectColor = (effect: string, index: number) => {
    const colors = [
      'bg-emerald-50 text-emerald-700 border-emerald-200',
      'bg-teal-50 text-teal-700 border-teal-200',
      'bg-cyan-50 text-cyan-700 border-cyan-200',
      'bg-sky-50 text-sky-700 border-sky-200',
      'bg-indigo-50 text-indigo-700 border-indigo-200'
    ];
    return colors[index % colors.length];
  };

  const categories = [
    { id: 'all', name: 'All Recommendations', count: recommendations.length },
    { id: 'sativa', name: 'Sativa', count: recommendations.filter(s => s.type === 'sativa').length },
    { id: 'indica', name: 'Indica', count: recommendations.filter(s => s.type === 'indica').length },
    { id: 'hybrid', name: 'Hybrid', count: recommendations.filter(s => s.type === 'hybrid').length },
  ];

  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(strain => strain.type === selectedCategory);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <SectionHeader
          title="Loading Your Recommendations"
          subtitle="Analyzing your preferences to find the perfect strains..."
        />
        <LoadingState variant="cards" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-12 animate-fade-in">
      {/* Enhanced Header */}
      <SectionHeader
        title={userProfile?.preferences ? 'Your Personalized Recommendations' : 'Popular Cannabis Strains'}
        subtitle={userProfile?.preferences 
          ? "Based on your preferences, we've curated the perfect strains for you"
          : "Discover highly-rated strains loved by our community"
        }
        badge={userProfile?.preferences ? 'Personalized' : 'Popular'}
      >
        {userProfile?.preferences && (
          <div className="flex justify-center gap-2 flex-wrap mt-4">
            {userProfile.preferences.desiredEffects.slice(0, 6).map((effect, index) => (
              <Badge key={effect} variant="secondary" className={getEffectColor(effect, index)}>
                <Sparkles className="h-3 w-3 mr-1" />
                {effect}
              </Badge>
            ))}
          </div>
        )}
      </SectionHeader>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatsCard
          title="Total Strains"
          value={recommendations.length}
          icon={<TrendingUp className="h-6 w-6 text-green-600" />}
        />
        <StatsCard
          title="Avg Rating"
          value={`${recommendations.length > 0 ? (recommendations.reduce((acc, strain) => acc + strain.rating, 0) / recommendations.length).toFixed(1) : '0.0'}★`}
          icon={<Star className="h-6 w-6 text-yellow-500" />}
        />
        <StatsCard
          title="Saved Favorites"
          value={recommendations.filter(strain => isStrainSaved(strain.id)).length}
          icon={<Heart className="h-6 w-6 text-red-500" />}
        />
        <StatsCard
          title="Recently Viewed"
          value={recentlyViewed.length}
          icon={<Filter className="h-6 w-6 text-blue-500" />}
        />
      </div>

      {/* Featured Strains */}
      {featuredStrains.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Featured Recommendations</h2>
            <Badge variant="secondary" className="bg-purple-100 text-purple-700">
              <Sparkles className="h-3 w-3 mr-1" />
              Top Picks
            </Badge>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredStrains.map((strain) => (
              <ProductCard
                key={strain.id}
                id={strain.id}
                name={strain.name}
                type={strain.type}
                image={strain.image}
                rating={strain.rating}
                reviews={strain.reviews}
                price={strain.price}
                thc={strain.thc}
                cbd={strain.cbd}
                effects={strain.effects}
                flavors={strain.flavors}
                description={strain.description}
                dispensaries={strain.dispensaries}
                isLiked={isStrainSaved(strain.id)}
                onLike={handleLike}
                onShare={handleShare}
                onViewDetails={handleViewDetails}
                variant="featured"
                className="animate-scale-in"
              />
            ))}
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Recently Viewed</h2>
            <Button variant="ghost" size="sm" onClick={() => setCurrentView('profile')}>
              View All
            </Button>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {recentlyViewed.slice(0, 8).map((product) => (
              <div key={product.id} className="min-w-[200px]">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  type={'type' in product ? product.type : 'product'}
                  image={product.image}
                  rating={product.rating}
                  reviews={product.reviews}
                  price={'price' in product ? product.price : undefined}
                  thc={'thc' in product ? product.thc : undefined}
                  cbd={'cbd' in product ? product.cbd : undefined}
                  effects={'effects' in product ? product.effects : []}
                  description={'description' in product ? product.description : ''}
                  isLiked={isStrainSaved(product.id)}
                  onLike={handleLike}
                  onViewDetails={handleViewDetails}
                  variant="compact"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Category Filter */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Browse by Type</h2>
          <div className="flex gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? "cannabis-button-primary" : "cannabis-button-secondary"}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Recommendations Grid */}
        {filteredRecommendations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRecommendations.map((strain, index) => (
              <ProductCard
                key={strain.id}
                id={strain.id}
                name={strain.name}
                type={strain.type}
                image={strain.image}
                rating={strain.rating}
                reviews={strain.reviews}
                price={strain.price}
                thc={strain.thc}
                cbd={strain.cbd}
                effects={strain.effects}
                flavors={strain.flavors}
                description={strain.description}
                dispensaries={strain.dispensaries}
                isLiked={isStrainSaved(strain.id)}
                onLike={handleLike}
                onShare={handleShare}
                onViewDetails={handleViewDetails}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 50}ms` }}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No strains found"
            description="Try selecting a different category or update your preferences."
            action={{
              label: "Update Preferences",
              onClick: () => setCurrentView('profile')
            }}
          />
        )}
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-green-50 via-green-50 to-purple-50 rounded-3xl p-8 text-center border border-green-100">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              <Sparkles className="h-3 w-3 mr-1" />
              Explore More
            </Badge>
            <h3 className="text-3xl font-bold text-gray-900">Ready to discover more?</h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Browse our complete catalog of strains, concentrates, edibles, and cartridges. 
              Find the perfect products for every occasion and preference.
            </p>
          </div>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button 
              onClick={() => setCurrentView('explore')}
              className="cannabis-button-primary"
              size="lg"
            >
              <TrendingUp className="h-5 w-5 mr-2" />
              Explore All Products
            </Button>
            <Button 
              onClick={() => setCurrentView('profile')}
              variant="outline"
              size="lg"
              className="cannabis-button-secondary"
            >
              Update My Profile
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedStrainRecommendations;