export default function QuantitySelector({ quantity, totalPrice, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-[16px]">
      <span className="text-[14px] text-gray-300">수량</span>

      <div className="flex items-center rounded-[2px] border border-gray-400">
        <button
          type="button"
          onClick={onDecrease}
          className="h-[40px] w-[40px] text-[18px] text-white transition hover:bg-gray-450"
        >
          −
        </button>

        <span className="w-[48px] text-center text-[16px] font-bold text-white">{quantity}</span>

        <button
          type="button"
          onClick={onIncrease}
          className="h-[40px] w-[40px] text-[18px] text-white transition hover:bg-gray-450"
        >
          +
        </button>
      </div>

      <span className="ml-auto text-[16px] font-bold text-white">{totalPrice} P</span>
    </div>
  );
}
