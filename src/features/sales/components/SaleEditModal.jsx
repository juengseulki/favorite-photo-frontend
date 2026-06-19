"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
const XIcon = ({ size = 22 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const ChevronDown = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const CheckIcon = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
import { CARD_GRADE_OPTIONS, CARD_GENRE_OPTIONS } from "@/lib/constants/cardOptions";
import styles from "./SaleEditModal.module.css";

function Dropdown({ label, value, options, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const selected = options.find((o) => o.value === value);

  return (
    <div className={styles.field}>
      <div className={styles.label}>{label}</div>
      <div className={styles.selectWrap} ref={ref}>
        <button
          type="button"
          className={`${styles.select} ${open ? styles.selectOpen : ""}`}
          aria-haspopup="listbox"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className={!selected ? styles.selectPlaceholder : ""}>
            {selected?.label ?? "선택"}
          </span>
          <ChevronDown className={open ? styles.chevronOpen : styles.chevron} size={18} />
        </button>

        {open && (
          <ul className={styles.menu} role="listbox">
            {options.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={opt.value === value}
                className={opt.value === value ? styles.optionSelected : styles.option}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
              >
                {opt.label}
                {opt.value === value && <CheckIcon size={16} />}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function SaleEditModal({ isOpen, onClose, onSubmit, sale, isSubmitting = false }) {
  const [price, setPrice] = useState(String(sale?.price ?? ""));
  const [exchangeGrade, setExchangeGrade] = useState(sale?.exchangeGrade ?? "");
  const [exchangeGenre, setExchangeGenre] = useState(sale?.exchangeGenre ?? "");
  const [exchangeDescription, setExchangeDescription] = useState(sale?.exchangeDescription ?? "");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit?.({
      photoCardId: sale?.cardId,
      data: {
        price: price ? Number(price) : undefined,
        exchangeGrade: exchangeGrade || undefined,
        exchangeGenre: exchangeGenre || undefined,
        exchangeDescription: exchangeDescription || undefined,
      },
    });
  };

  const onlyDigits = (setter) => (e) => setter(e.target.value.replace(/[^0-9]/g, ""));

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-label="판매 정보 수정"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className={styles.close} aria-label="닫기" onClick={onClose}>
          <XIcon size={22} />
        </button>

        <div className={styles.top}>
          <div className={styles.card}>
            {sale?.grade && <span className={styles.badge}>{sale.grade}</span>}
            {sale?.imageUrl ? (
              <Image
                src={sale.imageUrl}
                alt={sale.name ?? "포토카드"}
                fill
                className="object-cover"
              />
            ) : (
              <div className={styles.imagePlaceholder}>포토 카드 이미지</div>
            )}
          </div>

          <div className={styles.fields}>
            <div>
              <div className={styles.label}>총 판매 수량</div>
              <div className={styles.inputWrap}>
                <input
                  className={styles.inputReadonly}
                  value={sale?.totalQuantity ?? ""}
                  readOnly
                  aria-label="총 판매 수량"
                />
                <span className={styles.suffix}>장</span>
              </div>
            </div>

            <div>
              <div className={styles.label}>장당 가격</div>
              <div className={styles.inputWrap}>
                <input
                  className={styles.input}
                  inputMode="numeric"
                  value={price}
                  onChange={onlyDigits(setPrice)}
                  placeholder="0"
                  aria-label="장당 가격"
                />
                <span className={styles.suffix}>P</span>
              </div>
            </div>
          </div>
        </div>

        <h3 className={styles.sectionTitle}>교환 희망 정보</h3>
        <div className={styles.divider} />
        <div className={styles.row}>
          <Dropdown
            label="등급"
            value={exchangeGrade}
            options={CARD_GRADE_OPTIONS}
            onChange={setExchangeGrade}
          />
          <Dropdown
            label="장르"
            value={exchangeGenre}
            options={CARD_GENRE_OPTIONS}
            onChange={setExchangeGenre}
          />
        </div>

        <div>
          <div className={styles.label}>교환 희망 설명</div>
          <textarea
            className={styles.textarea}
            value={exchangeDescription}
            onChange={(e) => setExchangeDescription(e.target.value)}
            placeholder="원하는 교환 조건을 적어주세요"
            aria-label="교환 희망 설명"
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnCancel}
            onClick={onClose}
            disabled={isSubmitting}
          >
            취소하기
          </button>
          <button
            type="button"
            className={styles.btnSubmit}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "수정 중..." : "수정하기"}
          </button>
        </div>
      </div>
    </div>
  );
}
