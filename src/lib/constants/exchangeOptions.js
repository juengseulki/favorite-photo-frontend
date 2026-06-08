export const EXCHANGE_GRADE_OPTIONS = [
  { label: "COMMON", value: "COMMON" },
  { label: "RARE", value: "RARE" },
  { label: "SUPER RARE", value: "SUPER_RARE" },
  { label: "LEGENDARY", value: "LEGENDARY" },
];

export const EXCHANGE_GENRE_OPTIONS = [
  { label: "풍경", value: "LANDSCAPE" },
  { label: "인물", value: "PORTRAIT" },
  { label: "여행", value: "TRAVEL" },
  { label: "동물", value: "ANIMAL" },
  { label: "도시", value: "CITY" },
  { label: "기타", value: "ETC" },
];

export const EXCHANGE_FILTER_ALL = "ALL";

export const EXCHANGE_FILTER_OPTIONS = {
  grades: [{ label: "등급", value: EXCHANGE_FILTER_ALL }, ...EXCHANGE_GRADE_OPTIONS],
  genres: [{ label: "장르", value: EXCHANGE_FILTER_ALL }, ...EXCHANGE_GENRE_OPTIONS],
};

export const EXCHANGE_FORM_DEFAULT_VALUES = {
  quantity: 1,
  price: "",
  grade: "",
  genre: "",
  description: "",
};
