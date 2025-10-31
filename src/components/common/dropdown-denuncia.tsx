'use client';

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
} from '@radix-ui/react-dropdown-menu';
import { useEffect, useRef, useState } from 'react';
import { CgDanger } from 'react-icons/cg';
import { FaHouse } from 'react-icons/fa6';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const reportOptionsMap: Record<string, string> = {
  INAPPROPRIATE_CONTENT: 'Conteúdo impróprio (violência, nudez, etc.)',
  OFFENSIVE_CONTENT: 'Conteúdo ofensivo',
  FALSE_OR_MISLEADING_INFORMATION: 'Informação falsa/enganosa',
  COPYRIGHT_VIOLATION: 'Direitos autorais violados',
  PROHIBITED_ITEM_SALE_OR_DISCLOSURE: 'Venda ou divulgação de itens proibidos',
  INAPPROPRIATE_LANGUAGE: 'Linguagem inapropriada',
  OFF_TOPIC_OR_IRRELEVANT: 'Fora do tema/irrelevante',
  OTHER: 'Outros',
};

const itemClasses =
  'relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[highlighted]:bg-gray-100 flex flex-row items-center gap-2';

type MenuView = 'main' | 'report' | 'other';

function DropdownDenuncia({
  targetId,
  onClose,
  onSubmit,
}: {
  targetId: string;
  onClose: () => void;
  onSubmit: (data: {
    targetId: string;
    reason: string;
    details: string;
  }) => void;
}) {
  const [currentView, setCurrentView] = useState<MenuView>('main');
  const [selectedReason, setSelectedReason] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const handleReport = () => {
    onSubmit({
      targetId,
      reason: selectedReason,
      details: additionalDetails,
    });

    if (onClose) onClose();
    setCurrentView('main');
    setSelectedReason('');
    setAdditionalDetails('');
  };
  const handleBack = (e: Event) => {
    e.preventDefault();
    if (currentView === 'other') {
      setAdditionalDetails('');
      setCurrentView('report');
    } else if (currentView === 'report') {
      setCurrentView('main');
    }
  };

  useEffect(() => {
    if (currentView === 'other') {
      const timer = setTimeout(() => {
        textareaRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  return (
    <DropdownMenuPortal>
      <DropdownMenuContent
        className="w-[80vw] sm:w-full bg-white shadow-md rounded-md z-50 p-4"
        align="end"
        sideOffset={5}
        onCloseAutoFocus={() => {
          setCurrentView('main');
          setSelectedReason('');
          setAdditionalDetails('');
        }}
      >
        {currentView === 'main' && (
          <DropdownMenuGroup>
            <DropdownMenuItem className={itemClasses}>
              <FaHouse />
              Pagina Inicial
            </DropdownMenuItem>

            <DropdownMenuItem
              className={itemClasses}
              onSelect={(e) => {
                e.preventDefault();
                setCurrentView('report');
              }}
            >
              <CgDanger />
              Denunciar este produto
              <IoIosArrowForward className="ml-auto h-4 w-4" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        )}

        {currentView === 'report' && (
          <DropdownMenuGroup>
            <DropdownMenuItem className={itemClasses} onSelect={handleBack}>
              <IoIosArrowBack className="h-4 w-4" />
              Voltar
            </DropdownMenuItem>
            <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

            {Object.entries(reportOptionsMap).map(([value, label]) => (
              <DropdownMenuItem
                key={label}
                className={itemClasses}
                onSelect={(e) => {
                  e.preventDefault();
                  setSelectedReason(value);
                  setCurrentView('other');
                }}
              >
                {label}

                {value !== 'OTHER' && (
                  <IoIosArrowForward className="ml-auto h-4 w-4" />
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        )}

        {currentView === 'other' && (
          <div
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem className={itemClasses} onSelect={handleBack}>
                <IoIosArrowBack className="h-4 w-4" />
                Voltar
              </DropdownMenuItem>
              <DropdownMenuSeparator className="h-px bg-gray-200 my-1" />

              <div className="p-2 space-y-2">
                <p className="px-1 text-sm text-gray-500">
                  Motivo:
                  <span className="block font-medium text-gray-700">
                    {reportOptionsMap[selectedReason]}
                  </span>
                </p>

                <label
                  htmlFor="report-reason"
                  className="text-sm font-medium text-gray-700 px-1"
                >
                  Detalhes adicionais (opcional):
                </label>
                <textarea
                  ref={textareaRef}
                  id="report-reason"
                  className="w-full h-48 p-2 border rounded-md text-sm shadow-inner"
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                />
                <button
                  className="w-full bg-sakura text-white text-sm font-medium
                  py-2 px-3 rounded-md hover:bg-white hover:text-sakura border
                  border-sakura transition-colors
                  cursor-pointer"
                  onClick={handleReport}
                >
                  Enviar Denúncia
                </button>
              </div>
            </DropdownMenuGroup>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenuPortal>
  );
}

export default DropdownDenuncia;
