"use client";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="記事を検索..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full max-w-md px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
      />
    </div>
  );
}
