import Modal from "@/components/common/Modal";
import Dropdown from "@/components/common/Dropdown";
import { GRADE_OPTIONS, GENRE_OPTIONS } from "@/lib/constants/galleryOptions";

export default function GalleryFilterModal({
  isOpen,
  grade,
  genre,
  onClose,
  onGradeChange,
  onGenreChange,
}) {
  return (
    <Modal isOpen={isOpen} title="필터" onClose={onClose}>
      <div className="flex flex-col items-center justify-center gap-3">
        <Dropdown
          placeholder="등급"
          size="sort"
          options={GRADE_OPTIONS}
          value={grade}
          onChange={onGradeChange}
        />

        <Dropdown
          placeholder="장르"
          size="sort"
          options={GENRE_OPTIONS}
          value={genre}
          onChange={onGenreChange}
        />
      </div>
    </Modal>
  );
}
