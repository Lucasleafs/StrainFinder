import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { 
  Star, 
  ThumbsUp, 
  User,
  CheckCircle
} from 'lucide-react';

interface Review {
  id: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  effects: string[];
  helpfulCount: number;
  createdAt: Date;
  verified: boolean;
}

const sampleReviews: Review[] = [
  {
    id: '1',
    userName: 'Sarah M.',
    rating: 5,
    title: 'Perfect Balance for Daytime Use',
    content: 'This strain delivers exactly what I was looking for - a balanced high that keeps me functional during the day. The flavor is incredibly smooth with distinct blueberry notes.',
    effects: ['relaxed', 'creative', 'focused', 'euphoric'],
    helpfulCount: 24,
    createdAt: new Date('2024-01-15'),
    verified: true
  },
  {
    id: '2',
    userName: 'Mike J.',
    rating: 4,
    title: 'Great for Evening Creativity',
    content: 'Used this for my evening art sessions and it really helped with creative flow. The onset was smooth and the effects were well-balanced.',
    effects: ['creative', 'relaxed', 'focused', 'uplifted'],
    helpfulCount: 18,
    createdAt: new Date('2024-01-10'),
    verified: true
  }
];

function EnhancedReviewSystem({ itemId }: { itemId: string }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewData, setReviewData] = useState({
    rating: 5,
    title: '',
    content: ''
  });

  const reviews = sampleReviews; // In real app, filter by itemId
  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  const handleSubmitReview = () => {
    console.log('Submitting review:', reviewData);
    setShowReviewForm(false);
    setReviewData({
      rating: 5,
      title: '',
      content: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Reviews & Ratings</span>
            <Button onClick={() => setShowReviewForm(true)}>
              Write Review
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-5xl font-bold text-green-600 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`w-5 h-5 ${
                      star <= averageRating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{reviews.length} reviews</p>
            </div>
            
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(r => r.rating === rating).length;
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <Progress value={percentage} className="flex-1 h-2" />
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Review Form */}
      {showReviewForm && (
        <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Overall Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star}
                    className={`w-8 h-8 cursor-pointer ${
                      star <= reviewData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                    onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Title</label>
              <input
                type="text"
                value={reviewData.title}
                onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Summarize your experience..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Detailed Review</label>
              <Textarea
                value={reviewData.content}
                onChange={(e) => setReviewData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Share your detailed experience..."
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <Button onClick={handleSubmitReview}>Submit Review</Button>
              <Button variant="outline" onClick={() => setShowReviewForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">{review.userName}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star}
                            className={`w-4 h-4 ${
                              star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      {review.verified && (
                        <Badge variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {review.createdAt.toLocaleDateString()}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="font-medium mb-2">{review.title}</h3>
              <p className="text-gray-700 mb-4">{review.content}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {review.effects.map((effect) => (
                  <Badge key={effect} variant="secondary">
                    {effect}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {review.helpfulCount}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default EnhancedReviewSystem;