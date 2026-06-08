"use client";

import { useCallback, useState } from "react";

export function useExchangeModalState(initialState = {}) {
  const [formOpen, setFormOpen] = useState(initialState.formOpen ?? false);
  const [successOpen, setSuccessOpen] = useState(initialState.successOpen ?? false);
  const [selectCardOpen, setSelectCardOpen] = useState(initialState.selectCardOpen ?? false);

  const openForm = useCallback(() => setFormOpen(true), []);
  const closeForm = useCallback(() => setFormOpen(false), []);

  const openSuccess = useCallback(() => setSuccessOpen(true), []);
  const closeSuccess = useCallback(() => setSuccessOpen(false), []);

  const openSelectCard = useCallback(() => setSelectCardOpen(true), []);
  const closeSelectCard = useCallback(() => setSelectCardOpen(false), []);

  const completeForm = useCallback(() => {
    setFormOpen(false);
    setSuccessOpen(true);
  }, []);

  const resetAll = useCallback(() => {
    setFormOpen(false);
    setSuccessOpen(false);
    setSelectCardOpen(false);
  }, []);

  return {
    formOpen,
    successOpen,
    selectCardOpen,
    openForm,
    closeForm,
    openSuccess,
    closeSuccess,
    openSelectCard,
    closeSelectCard,
    completeForm,
    resetAll,
  };
}
