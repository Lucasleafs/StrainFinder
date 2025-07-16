import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Brain, Leaf, Heart } from 'lucide-react';

export default function SimpleEducation() {
  const articles = [
    {
      title: "Cannabis Basics: THC vs CBD",
      excerpt: "Learn the fundamental differences between THC and CBD compounds.",
      icon: <Leaf className="w-6 h-6" />,
      readTime: "5 min"
    },
    {
      title: "Understanding Strain Types",
      excerpt: "Discover the differences between Indica, Sativa, and Hybrid strains.",
      icon: <Brain className="w-6 h-6" />,
      readTime: "7 min"
    },
    {
      title: "Medical Cannabis Guide",
      excerpt: "How to use cannabis for medical purposes safely and effectively.",
      icon: <Heart className="w-6 h-6" />,
      readTime: "10 min"
    }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-800 to-purple-800 bg-clip-text text-transparent mb-4">
          Cannabis Education
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn about cannabis with our comprehensive educational resources.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 rounded-lg text-green-600">
                  {article.icon}
                </div>
                <span className="text-sm text-gray-500">{article.readTime}</span>
              </div>
              <CardTitle className="text-lg">{article.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{article.excerpt}</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                <BookOpen className="w-4 h-4 mr-2" />
                Read Article
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="bg-gradient-to-r from-green-50 to-purple-50 border-green-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Want to Learn More?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our comprehensive guides and research-backed information about cannabis.
            </p>
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Browse All Articles
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}