//새로운 판매를 생성하는 훅

import { useState } from "react";

export function useSaleCard() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = async ({ formData }) => {
    setIsSubmitting(true);
  };
}
