import { useState, useCallback } from 'react';

interface VisibleState {
  password: boolean;
  confirmPassword: boolean;
  passwordInfo: boolean;
  popover: boolean;
}

export const useUIState = () => {
  const [visible, setVisible] = useState<VisibleState>({
    password: false,
    confirmPassword: false,
    passwordInfo: false,
    popover: false,
  });

  const [uiError, setUiError] = useState<string | null>(null);
  const [formErrorFlag, setFormErrorFlag] = useState(false);
  const [birthDateInput, setBirthDateInput] = useState('');

  const toggleField = useCallback((field: keyof VisibleState) => {
    setVisible((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const showInfo = useCallback((field: keyof VisibleState) => {
    setVisible((prev) => ({ ...prev, [field]: true }));
  }, []);

  const hideInfo = useCallback((field: keyof VisibleState) => {
    setVisible((prev) => ({ ...prev, [field]: false }));
  }, []);

  return {
    visible,
    formErrorFlag,
    uiError,
    birthDateInput,
    toggleField,
    showInfo,
    hideInfo,
    setBirthDateInput,
    setFormErrorFlag,
    setUiError,
  };
};
