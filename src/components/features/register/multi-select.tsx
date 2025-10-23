import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SearchBar from './search-bar';

interface MultiSelectStepProps {
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  initialValue?: string[];
  onSubmit: (selected: string[]) => void;
  onNext: () => void;
  min?: number;
  minMessage?: string;
  emptyLabel?: string;
}

function MultiSelectStep({
  title,
  subtitle,
  description,
  items,
  initialValue = [],
  onSubmit,
  onNext,
  min = 1,
  minMessage = 'Selecione ao menos um item',
  emptyLabel = 'Nenhum resultado encontrado.',
}: MultiSelectStepProps) {
  const [selected, setSelected] = useState<string[]>(initialValue);
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  const toggle = (value: string) => {
    setSelected((prev) => {
      const exists = prev.includes(value);
      const next = exists ? prev.filter((v) => v !== value) : [...prev, value];
      if (error && next.length >= min) setError(null);
      return next;
    });
  };

  const filtered = items.filter((i) =>
    i.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNext = () => {
    if (selected.length < min) {
      setError(minMessage);
      return;
    }
    setError(null);
    onSubmit(selected);
    onNext();
  };

  return (
    <div className="text-midnight">
      <h1 className="text-2xl font-bold text-olivine-600 mb-2">{title}</h1>
      <h2 className="text-lg font-bold mb-1">{subtitle}</h2>
      <p className="text-md mt-4">{description}</p>
      {error && (
        <p className="text-salmon text-sm mt-4 mb-4 font-bold">{error}</p>
      )}
      <div>
        <SearchBar value={search} onChange={setSearch} />
      </div>
      <div className="h-72 overflow-y-auto overflow-x-hidden border-2 border-gray-300 rounded-md p-4 mt-4 mb-10">
        {filtered.length === 0 && (
          <p className="text-center text-gray-400">{emptyLabel}</p>
        )}
        {filtered.map((item) => {
          const isChecked = selected.includes(item);
          return (
            <label
              key={item}
              htmlFor={item}
              className={`flex border-2 mt-2 p-2 rounded-lg items-center cursor-pointer transition-colors
                ${isChecked ? 'bg-olivine-100 border-midnight ' : 'border-midnight bg-white'}`}
            >
              <input
                type="checkbox"
                id={item}
                value={item}
                checked={isChecked}
                onChange={() => toggle(item)}
                className="accent-midnight"
              />
              <span className="ml-2 flex-1 min-w-0 truncate" title={item}>
                {item}
              </span>
            </label>
          );
        })}
      </div>
      <Button onClick={handleNext} className="w-full">
        Continuar
      </Button>
    </div>
  );
}

export default MultiSelectStep;
