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
};

export const GRADE_LABEL_MAP = {
  COMMON: "COMMON",
  RARE: "RARE",
  SUPER_RARE: "SUPER RARE",
  LEGENDARY: "LEGENDARY",
};

export const SALE_STATUS_LABEL = {
  ON_SALE: "판매 중",
  SOLD_OUT: "판매 완료",
  CANCELED: "취소됨",
};

export const getGenreLabel = (genre) => GENRE_LABEL_MAP[genre] ?? genre;
export const getGradeLabel = (grade) => GRADE_LABEL_MAP[grade] ?? grade;
export const getSaleStatusLabel = (status) => SALE_STATUS_LABEL[status] ?? status;
