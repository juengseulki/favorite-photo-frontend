export const API_ROUTES = {
  AUTH: {
    SIGNUP: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    GOOGLE: "/auth/google",
    KAKAO: "/auth/kakao",
    NAVER: "/auth/naver",
    OAUTH_COMPLETE: "/auth/oauth/complete",
  },

  CARDS: {
    BASE: "/cards",
    DETAIL: (cardId) => `/cards/${cardId}`,
  },

  GALLERY: {
    MY_CARDS: "/me/cards",
  },

  MARKET: {
    BASE: "/market/cards",
    DETAIL: (saleId) => `/market/cards/${saleId}`,
    PURCHASE: (saleId) => `/market/cards/${saleId}/purchase`,
  },

  SALES: {
    BASE: "/sales",
    MY: "/me/sales",
    DETAIL: (saleId) => `/sales/${saleId}`,
  },

  EXCHANGE: {
    BASE: "/exchange-proposals",
    ACCEPT: (proposalId) => `/exchange-proposals/${proposalId}/accept`,
    REJECT: (proposalId) => `/exchange-proposals/${proposalId}/reject`,
    CANCEL: (proposalId) => `/exchange-proposals/${proposalId}/cancel`,
  },

  POINTS: {
    ME: "/points/me",
    HISTORY: "/points/history",
    HISTORIES: "/points/history",
    RANDOM_BOX_STATUS: "/points/random-box/status",
    RANDOM_BOX: "/points/random-box",
  },

  NOTIFICATIONS: {
    BASE: "/notifications",
    READ: (notificationId) => `/notifications/${notificationId}/read`,
    READ_ALL: "/notifications/read-all",
  },

  UPLOAD: {
    IMAGE: "/upload/image",
  },
};
