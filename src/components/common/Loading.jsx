export default function Loading({ text = "로딩중..." }) {
  return (
    <div className="flex items-center justify-center">
      <p className="text-gray-300 text-[18px] font-medium">{text}</p>
    </div>
  );
}
