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

interface ProductCreateData {
  title: string;
  description: string;
  categories: string[];
  techniques: string[];
  unitPrice: number;
  stock: number;
  isCustomOrder: boolean;
  necessaryDays?: number;
  attachments?: string[];
  coverPhoto?: string;
  deletedAttachments?: string[];
}

interface ProductUpdateData extends Partial<ProductCreateData> {
  id?: string;
}

export type { ProductForm, ProductCreateData, ProductUpdateData };
