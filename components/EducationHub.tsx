import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  BookOpen, 
  Leaf, 
  TestTube, 
  Brain, 
  Heart, 
  Lightbulb,
  Beaker,
  Users,
  PlayCircle,
  FileText,
  GraduationCap
} from 'lucide-react';

export default function EducationHub() {
  const [activeTab, setActiveTab] = useState('basics');

  const articles = [
    {
      id: 1,
      title: "Cannabis Basics: Understanding THC vs CBD",
      category: "Fundamentals",
      readTime: "5 min read",
      excerpt: "Learn the fundamental differences between THC and CBD, and how they affect your experience.",
      icon: <Leaf className="w-5 h-5" />,
      difficulty: "Beginner"
    },
    {
      id: 2,
      title: "Indica vs Sativa vs Hybrid: What's the Difference?",
      category: "Strain Types",
      readTime: "7 min read",
      excerpt: "Discover the characteristics of different cannabis types and how to choose the right one.",
      icon: <TestTube className="w-5 h-5" />,
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Understanding Terpenes and Their Effects",
      category: "Science",
      readTime: "10 min read",
      excerpt: "Deep dive into terpenes and how they contribute to cannabis effects and flavors.",
      icon: <Brain className="w-5 h-5" />,
      difficulty: "Intermediate"
    },
    {
      id: 4,
      title: "Medical Cannabis: Finding the Right Strain",
      category: "Medical",
      readTime: "8 min read",
      excerpt: "Guide to using cannabis for medical purposes and choosing appropriate strains.",
      icon: <Heart className="w-5 h-5" />,
      difficulty: "Intermediate"
    },
    {
      id: 5,
      title: "Consumption Methods: Pros and Cons",
      category: "Consumption",
      readTime: "6 min read",
      excerpt: "Compare different ways to consume cannabis and their effects on your experience.",
      icon: <Lightbulb className="w-5 h-5" />,
      difficulty: "Beginner"
    },
    {
      id: 6,
      title: "Advanced: Concentrates and Extracts",
      category: "Advanced",
      readTime: "12 min read",
      excerpt: "Understanding different types of cannabis concentrates and their production methods.",
      icon: <Beaker className="w-5 h-5" />,
      difficulty: "Advanced"
    }
  ];

  const guides = [
    {
      title: "Beginner's Guide to Cannabis",
      description: "Everything you need to know when starting your cannabis journey",
      lessons: 8,
      duration: "45 min",
      level: "Beginner"
    },
    {
      title: "Understanding Cannabis Science",
      description: "Deep dive into cannabinoids, terpenes, and the endocannabinoid system",
      lessons: 12,
      duration: "90 min",
      level: "Intermediate"
    },
    {
      title: "Medical Cannabis Mastery",
      description: "Comprehensive guide to using cannabis for medical purposes",
      lessons: 15,
      duration: "120 min",
      level: "Advanced"
    }
  ];

  const categories = [
    { id: 'basics', name: 'Cannabis Basics', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'science', name: 'Science & Research', icon: <TestTube className="w-4 h-4" /> },
    { id: 'medical', name: 'Medical Use', icon: <Heart className="w-4 h-4" /> },
    { id: 'guides', name: 'Complete Guides', icon: <GraduationCap className="w-4 h-4" /> }
  ];

  const filteredArticles = articles.filter(article => {
    switch (activeTab) {
      case 'basics':
        return article.category === 'Fundamentals' || article.category === 'Strain Types' || article.category === 'Consumption';
      case 'science':
        return article.category === 'Science' || article.category === 'Advanced';
      case 'medical':
        return article.category === 'Medical';
      case 'guides':
        return false; // Guides have their own content
      default:
        return true;
    }
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Advanced':
        return 'bg-red-100 text-red-700 border-red-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Cannabis Education Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn everything about cannabis with our comprehensive guides, articles, and research-backed information.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-green-50 border border-green-100 mb-8">
          {categories.map(category => (
            <TabsTrigger 
              key={category.id}
              value={category.id} 
              className="flex items-center gap-2 data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              {category.icon}
              <span className="hidden sm:inline">{category.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Articles Content */}
        {activeTab !== 'guides' && (
          <TabsContent value={activeTab} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map(article => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                          {article.icon}
                        </div>
                        <Badge variant="outline" className={getDifficultyColor(article.difficulty)}>
                          {article.difficulty}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-500">{article.readTime}</span>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">
                        {article.category}
                      </Badge>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <BookOpen className="w-4 h-4 mr-2" />
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        )}

        {/* Guides Content */}
        <TabsContent value="guides" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl">
                      <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <Badge variant="outline" className={getDifficultyColor(guide.level)}>
                      {guide.level}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{guide.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{guide.description}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <FileText className="w-4 h-4 mr-2" />
                      {guide.lessons} lessons
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <PlayCircle className="w-4 h-4 mr-2" />
                      {guide.duration} total
                    </div>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Section */}
      <div className="mt-12">
        <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
          <CardContent className="p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Join Our Cannabis Community
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Connect with other cannabis enthusiasts, share experiences, and learn from experts in our growing community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  <Users className="w-5 h-5 mr-2" />
                  Join Community
                </Button>
                <Button size="lg" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Browse All Articles
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}