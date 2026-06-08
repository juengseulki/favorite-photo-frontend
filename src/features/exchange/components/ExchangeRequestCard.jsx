"use client";

import { ExchangeCard } from "@/components/common/Card";

export default function ExchangeRequestCard({ card, onAccept, onReject, disabled = false }) {
  return (
    <div className={disabled ? "pointer-events-none opacity-60" : ""}>
      <ExchangeCard card={card} onAccept={onAccept} onReject={onReject} />
    </div>
  );
}
