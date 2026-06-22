"use client";

import ProtectedRoute from "@/components/common/ProtectedRoute";
import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { GRADE_OPTIONS, GENRE_OPTIONS } from "@/lib/constants/galleryOptions";
import FileInput from "@/components/common/FileInput";
import useCreatePhotoCardForm from "@/features/cards/hooks/useCreatePhotoCardForm";
import PhotoCardCreateModal from "@/features/cards/components/PhotoCardCreateModal";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/constants/routes";
import { getPhotoCardStatus } from "@/lib/api/galleryApi";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/providers/AuthProvider";

export default function CreatePhotoCard() {
  const router = useRouter();
  const { isLoading, user } = useAuth();
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isFormValid,
    isSubmitting,
    createPhotoCardResult,
    setCreatePhotoCardResult,
  } = useCreatePhotoCardForm();

  const createStatusQuery = useQuery({
    queryKey: [QUERY_KEYS.GALLERY.MY_CARD_STATUS],
    queryFn: getPhotoCardStatus,
    enabled: !isLoading && !!user,
  });

  const createStatus = createStatusQuery.data;

  const remainingCreateCount = createStatus?.remainingCreateCount ?? 0;
  const monthlyCreateLimit = createStatus?.monthlyCreateLimit ?? 0;
  const year = createStatus?.year ?? "";
  const month = createStatus?.month ?? "";

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-[1920px] px-[20px] tablet:px-[60px] desktop:px-[220px] gap-[80px]">
        <div className="flex justify-between mb-5 items-center tablet:border-b-2 tablet:border-gray-100 tablet:mb-10">
          <span className="hidden tablet:block font-brand text-[40px] desktop:text-[50px] font-normal tracking-[-0.03em]">
            포토카드 생성
          </span>

          <div className="flex items-baseline gap-[12px]">
            <div className="flex items-baseline gap-[4px]">
              <span className="text-main text-[32px] tablet:text-[40px]">
                {remainingCreateCount}
              </span>
              <span className="text-[20px] tablet:text-[28px]">/{monthlyCreateLimit}</span>
            </div>

            <span className="text-gray-300 text-[16px]">
              ({year}년 {month}월)
            </span>
          </div>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-10 tablet:gap-[30px] mb-10 tablet:mb-10"
        >
          <div className="flex flex-col gap-[10px]">
            <Input
              className="tablet:hidden"
              size="sm"
              label="포토카드 이름"
              placeholder="포토카드 이름을 입력해주세요 (25자 이내)"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name", values.name)}
            />

            <Input
              className="hidden tablet:flex"
              label="포토카드 이름"
              placeholder="포토카드 이름을 입력해주세요 (25자 이내)"
              value={values.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name", values.name)}
            />

            {errors.name && <p className="text-[16px] text-red">{errors.name}</p>}
          </div>

          <div className="flex flex-col gap-[10px]">
            <Dropdown
              className="tablet:hidden"
              size="sm"
              label="등급"
              placeholder="등급을 선택해 주세요"
              options={GRADE_OPTIONS}
              value={values.grade}
              onChange={(value) => handleChange("grade", value)}
            />

            <Dropdown
              className="hidden tablet:flex"
              label="등급"
              placeholder="등급을 선택해 주세요"
              options={GRADE_OPTIONS}
              value={values.grade}
              onChange={(value) => handleChange("grade", value)}
            />

            {errors.grade && <p className="text-[16px] text-red">{errors.grade}</p>}
          </div>

          <div className="flex flex-col gap-[10px]">
            <Dropdown
              className="tablet:hidden"
              size="sm"
              label="장르"
              placeholder="장르를 선택해 주세요"
              options={GENRE_OPTIONS}
              value={values.genre}
              onChange={(value) => handleChange("genre", value)}
            />

            <Dropdown
              className="hidden tablet:flex"
              label="장르"
              placeholder="장르를 선택해 주세요"
              options={GENRE_OPTIONS}
              value={values.genre}
              onChange={(value) => handleChange("genre", value)}
            />

            {errors.genre && <p className="text-[16px] text-red">{errors.genre}</p>}
          </div>

          <div className="flex flex-col gap-[10px]">
            <Input
              className="tablet:hidden"
              size="sm"
              label="가격"
              placeholder="가격을 입력해 주세요 (100만원 이하)"
              value={values.initialPrice}
              onChange={(e) => handleChange("initialPrice", e.target.value.replace(/\D/g, ""))}
              onBlur={() => handleBlur("initialPrice", values.initialPrice)}
            />

            <Input
              className="hidden tablet:flex"
              label="가격"
              placeholder="가격을 입력해 주세요 (100만원 이하)"
              value={values.initialPrice}
              onChange={(e) => handleChange("initialPrice", e.target.value.replace(/\D/g, ""))}
              onBlur={() => handleBlur("initialPrice", values.initialPrice)}
            />

            {errors.initialPrice && <p className="text-[16px] text-red">{errors.initialPrice}</p>}
          </div>

          <div className="flex flex-col gap-[10px]">
            <Input
              className="tablet:hidden"
              size="sm"
              label="총 발행량"
              placeholder="총 발행량을 입력해주세요 (10장 이내)"
              value={values.totalQuantity}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (!value) {
                  handleChange("totalQuantity", "");
                  return;
                }

                const quantity = Math.min(Number(value), 10);
                handleChange("totalQuantity", String(quantity));
              }}
              onBlur={() => handleBlur("totalQuantity", values.totalQuantity)}
            />

            <Input
              className="hidden tablet:flex"
              label="총 발행량"
              placeholder="총 발행량을 입력해주세요 (10장 이내)"
              value={values.totalQuantity}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "");

                if (!value) {
                  handleChange("totalQuantity", "");
                  return;
                }

                const quantity = Math.min(Number(value), 10);
                handleChange("totalQuantity", String(quantity));
              }}
              onBlur={() => handleBlur("totalQuantity", values.totalQuantity)}
            />

            {errors.totalQuantity && <p className="text-[16px] text-red">{errors.totalQuantity}</p>}
          </div>

          <div className="flex flex-col gap-[10px]">
            <FileInput
              className="tablet:hidden"
              size="sm"
              label="사진 업로드"
              onChange={(file) => {
                handleChange("imageFile", file);
              }}
            />

            <FileInput
              className="hidden tablet:flex"
              label="사진 업로드"
              onChange={(file) => {
                handleChange("imageFile", file);
              }}
            />

            {errors.imageFile && <p className="text-[16px] text-red">{errors.imageFile}</p>}
          </div>

          <div className="flex flex-col gap-[10px]">
            <div className="tablet:hidden">
              <Textarea
                size="sm"
                label="포토카드 설명"
                placeholder="카드 설명을 입력해 주세요 (200자 이내)"
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={() => handleBlur("description", values.description)}
              />
            </div>

            <div className="hidden tablet:block">
              <Textarea
                label="포토카드 설명"
                placeholder="카드 설명을 입력해 주세요 (200자 이내)"
                value={values.description}
                onChange={(e) => handleChange("description", e.target.value)}
                onBlur={() => handleBlur("description", values.description)}
              />
            </div>

            {errors.description && <p className="text-[16px] text-red">{errors.description}</p>}
          </div>

          <div className="tablet:hidden">
            <Button
              size="create"
              type="submit"
              className="w-[345px] h-[55px] tablet:w-[440px] tablet:h-[60px]"
              disabled={!isFormValid || isSubmitting}
            >
              {isSubmitting ? "생성 중..." : "생성하기"}
            </Button>
          </div>

          <div className="hidden tablet:block">
            <Button size="create" type="submit" disabled={!isFormValid || isSubmitting}>
              {isSubmitting ? "생성 중..." : "생성하기"}
            </Button>
          </div>
        </form>
      </div>
      <PhotoCardCreateModal
        isOpen={!!createPhotoCardResult}
        isSuccess={createPhotoCardResult === "success"}
        onClose={() => setCreatePhotoCardResult(null)}
        onConfirm={() => router.push(ROUTES.MY_GALLERY)}
        cardName={values.name}
        grade={values.grade}
      />
    </ProtectedRoute>
  );
}
