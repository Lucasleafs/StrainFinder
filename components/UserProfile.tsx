import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Heart, Star, Leaf, User, Settings, BookOpen, Calendar, Beaker } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { strains as strainDatabase } from '../data/strains';
import { concentrateDatabase } from '../data/concentrates';
import { useApp } from '../contexts/AppContext';

export default function UserProfile() {
  const { 
    userProfile, 
    selectStrain, 
    toggleSaveStrain, 
    selectConcentrate, 
    toggleSaveConcentrate, 
    setCurrentView,
    savedStrains,
    savedConcentrates 
  } = useApp();
  const [activeTab, setActiveTab] = useState('saved');

  // Using comprehensive strain database
  const mockStrains = strainDatabase.slice(0, 10); // Show first 10 for demo


  const mockJournalEntries = [
    {
      id: '1',
      strainName: 'Blue Dream',
      date: '2025-01-05',
      effects: ['relaxed', 'happy', 'creative'],
      rating: 4,
      notes: 'Perfect for evening creativity sessions. Felt relaxed but alert.',
      dosage: '0.5g',
      method: 'Vaporizer'
    },
    {
      id: '2',
      strainName: 'Purple Haze',
      date: '2025-01-03',
      effects: ['euphoric', 'energetic', 'focused'],
      rating: 5,
      notes: 'Amazing for morning productivity. Clean, focused energy without anxiety.',
      dosage: '0.3g',
      method: 'Joint'
    },
    {
      id: '3',
      strainName: 'Granddaddy Purple',
      date: '2025-01-01',
      effects: ['relaxed', 'sleepy', 'calm'],
      rating: 4,
      notes: 'Great for insomnia. Fell asleep easily and woke up refreshed.',
      dosage: '0.4g',
      method: 'Edible'
    }
  ];

  const userStats = {
    totalSaved: savedStrains.length + savedConcentrates.length,
    totalReviews: mockJournalEntries.length,
    favoriteType: 'Hybrid',
    averageRating: 4.3
  };

  const userStrains = savedStrains;
  const userConcentrates = savedConcentrates;

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="section-header">
        <h1 className="section-title">Your Profile</h1>
        <p className="section-subtitle">Manage your saved strains and track your experiences</p>
      </div>

      {/* User Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="stat-card border-green-100">
          <div className="stat-value text-green-600">{userStats.totalSaved}</div>
          <div className="stat-label">Saved Strains</div>
        </Card>
        <Card className="stat-card border-blue-100">
          <div className="stat-value text-blue-600">{userStats.totalReviews}</div>
          <div className="stat-label">Journal Entries</div>
        </Card>
        <Card className="stat-card border-purple-100">
          <div className="stat-value text-purple-600">{userStats.favoriteType}</div>
          <div className="stat-label">Favorite Type</div>
        </Card>
        <Card className="stat-card border-yellow-100">
          <div className="stat-value text-yellow-600">{userStats.averageRating}</div>
          <div className="stat-label">Avg Rating</div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-green-50 border border-green-100">
          <TabsTrigger value="saved" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Heart className="w-4 h-4" />
            Saved Items
          </TabsTrigger>
          <TabsTrigger value="journal" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <BookOpen className="w-4 h-4" />
            Journal
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="saved" className="space-y-6">
          {userStrains.length === 0 && userConcentrates.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg mb-2">No saved items yet</h3>
                <p className="text-gray-600 mb-4">
                  Save strains and concentrates as you discover them to keep track of your favorites.
                </p>
                <div className="flex gap-2 justify-center">
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setCurrentView('explore')}
                  >
                    Explore Strains
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => setCurrentView('concentrates')}
                  >
                    Browse Concentrates
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-8">
              {/* Saved Strains */}
              {userStrains.length > 0 && (
                <div>
                  <h3 className="text-xl mb-4 flex items-center">
                    <Leaf className="w-5 h-5 mr-2 text-green-600" />
                    Saved Strains ({userStrains.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userStrains.map(strain => (
                      <Card key={strain.id} className="strain-card">
                        <div className="relative">
                          <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-t-lg overflow-hidden">
                            <img 
                              src={strain.image} 
                              alt={strain.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                            onClick={() => toggleSaveStrain(strain.id)}
                          >
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        
                        <CardContent className="strain-card-content">
                          <div className="strain-header">
                            <h3 className="strain-title">{strain.name}</h3>
                            <Badge variant="outline" className="capitalize border-green-200 text-green-700">
                              {strain.type}
                            </Badge>
                          </div>
                          
                          <div className="strain-meta">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{strain.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Leaf className="w-4 h-4 mr-1 text-green-600" />
                              <span>{strain.thc}% THC</span>
                            </div>
                          </div>
                          
                          <div className="strain-effects">
                            {strain.effects.slice(0, 3).map(effect => (
                              <span key={effect} className="effect-badge">
                                {effect}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button 
                              onClick={() => selectStrain(strain)}
                              className="flex-1 cannabis-button-primary"
                            >
                              View Details
                            </Button>
                            <Button variant="outline" size="sm" className="cannabis-button-secondary">
                              Journal
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Saved Concentrates */}
              {userConcentrates.length > 0 && (
                <div>
                  <h3 className="text-xl mb-4 flex items-center">
                    <Beaker className="w-5 h-5 mr-2 text-purple-600" />
                    Saved Concentrates ({userConcentrates.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {userConcentrates.map(concentrate => (
                      <Card key={concentrate.id} className="strain-card">
                        <div className="relative">
                          <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-purple-200 rounded-t-lg overflow-hidden">
                            <img 
                              src={concentrate.image} 
                              alt={concentrate.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90"
                            onClick={() => toggleSaveConcentrate(concentrate.id)}
                          >
                            <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                          </Button>
                        </div>
                        
                        <CardContent className="strain-card-content">
                          <div className="strain-header">
                            <h3 className="strain-title">{concentrate.name}</h3>
                            <Badge variant="outline" className="capitalize border-purple-200 text-purple-700">
                              {concentrate.type.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          <div className="strain-meta">
                            <div className="flex items-center">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{concentrate.rating}</span>
                            </div>
                            <div className="flex items-center">
                              <Beaker className="w-4 h-4 mr-1 text-purple-600" />
                              <span>{concentrate.thc}% THC</span>
                            </div>
                          </div>
                          
                          <div className="strain-effects">
                            {concentrate.effects.slice(0, 3).map(effect => (
                              <span key={effect} className="effect-badge">
                                {effect}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex gap-2 pt-2">
                            <Button 
                              onClick={() => selectConcentrate(concentrate)}
                              className="flex-1 cannabis-button-primary"
                            >
                              View Details
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="journal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                Strain Journal
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mockJournalEntries.length === 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg mb-2">Start your strain journal</h3>
                  <p className="text-gray-600 mb-4">
                    Track your experiences with different strains to find what works best for you.
                  </p>
                  <Button className="bg-green-600 hover:bg-green-700">
                    Add First Entry
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {mockJournalEntries.map(entry => (
                    <div key={entry.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg">{entry.strainName}</h4>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="w-4 h-4 mr-1" />
                          {entry.date}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4 mb-3 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                          {entry.rating}/5
                        </div>
                        <div>Dosage: {entry.dosage}</div>
                        <div>Method: {entry.method}</div>
                      </div>
                      
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {entry.effects.map(effect => (
                            <Badge key={effect} variant="outline" className="text-xs">
                              {effect}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <p className="text-gray-700">{entry.notes}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="w-5 h-5 mr-2" />
                Profile Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Display Name</label>
                  <input
                    type="text"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter your display name"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-2 block">Email</label>
                  <input
                    type="email"
                    className="w-full p-2 border rounded-lg"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Experience Level</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Beginner</option>
                  <option>Occasional User</option>
                  <option>Regular User</option>
                  <option>Very Experienced</option>
                </select>
              </div>
              
              <div>
                <label className="text-sm text-gray-600 mb-2 block">Preferred THC Range</label>
                <select className="w-full p-2 border rounded-lg">
                  <option>Low (0-10%)</option>
                  <option>Medium (10-20%)</option>
                  <option>High (20%+)</option>
                  <option>CBD-focused</option>
                </select>
              </div>
              
              <div className="pt-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">New strain recommendations</div>
                  <div className="text-xs text-gray-500">Get notified when new strains match your preferences</div>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Dispensary deals</div>
                  <div className="text-xs text-gray-500">Receive notifications about deals on your saved strains</div>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Journal reminders</div>
                  <div className="text-xs text-gray-500">Remind you to log your experiences</div>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}