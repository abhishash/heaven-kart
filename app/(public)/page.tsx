import { BrandLogoInfinite } from "@/components/elements/brand-logo-infinite";
import { CategoriesCarousel } from "@/components/elements/categories-carousel";
import { PermotionBanner } from "@/components/elements/permotion-banner";
import { ProductCarousel } from "@/components/elements/product-carousel";
import ImageCarousel from "@/components/homepage/banner/image-carousel";
import { fetchHandler, methods } from "@/lib/fetch-handler";
import {
  HOME_CATEGORIES,
  HOMEPAGE_PRODUCTS,
  HOMEPAGE_SLIDERS,
  PROMATIONS,
} from "@/lib/constants";
import {
  BannerDataTypes,
  CategoryResponse,
  HomePageDataTypes,
  PermotionsTypes,
  ProductsDataTypes,
} from "@/lib/types";
import clsx from "clsx";
import Image from "next/image";

export default async function Home() {
  const homePageBanners = await fetchHandler<{
    data: HomePageDataTypes[];
  }>({
    ...(HOMEPAGE_SLIDERS as {
      endpoint: string;
      method: methods;
    }),
  });

  const {
    data: homePageBannerLists,
  }: {
    data: BannerDataTypes[];
  } = homePageBanners;

  const res = await fetchHandler<{
    data: ProductsDataTypes[];
  }>({
    ...(HOMEPAGE_PRODUCTS as {
      endpoint: string;
      method: methods;
    }),
  });

  const { data }: { data: ProductsDataTypes[] } = res;

  const permotionsResponse = await fetchHandler<{
    data: PermotionsTypes[];
  }>({
    ...(PROMATIONS as {
      endpoint: string;
      method: methods;
    }),
  });

  const {
    data: permotions,
  }: {
    data: PermotionsTypes[];
  } = permotionsResponse;

  const categoriesResponse = await fetchHandler<{
    data: CategoryResponse[];
  }>({
    ...(HOME_CATEGORIES as {
      endpoint: string;
      method: methods;
    }),
  });

  const { data: categoryResponse }: CategoryResponse = categoriesResponse;

  return (
    <>
      <ImageCarousel options={homePageBannerLists} />
      <BrandLogoInfinite />
      {/* Product Carousel Section */}
      {data?.map((item, index) => (
        <div key={index} className="grid grid-cols-12 gap-2 sm:gap-4 py-2 sm:py-8">
          {
            item?.banner ? <div className="col-span-12 sm:col-span-3">
              {/* Image Container */}
              <div className="relative bg-slate-50 max-h-28 sm:h-full rounded-sm md:rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={
                    item?.banner
                      ? `${process.env.ASSET_ENDPOINS}${item.banner}`
                      : "/placeholder.svg"
                  }
                  alt={item?.name}
                  width={160}
                  height={160}
                  className="object-contain rounded-sm md:rounded-xl w-full h-full p-0 sm:p-2"
                />
              </div>
            </div> : null
          }

          <ProductCarousel
            key={index}
            title={item?.name}
            url={item?.url}
            isBanner={item?.banner ? true : false}
            products={item?.products}
          />
        </div>
      ))}

      {/* Permotions products */}
      <div className="flex flex-col gap-y-2 sm:gap-y-6 py-2 sm:py-6">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">Permotions</h2>
        <div className="grid grid-cols-3 gap-x-2 sm:gap-x-6">
          {permotions?.map((item, index) => (
            <PermotionBanner key={index} values={item} />
          ))}
        </div>
      </div>

      {/* Category sections */}

      {categoryResponse?.map((item, index) => (
        <CategoriesCarousel
          key={index}
          title={item?.name}
          subCategories={item?.subCategories}
        />
      ))}
    </>
  );
}
