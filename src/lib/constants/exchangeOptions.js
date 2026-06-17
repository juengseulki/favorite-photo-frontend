export const EXCHANGE_GRADE_OPTIONS = [
  { label: "COMMON", value: "COMMON" },
  { label: "RARE", value: "RARE" },
  { label: "SUPER RARE", value: "SUPER_RARE" },
  { label: "LEGENDARY", value: "LEGENDARY" },
];

export const EXCHANGE_GENRE_OPTIONS = [
  { label: "앨범", value: "ALBUM" },
  { label: "특전", value: "SPECIAL" },
  { label: "팬싸", value: "FAN_SIGN" },
  { label: "시즌그리팅", value: "SEASON_GREETING" },
  { label: "팬미팅", value: "FAN_MEETING" },
  { label: "콘서트", value: "CONCERT" },
  { label: "MD", value: "MD" },
  { label: "콜라보", value: "COLLAB" },
  { label: "팬클럽", value: "FANCLUB" },
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
