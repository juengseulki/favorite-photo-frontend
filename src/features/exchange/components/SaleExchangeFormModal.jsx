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

const DESCRIPTION_MAX_LENGTH = 300;

function QuantityField({ quantity, maxQuantity, onChange, isMobile = false }) {
  const safeMaxQuantity = Math.max(1, Number(maxQuantity) || 1);

  return (
    <div
      className={
        isMobile
          ? "flex items-center justify-between gap-[12px]"
          : "flex items-center justify-between gap-[20px]"
      }
    >
      <span
        className={
          isMobile
            ? "w-[88px] shrink-0 whitespace-nowrap text-[16px] font-bold text-white"
            : "w-[110px] shrink-0 whitespace-nowrap text-[16px] font-bold text-white"
        }
      >
        총 판매 수량
      </span>

      <div className="flex shrink-0 items-center gap-[8px] desktop:gap-[10px]">
        <div
          className="
            flex h-[45px] w-[182px] items-center justify-between
            border border-gray-200 bg-black px-4
            desktop:h-[50px]
            desktop:w-[245px]
          "
        >
          <button
            type="button"
            className="cursor-pointer text-[18px] text-gray-300 desktop:text-[20px]"
            onClick={() => onChange(Math.max(1, quantity - 1))}
          >
            -
          </button>

          <span className="text-[14px] font-bold text-white desktop:text-[16px]">{quantity}</span>

          <button
            type="button"
            className="cursor-pointer text-[18px] text-gray-300 desktop:text-[20px]"
            onClick={() => onChange(Math.min(safeMaxQuantity, quantity + 1))}
          >
            +
          </button>
        </div>

        <div className="flex shrink-0 flex-col">
          <span className="text-[14px] font-bold text-white desktop:text-[16px]">
            / {safeMaxQuantity}
          </span>
          <span className="text-[9px] font-light text-gray-300 desktop:text-[10px]">
            최대 {safeMaxQuantity}장
          </span>
        </div>
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
  errorMessage = "",
  submitText = "판매하기",
  loadingText = "판매 중...",
  subtitle = "나의 포토카드 판매하기",
}) {
  const [formValues, setFormValues] = useState(defaultValues);
  const [descriptionError, setDescriptionError] = useState("");

  const previewCard = useMemo(
    () => ({
      imageUrl: card?.imageUrl ?? "/img/images/img1.png",
      name: card?.name ?? "포토카드",
      grade: card?.grade ?? "",
      genre: card?.genre ?? "",
      creatorNickname: card?.creator?.nickname ?? card?.creatorNickname ?? "",
      maxQuantity: card?.count ?? card?.quantity ?? 1,
    }),
    [card],
  );

  const handleChange = (key, value) => {
    setFormValues((prev) => ({ ...prev, [key]: value }));

    if (key !== "description") return;

    const trimmedValue = value.trim();

    if (!trimmedValue) {
      setDescriptionError("");
      return;
    }

    if (trimmedValue.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(`교환 제시 내용은 ${DESCRIPTION_MAX_LENGTH}자 이하로 입력해주세요.`);
      return;
    }

    setDescriptionError("");
  };

  const handleSubmit = () => {
    const trimmedDescription = formValues.description?.trim() ?? "";

    if (!trimmedDescription) {
      setDescriptionError("교환 제시 내용을 입력해주세요.");
      return;
    }

    if (trimmedDescription.length > DESCRIPTION_MAX_LENGTH) {
      setDescriptionError(`교환 제시 내용은 ${DESCRIPTION_MAX_LENGTH}자 이하로 입력해주세요.`);
      return;
    }

    setDescriptionError("");
    onSubmit?.({ ...formValues, description: trimmedDescription, photoCardId: card.photoCardId });
  };

  return (
    <Modal
      isOpen={isOpen}
      title=""
      size="saleForm"
      onClose={onClose}
      className="bg-gray-500 [&>button]:hidden tablet:[&>button]:block"
    >
      {/* 모바일 전용 */}
      <div className="tablet:hidden">
        <div className="-mt-[35px] flex min-h-full w-full flex-col">
          <button
            type="button"
            onClick={onClose}
            aria-label="뒤로가기"
            className="absolute left-[15px] flex h-[22px] w-[22px] items-center justify-center"
          >
            <Image
              src="/img/icons/back.png"
              alt=""
              width={22}
              height={22}
              className="h-[22px] w-[22px] object-contain"
            />
          </button>

          <span className="absolute left-1/2 -translate-x-1/2 font-brand text-[16px] font-bold text-white">
            {subtitle}
          </span>
        </div>

        <div className="px-[15px] pb-[40px] pt-[40px]">
          <h2 className="mt-[8px] border-b border-gray-200 pb-[14px] text-[28px] font-bold leading-none text-white">
            {previewCard.name}
          </h2>

          <div className="relative mt-[25px] h-[345px] w-full overflow-hidden border border-gray-400 bg-gray-500">
            <Image
              src={previewCard.imageUrl}
              alt={previewCard.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="mt-[20px] flex items-center justify-between border-b border-gray-450 pb-[14px]">
            <div className="flex items-center gap-[8px]">
              <span className="text-[18px] font-bold text-main">{previewCard.grade}</span>
              <span className="text-gray-300">|</span>
              <span className="text-[16px] text-gray-300">{previewCard.genre}</span>
            </div>

            <span className="text-[16px] font-bold text-white underline underline-offset-4">
              {previewCard.creatorNickname}
            </span>
          </div>

          <div className="mt-[30px] flex flex-col gap-[20px]">
            <div className="flex items-center justify-between">
              <span className="w-[90px] shrink-0 text-[16px] font-bold text-white">
                총 판매 수량
              </span>

              <div className="flex items-center gap-[8px]">
                <div className="flex h-[45px] w-[144px] items-center justify-between border border-gray-200 bg-black px-[20px]">
                  <button
                    type="button"
                    className="text-gray-300"
                    onClick={() =>
                      handleChange("quantity", Math.max(1, Number(formValues.quantity) - 1))
                    }
                  >
                    -
                  </button>

                  <span className="font-bold text-white">{formValues.quantity}</span>

                  <button
                    type="button"
                    className="text-gray-300"
                    onClick={() =>
                      handleChange(
                        "quantity",
                        Math.min(previewCard.maxQuantity, Number(formValues.quantity) + 1),
                      )
                    }
                  >
                    +
                  </button>
                </div>

                <div>
                  <p className="text-[14px] font-bold text-white">/ {previewCard.maxQuantity}</p>
                  <p className="text-[9px] text-gray-300">최대 {previewCard.maxQuantity}장</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="w-[90px] shrink-0 text-[16px] font-bold text-white">장당 가격</span>

              <Input
                size="sale"
                value={formValues.price}
                onChange={(event) => handleChange("price", event.target.value)}
                rightText="P"
                placeholder="숫자만 입력"
              />
            </div>
          </div>

          <section className="mt-[55px]">
            <h3 className="border-b border-gray-200 pb-[18px] text-[24px] font-bold text-white">
              교환 희망 정보
            </h3>

            <div className="mt-[30px] flex flex-col gap-[25px]">
              <Dropdown
                size="saleMd"
                label="등급"
                placeholder="등급을 선택해 주세요"
                options={EXCHANGE_GRADE_OPTIONS}
                value={formValues.grade}
                onChange={(value) => handleChange("grade", value)}
              />

              <Dropdown
                size="saleMd"
                label="장르"
                placeholder="장르를 선택해 주세요"
                options={EXCHANGE_GENRE_OPTIONS}
                value={formValues.genre}
                onChange={(value) => handleChange("genre", value)}
              />

              <Textarea
                label="교환 희망 설명"
                placeholder="설명을 입력해 주세요"
                value={formValues.description}
                onChange={(event) => handleChange("description", event.target.value)}
                textareaClassName="h-[140px] w-full"
              />
            </div>
          </section>

          {descriptionError && (
            <p className="mt-3 text-[14px] font-medium text-red-500">{descriptionError}</p>
          )}

          {errorMessage && (
            <p className="mt-4 text-[14px] font-medium text-red-500">{errorMessage}</p>
          )}

          <div className="mt-[40px] flex w-full gap-[10px]">
            <Button variant="secondary" size="sale" className="flex-1" onClick={onClose}>
              취소하기
            </Button>

            <Button
              variant="primary"
              size="sale"
              className="flex-1"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? loadingText : submitText}
            </Button>
          </div>
        </div>
      </div>

      {/* 태블릿/데스크탑 전용 */}
      <div
        className="
            hidden
            tablet:mx-auto
            tablet:block

            tablet:max-h-[720px]
            tablet:w-[684px]
            tablet:overflow-y-auto
            tablet:overflow-x-hidden
            tablet:pr-[20px]

            desktop:max-h-[840px]
            desktop:w-[940px]
            desktop:overflow-y-auto
            desktop:overflow-x-hidden
            desktop:pr-[20px]

            [&::-webkit-scrollbar]:w-[6px]
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            [&::-webkit-scrollbar-track]:bg-transparent
          "
      >
        <p className="font-brand text-[14px] font-bold text-gray-300 desktop:text-[24px]">
          {subtitle}
        </p>

        <h2 className="mt-[8px] border-b border-gray-400 pb-[16px] text-[28px] font-bold leading-none text-white desktop:mt-[10px] desktop:pb-[20px] desktop:text-[40px]">
          {previewCard.name}
        </h2>

        <section className="mt-[30px] grid grid-cols-[260px_1fr] gap-[30px] desktop:mt-[40px] desktop:grid-cols-[440px_440px] desktop:gap-[40px]">
          <div className="relative h-[195px] w-[260px] overflow-hidden border border-gray-400 desktop:h-[330px] desktop:w-[440px]">
            <Image
              src={previewCard.imageUrl}
              alt={previewCard.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="w-full desktop:h-[215px] desktop:w-[440px]">
            <div className="flex items-center border-b border-gray-400 pb-[8px] desktop:h-[35px] desktop:pb-[6px]">
              <span className="text-[16px] font-bold text-main desktop:text-[24px]">
                {previewCard.grade}
              </span>
              <span className="mx-[8px] h-[14px] w-px bg-gray-400 desktop:mx-[10px] desktop:h-[18px]" />
              <span className="text-[14px] text-gray-300 desktop:text-[24px]">
                {previewCard.genre}
              </span>
              <span className="ml-auto text-[14px] font-bold text-white underline desktop:text-[24px]">
                {previewCard.creatorNickname}
              </span>
            </div>

            <div className="mt-[20px] flex flex-col gap-[16px] desktop:mt-[35px] desktop:gap-[20px]">
              <QuantityField
                quantity={Number(formValues.quantity)}
                maxQuantity={previewCard.maxQuantity}
                onChange={(value) => handleChange("quantity", value)}
              />

              <div className="flex items-center justify-between gap-[12px] desktop:gap-[20px]">
                <span className="shrink-0 text-[14px] font-bold text-white desktop:w-[110px] desktop:text-[16px]">
                  장당 가격
                </span>

                <Input
                  size="sale"
                  value={formValues.price}
                  onChange={(event) => handleChange("price", event.target.value)}
                  rightText="P"
                  placeholder="숫자만 입력"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="mt-[55px] desktop:mt-[80px]">
          <h3 className="border-b border-gray-400 pb-[14px] text-[20px] font-bold text-white desktop:pb-[20px] desktop:text-[28px]">
            교환 희망 정보
          </h3>

          <div className="mt-[25px] grid grid-cols-2 gap-[20px] desktop:mt-[40px] desktop:gap-[40px]">
            <Dropdown
              size="saleMd"
              className="w-full tablet:w-[342px] desktop:w-[440px]"
              buttonClassName="w-full tablet:w-[320px] desktop:w-[440px]"
              label="등급"
              placeholder="등급을 선택해 주세요"
              options={EXCHANGE_GRADE_OPTIONS}
              value={formValues.grade}
              onChange={(value) => handleChange("grade", value)}
            />

            <Dropdown
              size="saleMd"
              className="w-full tablet:w-[342px] desktop:w-[440px]"
              buttonClassName="w-full tablet:w-[320px] desktop:w-[440px]"
              label="장르"
              placeholder="장르를 선택해 주세요"
              options={EXCHANGE_GENRE_OPTIONS}
              value={formValues.genre}
              onChange={(value) => handleChange("genre", value)}
            />
          </div>

          <Textarea
            className="mt-[25px] desktop:mt-[35px]"
            label="교환 희망 설명"
            placeholder="설명을 입력해 주세요"
            value={formValues.description}
            onChange={(event) => handleChange("description", event.target.value)}
            textareaClassName="h-[95px] w-full desktop:h-[125px]"
          />

          {descriptionError && (
            <p className="mt-3 text-[14px] font-medium text-red-500">{descriptionError}</p>
          )}

          {errorMessage && (
            <p className="mt-4 text-[14px] font-medium text-red-500">{errorMessage}</p>
          )}

          <div className="mt-[40px] flex gap-[25px] desktop:mt-[60px] desktop:gap-[40px]">
            <Button
              variant="secondary"
              className="h-[45px] w-[320px] desktop:h-[60px] desktop:w-[440px]"
              onClick={onClose}
            >
              취소하기
            </Button>

            <Button
              variant="primary"
              className="h-[45px] w-[320px] desktop:h-[60px] desktop:w-[440px]"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? loadingText : submitText}
            </Button>
          </div>
        </section>
      </div>
    </Modal>
  );
}
