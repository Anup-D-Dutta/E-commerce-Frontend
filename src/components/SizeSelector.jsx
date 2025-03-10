import { useState } from "react";
// import { Tooltip } from "@/components/ui/tooltip";

export default function SizeSelector() {
  const [selectedSize, setSelectedSize] = useState(null);
  const sizes = ['S', 'M', 'L', 'SL'];

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <span className="text-lg font-semibold">Shoe Size (UK)</span>
        <div content="View Size Chart">
          <a href="#" className=" text-blue-500 hover:text-blue-700">
            Size Chart
          </a>
        </div>
      </div>
      <div className="flex gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            className={`px-4 py-2 border-2 rounded-lg ${selectedSize === size ? "border-black bg-gray-200" : "border-gray-300"}`}
            onClick={() => handleSizeSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
}
