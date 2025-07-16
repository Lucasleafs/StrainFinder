import React from 'react';
import { 
  Home, 
  Search, 
  GraduationCap, 
  Beaker, 
  User, 
  Heart,
  Leaf,
  ShoppingCart,
  Zap,
  Cookie,
  Star,
  TrendingUp,
  Settings
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Navigation: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    selectedStrain,
    selectedConcentrate,
    selectedEdible,
    selectedCartridge,
    savedStrains,
    userProfile,
    showComparison,
    setShowComparison,
    setShowFavorites,
    setShowUserInsights
  } = useApp();

  // Don't show navigation during product detail views
  if (selectedStrain || selectedConcentrate || selectedEdible || selectedCartridge || showComparison) {
    return null;
  }

  const navigationItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home className="w-4 h-4" />,
      view: 'home',
      description: 'Personalized recommendations'
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: <Search className="w-4 h-4" />,
      view: 'explore',
      description: 'Search all strains'
    },
    {
      id: 'cartridges',
      label: 'Cartridges',
      icon: <Zap className="w-4 h-4" />,
      view: 'cartridges',
      description: 'Vape cartridges'
    },
    {
      id: 'concentrates',
      label: 'Concentrates',
      icon: <TrendingUp className="w-4 h-4" />,
      view: 'concentrates',
      description: 'Wax, shatter, rosin'
    },
    {
      id: 'edibles',
      label: 'Edibles',
      icon: <Cookie className="w-4 h-4" />,
      view: 'edibles',
      description: 'Gummies, chocolates'
    },
    {
      id: 'education',
      label: 'Learn',
      icon: <GraduationCap className="w-4 h-4" />,
      view: 'education',
      description: 'Cannabis education'
    },
    {
      id: 'terpenes',
      label: 'Terpenes',
      icon: <Beaker className="w-4 h-4" />,
      view: 'terpenes',
      description: 'Aromatic compounds'
    },
    {
      id: 'reviews',
      label: 'Reviews',
      icon: <Star className="w-4 h-4" />,
      view: 'reviews',
      description: 'Community reviews'
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User className="w-4 h-4" />,
      view: 'profile',
      description: 'Your preferences',
      badge: savedStrains.length > 0 ? savedStrains.length : undefined
    }
  ];

  const quickActions = [
    {
      id: 'favorites',
      label: 'Favorites',
      icon: <Heart className="w-4 h-4" />,
      action: () => setShowFavorites(true),
      count: savedStrains.length
    },
    {
      id: 'compare',
      label: 'Compare',
      icon: <ShoppingCart className="w-4 h-4" />,
      action: () => setShowComparison(true)
    },
    {
      id: 'insights',
      label: 'Insights',
      icon: <TrendingUp className="w-4 h-4" />,
      action: () => setShowUserInsights(true)
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-green-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent">
                StrainMatch
              </h1>
              <p className="text-xs text-gray-500 -mt-1">Cannabis Wellness Platform</p>
            </div>
          </div>

          {/* Main Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navigationItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.view)}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  currentView === item.view
                    ? 'bg-green-600 text-white shadow-md transform scale-105'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
                title={item.description}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Secondary Navigation - Desktop */}
          <div className="hidden lg:flex items-center gap-2">
            {navigationItems.slice(5).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.view)}
                className={`relative flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  currentView === item.view
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50'
                }`}
                title={item.description}
              >
                {item.icon}
                <span className="hidden xl:inline">{item.label}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
            
            {/* Quick Actions */}
            <div className="flex items-center gap-1 ml-2 pl-2 border-l border-gray-200">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  onClick={action.action}
                  className="relative p-2 text-gray-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-colors"
                  title={action.label}
                >
                  {action.icon}
                  {action.count && action.count > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[1.25rem] h-5 px-1.5 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                      {action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setCurrentView('profile')}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-green-700 hover:bg-green-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Menu</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden border-t border-gray-100 py-2">
          <div className="flex items-center justify-between">
            {navigationItems.slice(0, 5).map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.view)}
                className={`relative flex flex-col items-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  currentView === item.view
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-green-700'
                }`}
              >
                {item.icon}
                <span className="truncate max-w-[60px]">{item.label}</span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 min-w-[1rem] h-4 px-1 text-xs bg-red-500 text-white rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* User Info Bar - Desktop */}
      {userProfile && (
        <div className="hidden lg:block bg-green-50 border-t border-green-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-4">
                <span className="text-green-700">
                  Welcome back! Experience level: <span className="font-semibold">{userProfile.experience || 'Not set'}</span>
                </span>
                <span className="text-green-600">
                  {savedStrains.length} saved strain{savedStrains.length !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">🌿</span>
                <span className="text-green-700">Cannabis Wellness Journey</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;