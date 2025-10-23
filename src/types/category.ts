type CategoryProps = {
  id: number;
  nameFilter: string;
  nameExhibit: string;
  imagePath: string;
  rawMaterialIds?: number[];
  techniqueIds?: number[];
  createdAt: string;
  description?: string;
  isActive: true;
  updatedAt: string;
};

export type { CategoryProps };
