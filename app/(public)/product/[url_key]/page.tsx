"use client";

import { useState } from "react";
import { Heart, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import RelatedProducts from '@/components/product/related-products';
import ProductGallery from "@/components/elements/product-gallery";
import ProductReviews from "@/components/elements/product-reviews";
import ProductInfo from "@/components/elements/product-info";
import Image from "next/image";
import { laundryProducts } from "../../page";
import { ProductCarousel } from "@/components/elements/product-carousel";

export default function ProductPage() {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "AudioTech Pro",
    price: 299.99,
    originalPrice: 399.99,
    rating: 4.8,
    reviewCount: 2543,
    inStock: true,
    sku: "ATP-WH-2024",
    color: "Midnight Black",
    warranty: "2-year warranty",
    description:
      "Experience premium sound quality with our latest wireless headphones. Featuring active noise cancellation, 40-hour battery life, and premium comfort for all-day wear.",
    features: [
      "Active Noise Cancellation (ANC)",
      "40-hour battery life",
      "Bluetooth 5.3 connectivity",
      "Premium build with aluminum construction",
      "Foldable design for portability",
      "Built-in microphone for calls",
    ],
    specs: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohm",
      Weight: "250g",
      Connectivity: "Bluetooth 5.3, 3.5mm jack",
      "Charging Time": "2 hours",
    },
  };

  const productHighlights = {
    Brand: "Dalda",
    "Product Type": "Mustard Oil",
    "Key Features":
      "Strong aroma and high pungency, made from quality mustard seeds, rich in Omega 3, contains vitamins A, D, and E",
    "Processing Type": "Kachi Ghani",
    Weight: "1 L",
    Ingredients: "Kachi ghani mustard oil, vitamin A and vitamin D",
    "Used For": "Cooking, Frying, and Sauteing",
    "FSSAI License": "10013022002173",
    "Nutrition Information":
      "Energy 900 Kcal, protein 0g, carbohydrate 0g, sugar 0g, fat 100g, saturated fat 8g, MUFA 66g, PUFA 26g, trans fat 0g, vitamin A 750 µg RE, vitamin D 11.25 µg, vitamin E 30 mg",
    "Dietary Preference": "Veg",
    Unit: "1 pc (1 L)",
    "Packaging Type": "Bottle",
    "Storage Instruction":
      "Store in a cool, dry and hygienic place and avoid direct sunlight",
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground">
              Home
            </a>
            <span>/</span>
            <a href="#" className="hover:text-foreground">
              Electronics
            </a>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </div>
      </nav>

      {/* Main Product Section */}
      <div className="mx-auto container px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {/* Product Gallery */}
          <div className="flex flex-col  gap-4">
            <div className="sticky top-[100px]">
              <ProductGallery
                images={[
                  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80",
                  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80",
                  "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80",
                  "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&q=80",
                ]}
                selectedIndex={selectedImage}
                onSelectImage={setSelectedImage}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <ProductInfo
              product={product}
              isFavorite={isFavorite}
              onFavoriteChange={setIsFavorite}
            />

            {/* Buy Options */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  size="lg"
                  color="primary"
                  className="cursor-pointer !py-6 shadow-md text-lg flex-1 font-bold tracking-wide"
                >
                  Add to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="w-full flex-1 text-lg !py-6 shadow-md text-green-500 hover:text-green-600 rounded-sm border-green-400 cursor-pointer bg-transparent"
                >
                  Buy Now
                </Button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 rounded-lg shadow-lg border border-border bg-card/50 p-4">
              <div className="flex items-center gap-3">
                <Image
                  src="/icon/free.png"
                  alt="2-Days Exchanges"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    FREE SHIPPING
                  </p>
                  <p className="text-sm font-medium">Orders over $50</p>
                </div>
              </div>
              <div className="flex  items-center gap-3">
                <Image
                  src="/icon/tracking.png"
                  alt="2-Days Exchanges"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Fast Delivery
                  </p>
                  <p className="text-sm font-medium">6-12 Hours</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image
                  src="/icon/refund.png"
                  alt="2-Days Exchanges"
                  width={32}
                  height={32}
                  className="w-8 h-8 object-contain"
                />

                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    2-Days Exchanges
                  </p>
                  <p className="text-sm font-medium">Full coverage</p>
                </div>
              </div>
              <div className="flex  items-center gap-3">
                <Image
                  src="/icon/ssl-certificate.png"
                  alt="2-Days Exchanges"
                  width={28}
                  height={28}
                  className="w-7 h-7 object-contain"
                />

                <div>
                  <p className="text-xs font-semibold text-muted-foreground">
                    Secure Checkout
                  </p>
                  <p className="text-sm font-medium">SSL Encypted</p>
                </div>
              </div>
            </div>
            {/* Trust Badges */}
            <div className="flex flex-col gap-y-2 rounded-md border border-solid px-3 py-3">
              {Object.entries(productHighlights).map(([label, value]) => (
                <div className="flex items-start " key={label}>
                  <div className="w-1/2 overflow-hidden break-words capitalize">
                    <h3 className="text-slate-900 text-sm">{label}</h3>
                  </div>

                  <div className="w-1/2 break-words">
                    <p className="text-slate-600 text-sm">
                      <span>{value}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specs">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">
                  About this product
                </h3>
                <p className="mb-4 leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Designed for audio enthusiasts and professionals alike, these
                  headphones deliver exceptional clarity and deep bass. The
                  intuitive controls and seamless connectivity make them perfect
                  for work, travel, or entertainment.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="features" className="mt-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Key Features</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {product.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="mt-1.5 inline-block h-2 w-2 flex-shrink-0 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h3 className="mb-4 text-lg font-semibold">Specifications</h3>
                <div className="space-y-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex justify-between border-b border-border pb-4 last:border-0"
                    >
                      <span className="font-medium text-foreground">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <ProductReviews
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <ProductCarousel title="Recently View" products={laundryProducts} />
        <ProductCarousel title="Related Products" products={laundryProducts} />
        <ProductCarousel title="Explore More" products={laundryProducts} />
      </div>
    </div>
  );
}
