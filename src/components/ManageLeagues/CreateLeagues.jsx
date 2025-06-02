// import React, { useEffect, useState, useCallback } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaRegArrowAltCircleUp } from "react-icons/fa";
// import { toast } from "react-toastify";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/dark.css";
// import moment from "moment-timezone";
// import Portal from "../pages/Portal.jsx";
// import Location from "../global/Location";

// const CreateLeagues = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [localDate, setLocalDate] = useState("");
//   const [imageTypeDropdownOpen, setImageTypeDropdownOpen] = useState(false);
//   const [selectedImageType, setSelectedImageType] = useState("");
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [statusToggle, setStatusToggle] = useState(true);
//   const [data, setData] = useState({
//     name: "",
//     image_url: "",
//     status: "active",
//   });

//   const handleChange = useCallback((e) => {
//     const { name, value } = e.target;
//     setData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }, []);

//   const handleTeamChange = useCallback((team, e) => {
//     const { name, value } = e.target;
//     setData((prevState) => ({
//       ...prevState,
//       [team]: {
//         ...prevState[team],
//         [name]: value,
//       },
//     }));
//   }, []);

//   const handleDateChange = useCallback((selectedDates) => {
//     if (selectedDates.length > 0) {
//       const utcDate = moment(selectedDates[0]).utc();
//       setLocalDate(utcDate.toDate());
//       setData((prevData) => ({
//         ...prevData,
//         match_time: utcDate.toISOString(),
//       }));
//     }
//   }, []);

//   const scrollToTop = useCallback(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, []);

//   const toggleImageTypeDropdown = useCallback(() => {
//     setImageTypeDropdownOpen((prev) => !prev);
//   }, []);

//   const selectImageType = useCallback((type) => {
//     setSelectedImageType(type);
//     setImageTypeDropdownOpen(false);
//   }, []);

//   const toggleStatus = useCallback(() => {
//     setStatusToggle((prev) => !prev);
//     setData((prevData) => ({
//       ...prevData,
//       status: prevData.status === "active" ? "inactive" : "active",
//     }));
//   }, []);

//   const handleFileUpload = useCallback((e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setUploadedImage({
//         file: file,
//         name: file.name,
//         preview: URL.createObjectURL(file),
//       });
//     }
//   }, []);

//   const removeUploadedImage = useCallback(() => {
//     setUploadedImage(null);
//   }, []);

//   return (
//     <Portal>
//       <div className="relative w-full">
//         <div className="h-max w-[95%] mx-auto rounded-md p-3 border">
//           <h2 className="py-2">
//             <Location location={location} />
//           </h2>
//           <div className="rounded-md p-3 border bg-[#fafafa]">
//             <div className="w-full max-w-4xl mx-auto bg-white rounded-md shadow p-6">
//               {/* Name */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                   value={data.name}
//                   name="name"
//                   onChange={handleChange}
//                 />
//               </div>

//               {/* Image Type Dropdown */}
//               <div className="mb-4">
//                 <label className="block text-sm font-medium mb-1">
//                   Image Type
//                 </label>
//                 <div className="relative">
//                   <button
//                     type="button"
//                     className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
//                     onClick={toggleImageTypeDropdown}
//                   >
//                     <span>{selectedImageType || "Select One"}</span>
//                     <svg
//                       className="w-5 h-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M19 9l-7 7-7-7"
//                       ></path>
//                     </svg>
//                   </button>

