export const ERROR_MESSAGES = {
  // 공통
  DEFAULT: "문제가 발생했습니다. 다시 시도해 주세요.",
  NETWORK: "네트워크 연결을 확인해 주세요.",
  REQUIRED: "필수 입력 항목입니다.",

  // 로그인
  EMAIL_REQUIRED: "이메일을 입력해 주세요.",
  PASSWORD_REQUIRED: "비밀번호를 입력해 주세요.",
  INVALID_EMAIL: "유효한 이메일을 입력해 주세요.",
  LOGIN_FAILED: "이메일 또는 비밀번호가 일치하지 않습니다.",
  LOGIN_FAILED_GENERIC: "로그인에 실패했습니다.",
  OAUTH_FAILED: "소셜 로그인에 실패했습니다. 다시 시도해 주세요.",

  // 회원가입
  NICKNAME_REQUIRED: "닉네임을 입력해 주세요.",
  NICKNAME_LENGTH: "닉네임은 2자 이상 12자 이하로 입력해 주세요.",
  PASSWORD_MIN_LENGTH: "비밀번호는 8자 이상 입력해 주세요.",
  PASSWORD_CONFIRM_REQUIRED: "비밀번호 확인을 입력해 주세요.",
  PASSWORD_NOT_MATCH: "비밀번호가 일치하지 않습니다.",
  SIGNUP_FAILED: "회원가입에 실패했습니다.",

  // 포토카드
  CARD_NAME_REQUIRED: "포토카드 이름을 입력해 주세요.",
  CARD_IMAGE_REQUIRED: "이미지를 등록해 주세요.",
  CARD_GRADE_REQUIRED: "등급을 선택해 주세요.",
  CARD_GENRE_REQUIRED: "장르를 선택해 주세요.",
  CARD_PRICE_REQUIRED: "가격을 입력해 주세요.",
  CARD_QUANTITY_REQUIRED: "수량을 입력해 주세요.",

  // 판매
  SALE_CREATE_FAILED: "판매 등록에 실패했습니다.",
  SALE_UPDATE_FAILED: "판매 수정에 실패했습니다.",
  SALE_DELETE_FAILED: "판매 취소에 실패했습니다.",

  // 구매
  PURCHASE_SUCCESS: "구매가 완료되었습니다.",
  PURCHASE_FAILED: "구매에 실패했습니다.",
  NOT_ENOUGH_POINT: "포인트가 부족합니다.",

  // 교환
  EXCHANGE_REQUEST_SUCCESS: "교환 제안이 완료되었습니다.",
  EXCHANGE_REQUEST_FAILED: "교환 제안에 실패했습니다.",

  // 파일
  FILE_SIZE: "파일 용량을 확인해 주세요.",
  FILE_TYPE: "지원하지 않는 파일 형식입니다.",
};
