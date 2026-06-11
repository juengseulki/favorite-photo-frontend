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

export default function CreatePhotoCard() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [grade, setGrade] = useState("");
  const [genre, setGenre] = useState("");
  const [initialPrice, setInitialPrice] = useState("");
  const [totalQuantity, setTotalQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    <div className="mx-auto max-w-[1920px] px-[20px] desktop:px-[220px] gap-[80px]">
      <div className="hidden justify-between border-b-2 border-gray-100 desktop:flex mb-[80px]">
        <span className="text-[62px] font-normal tracking-[-0.03em] font-brand">포토카드 생성</span>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center items-center gap-[65px] mb-30"
      >
        <Input
          label={"포토카드 이름"}
          placeholder="포토카드 이름을 입력해주세요"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Dropdown
          label={"등급"}
          placeholder="등급을 선택해 주세요"
          options={GRADE_OPTIONS}
          value={grade}
          onChange={setGrade}
        />
        <Dropdown
          label={"장르"}
          placeholder="장르를 선택해 주세요"
          options={GENRE_OPTIONS}
          value={genre}
          onChange={setGenre}
        />
        <Input
          label={"가격"}
          placeholder="가격을 입력해 주세요"
          value={initialPrice}
          onChange={(e) => setInitialPrice(e.target.value)}
        />
        <Input
          label={"총 발행량"}
          placeholder="총 발행향을 입력해주세요"
          value={totalQuantity}
          onChange={(e) => setTotalQuantity(e.target.value)}
        />
        <FileInput
          label="사진 업로드"
          onChange={(file) => {
            setImageFile(file);
          }}
        />
        <Textarea
          label={"포토카드 설명"}
          placeholder="카드 설명을 입력해 주세요"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button size="create" type="submit">
          생성하기
        </Button>
      </form>
    </div>
  );
}
