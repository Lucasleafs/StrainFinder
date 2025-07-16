import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { Star, Heart, MapPin, Leaf, CheckCircle } from 'lucide-react';

// Example component demonstrating consistent typography usage
function TypographyStandardized() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Page Header - Consistent Typography */}
      <div className="text-center space-y-4">
        <h1 className="text-hero text-gradient-cannabis">
          StrainMatch Typography Standards
        </h1>
        <p className="text-subtitle max-w-2xl mx-auto">
          Demonstrating consistent typography patterns across our cannabis recommendation platform
        </p>
      </div>

      {/* Strain Card Example */}
      <Card className="wellness-card">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="strain-name mb-2">
                Blue Dream
              </CardTitle>
              <CardDescription className="card-description">
                A balanced hybrid strain known for its cerebral effects and berry aroma
              </CardDescription>
            </div>
            <Badge variant="secondary" className="strain-type">
              Hybrid
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 pt-2">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="rating-text">4.8</span>
            </div>
            <span className="thc-percentage">18% THC</span>
            <span className="price-text">$15/g</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Effects Section */}
          <div>
            <h4 className="text-h5 mb-2">Effects</h4>
            <div className="flex flex-wrap gap-2">
              {['relaxed', 'happy', 'creative', 'euphoric'].map((effect) => (
                <Badge key={effect} variant="outline" className="effect-text">
                  {effect}
                </Badge>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-h5 mb-2">Description</h4>
            <p className="text-body-sm">
              Blue Dream is a sativa-dominant hybrid originating in California. 
              This strain delivers swift relaxation with gentle cerebral invigoration, 
              making it perfect for both novice and veteran consumers.
            </p>
          </div>

          {/* Location */}
          <div className="flex items-center text-caption">
            <MapPin className="h-4 w-4 mr-2 text-gray-500" />
            Available at 3 nearby dispensaries
          </div>

          <Separator />

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1 button-text">
              <CheckCircle className="h-4 w-4 mr-2" />
              View Details
            </Button>
            <Button variant="outline" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Typography Scale Example */}
      <Card className="wellness-card">
        <CardHeader>
          <CardTitle className="text-h3">Typography Scale</CardTitle>
          <CardDescription>
            Our consistent typography hierarchy ensures readable, accessible content
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Headings */}
          <div className="space-y-3">
            <h1 className="text-h1">Heading 1 - Display</h1>
            <h2 className="text-h2">Heading 2 - Page Title</h2>
            <h3 className="text-h3">Heading 3 - Section</h3>
            <h4 className="text-h4">Heading 4 - Subsection</h4>
            <h5 className="text-h5">Heading 5 - Component</h5>
            <h6 className="text-h6">Heading 6 - Small</h6>
          </div>

          <Separator />

          {/* Body Text */}
          <div className="space-y-3">
            <p className="text-body-lg">Large body text for important content</p>
            <p className="text-body">Regular body text for standard content</p>
            <p className="text-body-sm">Small body text for secondary information</p>
            <p className="text-caption">Caption text for metadata and labels</p>
          </div>

          <Separator />

          {/* Cannabis-Specific Typography */}
          <div className="space-y-3">
            <div className="strain-name">Northern Lights</div>
            <div className="strain-type">indica dominant</div>
            <div className="thc-percentage">22% THC</div>
            <div className="effect-text">relaxed • sleepy • euphoric</div>
            <div className="price-text">$18.50/gram</div>
          </div>

          <Separator />

          {/* Utility Classes */}
          <div className="space-y-2">
            <div className="text-overline">Overline Text</div>
            <div className="text-gradient-green">Green Gradient Text</div>
            <div className="text-gradient-purple">Purple Gradient Text</div>
            <div className="text-gradient-cannabis">Cannabis Brand Gradient</div>
          </div>
        </CardContent>
      </Card>

      {/* Responsive Typography Note */}
      <Card className="wellness-card bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="icon-circle bg-green-100 p-2">
              <Leaf className="h-4 w-4 text-green-600" />
            </div>
            <div>
              <h4 className="text-h5 text-green-800 mb-2">Responsive Typography</h4>
              <p className="text-body-sm text-green-700">
                Our typography system automatically scales down on mobile devices to ensure 
                optimal readability across all screen sizes. Headings reduce by one size level 
                on screens smaller than 640px.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TypographyStandardized;