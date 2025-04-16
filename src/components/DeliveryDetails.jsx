
import { useState } from "react";
import { CheckCircle, Truck } from "lucide-react";

export default function DeliveryDetails() {
  const [pincode, setPincode] = useState("");
  const [status, setStatus] = useState(""); // "success", "error", "invalid"
  const [message, setMessage] = useState("");

//   const serviceablePincodes = ["110001", "560001", "400001", "600001", "700001"]; // example
  const serviceablePincodes = ["828207", "828204", "828201", "708520", "700001"]; // example list

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPincode(value);
      setStatus("");
      setMessage("");
    }
  };

  const handleCheck = () => {
    if (pincode.length !== 6) {
      setStatus("invalid");
      setMessage("Please enter a valid 6-digit pincode.");
    } else if (serviceablePincodes.includes(pincode)) {
      setStatus("success");
    } else {
      setStatus("error");
      setMessage("Delivery is not serviceable at this Pincode.");
    }
  };

  // Calculate delivery date (+7 days from today)
  const estimatedDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + 7);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-md">
      <h1 className="text-lg font-semibold mb-2">Delivery Details</h1>

      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-full mb-">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Enter Pincode"
          value={pincode}
          onChange={handleChange}
          className="flex-1 px-4 py-2 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button
          onClick={handleCheck}
          className="px-4 py-2 text-black font-bold hover:underline"
        >
          CHECK
        </button>
      </div>

      {/* Messages */}
      {status === "invalid" && (
        <p className="mt-2 text-sm text-red-500">{message}</p>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-500">{message}</p>
      )}

      {status === "success" && (
        <div className="mt-3 space-y-2 mb-5">
          <div className="flex items-center text-green-600 text-md">
            <CheckCircle className="w-4 h-4 mr-2" />
            Cash on delivery is available
          </div>
          <div className="flex items-center text-gray-700 text-md">
            <Truck className="w-4 h-4 mr-2" />
            Estimated Delivery by {estimatedDeliveryDate()}
          </div>
        </div>
      )}
    </div>
  );
}
