import InputField from '@/components/features/artisan/input-field';
import { ProductForm } from '@/types/product-form';
import React from 'react';
import { Control, Controller, FieldErrors, useForm } from 'react-hook-form';
import { CategoryTechniqueSelect } from './category-technique-select';

interface ProductInfoFormProps {
  register: ReturnType<typeof useForm<ProductForm>>['register'];
  control: Control<ProductForm>;
  errors: FieldErrors<ProductForm>;
  materiaPrima?: string[] | null;
  tecnicas?: string[] | null;
}

export const ProductInfoForm: React.FC<ProductInfoFormProps> = ({
  register,
  control,
  errors,
  materiaPrima,
  tecnicas,
}) => {
  return (
    <div>
      <h2 className="text-lg font-bold text-salmon mb-6">Informações</h2>

      <div className="space-y-4">
        <InputField
          label="Nome do Produto"
          type="text"
          placeholder="Digite o nome do produto"
          required={true}
          {...register('name', { required: 'Nome do produto é obrigatório' })}
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}

        <div>
          <label className="block text-sm font-medium mb-2">Descrição *</label>
          <textarea
            required
            id="description"
            {...register('description', {
              required: 'Descrição é obrigatória',
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sakura focus:border-transparent outline-none transition-all"
            placeholder="Digite a descrição do produto"
            rows={2}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        {materiaPrima && tecnicas && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Controller
              name="category"
              control={control}
              rules={{ required: 'Selecione ao menos uma categoria.' }}
              render={({ field }) => (
                <CategoryTechniqueSelect
                  title="Categoria"
                  items={materiaPrima}
                  selectedValues={field.value}
                  onSelect={field.onChange}
                  required={true}
                />
              )}
            />
            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}

            <Controller
              name="technical"
              control={control}
              render={({ field }) => (
                <CategoryTechniqueSelect
                  title="Técnica"
                  items={tecnicas}
                  selectedValues={field.value}
                  onSelect={field.onChange}
                  required={false}
                />
              )}
            />
            {errors.technical && (
              <p className="text-red-500 text-sm">{errors.technical.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
