export const QUERY_KEYS = {
  AUTH: {
    ROOT: ["auth"],
    ME: () => [...QUERY_KEYS.AUTH.ROOT, "me"],
  },

  USERS: {
    ROOT: ["users"],
    DETAIL: (userId) => [...QUERY_KEYS.USERS.ROOT, userId],
  },

  CARDS: {
    ROOT: ["cards"],

    LIST: (filters = {}) => [...QUERY_KEYS.CARDS.ROOT, "list", filters],

    DETAIL: (cardId) => [...QUERY_KEYS.CARDS.ROOT, "detail", cardId],

    MY_GALLERY: (userId, filters = {}) => [...QUERY_KEYS.CARDS.ROOT, "my-gallery", userId, filters],
  },

  SALES: {
    ROOT: ["sales"],

    LIST: (filters = {}) => [...QUERY_KEYS.SALES.ROOT, "list", filters],

    DETAIL: (saleId) => [...QUERY_KEYS.SALES.ROOT, "detail", saleId],

    MY_SHOP: (userId, filters = {}) => [...QUERY_KEYS.SALES.ROOT, "my-shop", userId, filters],
  },

  EXCHANGES: {
    ROOT: ["exchanges"],

    LIST: (filters = {}) => [...QUERY_KEYS.EXCHANGES.ROOT, "list", filters],

    DETAIL: (exchangeId) => [...QUERY_KEYS.EXCHANGES.ROOT, "detail", exchangeId],

    RECEIVED: (userId) => [...QUERY_KEYS.EXCHANGES.ROOT, "received", userId],

    SENT: (userId) => [...QUERY_KEYS.EXCHANGES.ROOT, "sent", userId],
  },

  POINTS: {
    ROOT: ["points"],

    ME: () => [...QUERY_KEYS.POINTS.ROOT, "me"],

    HISTORIES: (filters = {}) => [...QUERY_KEYS.POINTS.ROOT, "histories", filters],
  },

  NOTIFICATIONS: {
    ROOT: ["notifications"],

    LIST: (filters = {}) => [...QUERY_KEYS.NOTIFICATIONS.ROOT, "list", filters],

    UNREAD_COUNT: () => [...QUERY_KEYS.NOTIFICATIONS.ROOT, "unread-count"],
  },
};
