import ProductsList from '@/components/products-list';
import SectionStructure from '@/components/section-structure';

function PopularProducts() {
  return (
    <SectionStructure title="Produtos Populares">
      <ProductsList />
    </SectionStructure>
  );
}

export default PopularProducts;
