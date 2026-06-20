import ProductReviews from "@/components/elements/product-reviews";
import Image from "next/image";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import { AplusBanner, Product, ProductResponse } from "@/lib/types";
import { PRODUCTS_DETAIL } from "@/lib/constants";
import ProductInfo from "@/components/elements/product-info";
import ProductImageGallery from "@/components/elements/product/product-image-gallery";
import ProductBarcode from "@/components/elements/product/product-barcode";
import HtmlRender from "@/components/elements/html-render";
import { ProductCarousel } from "@/components/elements/product-carousel";
import SingleBanner from "@/components/elements/product/aplus-banner";
import { isArray } from "@/lib/type-guards";
import Link from "next/link";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ url_key: string }>;
}) {
  const { url_key } = await params;

  const productResponse = await fetchHandler<ProductResponse>({
    endpoint: `${PRODUCTS_DETAIL.endpoint}/${url_key}`,
    method: PRODUCTS_DETAIL?.method as methods,
  });

  const productInformation: Product = productResponse?.data;
  const relatedProducts = productResponse?.similar_products;
  const aplusBanner = productResponse?.aplus;

  const discountPercent = Math.round(
    ((parseFloat(productInformation?.ac_price) - parseFloat(productInformation?.price)) / parseFloat(productInformation?.ac_price)) * 100,
  );


  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card pb-4 sm:px-6 lg:px-8">
        {/* <div className="mx-auto container px-0 py-4 sm:px-6 lg:px-8"> */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          {productInformation?.category_url && <>
            <Link href={`/catalog/${productInformation?.category_url}`} className="hover:text-foreground">
              {productInformation?.category}
            </Link>
            <span>/</span>
          </>}
          <span className="text-foreground text-green-700 line-clamp-1 text-wrap">{productInformation?.name}</span>
        </div>
        {/* </div> */}
      </nav>

      {/* Main Product Section */}
      {/* <div className="mx-auto container px-0 py-4 sm:py-8 sm:px-6 lg:px-8"> */}
      <div className="flex flex-col gap-4 sm:flex-row py-4 sm:py-6">
        {/* Product Gallery */}
        <ProductImageGallery
          thumbnailImg={productInformation?.image}
          images={productResponse?.gallery}
          discountPercent={discountPercent}
        />

        {/* Product Info */}
        <div className="flex flex-col w-full sm:w-1/2 gap-6">
          <ProductInfo product={productInformation} productUrl={url_key} />
          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-green-50 border border-border p-2">
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
          <div className="flex flex-col gap-y-2 rounded-md border border-dotted px-4 py-3">
            <h2 className="text-xl font-semibold pb-2 mb-2 border-b-2 border-dotted">Basic Information</h2>
            <HtmlRender isExtend={false} html={productInformation?.short_description} />
          </div>
        </div>
      </div>


      {/* Trust Badges */}
      <div className="flex flex-col my-6 border-t border-gray-200 gap-y-2 rounded-md border border-dotted px-4 py-3">
        <h2 className="text-xl font-semibold pb-2 mb-2 border-b-2 border-dotted">Description</h2>
        <ProductBarcode
          product={{
            barcode: productInformation?.barcode,
            name: productInformation?.brand_name,
          }}
        />
        <HtmlRender isExtend={true} html={productInformation?.description} />
      </div>

      {/* A Plus Bannner */}
      {isArray(aplusBanner) ? (
        <div className="my-6 container mx-auto space-y-3">
          <h2 className="text-2xl text-yellow-400 font-bold">From the Seller</h2>
          {aplusBanner?.map((item: AplusBanner, index: number) => (
            <SingleBanner key={index} bannerType={item?.type} bannerImage={item?.images} />
          ))}
        </div>
      ) : null}

      {/* Tabs Section */}
      <div className="my-6">
        <div defaultValue="description" className="w-full py-6">
          <h2 className="text-xl font-semibold">Customer Reviews</h2>
          <div className="mt-6">
            <ProductReviews
              productId={productInformation?.id}
            />
          </div>
        </div>
      </div>

      {/* Related Products */}
      {/* <ProductCarousel title="Recently View" products={laundryProducts} /> */}
      {isArray(relatedProducts) ? <ProductCarousel title="Related Products" products={relatedProducts} isBanner={false} /> : null}
      {/* <ProductCarousel title="Explore More" products={laundryProducts} /> */}
      {/* </div> */}
    </div>
  );
}
