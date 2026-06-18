export default function QuantitySelector({ value, min = 1, max = 1, onChange }) {
  return (
    <div className="flex h-[45px] w-[120px] items-center border border-gray-200 bg-black text-white desktop:h-[50px] desktop:w-[176px]">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className="h-full w-[40px] text-[18px] disabled:text-gray-400 desktop:w-[50px] desktop:text-[20px]"
      >
        -
      </button>

      <span className="flex-1 text-center text-[16px] desktop:text-[20px]">{value}</span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className="h-full w-[40px] text-[18px] disabled:text-gray-400 desktop:w-[50px] desktop:text-[20px]"
      >
        +
      </button>
    </div>
  );
}
