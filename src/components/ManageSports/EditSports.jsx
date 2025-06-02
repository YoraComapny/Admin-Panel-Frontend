import { useState, useEffect } from "react";
import { updateSportsType } from "../../Api";

function EditSports({ isOpen, onClose, sportData }) {
  const [name, setName] = useState("");
  const [skq, setSkq] = useState("");
  const [status, setStatus] = useState(true);

  // Load the sport data when the modal opens or sportData changes
  useEffect(() => {
    if (sportData) {
      setName(sportData.name || "");
      setSkq(sportData.skq || "");
      setStatus(sportData.status !== undefined ? sportData.status : true);
    }
  }, [sportData, isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!sportData?._id) {
        console.error("No sport ID found");
        return;
      }

      await updateSportsType(sportData._id, { name, skq, status });
      onClose();
    } catch (error) {
      console.error("error", error?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Edit Sports Type</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-gray-500"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block font-medium">
              Sports Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter sports name"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">
              Sports SKQ <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={skq}
              readOnly
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
              placeholder="Auto-generated SKQ"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Status</label>
            <button
              type="button"
              onClick={() => setStatus(!status)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                status ? "bg-purple-600" : "bg-gray-200"
              }`}
            >
              <span
                className={`${
                  status ? "translate-x-6" : "translate-x-1"
                } inline-block h-4 w-4 transform rounded-full bg-white transition`}
              />
              {status && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute left-1 h-4 w-4 text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="p-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="w-full sm:w-auto py-1 px-4 text-sm uppercase bg-[#00a4e6] text-[#d4e2f2] rounded-sm hover:bg-[#00a4e9] transition active:scale-95 font-normal"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditSports;
