'use client';

import { imageBaseUrl } from '@/lib/constants';
import { Order, OrderItem } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { ShoppingBag, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ReviewModal from './pop-up/review-modal';
import ProductReviewModal from './pop-up/product-review-modal';

export function OrderItemCard({ item, isBorder, refetch }: { item: OrderItem, isBorder: boolean, refetch: () => void }) {
  const originalPrice = parseFloat(item.product.ac_price);
  const currentPrice = parseFloat(item.final_price);
  const savedAmount = originalPrice - currentPrice;
  const savedPercentage = Math.round((savedAmount / originalPrice) * 100);

  return (
    <>
      <div className=' px-4 py-4 flex flex-col gap-y-2'>
        <Link href={`/product/${item?.product?.url}`} className="transition-all col-span-3 hover:bg-muted/20">
          <div className="flex flex-col gap-6 sm:flex-row md:gap-8">
            {/* Product Image */}
            <div className="flex-shrink-0">
              <div className="aspect-square overflow-hidden rounded-lg border border-border/40 bg-muted/50">
                <div className="flex h-full w-full items-center justify-center">
                  <Image src={`${imageBaseUrl}${item?.product?.image}`} alt={item?.product?.name} width={80} height={80} />
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {item.product.brand_name}
                </p>
                <h3 className="mb-1 text-sm font-semibold text-foreground">
                  {item.product.name}
                </h3>

                {/* Pricing Section */}
                <div className="mb-2 flex flex-wrap items-baseline gap-1">
                  <span className="text-sm font-bold text-foreground">
                    {formatPrice(parseFloat(item?.final_price), "INR")}
                  </span>
                  {originalPrice > currentPrice && (
                    <>
                      <span className="text-xs text-muted-foreground line-through">
                        {formatPrice(originalPrice, "INR")}
                      </span>
                      {savedPercentage > 0 && (
                        <span className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                          Save {savedPercentage}%
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Quantity and SKU */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <p className="text-[10px] font-normal uppercase tracking-widest text-muted-foreground">
                  Quantity : {item.qty}
                </p>

                <div>
                  <p className="text-[10px] font-normal uppercase tracking-widest text-muted-foreground">
                    SKU : #{item.product.sku_code}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {/* Rating */}
        <div className="flex gap-1 col-span-2">
          <div className="flex flex-col gap-0.5">
            <div className='flex gap-0.5 items-center'>
              {item?.product?.rating ? <span className="text-sm text-gray-600"> Rating:</span> :
                <ProductReviewModal productId={item?.product?.id} orderId={item?.order_id} refetch={refetch} />
              }

              {Array.from({ length: parseInt(item?.product?.rating) }).map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`cursor-pointer ${i <= parseInt(item.product?.rating) 
                    ? "fill-green-700 text-green-700"
                    : "text-gray-300"
                    }`}
                />
              ))}
            </div>
            {
              item?.product?.review &&
              <p className='text-sm text-green-700'>{item?.product?.review}</p>
            }
          </div>
        </div>
      </div>
      {isBorder ? null :
        <div className='border-0 border-b-2 mx-2 border-dotted' />
      }
    </>
  );
}
