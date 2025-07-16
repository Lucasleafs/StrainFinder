import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { X, Plus, Star, Zap, Leaf, Beaker } from 'lucide-react';
import ProductImage from './ProductImage';
import { useApp } from '../contexts/AppContext';
import { Strain, Concentrate, Edible, Cartridge } from '../types';

type ComparableProduct = Strain | Concentrate | Edible | Cartridge;

interface ProductComparisonProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductComparison({ isOpen, onClose }: ProductComparisonProps) {
  const { comparisonList, removeFromComparison, clearComparison } = useApp();
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

  const getProductType = (product: ComparableProduct): string => {
    if ('genetics' in product) return 'strain';
    if ('extractionMethod' in product) return 'concentrate';
    if ('servingSize' in product) return 'edible';
    if ('hardware' in product) return 'cartridge';
    return 'unknown';
  };

  const getProductTypeIcon = (type: string) => {
    switch (type) {
      case 'strain': return <Leaf className="w-4 h-4" />;
      case 'concentrate': return <Beaker className="w-4 h-4" />;
      case 'edible': return <Zap className="w-4 h-4" />;
      case 'cartridge': return <Zap className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const renderOverviewComparison = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {comparisonList.map((product) => {
        const productType = getProductType(product);
        return (
          <Card key={product.id} className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 z-10 bg-white/90 hover:bg-white shadow-sm rounded-full p-1"
              onClick={() => removeFromComparison(product.id)}
            >
              <X className="w-4 h-4" />
            </Button>
            
            <div className="relative">
              <ProductImage
                src={product.image}
                alt={product.name}
                productType={productType as 'strain' | 'concentrate' | 'edible' | 'cartridge'}
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-2 left-2">
                <Badge className="bg-white/90 text-gray-800 flex items-center">
                  {getProductTypeIcon(productType)}
                  <span className="ml-1 capitalize">{productType}</span>
                </Badge>
              </div>
            </div>

            <CardContent className="p-4">
              <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">THC:</span>
                  <span className="font-medium">{product.thc}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">CBD:</span>
                  <span className="font-medium">{product.cbd}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Rating:</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{product.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="font-medium">{product.price}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Effects:</div>
                <div className="flex flex-wrap gap-1">
                  {product.effects.slice(0, 3).map(effect => (
                    <Badge key={effect} variant="outline" className="text-xs">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </div>

              {productType === 'strain' && 'type' in product && (
                <div className="mb-2">
                  <span className="text-sm text-gray-600">Type: </span>
                  <Badge variant="secondary" className="capitalize">
                    {product.type}
                  </Badge>
                </div>
              )}

              <p className="text-sm text-gray-600 line-clamp-2">
                {product.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
      
      {comparisonList.length < 4 && (
        <Card className="border-dashed border-2 border-gray-300 flex items-center justify-center min-h-[300px]">
          <div className="text-center text-gray-500">
            <Plus className="w-8 h-8 mx-auto mb-2" />
            <p>Add products to compare</p>
            <p className="text-sm">Browse and click "Compare" on products</p>
          </div>
        </Card>
      )}
    </div>
  );

  const renderDetailedComparison = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left p-4 font-medium">Attribute</th>
            {comparisonList.map(product => (
              <th key={product.id} className="text-left p-4 min-w-[200px]">
                <div className="flex items-center">
                  <div className="mr-2">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      productType={getProductType(product) as 'strain' | 'concentrate' | 'edible' | 'cartridge'}
                      className="w-12 h-12 rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-sm line-clamp-2">{product.name}</div>
                    <Badge variant="outline" className="text-xs mt-1">
                      {getProductType(product)}
                    </Badge>
                  </div>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-4 font-medium">THC Content</td>
            {comparisonList.map(product => (
              <td key={product.id} className="p-4">
                <div className="flex items-center">
                  <span className="text-lg font-bold text-purple-600">{product.thc}%</span>
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-4 font-medium">CBD Content</td>
            {comparisonList.map(product => (
              <td key={product.id} className="p-4">
                <div className="flex items-center">
                  <span className="text-lg font-bold text-green-600">{product.cbd}%</span>
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-4 font-medium">Rating</td>
            {comparisonList.map(product => (
              <td key={product.id} className="p-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-4 font-medium">Price</td>
            {comparisonList.map(product => (
              <td key={product.id} className="p-4">
                <span className="font-bold text-green-600">{product.price}</span>
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-4 font-medium">Effects</td>
            {comparisonList.map(product => (
              <td key={product.id} className="p-4">
                <div className="flex flex-wrap gap-1">
                  {product.effects.map(effect => (
                    <Badge key={effect} variant="outline" className="text-xs">
                      {effect}
                    </Badge>
                  ))}
                </div>
              </td>
            ))}
          </tr>
          <tr className="border-b">
            <td className="p-4 font-medium">Dispensaries</td>
            {comparisonList.map(product => (
              <td key={product.id} className="p-4">
                <span className="text-sm">{product.dispensaries.length} locations</span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-2xl font-bold">Product Comparison</h2>
            <p className="text-gray-600">Compare up to 4 products side by side</p>
          </div>
          <div className="flex gap-2">
            {comparisonList.length > 0 && (
              <Button variant="outline" onClick={clearComparison}>
                Clear All
              </Button>
            )}
            <Button variant="ghost" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {comparisonList.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Plus className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No products to compare</h3>
              <p className="text-gray-600 mb-4">
                Browse products and click "Compare" to add them here
              </p>
              <Button onClick={onClose}>Start Browsing</Button>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="detailed">Detailed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                {renderOverviewComparison()}
              </TabsContent>
              
              <TabsContent value="detailed">
                {renderDetailedComparison()}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
}