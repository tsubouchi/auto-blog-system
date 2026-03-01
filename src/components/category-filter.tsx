"use client";

interface Props {
  categories: string[];
  selected: string;
  onSelect: (cat: string) => void;
}

export function CategoryFilter({ categories, selected, onSelect }: Props) {
  const all = ["ALL", ...categories];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {all.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
            selected === cat
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
