import React, { useRef, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// Child component with smooth expand/collapse
const ProductInformation = ({ title, content, isOpen, onToggle }) => {
  const contentRef = useRef(null);
  const [height, setHeight] = useState("0px");

  useEffect(() => {
    if (isOpen) {
      setHeight(`${contentRef.current.scrollHeight}px`);
    } else {
      setHeight("0px");
    }
  }, [isOpen]);

  return (
    <div className="border-b">
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold hover:bg-gray-100 transition"
        onClick={onToggle}
      >
        <span>{title}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <div
        ref={contentRef}
        style={{
          maxHeight: height,
        }}
        className="overflow-hidden transition-max-height duration-500 ease-in-out"
      >
        <div className="px-4 pb-4 text-gray-700">{content}</div>
      </div>
    </div>
  );
};

// Parent Accordion component
export default function Accordion({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="lg:w-[35rem] w-[19.5rem] md:w-[30rem] border rounded-md shadow-sm mt-5">

      <ProductInformation
        title="Product Details"
        content={
          <div>
            <p className="font-semibold">Details</p>
            <p className="text-base">{data?.details}</p>
          </div>
        }

        isOpen={openIndex === 0}
        onToggle={() => handleToggle(0)}
      />
      <ProductInformation
        title="Product Description"
        content={
          <div className="my-4 grid gap-3">
            <div>
              <p className="font-semibold">Description</p>
              <p className="text-base">{data?.description}</p>
            </div>
            {data?.more_details &&
              Object.keys(data.more_details).map((element, index) => (
                <div key={index}>
                  <p className="font-semibold">{element}</p>
                  <p className="text-base">{data.more_details[element]}</p>
                </div>
              ))}
          </div>
        }
        isOpen={openIndex === 1}
        onToggle={() => handleToggle(1)}
      />
      <ProductInformation
        title="Artist's Details"
        // content="Created by a local artist with over 10 years of experience."
        content={
          <div>
            <p className="font-semibold">Artist's details</p>
            <p className="text-base">{data?.artist_details}</p>
          </div>
        }
        isOpen={openIndex === 2}
        onToggle={() => handleToggle(2)}
      />
    </div>
  );
}
