export const MARKET_FILTER_ALL = "";

export const MARKET_SOLD_OUT_OPTIONS = [
  { label: "매진 여부", value: "" },
  { label: "판매 중", value: "ON_SALE" },
  { label: "판매 완료", value: "SOLD_OUT" },
];

export const MARKET_GRADE_OPTIONS = [
  { label: "등급 전체", value: MARKET_FILTER_ALL },
  { label: "COMMON", value: "COMMON" },
  { label: "RARE", value: "RARE" },
  { label: "SUPER RARE", value: "SUPER_RARE" },
  { label: "LEGENDARY", value: "LEGENDARY" },
];

export const MARKET_GENRE_OPTIONS = [
  { label: "장르 전체", value: MARKET_FILTER_ALL },
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

export const MARKET_SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "낮은 가격순", value: "priceAsc" },
  { label: "높은 가격순", value: "priceDesc" },
];

export const GENRE_LABEL_MAP = {
  ALBUM: "앨범",
  SPECIAL: "특전",
  FAN_SIGN: "팬싸",
  SEASON_GREETING: "시즌그리팅",
  FAN_MEETING: "팬미팅",
  CONCERT: "콘서트",
  MD: "MD",
  COLLAB: "콜라보",
  FANCLUB: "팬클럽",
  ETC: "기타",
  // 구 데이터 호환
  LANDSCAPE: "풍경",
  PORTRAIT: "인물",
  TRAVEL: "여행",
  ANIMAL: "동물",
  CITY: "도시",
};

export const getGenreLabel = (genre) => GENRE_LABEL_MAP[genre] ?? genre;
