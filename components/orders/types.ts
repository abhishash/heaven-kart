export interface InvoiceResponse {
    status: boolean;
    message: string;
    data: InvoiceData;
}

export interface Product {
    id: number;
    name: string;
    image: string;
    sku_code: string;
    hsn_code: string;
    barcode_base: string;
}

export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number;
    qty: number;
    price: string;
    discount: string;
    final_price: string;
    product: Product;
}
export interface InvoiceData {
    order: Order;
    items: OrderItem[];
    transaction: Transaction;
    address: Address;

}

export interface Order {
    order_id: number;
    order_no: string;
    status: string;
    payment_status: string;
    payment_method: string;
    total_amount: string;
    total_discount: string;
    final_amount: string;
    created_at: string;
}

export interface Transaction {
    id: number;
    order_id: number;
    payment_id: string | null;
    amount: string;
    status: string;
    created_at: string;
    updated_at: string | null;
}

export interface Address {
    id: number;
    user_id: string;
    country: string;
    state: string;
    district: string;
    tehsil: string;
    block: string;
    village: string;
    address: string;
    pincode: number | null;
    is_default: number;
    person: string;
    contact: string;
    landmark: string;
    created_at: string;
    updated_at: string;
}