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
  },

  GALLERY: {
    ROOT: ["gallery"],
    MY_CARDS: (filters = {}) => [...QUERY_KEYS.GALLERY.ROOT, "my-cards", filters],
  },

  MARKET: {
    ROOT: ["market"],
    LIST: (filters = {}) => [...QUERY_KEYS.MARKET.ROOT, "list", filters],
    COUNTS: (filters = {}) => [...QUERY_KEYS.MARKET.ROOT, "counts", filters],
    DETAIL: (saleId) => [...QUERY_KEYS.MARKET.ROOT, "detail", saleId],
  },

  SALES: {
    ROOT: ["sales"],
    LIST: (filters = {}) => [...QUERY_KEYS.SALES.ROOT, "list", filters],
    DETAIL: (saleId) => [...QUERY_KEYS.SALES.ROOT, "detail", saleId],
    MY: (filters = {}) => [...QUERY_KEYS.SALES.ROOT, "my", filters],
  },

  EXCHANGES: {
    ROOT: ["exchanges"],
    LIST: (filters = {}) => [...QUERY_KEYS.EXCHANGES.ROOT, "list", filters],
    DETAIL: (exchangeId) => [...QUERY_KEYS.EXCHANGES.ROOT, "detail", exchangeId],
    RECEIVED: (filters = {}) => [...QUERY_KEYS.EXCHANGES.ROOT, "received", filters],
    SENT: (filters = {}) => [...QUERY_KEYS.EXCHANGES.ROOT, "sent", filters],
  },

  POINTS: {
    ROOT: ["points"],
    ME: () => [...QUERY_KEYS.POINTS.ROOT, "me"],
    HISTORY: (filters = {}) => [...QUERY_KEYS.POINTS.ROOT, "history", filters],
    RANDOM_BOX_STATUS: () => [...QUERY_KEYS.POINTS.ROOT, "random-box-status"],
  },

  NOTIFICATIONS: {
    ROOT: ["notifications"],
    LIST: () => [...QUERY_KEYS.NOTIFICATIONS.ROOT, "list"],
  },
};
