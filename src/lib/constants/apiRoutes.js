export const API_ROUTES = {
  AUTH: {
    SIGNUP: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
    GOOGLE: "/auth/google",
    GOOGLE_COMPLETE: "/auth/google/complete",
  },
  CARDS: {
    BASE: "/cards",
    DETAIL: (cardId) => `/cards/${cardId}`,
  },
  SALES: {
    BASE: "/sales",
    DETAIL: (saleId) => `/sales/${saleId}`,
  },
  POINTS: {
    ME: "/points/me",
    HISTORIES: "/points/histories",
  },
  NOTIFICATIONS: {
    BASE: "/notifications",
  },
};
