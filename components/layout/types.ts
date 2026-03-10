export interface CategoryResponse {
    status: boolean;
    data: Category[];
}

export interface Category {
    name: string;
    image: string | null;
    url: string;
}