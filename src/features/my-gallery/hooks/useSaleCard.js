//새로운 판매를 생성하는 훅

import { createSale } from "@/lib/api/salesApi";
import { useState } from "react";

export function useSaleCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await createSale({ data: formData });
    } catch (error) {
      setErrorMessage("Sale 등록에 실패했습니다", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { handleSubmit, isSubmitting, errorMessage };
}
