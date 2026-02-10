import { ReactNode } from "react";

export interface ProductsDataTypes {
  id: number;
  name: string;
  position: number;
  products: ProductTypes[];
  banner: string | null;
}

export interface BannerDataTypes {
  id: number,
  name: string,
  image: string
}

export interface HomePageDataTypes {
  data: BannerDataTypes[],
}

export interface ProductTypes {
  url: number;
  name: string;
  image: string;
  price: string;
  ac_price: string;
  stock: number | null;
  in_stock: "0" | "1";
  summer_id: number;
  slug: string | null;
  discount: string | null;
  brand: string;
}


export interface PermotionsTypes {
  name: string;
  url_link: string,
  image: string
}


/* Sub Category */
export interface SubCategory {
  url: string;
  name: string;
  image: string;
}

/* Main Category */
export interface Category {
  url: string;
  name: string;
  image: string;
  subCategories: SubCategory[];
}

/* API Response */
export interface CategoryResponse {
  status: boolean;
  data: Category[];
}

// ------ Product Details API ---------//

export interface ProductResponse {
  status: boolean;
  message: string;
  data: Product;
  gallery: GalleryImage[];
  similar_products: SimilarProduct[];
}

export interface ProductDataTypesList {
  status: boolean;
  data: ProductTypes[];
}


export interface Product {
  id: number;
  name: string;
  brand_name: string;
  image: string;
  barcode: string;
  price: string;
  ac_price: string;
  sku: string;
  hsn: string;
  description: string;
  tags: string;
  meta_tag: string;
  category: string | null;
  sub_category: string | null;
  stock: string;
  in_stock: "0" | "1";
  category_url: string | null;
  sub_category_url: string | null;
}


export interface GalleryImage {
  image: string;
}


export interface SimilarProduct {
  name: string;
  sku: string;
  brand_name: string;
  image: string;
  price: string;
  ac_price: string;
  hsn: string;
  description: string | null;
  barcode: string; // base64 image
  url: string;
}