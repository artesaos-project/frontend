import AuthButton from '@/components/common/auth-button';
import { tecnicas } from '@/constants/tecnicas';
import { useState } from 'react';
import SearchBar from '../search-bar';

function ArtisanStepTechnique({ onNext }: { onNext: () => void }) {
  const [value, setValue] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;
    if (checked) {
      setValue((prev) => [...prev, value]);
    } else {
      setValue((prev) => prev.filter((item) => item !== value));
    }
  };

  const filteredTecnicas = tecnicas.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNext = () => {
    onNext();
  };

  return (
    <div className="text-midnight">
      <h1 className="text-2xl font-bold text-olivine-600 mb-2">Técnica</h1>
      <h2 className="text-lg font-bold mb-1">Qual técnica você utiliza?</h2>
      <p className="text-md mt-4">
        Marque todas as técnicas que fazem parte do seu trabalho.
      </p>
      <div>
        <SearchBar value={search} onChange={setSearch} />
      </div>

      <div className="h-72 overflow-y-auto border-2 border-gray-300 rounded-md p-4 mt-4 mb-10">
        {filteredTecnicas.length === 0 && (
          <p className="text-center text-gray-400">
            Nenhum resultado encontrado.
          </p>
        )}
        {filteredTecnicas.map((item) => {
          const isChecked = value.includes(item);
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
                name={item}
                value={item}
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="accent-midnight"
              />
              <span className="ml-2">{item}</span>
            </label>
          );
        })}
      </div>

      <AuthButton onClick={handleNext} />
    </div>
  );
}

export default ArtisanStepTechnique;
