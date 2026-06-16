"use client";

import Button from "@/components/common/Button";
import Dropdown from "@/components/common/Dropdown";
import Input from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import { useState } from "react";
import { GRADE_OPTIONS, GENRE_OPTIONS } from "@/lib/constants/galleryOptions";
import { postPhotoCards } from "@/lib/api/galleryApi";
import FileInput from "@/components/common/FileInput";
import { useRouter } from "next/navigation";
import { ERROR_MESSAGES } from "@/lib/constants";

export default function CreatePhotoCard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

  const handleChange = (field, value, setter) => {
    console.log(value);
    setter(value);

    if (touched[field]) {
      setErrors((t) => ({
        ...t,
        [field]: validateField(field, value),
      }));
    }
  };

  const isFormValid =
    name.trim() &&
    imageFile &&
    grade &&
    genre &&
    initialPrice &&
    totalQuantity &&
    description.trim();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("grade", grade);
    formData.append("genre", genre);
    formData.append("initialPrice", initialPrice);
    formData.append("totalQuantity", totalQuantity);
    formData.append("image", imageFile);
    try {
      await postPhotoCards(formData);
      router.push("/my-gallery");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto max-w-[1920px] px-[20px] tablet:px-[60px] desktop:px-[220px] gap-[80px]">
      <div className="hidden tablet:flex justify-between border-b-2 border-gray-100 mb-10">
        <span className="font-brand text-[40px] desktop:text-[50px] font-normal tracking-[-0.03em]">
          포토카드 생성
        </span>
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
            placeholder="포토카드 이름을 입력해주세요"
            value={name}
            onChange={(e) => handleChange("name", e.target.value, setName)}
            onBlur={() => handleBlur("name", name)}
          />

          <Input
            className="hidden tablet:flex"
            label="포토카드 이름"
            placeholder="포토카드 이름을 입력해주세요"
            value={name}
            onChange={(e) => handleChange("name", e.target.value, setName)}
            onBlur={() => handleBlur("name", name)}
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
            value={grade}
            onChange={(value) => handleChange("grade", value, setGrade)}
          />

          <Dropdown
            className="hidden tablet:flex"
            label="등급"
            placeholder="등급을 선택해 주세요"
            options={GRADE_OPTIONS}
            value={grade}
            onChange={(value) => handleChange("grade", value, setGrade)}
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
            value={genre}
            onChange={(value) => handleChange("genre", value, setGenre)}
          />

          <Dropdown
            className="hidden tablet:flex"
            label="장르"
            placeholder="장르를 선택해 주세요"
            options={GENRE_OPTIONS}
            value={genre}
            onChange={(value) => handleChange("genre", value, setGenre)}
          />

          {errors.genre && <p className="text-[16px] text-red">{errors.genre}</p>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <Input
            className="tablet:hidden"
            size="sm"
            label="가격"
            placeholder="가격을 입력해 주세요"
            value={initialPrice}
            onChange={(e) =>
              handleChange("initialPrice", e.target.value.replace(/\D/g, ""), setInitialPrice)
            }
            onBlur={() => handleBlur("initialPrice", initialPrice)}
          />
          <Input
            className="hidden tablet:flex"
            label="가격"
            placeholder="가격을 입력해 주세요"
            value={initialPrice}
            onChange={(e) =>
              handleChange("initialPrice", e.target.value.replace(/\D/g, ""), setInitialPrice)
            }
            onBlur={() => handleBlur("initialPrice", initialPrice)}
          />

          {errors.initialPrice && <p className="text-[16px] text-red">{errors.initialPrice}</p>}
        </div>

        <div className="flex flex-col gap-[10px]">
          <Input
            className="tablet:hidden"
            size="sm"
            label="총 발행량"
            placeholder="총 발행량을 입력해주세요"
            value={totalQuantity}
            onChange={(e) =>
              handleChange("totalQuantity", e.target.value.replace(/\D/g, ""), setTotalQuantity)
            }
            onBlur={() => handleBlur("totalQuantity", totalQuantity)}
          />

          <Input
            className="hidden tablet:flex"
            label="총 발행량"
            placeholder="총 발행량을 입력해주세요"
            value={totalQuantity}
            onChange={(e) =>
              handleChange("totalQuantity", e.target.value.replace(/\D/g, ""), setTotalQuantity)
            }
            onBlur={() => handleBlur("totalQuantity", totalQuantity)}
          />

          {errors.totalQuantity && <p className="text-[16px] text-red">{errors.totalQuantity}</p>}
        </div>
        <div className="flex flex-col gap-[10px]">
          <FileInput
            className="tablet:hidden"
            size="sm"
            label="사진 업로드"
            onChange={(file) => {
              setImageFile(file);
            }}
          />

          <FileInput
            className="hidden tablet:flex"
            label="사진 업로드"
            onChange={(file) => {
              setImageFile(file);
            }}
          />

          {errors.imageFile && <p className="text-[16px] text-red">{errors.imageFile}</p>}
        </div>
        <div className="flex flex-col gap-[10px]">
          <div className="tablet:hidden">
            <Textarea
              size="sm"
              label="포토카드 설명"
              placeholder="카드 설명을 입력해 주세요"
              value={description}
              onChange={(e) => handleChange("description", e.target.value, setDescription)}
              onBlur={() => handleBlur("description", description)}
            />
          </div>
          <div className="hidden tablet:block">
            <Textarea
              label="포토카드 설명"
              placeholder="카드 설명을 입력해 주세요"
              value={description}
              onChange={(e) => handleChange("description", e.target.value, setDescription)}
              onBlur={() => handleBlur("description", description)}
            />
          </div>
          {errors.description && <p className="text-[16px] text-red">{errors.description}</p>}
        </div>
        <div className="tablet:hidden">
          <Button
            size="create"
            type="submit"
            className="w-[345px] h-[55px] tablet:w-[440px] tablet:h-[60px]"
          >
            생성하기
          </Button>
        </div>

        <div className="hidden tablet:block">
          <Button size="create" type="submit" disabled={!isFormValid}>
            생성하기
          </Button>
        </div>
      </form>
    </div>
  );
}
