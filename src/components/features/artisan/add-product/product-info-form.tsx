import InputField from '@/components/features/artisan/input-field';
import { ProductForm } from '@/types/product-form';
import React from 'react';
import { CategoryTechniqueSelect } from './category-technique-select';

interface ProductInfoFormProps {
  form: ProductForm;
  materiaPrima: string[];
  tecnicas: string[];
  onInputChange: (
    field: keyof ProductForm,
    value: string | boolean | string[],
  ) => void;
}

export const ProductInfoForm: React.FC<ProductInfoFormProps> = ({
  form,
  materiaPrima,
  tecnicas,
  onInputChange,
}) => {
  const categories = Array.isArray(form.category)
    ? form.category
    : form.category
      ? [form.category]
      : [];
  const techniques = Array.isArray(form.technical)
    ? form.technical
    : form.technical
      ? [form.technical]
      : [];

  return (
    <div>
      <h2 className="text-lg font-bold text-salmon mb-6">Informações</h2>

      <div className="space-y-4">
        <InputField
          label="Nome do Produto"
          name="productName"
          type="text"
          value={form.name}
          onChange={(value) => onInputChange('name', value)}
          placeholder="Digite o nome do produto"
          required={true}
        />

        <div>
          <label className="block text-sm font-medium mb-2">Descrição *</label>
          <textarea
            required
            id="description"
            name="description"
            value={form.description}
            onChange={(e) => onInputChange('description', e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sakura focus:border-transparent outline-none transition-all"
            placeholder="Digite a descrição do produto"
            rows={2}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <CategoryTechniqueSelect
            title="Categoria"
            items={materiaPrima}
            selectedValues={categories}
            onSelect={(values) => onInputChange('category', values)}
            required={true}
          />

          <CategoryTechniqueSelect
            title="Técnica"
            items={tecnicas}
            selectedValues={techniques}
            onSelect={(values) => onInputChange('technical', values)}
            required={false}
          />
        </div>
      </div>
    </div>
  );
};
