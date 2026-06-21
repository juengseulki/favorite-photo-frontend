import Modal from "@/components/common/Modal";
import Dropdown from "@/components/common/Dropdown";
import { GRADE_OPTIONS, GENRE_OPTIONS } from "@/lib/constants/galleryOptions";
import { SOLDOUT_OPTIONS, TRADE_OPTIONS } from "@/lib/constants/myShopOptions";

export default function MyShopFilterModal({
  isOpen,
  onClose,

  grade,
  genre,
  tradeType,
  isSoldOut,
  onGradeChange,
  onGenreChange,
  onTradeTypeChange,
  onIsSoldOutChange,
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

        <Dropdown
          placeholder="판매방법"
          size="sort"
          options={TRADE_OPTIONS}
          value={tradeType}
          onChange={onTradeTypeChange}
        />

        <Dropdown
          placeholder="매진여부"
          size="sort"
          options={SOLDOUT_OPTIONS}
          value={isSoldOut}
          onChange={onIsSoldOutChange}
        />
      </div>
    </Modal>
  );
}
