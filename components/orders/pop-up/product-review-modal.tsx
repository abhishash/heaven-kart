"use client";

import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRight, Star } from "lucide-react";
import { useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { fetchHandler } from "@/lib/fetch-handler";
import { toast } from "sonner";

type ReviewFormValues = {
  review: string;
};

export default function ProductReviewModal({ orderId, productId, refetch }: { orderId: number, productId: number, refetch: () => void }) {
  const [open, setOpen] = useState(false)
  const [rating, setRating] = useState(1);
  const { data: session } = useSession()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: ReviewFormValues) =>
      fetchHandler({
        endpoint: "rating/product-rating",
        method: "POST",
        data: payload,
        token: session?.user?.accessToken,
      })
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>();

  const onSubmit = (data: ReviewFormValues) => {
    const payload = {
      rating,
      review: data.review,
      order_id: orderId,
      product_id: productId,
    };

    mutateAsync(payload)?.then((res) => {
      if (res?.status) {
        refetch();
        reset();
        setRating(1);
        setOpen(false)
      }
      // toast.error(res?.errors?.email?.[0]);
    }).catch((error) => {
      toast.error("Something Wrong");
    });


  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className='flex items-center cursor-pointer'>
          <span className="text-sm text-nowrap text-green-700">Write Review</span>
          <ChevronRight size={16} className="text-green-700" />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Rating */}
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`cursor-pointer ${star <= rating
                  ? "fill-green-700 text-green-700"
                  : "text-gray-300"
                  }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>

          {/* Review */}
          <div>
            <Textarea
              placeholder="Write your review..."
              {...register("review", {
                required: "Review is required",
                minLength: {
                  value: 10,
                  message: "Review must be at least 10 characters",
                },
              })}
            />

            {errors.review && (
              <p className="text-red-500 text-sm mt-1">
                {errors.review.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isPending} className="w-full cursor-pointer bg-gradient-to-r from-green-700 to-primary">
            Submit Review
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}