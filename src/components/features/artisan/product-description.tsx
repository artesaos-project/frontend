import { useState } from 'react';

function ProfileDescription({ description }: { description: string | null }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div
        className={`
          mt-4 text-center w-full 
          overflow-hidden transition-all duration-300
          ${expanded ? 'max-h-[300px]' : 'max-h-[160px] sm:max-h-none'}
        `}
      >
        <h3>{description}</h3>
      </div>

      {description && description.length > 160 && (
        <button
          className="mt-2 text-olivine-600 font-semibold sm:hidden"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? 'Ver menos' : 'Ver mais'}
        </button>
      )}
    </div>
  );
}

export default ProfileDescription;
