"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Textarea from "@/components/common/Textarea";
import { CARD_GENRE_OPTIONS, CARD_GRADE_OPTIONS } from "@/lib/constants/cardOptions";

export default function SaleEditModal({ isOpen, onClose, onSubmit, sale, isSubmitting = false }) {
  const [formValues, setFormValues] = useState({
    price: sale?.price ?? "",
    exchangeGrade: sale?.exchangeGrade ?? "",
    exchangeGenre: sale?.exchangeGenre ?? "",
    exchangeDescription: sale?.exchangeDescription ?? "",
  });

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.({
      photoCardId: sale?.cardId,
      data: {
        price: formValues.price ? Number(formValues.price) : undefined,
        exchangeGrade: formValues.exchangeGrade || undefined,
        exchangeGenre: formValues.exchangeGenre || undefined,
        exchangeDescription: formValues.exchangeDescription || undefined,
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      title=""
      size="form"
      onClose={onClose}
      className="border-gray-400 bg-gray-500"
      bodyClassName="mt-0"
      actions={
        <>
          <Button variant="secondary" size="lg" onClick={onClose}>
            취소하기
          </Button>
          <Button size="lg" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "수정 중..." : "수정하기"}
          </Button>
        </>
      }
    >
      <div className="space-y-8">
        <section className="flex flex-col gap-8 desktop:flex-row">
          <div className="relative h-[250px] w-full overflow-hidden border border-gray-400 desktop:w-[320px]">
            {sale?.imageUrl && (
              <Image
                src={sale.imageUrl}
                alt={sale.name ?? "포토카드"}
                fill
                className="object-cover"
              />
            )}
          </div>

          <div className="flex flex-1 flex-col gap-5 justify-center">
            <Input
              label="장당 가격"
              size="sm"
              value={String(formValues.price)}
              onChange={(e) => handleChange("price", e.target.value)}
              rightText="P"
              placeholder="가격을 입력해 주세요"
            />
          </div>
        </section>

        <section className="border-t border-gray-400 pt-8">
          <h3 className="mb-6 text-[20px] font-bold text-white">교환 희망 정보</h3>

          <div className="grid gap-5 desktop:grid-cols-2">
            <Dropdown
              label="등급"
              placeholder="등급을 선택해 주세요"
              options={CARD_GRADE_OPTIONS}
              value={formValues.exchangeGrade}
              onChange={(value) => handleChange("exchangeGrade", value)}
            />

            <Dropdown
              label="장르"
              placeholder="장르를 선택해 주세요"
              options={CARD_GENRE_OPTIONS}
              value={formValues.exchangeGenre}
              onChange={(value) => handleChange("exchangeGenre", value)}
            />
          </div>

          <Textarea
            className="mt-5"
            label="교환 희망 설명"
            placeholder="설명을 입력해 주세요"
            value={formValues.exchangeDescription}
            onChange={(e) => handleChange("exchangeDescription", e.target.value)}
            textareaClassName="h-[160px] w-full"
          />
        </section>
      </div>
    </Modal>
  );
}
