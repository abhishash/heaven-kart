export interface RecentlyViewedResponse {
  status: boolean;
  message: string;
  data: RecentlyViewedProduct[];
}

export interface RecentlyViewedProduct {
  recently_viewed_id: number;
  product_id: number;
  viewed_at: string;
  name: string;
  image: string;
  price: string;
  ac_price: string;
  stock: string;
  in_stock: string;
  short_description: string;
  product_type: string;
  type: string;
  type_value: string;
  brand_name: string;
  brand: string;
  discount: string | null;
  url: string;
}