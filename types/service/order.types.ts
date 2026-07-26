export interface OrderDetailsResponse {
  status: boolean;
  message: string;
  data: Order;
}

export interface Order {
  id: number;
  order_no: string;
  user_id: number;
  address_id: number;
  total_amount: string;
  total_discount: string;
  delhivery_charge: number;
  final_amount: string;
  status: string;
  payment_status: string;
  payment_method: string;
  delhivery_boy_id: number | null;
  barcode: string | null;
  order_type: string;
  table_no: number | null;
  reward_points: number;
  description: string | null;
  created_at: string;
  updated_at: string;
  payment_type: string;
  due_date: string | null;
  items: OrderItem[];
}

export interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  price: string;
  discount: string;
  final_price: string;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Product {
  id: number;
  sku_product_id: string;
  client_id: number | null;
  name: string;
  brand_name: string;
  image: string;
  status: string;
  price: string;
  ac_price: string;
  sku_code: string;
  hsn_code: string;
  tags: string;
  meta_tag: string;
  category: string;
  sub_category: string;
  discount: string | null;
  brands: string;
  stock: string;
  in_stock: string;
  summer_id: number;
  barcode_base: string;
  similar: string | null;
  type: string | null;
  type_value: string | null;
  description: string;
  short_description: string;
  slug: string;
  created_at: string;
  updated_at: string;
  product_type: string;
  url: string;
  rating: number | null;
  review: number | null;
}