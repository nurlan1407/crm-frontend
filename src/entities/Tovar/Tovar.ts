export interface Category {
    id: number;
    name: string;
    products: Tovar[]
}

export interface Tovar {
    id?: number;
    name: string;
    description: string;
    img: File | string | null;
    price: number;
    category: Category | null;
    discount: number | null;
    options?: Option[];
}

export interface TovarFormData {
    id?: number;
    name: string;
    description: string;
    img: File | string | null;
    price: number;
    category: number | null;
    discount: number | null;
}



export interface Option {
    question: string;
    answer: boolean;
}
export interface OptionBlock {
    options: Option[]
}

export const DefaultFormData: TovarFormData = {
    name: '',
    description: '',
    img: null,
    price: 0,
    category: null,
    discount: null,
}