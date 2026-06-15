export default function QuantitySelector({ value, min = 1, max = 1, onChange }) {
  return (
    <div className="flex h-[50px] w-[176px] items-center border border-gray-200 bg-black text-white">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        className="h-full w-[50px] text-[20px] disabled:text-gray-400"
      >
        -
      </button>

      <span className="flex-1 text-center text-[20px]">{value}</span>

      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        className="h-full w-[50px] text-[20px] disabled:text-gray-400"
      >
        +
      </button>
    </div>
  );
}
