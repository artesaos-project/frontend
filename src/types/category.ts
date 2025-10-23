type CategoryProps = {
  id: number;
  nameFilter: string;
  nameExhibit: string;
  imageUrl: string;
  rawMaterialIds?: number[];
  techniqueIds?: number[];
  createdAt: string;
  description?: string;
  isActive: true;
  updatedAt: string;
};

export type { CategoryProps };
