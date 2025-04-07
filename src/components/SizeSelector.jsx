import { useState } from "react";

export default function SizeSelector({ selectedSize, setSelectedSize }) {
  const sizes = ["S", "M", "L", "XL"];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">Please select a size.</span>
        <a href="#" className="text-blue-500 hover:text-blue-700">
          Size Chart
        </a>
      </div>
      <div className="flex gap-4 my-3">
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 border-2 rounded-lg ${
              selectedSize === size ? "border-black bg-gray-200" : "border-gray-300"
            }`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
