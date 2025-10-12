'use client';
import SearchBar from '@/components/features/register/search-bar';
import { useState } from 'react';

interface CategoryTechniqueSelectProps {
  title: string;
  items: string[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
  required?: boolean;
  emptyLabel?: string;
}

export const CategoryTechniqueSelect: React.FC<
  CategoryTechniqueSelectProps
> = ({
  title,
  items,
  selectedValues,
  onSelect,
  required = false,
  emptyLabel = 'Nenhum resultado encontrado.',
}) => {
  const [search, setSearch] = useState('');

  const filtered = items.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  const toggle = (value: string) => {
    const exists = selectedValues.includes(value);
    const newValues = exists
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    onSelect(newValues);
  };

  return (
    <div className="text-midnight">
      <label className="block text-sm font-medium mb-2">
        {title} {required && '*'}
      </label>

      <SearchBar
        value={search}
        onChange={setSearch}
        iconPosition="right"
        classNameIcon="text-sakura"
        className="border-sakura"
      />

      <div className="h-44 overflow-y-auto overflow-x-hidden border-2 border-sakura rounded-md p-4 mt-2">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400">{emptyLabel}</p>
        )}
        {filtered.map((item, index) => {
          const itemValue = String(index + 1);
          const isChecked = selectedValues.includes(itemValue);
          return (
            <label
              key={item}
              htmlFor={`${title}-${item}`}
              onClick={() => toggle(itemValue)}
              className={`flex border-2 mt-2 p-2 rounded-lg items-center cursor-pointer border-midnight transition-colors
                ${isChecked ? 'bg-olivine-100 ' : ' bg-white hover:bg-gray-50'}`}
            >
              <input
                type="checkbox"
                id={`${index}`}
                name={title}
                value={itemValue}
                checked={isChecked}
                readOnly
                className="accent-midnight"
              />
              <span className="ml-2 flex-1 min-w-0 truncate" title={item}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};
