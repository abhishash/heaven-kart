export interface SubCategory {
    url: string;
    name: string;
    image: string;
    products: number;
  }
  
  export interface Category {
    url: string;
    name: string;
    image: string;
    subcategories: SubCategory[];
  }
  
  export interface CategoryResponse {
    status: boolean;
    data: Category[];
  }