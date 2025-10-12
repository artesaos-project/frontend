import InputField from '@/components/features/artisan/input-field';
import { ProductForm } from '@/types/product-form';
import React from 'react';

interface PriceStockFormProps {
  form: ProductForm;
  onInputChange: (field: keyof ProductForm, value: string | boolean) => void;
  isDesktop?: boolean;
}

export const PriceStockForm: React.FC<PriceStockFormProps> = ({
  form,
  onInputChange,
  isDesktop = false,
}) => {
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
            min="0"
            step="0.01"
            value={form.unitPrice}
            onChange={(value) => onInputChange('unitPrice', value)}
            placeholder="0,00"
          />

          <InputField
            label="Estoque"
            type="number"
            required={true}
            min="0"
            value={form.stock}
            onChange={(value) => onInputChange('stock', value)}
            placeholder="Quantidade"
          />
        </div>

        <div
          className={`p-4 ring-2 ring-sakura rounded-2xl ${isDesktop ? 'col-span-1' : ''}`}
        >
          <div className="font-bold text-sm mb-3">Produto sob encomenda?</div>

          <div className="flex gap-4 mb-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="isCustomOrder"
                value="true"
                checked={form.isCustomOrder === true}
                onChange={() => onInputChange('isCustomOrder', true)}
                className="w-5 h-5 accent-sakura"
              />
              <label className="text-sm">Sim</label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="isCustomOrder"
                value="false"
                checked={form.isCustomOrder === false}
                onChange={() => onInputChange('isCustomOrder', false)}
                className="w-5 h-5 accent-sakura"
              />
              <label className="text-sm">Não</label>
            </div>
          </div>

          <InputField
            label="Dias Necessários"
            type="number"
            min="0"
            value={form.necessaryDays}
            onChange={(value) => onInputChange('necessaryDays', value)}
            placeholder="Quantidade de dias"
            disabled={!form.isCustomOrder}
          />
        </div>
      </div>
    </div>
  );
};
