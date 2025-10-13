import InputField from '@/components/features/artisan/input-field';
import { ProductForm } from '@/types/product-form';
import React, { useState } from 'react';
import { FieldErrors, useForm } from 'react-hook-form';

interface PriceStockFormProps {
  register: ReturnType<typeof useForm<ProductForm>>['register'];
  setValue?: ReturnType<typeof useForm<ProductForm>>['setValue'];
  errors: FieldErrors<ProductForm>;
  isDesktop?: boolean;
}

export const PriceStockForm: React.FC<PriceStockFormProps> = ({
  register,
  errors,
  isDesktop = false,
}) => {
  const [isCustomOrder, setIsCustomOrder] = useState(false);

  return (
    <div>
      <div className="flex items-center mb-4 text-salmon font-bold">
        <span>Preço e Estoque</span>
      </div>

      <div className={isDesktop ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
        <div className={isDesktop ? 'col-span-1' : ''}>
          <InputField
            label="Preço Unitário"
            type="number"
            required={true}
            step="0.01"
            {...register('unitPrice', {
              required: 'Preço é obrigatório',
              min: { value: 0, message: 'Preço não pode ser negativo' },
            })}
            placeholder="0,00"
          />

          <InputField
            label="Estoque"
            type="number"
            required={true}
            {...register('stock', {
              required: 'Estoque é obrigatório',
              min: { value: 0, message: 'Estoque não pode ser negativo' },
            })}
            placeholder="Quantidade"
          />
          {errors.unitPrice && (
            <p className="text-red-500 text-sm">{errors.unitPrice.message}</p>
          )}
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>

        <div
          className={`p-4 ring-2 ring-sakura rounded-2xl ${isDesktop ? 'col-span-1' : ''}`}
        >
          <div className="font-bold text-sm mb-3">Produto sob encomenda?</div>

          <div className="flex gap-4 mb-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                value="true"
                className="w-5 h-5 accent-sakura"
                {...register('isCustomOrder')}
                onChange={() => setIsCustomOrder(true)}
              />
              <label className="text-sm">Sim</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                value="false"
                className="w-5 h-5 accent-sakura"
                {...register('isCustomOrder')}
                onChange={() => setIsCustomOrder(false)}
              />
              <label className="text-sm">Não</label>
            </div>
          </div>

          <InputField
            label="Dias Necessários"
            type="number"
            disabled={!isCustomOrder}
            {...register('necessaryDays', {
              required: isCustomOrder
                ? 'Dias necessários é obrigatório'
                : false,
              min: {
                value: 0,
                message: 'Dias necessários não pode ser negativo',
              },
              valueAsNumber: true,
            })}
            placeholder="Quantidade de dias"
          />
        </div>
      </div>
    </div>
  );
};
