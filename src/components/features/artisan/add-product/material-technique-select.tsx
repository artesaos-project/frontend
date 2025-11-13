'use client';
import SearchBar from '@/components/features/register/search-bar';
import { CatalogItem } from '@/services/api';
import { useState } from 'react';

interface MaterialTechniqueSelectProps {
  title: string;
  items: CatalogItem[];
  selectedValues: string[];
  onSelect: (values: string[]) => void;
  required?: boolean;
  emptyLabel?: string;
}

export const MaterialTechniqueSelect: React.FC<
  MaterialTechniqueSelectProps
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
    item.name.toLowerCase().includes(search.toLowerCase()),
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

        {filtered.map((item) => {
          const isChecked = selectedValues.includes(item.id);
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className={`w-full flex border-2 mt-2 p-2 rounded-lg items-center text-left cursor-pointer border-midnight transition-colors
                ${isChecked ? 'bg-olivine-100' : 'bg-white hover:bg-gray-50'}`}
            >
              <input
                type="checkbox"
                value={item.id}
                checked={isChecked}
                readOnly
                className="accent-midnight cursor-pointer"
              />
              <span className="ml-2 flex-1 min-w-0 truncate" title={item.name}>
                {item.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