//                   {imageTypeDropdownOpen && (
//                     <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
//                       <ul>
//                         <li
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                           onClick={() => selectImageType("Select One")}
//                         >
//                           Select One
//                         </li>
//                         <li
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                           onClick={() => selectImageType("Url")}
//                         >
//                           Url
//                         </li>
//                         <li
//                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                           onClick={() => selectImageType("Image")}
//                         >
//                           Image
//                         </li>
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Image Uploader */}
//               {selectedImageType === "Image" && (
//                 <div className="mb-4">
//                   {!uploadedImage ? (
//                     <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center bg-gray-50">
//                       <p className="text-gray-500 mb-2">
//                         Drag & Drop Image here
//                       </p>
//                       <p className="text-gray-400 mb-4">OR</p>
//                       <button
//                         type="button"
//                         onClick={() =>
//                           document.getElementById("fileInput").click()
//                         }
//                         className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
//                       >
//                         BROWSE FILE
//                       </button>
//                       <p className="text-gray-400 mt-4">Maximum Size: 1MB</p>
//                       <input
//                         id="fileInput"
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleFileUpload}
//                       />
//                     </div>
//                   ) : (
//                     <div className="flex items-center space-x-4 border p-2 rounded-md">
//                       <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
//                         <img
//                           src={uploadedImage.preview}
//                           alt="Thumbnail"
//                           className="w-full h-full object-cover"
//                         />
//                       </div>
//                       <span className="flex-1">{uploadedImage.name}</span>
//                       <button
//                         type="button"
//                         onClick={removeUploadedImage}
//                         className="p-2 bg-red-100 rounded-md text-red-500"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-5 w-5"
//                           viewBox="0 0 20 20"
//                           fill="currentColor"
//                         >
//                           <path
//                             fillRule="evenodd"
//                             d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                             clipRule="evenodd"
//                           />
//                         </svg>
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Status Toggle */}
//               <div className="mb-6">
//                 <label className="block text-sm font-medium mb-1">Status</label>
//                 <div className="flex items-center">
//                   <button
//                     type="button"
//                     onClick={toggleStatus}
//                     className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
//                       statusToggle ? "bg-purple-600" : "bg-gray-200"
//                     }`}
//                   >
//                     <span
//                       className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
//                         statusToggle ? "translate-x-6" : "translate-x-1"
//                       }`}
//                     />
//                   </button>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="flex justify-end">
//                 <button
//                   type="button"
//                   disabled={loading}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none disabled:opacity-50"
//                 >
//                   {loading ? "Creating..." : "CREATE"}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Scroll to Top Button */}
//         <FaRegArrowAltCircleUp
//           className="absolute h-6 w-6 bottom-3 right-2 text-[#00a6e5] transition cursor-pointer"
//           onClick={scrollToTop}
//         />
//       </div>
//     </Portal>
//   );
// };

// export default CreateLeagues;

import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { toast } from "react-toastify";
import "flatpickr/dist/themes/dark.css";
import moment from "moment-timezone";
import Portal from "../pages/Portal.jsx";
import Location from "../global/Location";

