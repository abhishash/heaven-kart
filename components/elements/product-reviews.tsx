'use client';

import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { fetchHandler, methods } from '@/lib/fetch-handler';
import { PRODUCTS_DETAIL, REVIEWS } from '@/lib/constants';
import { ProductResponse, ReviewsTypes } from '@/lib/types';
import Reviews, { ReviewListSkeleton } from './product/placeholder/review';
import { isArray } from '@/lib/type-guards';
import Image from 'next/image';

interface ProductReviewsProps {
  productId: number;
}

export default function ProductReviews({
  productId
}: ProductReviewsProps) {

  const { data, isPending,  } = useQuery<ReviewsTypes>({
    queryKey: [`review`, productId],
    enabled: !!productId,
    queryFn: () =>
      fetchHandler({
        endpoint: `${REVIEWS.endpoint}/${productId}`,
        method: REVIEWS?.method as methods,
      }),
  });

  const reviews = data?.data;
  const totalReviews = reviews?.total_reviews ?? 0; // total rating
  const startRating = reviews?.rating ?? 0; // star rating

  const ratingDistribution = reviews?.rating_distribution;

  return (
    <div className="gap-3 sm:gap-6 grid grid-cols-6">
      {/* Rating Summary */}
      <div className="col-span-6 sm:col-span-2 ">
        {
          isPending ? <Reviews /> : <div className="flex gap-8 flex-col">
            {/* Overall Rating */}
            <div className="flex flex-col py-3 bg-green-50 rounded-sm items-center justify-center">
              <div className="text-4xl font-bold text-foreground">{startRating?.toFixed(1)}</div>
              <div className="mt-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${i < Math.floor(startRating)
                      ? 'fill-green-700 text-green-700'
                      : 'fill-muted text-gray-200'
                      }`}
                  />
                ))}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                Based on {totalReviews} reviews
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="md:col-span-2 space-y-3">
              {ratingDistribution?.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="min-w-12 text-sm font-medium text-muted-foreground">
                    {item.stars} star
                  </span>
                  <div className="flex-1 h-4 rounded-md bg-muted overflow-hidden">
                    <div
                      className="h-full bg-green-700 rounded-md transition-all"
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
        }
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4 col-span-6 sm:col-span-4">
        {
          isPending ? <ReviewListSkeleton /> :  isArray(reviews?.reviews) ? <div className="space-y-4">
            {reviews?.reviews?.map((review, index) => (
              <div
                key={index}
                className="rounded-lg border border-border bg-card p-4 md:p-6"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">
                        {review.user_name}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {review.date}
                    </span>
                  </div>
                </div>

                <div className="mb-2 flex gap-1">
                  {[...Array(review?.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating
                        ? 'fill-green-700 text-green-700'
                        : 'fill-muted text-muted'
                        }`}
                    />
                  ))}
                </div>


                <p className="text-muted-foreground">{review.review}</p>

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
          </div> : <div className='flex items-center p-4 sm:p-0 h-full justify-center rounded-lg border border-border flex-col'> <Image src="/icon/customer-satisfaction.png" alt="no-review-found" width={120} height={120} />  <p className='text-green-700'>You can first review still not review found.</p></div>
        }

        {
          totalReviews > 5 ? <Button variant="outline" className="w-full bg-transparent">
            View More
          </Button> : null
        }

      </div>
    </div>
  );
}
