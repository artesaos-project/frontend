interface ProductForm {
  name: string;
  description: string;
  category: string[];
  technical: string[];
  unitPrice: string;
  stock: string;
  isCustomOrder: boolean;
  necessaryDays: string;
}

export type { ProductForm };
