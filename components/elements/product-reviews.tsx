'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductReviewsProps {
  rating: number;
  reviewCount: number;
}
const mockReviews: Review[] = [
  {
    id: 1,
    author: 'John D.',
    rating: 5,
    date: '2 weeks ago',
    title: 'Best headphones I have ever owned!',
    text: 'Excellent sound quality, very comfortable for long listening sessions. The noise cancellation is outstanding and the battery lasts forever.',
    verified: true,
  },
  {
    id: 2,
    author: 'Sarah M.',
    rating: 4,
    date: '1 month ago',
    title: 'Great quality, minor connectivity issues',
    text: 'The audio quality is excellent and they are very comfortable. Sometimes they take a moment to connect to my phone, but overall very happy.',
    verified: true,
  },
  {
    id: 3,
    author: 'Michael K.',
    rating: 5,
    date: '1 month ago',
    title: 'Perfect for travel and work',
    text: 'These headphones are fantastic. The build quality is premium and they fold up nicely for travel. Worth every penny.',
    verified: true,
  },
];
export default function ProductReviews({
  rating,
  reviewCount,
}: ProductReviewsProps) {
  const ratingDistribution = [
    { stars: 5, count: 2000, percentage: 79 },
    { stars: 4, count: 400, percentage: 16 },
    { stars: 3, count: 100, percentage: 4 },
    { stars: 2, count: 30, percentage: 1 },
    { stars: 1, count: 13, percentage: 0 },
  ];

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Overall Rating */}
          <div className="flex flex-col bg-green-50 rounded-sm items-center justify-center">
            <div className="text-4xl font-bold text-foreground">{rating}</div>
            <div className="mt-2 flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-8 w-8 ${i < Math.floor(rating)
                      ? 'fill-primary text-primary'
                      : 'fill-muted text-gray-200'
                    }`}
                />
              ))}
            </div>
            <div className="mt-2 text-sm text-muted-foreground">
              Based on {reviewCount.toLocaleString()} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="md:col-span-2 space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center gap-3">
                <span className="min-w-12 text-sm font-medium text-muted-foreground">
                  {item.stars} star
                </span>
                <div className="flex-1 h-5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="min-w-12 text-right text-sm text-muted-foreground">
                  {item.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Customer Reviews</h3>
          <Button variant="outline">Write a Review</Button>
        </div>

        <div className="space-y-4">
          {mockReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-lg border border-border bg-card p-4 md:p-6"
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      {review.author}
                    </span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
                        ✓ Verified Purchase
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>
              </div>

              <div className="mb-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${i < review.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted'
                      }`}
                  />
                ))}
              </div>

              <h4 className="mb-2 font-semibold text-foreground">
                {review.title}
              </h4>
              <p className="text-muted-foreground">{review.text}</p>

              <div className="mt-4 flex gap-4 text-sm">
                <button className="text-muted-foreground hover:text-primary">
                  👍 Helpful
                </button>
                <button className="text-muted-foreground hover:text-primary">
                  👎 Not helpful
                </button>
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          View All Reviews
        </Button>
      </div>
    </div>
  );
}
