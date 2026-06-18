export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  MARKET: "/market",
  MARKET_DETAIL: (saleId) => `/market/${saleId}`,
  MY_GALLERY: "/my-gallery",
  MY_SHOP: "/my-shop",
  MY_SHOP_DETAIL: (saleId) => `/my-shop/${saleId}`,
  CREATE_CARD: "/cards/create",
  LOGIN_REDIRECT: (redirectUrl) => `/login?redirect=${encodeURIComponent(redirectUrl)}`,
  NOTIFICATION: "/notification",
};
