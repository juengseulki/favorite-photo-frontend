"use client";

import { ExchangeCard } from "@/components/common/Card";

const STATUS_LABELS = {
  pending: "대기중",
  accepted: "승인 완료",
  rejected: "거절 완료",
  canceled: "취소됨",
};

export default function ExchangeRequestCard({
  card,
  onAccept,
  onReject,
  disabled = false,
  status = "pending",
  statusLabel,
}) {
  const isActionable = status === "pending" && !disabled;
  const resolvedStatusLabel = statusLabel ?? STATUS_LABELS[status];

  return (
    <div className="space-y-3">
      {resolvedStatusLabel && (
        <div className="inline-flex border border-gray-400 px-3 py-1 text-[12px] font-bold text-gray-200">
          {resolvedStatusLabel}
        </div>
      )}

      <div className={!isActionable ? "pointer-events-none opacity-60" : ""}>
        <ExchangeCard
          card={card}
          onAccept={isActionable ? onAccept : undefined}
          onReject={isActionable ? onReject : undefined}
        />
      </div>
    </div>
  );
}
