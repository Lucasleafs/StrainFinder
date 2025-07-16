import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Badge } from './badge';
import { Button } from './button';
import { cn } from './utils';
import { Star, Heart, Share2, Sparkles, TrendingUp, Clock, Users, MapPin, Leaf } from 'lucide-react';

// Enhanced Product Card with consistent design
interface ProductCardProps {
  id: string;
  name: string;
  type: string;
  image: string;
  rating: number;
  reviews: number;
  price?: string;
  thc?: number;
  cbd?: number;
  effects: string[];
  flavors?: string[];
  description: string;
  dispensaries?: string[];
  isLiked?: boolean;
  onLike?: (id: string) => void;
  onShare?: (id: string) => void;
  onViewDetails: (id: string) => void;
  className?: string;
  variant?: 'default' | 'compact' | 'featured';
}

export function ProductCard({
  id,
  name,
  type,
  image,
  rating,
  reviews,
  price,
  thc,
  cbd,
  effects,
  flavors,
  description,
  dispensaries,
  isLiked = false,
  onLike,
  onShare,
  onViewDetails,
  className,
  variant = 'default'
}: ProductCardProps) {
  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'sativa': return 'bg-green-100 text-green-800 border-green-200';
      case 'indica': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'hybrid': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
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

  if (variant === 'compact') {
    return (
      <Card className={cn("group hover:shadow-lg transition-all duration-300 cursor-pointer", className)}>
        <div className="relative">
          <div className="h-32 bg-gradient-to-br from-green-50 to-purple-50 rounded-t-lg overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            {onLike && (
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0 bg-white/90 hover:bg-white" onClick={() => onLike(id)}>
                <Heart className={cn("h-3 w-3", isLiked ? "fill-red-500 text-red-500" : "text-gray-600")} />
              </Button>
            )}
          </div>
          <Badge className={cn("absolute top-2 left-2 text-xs", getTypeColor(type))}>
            {type}
          </Badge>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm mb-1 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-xs font-medium">{rating}</span>
            </div>
            {thc && <span className="text-xs text-green-600">{thc}% THC</span>}
          </div>
          <Button size="sm" onClick={() => onViewDetails(id)} className="w-full h-7 text-xs">
            View Details
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (variant === 'featured') {
    return (
      <Card className={cn("group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden", className)}>
        <div className="relative">
          <div className="h-64 bg-gradient-to-br from-green-50 to-purple-50 overflow-hidden">
            <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-4 right-4 flex gap-2">
            {onLike && (
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm" onClick={() => onLike(id)}>
                <Heart className={cn("h-4 w-4", isLiked ? "fill-red-500 text-red-500" : "text-gray-600")} />
              </Button>
            )}
            {onShare && (
              <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm" onClick={() => onShare(id)}>
                <Share2 className="h-4 w-4 text-gray-600" />
              </Button>
            )}
          </div>
          <div className="absolute top-4 left-4">
            <Badge className={cn("shadow-sm", getTypeColor(type))}>
              <Sparkles className="h-3 w-3 mr-1" />
              {type}
            </Badge>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                  <span className="text-sm text-gray-600">({reviews} reviews)</span>
                </div>
                {price && (
                  <span className="font-semibold text-green-600">{price}</span>
                )}
              </div>
              <div className="flex items-center gap-4">
                {thc && <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">{thc}% THC</span>}
                {cbd && <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">{cbd}% CBD</span>}
              </div>
            </div>
          </div>
        </div>
        
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-green-600 transition-colors">{name}</h3>
              <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
            </div>
            
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Effects</h4>
                <div className="flex flex-wrap gap-1">
                  {effects.slice(0, 4).map((effect, index) => (
                    <Badge key={effect} variant="outline" className={cn("text-xs", getEffectColor(effect, index))}>
                      {effect}
                    </Badge>
                  ))}
                  {effects.length > 4 && (
                    <Badge variant="outline" className="text-xs">+{effects.length - 4}</Badge>
                  )}
                </div>
              </div>
              
              {dispensaries && dispensaries.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">Available at</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {dispensaries.slice(0, 2).join(', ')}
                    {dispensaries.length > 2 && ` +${dispensaries.length - 2} more`}
                  </p>
                </div>
              )}
            </div>
            
            <Button onClick={() => onViewDetails(id)} className="w-full bg-green-600 hover:bg-green-700">
              View Full Details
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Default variant
  return (
    <Card className={cn("group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden", className)}>
      <div className="relative">
        <div className="h-48 bg-gradient-to-br from-green-50 to-purple-50 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="absolute top-4 right-4 flex gap-2">
          {onLike && (
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm" onClick={() => onLike(id)}>
              <Heart className={cn("h-4 w-4", isLiked ? "fill-red-500 text-red-500" : "text-gray-600")} />
            </Button>
          )}
          {onShare && (
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0 bg-white/90 hover:bg-white backdrop-blur-sm" onClick={() => onShare(id)}>
              <Share2 className="h-4 w-4 text-gray-600" />
            </Button>
          )}
        </div>
        <Badge className={cn("absolute top-4 left-4", getTypeColor(type))}>
          {type}
        </Badge>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span className="text-sm text-gray-600">({reviews})</span>
              </div>
              {price && <span className="font-medium text-green-600">{price}</span>}
            </div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold mb-1 group-hover:text-green-600 transition-colors">{name}</h3>
            <div className="flex items-center gap-3 text-sm text-gray-600">
              {thc && <span>THC: {thc}%</span>}
              {cbd && <span>CBD: {cbd}%</span>}
            </div>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-2">{description}</p>
          
          <div>
            <h4 className="font-medium text-sm mb-2">Effects</h4>
            <div className="flex flex-wrap gap-1">
              {effects.slice(0, 3).map((effect, index) => (
                <Badge key={effect} variant="outline" className={cn("text-xs", getEffectColor(effect, index))}>
                  {effect}
                </Badge>
              ))}
              {effects.length > 3 && (
                <Badge variant="outline" className="text-xs">+{effects.length - 3}</Badge>
              )}
            </div>
          </div>
          
          <Button onClick={() => onViewDetails(id)} className="w-full bg-green-600 hover:bg-green-700">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Section Header
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  badge?: string;
  children?: React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, subtitle, badge, children, className }: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4 mb-8", className)}>
      <div className="text-center space-y-2">
        {badge && (
          <Badge variant="secondary" className="bg-green-100 text-green-700 mb-2">
            <TrendingUp className="h-3 w-3 mr-1" />
            {badge}
          </Badge>
        )}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

// Loading State Component
interface LoadingStateProps {
  message?: string;
  variant?: 'cards' | 'list' | 'minimal';
}

export function LoadingState({ message = "Loading...", variant = 'cards' }: LoadingStateProps) {
  if (variant === 'minimal') {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">{message}</span>
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
              <div className="rounded-full bg-gray-300 h-12 w-12"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Cards variant
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-gray-200 h-48 rounded-t-lg"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-1/2"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-5/6"></div>
            </div>
            <div className="h-8 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Empty State Component
interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({ title, description, icon, action, className }: EmptyStateProps) {
  return (
    <div className={cn("text-center py-12", className)}>
      <div className="mb-6">
        {icon || <div className="text-6xl mb-4">🔍</div>}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      {action && (
        <Button onClick={action.onClick} variant="outline">
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Stats Card Component
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    trend: 'up' | 'down';
  };
  icon?: React.ReactNode;
  className?: string;
}

export function StatsCard({ title, value, change, icon, className }: StatsCardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={cn("text-sm flex items-center mt-1", 
              change.trend === 'up' ? 'text-green-600' : 'text-red-600'
            )}>
              <TrendingUp className={cn("h-4 w-4 mr-1", 
                change.trend === 'down' && 'rotate-180'
              )} />
              {change.value}
            </p>
          )}
        </div>
        {icon && (
          <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}