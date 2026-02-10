
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import RelatedProducts from '@/components/product/related-products';
import ProductReviews from "@/components/elements/product-reviews";
import Image from "next/image";
import { fetchHandler, methods } from "@/lib/api/auth";
import { Product, ProductResponse } from "@/lib/types";
import { PRODUCTS_DETAIL } from "@/lib/constants";
import ProductInfo from "@/components/elements/product-info";
import ProductImageGallery from "@/components/elements/product/product-image-gallery";
import ProductBarcode from "@/components/elements/product/product-barcode";
import HtmlRender from "@/components/elements/html-render";
import { ProductCarousel } from "@/components/elements/product-carousel";

export default async function ProductPage({ params }: {
  params: Promise<{ url_key: string }>
}) {
  const { url_key } = await params


  const productResponse = await fetchHandler<ProductResponse>({
    endpoint: `${PRODUCTS_DETAIL.endpoint}/${url_key}`,
    method: PRODUCTS_DETAIL?.method as methods,
  });

  const productInformation: Product = productResponse?.data;
  const relatedProducts = productResponse?.similar_products;


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
          <ProductImageGallery thumbnailImg={productInformation?.image} images={productResponse?.gallery} />

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <ProductInfo
              product={productInformation}
              productUrl={url_key}
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
            <div className="grid grid-cols-2 gap-4 rounded-lg bg-green-50 border border-border p-4">
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
              <h2 className="text-xl font-semibold mb-3">Basic Information</h2>
              <ProductBarcode product={
                { barcode: productInformation?.barcode, name: productInformation?.brand_name }
              } />
              <HtmlRender html={productInformation?.description} />
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className=" my-12 border-t border-gray-900">
          <div defaultValue="description" className="w-full py-6">
            <h2 className="text-xl font-semibold">Reviews</h2>
            <div className="mt-6">
              <ProductReviews
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </div>
          </div>
        </div>

        {/* Related Products */}
        {/* <ProductCarousel title="Recently View" products={laundryProducts} /> */}
        <ProductCarousel title="Related Products" products={relatedProducts} />
        {/* <ProductCarousel title="Explore More" products={laundryProducts} /> */}
      </div>
    </div>
  );
}
