import { useCallback } from 'react';

interface UseDateInputProps {
  onFormattedChange?: (formatted: string) => void;
  onValidDateChange?: (isoDate: string) => void;
}

export const useDateInput = ({
  onFormattedChange,
  onValidDateChange,
}: UseDateInputProps = {}) => {
  const formatDateInput = useCallback((value: string): string => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 4)
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }, []);

  const validateAndFormatDate = useCallback(
    (value: string) => {
      const formatted = formatDateInput(value);
      onFormattedChange?.(formatted);

      if (formatted.length === 10) {
        const [day, month, year] = formatted.split('/');
        const date = new Date(Number(year), Number(month) - 1, Number(day));
        const isValid =
          date.getDate() === Number(day) &&
          date.getMonth() === Number(month) - 1 &&
          date.getFullYear() === Number(year);

        if (isValid) {
          const isoDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          onValidDateChange?.(isoDate);
        } else {
          onValidDateChange?.('');
        }
      } else {
        onValidDateChange?.('');
      }
    },
    [formatDateInput, onFormattedChange, onValidDateChange],
  );

  return {
    formatDateInput,
    validateAndFormatDate,
  };
};
