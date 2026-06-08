"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Textarea from "@/components/common/Textarea";
import {
  EXCHANGE_FORM_DEFAULT_VALUES,
  EXCHANGE_GENRE_OPTIONS,
  EXCHANGE_GRADE_OPTIONS,
} from "@/lib/constants/exchangeOptions";

function QuantityField({ quantity, maxQuantity, onChange }) {
  const safeMaxQuantity = Math.max(1, Number(maxQuantity) || 1);

  return (
    <div className="flex flex-col gap-[10px]">
      <span className="text-[16px] font-bold text-white">총 판매 수량</span>

      <div className="flex items-center gap-3">
        <div className="flex h-[55px] w-[170px] items-center justify-between border border-gray-200 bg-black px-4">
          <button
            type="button"
            className="text-[20px] text-gray-300"
            onClick={() => onChange(Math.max(1, quantity - 1))}
          >
            -
          </button>

          <span className="text-[16px] font-bold text-white">{quantity}</span>

          <button
            type="button"
            className="text-[20px] text-gray-300"
            onClick={() => onChange(Math.min(safeMaxQuantity, quantity + 1))}
          >
            +
          </button>
        </div>

        <span className="text-[16px] font-bold text-white">/ {safeMaxQuantity}</span>
      </div>
    </div>
  );
}

export default function SaleExchangeFormModal({
  isOpen,
  onClose,
  onSubmit,
  card,
  defaultValues = EXCHANGE_FORM_DEFAULT_VALUES,
  isSubmitting = false,
}) {
  const [formValues, setFormValues] = useState(defaultValues);

  const previewCard = useMemo(
    () => ({
      imageUrl: card?.imageUrl ?? "/img/images/img1.png",
      name: card?.name ?? "포토카드",
      maxQuantity: card?.count ?? 1,
    }),
    [card],
  );

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    onSubmit?.(formValues);
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
            {isSubmitting ? "판매 중..." : "판매하기"}
          </Button>
        </>
      }
    >
      <div className="space-y-8">
        <section className="flex flex-col gap-8 desktop:flex-row">
          <div className="relative h-[250px] w-full overflow-hidden border border-gray-400 desktop:w-[320px]">
            <Image
              src={previewCard.imageUrl}
              alt={previewCard.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-1 flex-col gap-5">
            <QuantityField
              quantity={Number(formValues.quantity)}
              maxQuantity={previewCard.maxQuantity}
              onChange={(value) => handleChange("quantity", value)}
            />

            <Input
              label="장당 가격"
              size="sm"
              value={formValues.price}
              onChange={(event) => handleChange("price", event.target.value)}
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
              options={EXCHANGE_GRADE_OPTIONS}
              value={formValues.grade}
              onChange={(value) => handleChange("grade", value)}
            />

            <Dropdown
              label="장르"
              placeholder="장르를 선택해 주세요"
              options={EXCHANGE_GENRE_OPTIONS}
              value={formValues.genre}
              onChange={(value) => handleChange("genre", value)}
            />
          </div>

          <Textarea
            className="mt-5"
            label="교환 희망 설명"
            placeholder="설명을 입력해 주세요"
            value={formValues.description}
            onChange={(event) => handleChange("description", event.target.value)}
            textareaClassName="h-[160px] w-full"
          />
        </section>
      </div>
    </Modal>
  );
}
