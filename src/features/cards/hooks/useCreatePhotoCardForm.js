"use client";

import { useState } from "react";
import { postPhotoCards } from "@/lib/api/galleryApi";
import { ERROR_MESSAGES } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function useCreatePhotoCardForm() {
  const router = useRouter();

  const [values, setValues] = useState({
    name: "",
    description: "",
    imageFile: null,
    grade: "",
    genre: "",
    initialPrice: "",
    totalQuantity: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!values.name.trim()) {
      newErrors.name = ERROR_MESSAGES.CARD_NAME_REQUIRED;
    }

    if (!values.imageFile) {
      newErrors.imageFile = ERROR_MESSAGES.CARD_IMAGE_REQUIRED;
    }

    if (!values.grade) {
      newErrors.grade = ERROR_MESSAGES.CARD_GRADE_REQUIRED;
    }

    if (!values.genre) {
      newErrors.genre = ERROR_MESSAGES.CARD_GENRE_REQUIRED;
    }

    if (!values.initialPrice) {
      newErrors.initialPrice = ERROR_MESSAGES.CARD_PRICE_REQUIRED;
    }

    if (!values.totalQuantity) {
      newErrors.totalQuantity = ERROR_MESSAGES.CARD_QUANTITY_REQUIRED;
    }

    if (!values.description.trim()) {
      newErrors.description = ERROR_MESSAGES.CARD_DESCRIPTION_REQUIRED;
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateField = (field, value) => {
    if (field === "name" && !value.trim()) return ERROR_MESSAGES.CARD_NAME_REQUIRED;
    if (field === "imageFile" && !value) return ERROR_MESSAGES.CARD_IMAGE_REQUIRED;
    if (field === "grade" && !value) return ERROR_MESSAGES.CARD_GRADE_REQUIRED;
    if (field === "genre" && !value) return ERROR_MESSAGES.CARD_GENRE_REQUIRED;
    if (field === "initialPrice" && !value) return ERROR_MESSAGES.CARD_PRICE_REQUIRED;
    if (field === "totalQuantity" && !value) return ERROR_MESSAGES.CARD_QUANTITY_REQUIRED;
    if (field === "description" && !value.trim()) return ERROR_MESSAGES.CARD_DESCRIPTION_REQUIRED;

    return "";
  };

  const handleBlur = (field, value) => {
    setTouched((t) => ({ ...t, [field]: true }));

    setErrors((t) => ({
      ...t,
      [field]: validateField(field, value),
    }));
  };

  const handleChange = (field, value) => {
    setValues((t) => ({
      ...t,
      [field]: value,
    }));

    if (touched[field]) {
      setErrors((t) => ({
        ...t,
        [field]: validateField(field, value),
      }));
    }
  };

  const isFormValid =
    values.name.trim() &&
    values.imageFile &&
    values.grade &&
    values.genre &&
    values.initialPrice &&
    values.totalQuantity &&
    values.description.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!validateForm()) return;

    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("grade", values.grade);
    formData.append("genre", values.genre);
    formData.append("initialPrice", values.initialPrice);
    formData.append("totalQuantity", values.totalQuantity);
    formData.append("image", values.imageFile);

    try {
      await postPhotoCards(formData);
      router.push("/my-gallery");
    } catch (error) {
      console.error(error);
    }
  };

  return {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
    isSubmitting,
  };
}
