"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        duration: 3000,
        style: {
          background: "rgba(83, 83, 83, 0.80)",
          color: "#FFFFFF",
          border: "1px solid #5A5A5A",
          borderRadius: "99px",
        },
      }}
    />
  );
}