const CreateLeagues = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [localDate, setLocalDate] = useState("");
  const [imageTypeDropdownOpen, setImageTypeDropdownOpen] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [statusToggle, setStatusToggle] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [data, setData] = useState({
    name: "",
    image_url: "",
    status: "active",
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleTeamChange = useCallback((team, e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [team]: {
        ...prevState[team],
        [name]: value,
      },
    }));
  }, []);

  const handleDateChange = useCallback((selectedDates) => {
    if (selectedDates.length > 0) {
      const utcDate = moment(selectedDates[0]).utc();
      setLocalDate(utcDate.toDate());
      setData((prevData) => ({
        ...prevData,
        match_time: utcDate.toISOString(),
      }));
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const toggleImageTypeDropdown = useCallback(() => {
    setImageTypeDropdownOpen((prev) => !prev);
  }, []);

  const selectImageType = useCallback((type) => {
    setSelectedImageType(type);
    setImageTypeDropdownOpen(false);
  }, []);

  const toggleStatus = useCallback(() => {
    setStatusToggle((prev) => !prev);
    setData((prevData) => ({
      ...prevData,
      status: prevData.status === "active" ? "inactive" : "active",
    }));
  }, []);

  const handleFileUpload = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        // 1MB limit
        toast.error("File size exceeds 1MB limit");
        return;
      }

      setUploadedImage({
        file: file,
        name: file.name,
        preview: URL.createObjectURL(file),
      });

      // You would typically upload to server here
      // For now, just setting the preview URL to image_url field
      setData((prevData) => ({
        ...prevData,
        image_url: URL.createObjectURL(file),
      }));
    }
  }, []);

  const removeUploadedImage = useCallback(() => {
    if (uploadedImage && uploadedImage.preview) {
      URL.revokeObjectURL(uploadedImage.preview);
    }
    setUploadedImage(null);
    setData((prevData) => ({
      ...prevData,
      image_url: "",
    }));
  }, [uploadedImage]);

  // Drag and drop functionality
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragOver = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!dragging) {
        setDragging(true);
      }
    },
    [dragging]
  );

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      if (file.size > 1024 * 1024) {
        // 1MB limit
        toast.error("File size exceeds 1MB limit");
        return;
      }

      setUploadedImage({
        file: file,
        name: file.name,
        preview: URL.createObjectURL(file),
      });

      // You would typically upload to server here
      // For now, just setting the preview URL to image_url field
      setData((prevData) => ({
        ...prevData,
        image_url: URL.createObjectURL(file),
      }));
    }
  }, []);

  return (
    <Portal>
      <div className="relative w-full">
        <div className="h-max w-[95%] mx-auto rounded-md p-3 border">
          <h2 className="py-2">
            <Location location={location} />
          </h2>
          <div className="rounded-md p-3 border bg-[#fafafa]">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-md shadow p-6">
              {/* Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={data.name}
                  name="name"
                  onChange={handleChange}
                />
              </div>

              {/* Image Type Dropdown */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Image Type
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    onClick={toggleImageTypeDropdown}
                  >
                    <span>{selectedImageType || "Select One"}</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>

                  {imageTypeDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <ul>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectImageType("Select One")}
                        >
                          Select One
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectImageType("Url")}
                        >
                          Url
                        </li>
                        <li
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => selectImageType("Image")}
                        >
                          Image
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* URL Input */}
              {selectedImageType === "Url" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Image URL <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    placeholder="Enter image URL..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={data.image_url}
                    onChange={handleChange}
                  />
                  {data.image_url && (
                    <div className="mt-2">
                      <p className="text-sm font-medium mb-1">Preview:</p>
                      <div className="w-32 h-32 border rounded-md overflow-hidden">
                        <img
                          src={data.image_url}
                          alt="URL Preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src =
                              "https://via.placeholder.com/150?text=Invalid+URL";
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Image Uploader */}
              {selectedImageType === "Image" && (
                <div className="mb-4">
                  {!uploadedImage ? (
                    <div
                      className={`border-2 border-dashed ${
                        dragging
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-300 bg-gray-50"
                      } rounded-md p-6 text-center`}
                      onDragEnter={handleDragEnter}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      <p className="text-gray-500 mb-2">
                        Drag & Drop Image here
                      </p>
                      <p className="text-gray-400 mb-4">OR</p>
                      <button
                        type="button"
                        onClick={() =>
                          document.getElementById("fileInput").click()
                        }
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                      >
                        BROWSE FILE
                      </button>
                      <p className="text-gray-400 mt-4">Maximum Size: 1MB</p>
                      <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center space-x-4 border p-2 rounded-md">
                        <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                          <img
                            src={uploadedImage.preview}
                            alt="Thumbnail"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="flex-1 truncate">
                          {uploadedImage.name}
                        </span>
                        <button
                          type="button"
                          onClick={removeUploadedImage}
                          className="p-2 bg-red-100 rounded-md text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Status Toggle */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Status</label>
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={toggleStatus}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      statusToggle ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        statusToggle ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                  <span className="ml-2 text-sm">
                    {statusToggle ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={loading}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none disabled:opacity-50"
                >
                  {loading ? "Creating..." : "CREATE"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <FaRegArrowAltCircleUp
          className="absolute h-6 w-6 bottom-3 right-2 text-[#00a6e5] transition cursor-pointer"
          onClick={scrollToTop}
        />
      </div>
    </Portal>
  );
};

export default CreateLeagues;
