import ProductsList from '@/components/products-list';
import SectionStructure from '@/components/section-structure';
import { ApiProduct } from '@/types/product';

function PopularProducts({
  products,
  loading,
}: {
  products: ApiProduct[];
  loading: boolean;
}) {
  return (
    <SectionStructure title="Produtos Populares" showMoreLink="/products">
      <ProductsList products={products} loading={loading} />
    </SectionStructure>
  );
}

export default PopularProducts;
