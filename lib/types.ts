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