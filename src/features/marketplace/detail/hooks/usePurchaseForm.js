"use client";

import { useState } from "react";

export function usePurchaseForm(card) {
  const [quantity, setQuantity] = useState(1);
  const [purchaseError, setPurchaseError] = useState("");
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);

  const totalPrice = card ? (card.price * quantity).toLocaleString() : "0";

  const decreaseQuantity = () => {
    setPurchaseSuccess(false);
    setQuantity((quantity) => Math.max(1, quantity - 1));
  };

  const increaseQuantity = () => {
    if (!card) return;

    setPurchaseSuccess(false);
    setQuantity((quantity) => Math.min(card.remainingQuantity, quantity + 1));
  };

  const resetAfterSuccess = () => {
    setPurchaseSuccess(true);
    setPurchaseError("");
    setQuantity(1);
  };

  return {
    quantity,
    purchaseError,
    purchaseSuccess,
    totalPrice,
    setPurchaseError,
    decreaseQuantity,
    increaseQuantity,
    resetAfterSuccess,
  };
}
