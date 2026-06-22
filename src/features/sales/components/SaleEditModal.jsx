"use client";

import { SaleExchangeFormModal } from "@/features/exchange";

export default function SaleEditModal({ isOpen, onClose, onSubmit, sale, isSubmitting = false }) {
  if (!sale) return null;

  const defaultValues = {
    quantity: sale.totalQuantity ?? sale.remainingQuantity ?? 1,
    price: sale.price ?? "",
    grade: sale.exchangeGrade ?? sale.exchange?.grade ?? "",
    genre: sale.exchangeGenre ?? sale.exchange?.genre ?? "",
    description: sale.exchangeDescription ?? sale.exchange?.description ?? "",
  };

  const card = {
    photoCardId: sale.photoCardId,
    imageUrl: sale.imageUrl,
    name: sale.name,
    grade: sale.grade,
    genre: sale.genre,
    creatorNickname: sale.creatorNickname ?? sale.creator?.nickname ?? sale.sellerNickname,
    count: sale.totalQuantity ?? sale.remainingQuantity,
  };

  const handleSubmit = (values) => {
    onSubmit?.({
      data: {
        quantity: Number(values.quantity),
        price: Number(values.price),
        exchangeGrade: values.grade,
        exchangeGenre: values.genre,
        exchangeDescription: values.description,
      },
    });
  };

  return (
    <SaleExchangeFormModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      card={card}
      defaultValues={defaultValues}
      isSubmitting={isSubmitting}
      submitText="수정하기"
      loadingText="수정 중..."
      subtitle="수정하기"
    />
  );
}
