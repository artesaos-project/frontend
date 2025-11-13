import { apiRequest } from '../api-service';

export type CatalogItem = { id: string; name: string };

type RawItem = { id: string; nameExhibit: string };
type RawResponse = { items: RawItem[] };
type CatalogResponse = { items: CatalogItem[] };

const mapToCatalog = (res: RawResponse): CatalogResponse => ({
  items: res.items.map((i) => ({ id: i.id, name: i.nameExhibit })),
});

export const catalogApi = {
  async getTechniques(): Promise<CatalogResponse> {
    const res = await apiRequest<RawResponse>('/catalog/techniques');
    return mapToCatalog(res);
  },
  async getMaterials(): Promise<CatalogResponse> {
    const res = await apiRequest<RawResponse>('/catalog/materials');
    return mapToCatalog(res);
  },
};
