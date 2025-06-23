// import { useState } from "react";
// import Location from "../global/Location";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import SunEditor from "suneditor-react";
// import "../../../node_modules/suneditor/dist/css/suneditor.min.css";
// import { createNews } from "../../Api";
// import { toast } from "react-toastify";
// import Portal from "../pages/Portal";

// const AddNews = () => {
//   const location = useLocation();
//   // Creating a state to check if title input exists
//   const [file, setFile] = useState("");
//   const [sourceType, setSourceType] = useState("");
//   const [isClicked, setIsClicked] = useState(false);
//   const [imageType, setImageType] = useState("");

//   // Get current date and format it
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toLocaleString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true, // Include AM/PM indicator
//     });
//   };

//   const [data, setData] = useState({
//     title: "",
//     category: "",
//     source_type: {
//       other: {
//         source_name: "",
//         source_url: "",
//       },
//       own: {
//         my_article: "",
//       },
//     },
//     image_url: "",
//     publish_date: getCurrentDateTime(), // Set current date by default
//     status: "",
//   });

//   const [dragging, setDragging] = useState(false);
//   const navigate = useNavigate();

//   // Handle Drag enter
//   const handleDragEnter = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragging(true);
//   };

//   const handleDragLeave = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragging(false);
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragging(false);

//     const files = Array.from(e.dataTransfer.files);
//     setFile(files[0]);
//   };

//   const handleSourceTypeChange = (event) => {
//     setSourceType(event.target.value);
//   };

//   const handleImageTypeChange = (event) => {
//     setImageType(event.target.value);
//   };

//   const handlefile = (event) => {
//     const file = event.target.files[0];
//     setFile(file);

//     // Log the file to ensure it's being captured correctly
//     console.log("Selected file:", file);

//     // If you're uploading to Cloudinary, you can log the Cloudinary URL here
//     // Assuming you have a function to upload to Cloudinary
//     uploadToCloudinary(file).then((url) => {
//       console.log("Cloudinary URL:", url);
//       setData({ ...data, image_url: url });
//     });
//   };

//   // Function to submit form data
//   const handleSubmit = (data) => {
//     // event.preventDefault();

//     // Create a new FormData object
//     const formData = new FormData();

//     // Append each field in the data object to the formData
//     for (let key in data) {
//       if (key === "source_type") {
//         // Traverse through the nested source_type object
//         for (let nestedKey in data[key]) {
//           for (let nestedField in data[key][nestedKey]) {
//             formData.append(
//               `source_type[${nestedKey}][${nestedField}]`,
//               data[key][nestedKey][nestedField]
//             );
//           }
//         }
//       } else {
//         // Append other fields directly
//         formData.append(key, data[key]);
//       }
//     }
//     if (file) formData.append("file", file);

//     return formData;
//   };

//   const handleNews = async (e, values) => {
//     e.preventDefault();
//     setIsClicked(true);

//     try {
//       let res;
//       if (values?.image_url) {
//         res = await createNews(values);
//       } else {
//         res = await createNews(handleSubmit(values));
//       }

//       if (res?.data?.success) {
//         toast.success(`${res.data?.message}`, {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         navigate("/admin/news"); // Redirect to the news page after successful creation
//       }
//     } catch (error) {
//       console.error("Error creating news:", error);
//       toast.error("Failed to create news. Please try again.");
//     }
//   };

//   const handleSourceTypeValue = (type, field, value) => {
//     setData((prevData) => ({
//       ...prevData,
//       source_type: {
//         ...prevData.source_type,
//         [type]: {
//           ...prevData.source_type[type],
//           [field]: value,
//         },
//       },
//     }));
//   };

//   const handleEditorChange = (content) => {
//     setData({
//       ...data,
//       source_type: {
//         ...data.source_type,
//         own: {
//           ...data.source_type.own,
//           my_article: content, // Update my_article with editContent
//         },
//       },
//     });
//   };

//   return (
//     <>
//       <Portal>
//         <div className="bg-gray-100 min-h-screen p-3">
//           <div className="w-[95%] m-1 mx-auto">
//             <Location location={location} />
//           </div>
//           <div className="bg-white rounded-md shadow-md w-[95%] mx-auto p-5">
//             <h2 className="font-semibold text-lg">Create a News Article</h2>
//             <form className="mt-2 p-2 w-full">
//               {/*Title Field*/}
//               <div className="my-2 font-semibold text-sm">
//                 <div className="flex gap-3 items-center">
//                   <label htmlFor="title">
//                     Title <span className="text-red-600">*</span>
//                   </label>
//                   {data.title.trim() === "" && (
//                     <p className="text-red-600 text-xs">{`(Required)`}</p>
//                   )}
//                 </div>
//                 <input
//                   type="text"
//                   name="title"
//                   placeholder="Type something here..."
//                   className="mt-1 w-full bg-white border border-gray-300 text-gray-700 py-[.435rem] px-2 rounded outline-blue-400"
//                   value={data.title}
//                   onChange={(e) => setData({ ...data, title: e.target.value })}
//                 />
//               </div>
//               {/*category and source type*/}
//               <div className="flex gap-5 text-sm">
//                 <div className="font-semibold w-full">
//                   <label htmlFor="category">
//                     Category <span className="text-red-600">*</span>
//                   </label>
//                   {/*category*/}
//                   <div className="relative w-full my-2 text-sm cursor-pointer">
//                     <select
//                       name="category"
//                       onChange={(e) =>
//                         setData({ ...data, category: e.target.value })
//                       }
//                       className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                     >
//                       <option value="">Select One</option>
//                       <option value="Champions League">
//                         UEFA Champions League
//                       </option>
//                       <option value="Premier League">Premier League</option>
//                       <option value="La Liga">La Liga</option>
//                     </select>
//                     <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
//                       <svg
//                         className="h-4 w-4 text-gray-500"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//                 {/*source type*/}
//                 <div className="font-semibold w-full">
//                   <label htmlFor="source-type">
//                     Source Type <span className="text-red-600">*</span>
//                   </label>
//                   <div className="relative my-2 text-sm cursor-pointer">
//                     <select
//                       className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                       value={sourceType}
//                       onChange={handleSourceTypeChange}
//                     >
//                       <option value="">Select One</option>
//                       <option value="Own">Own</option>
//                       <option value="Others">Others</option>
//                     </select>
//                     <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
//                       <svg
//                         className="h-4 w-4 text-gray-500"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Other source fields, only visble if you select source type: others */}
//               <div>
//                 {/* Fields for Image URL Image Drag and Drop */}
//                 {sourceType === "Others" ? (
//                   <div className="mt-3 flex flex-col gap-3">
//                     {/* Source name and url fields */}
//                     <div className="flex gap-5 text-sm">
//                       <div className="font-semibold w-full">
//                         <label htmlFor="title">
//                           Source Name <span className="text-red-600">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={data.source_type.other.source_name}
//                           onChange={(e) =>
//                             handleSourceTypeValue(
//                               "other",
//                               "source_name",
//                               e.target.value
//                             )
//                           }
//                           className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
//                           placeholder="Source: Own"
//                           required
//                         />
//                       </div>
//                       <div className="font-semibold w-full">
//                         <label htmlFor="title">
//                           Source URL <span className="text-red-600">*</span>
//                         </label>
//                         <input
//                           type="text"
//                           value={data.source_type.other.source_url}
//                           onChange={(e) =>
//                             handleSourceTypeValue(
//                               "other",
//                               "source_url",
//                               e.target.value
//                             )
//                           }
//                           className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
//                           placeholder="Enter source url here..."
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ) : sourceType === "Own" ? (
//                   <div className="my-2">
//                     <label className="font-semibold text-sm">
//                       Write Article
//                     </label>
//                     <SunEditor
//                       onChange={handleEditorChange}
//                       setOptions={{
//                         buttonList: [
//                           ["undo", "redo"],
//                           ["bold", "underline", "italic", "strike"],
//                           ["fontColor", "hiliteColor"],
//                           ["align", "list"],
//                           ["link", "image"],
//                           ["fullScreen", "showBlocks", "codeView"],
//                         ],
//                       }}
//                     />
//                   </div>
//                 ) : (
//                   ""
//                 )}
//               </div>
//               {/* News image type select fields */}
//               <div className="my-3 font-semibold w-full text-sm">
//                 <div className="flex gap-2 items-center">
//                   <label htmlFor="category">
//                     News Image Type <span className="text-red-600">*</span>
//                   </label>
//                   {!imageType && (
//                     <p className="text-red-600 text-xs">{`(Required)`}</p>
//                   )}
//                 </div>
//                 <div className="relative text-sm cursor-pointer">
//                   <select
//                     className="my-2 block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//                     value={imageType}
//                     onChange={handleImageTypeChange}
//                   >
//                     <option value="">Select One</option>
//                     <option value="url">URL</option>
//                     <option value="image">Image</option>
//                   </select>
//                   <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
//                     <svg
//                       className="h-4 w-4 text-gray-500"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M19 9l-7 7-7-7"
//                       />
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//               {/* URL / Image type fields */}
//               {imageType === "url" ? (
//                 <div className="font-semibold text-sm">
//                   <label htmlFor="title">
//                     Image URL <span className="text-red-600">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="image_url"
//                     placeholder="Type something here..."
//                     className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
//                     onChange={(e) =>
//                       setData({ ...data, image_url: e.target.value })
//                     }
//                   />
//                 </div>
//               ) : imageType === "image" ? (
//                 <div
//                   id="drag-and-drop"
//                   className="w-full bg-white rounded-md p-2 flex flex-col gap-2"
//                 >
//                   <h2 className="text-sm font-semibold">
//                     Upload Image <span className="text-red-600">*</span>
//                   </h2>
//                   <div
//                     className={`w-full flex justify-center transition-all items-center border-2 border-dashed border-gray-400 rounded-md ${
//                       dragging ? "bg-blue-400" : "bg-blue-200"
//                     }`}
//                     onDragEnter={handleDragEnter}
//                     onDragOver={handleDragOver}
//                     onDragLeave={handleDragLeave}
//                     onDrop={handleDrop}
//                   >
//                     <div className="flex flex-col justify-center items-center gap-2 p-2">
//                       <h4 className="text-sm font-semibold text-gray-600">
//                         Drag & Drop Image here
//                       </h4>
//                       <p className="text-gray-400 text-center">OR</p>
//                       <input
//                         type="file"
//                         name="file"
//                         onChange={(e) => handlefile(e)}
//                         id="filename"
//                         className="text-sm text-white bg-blue-600 hover:bg-blue-800 rounded-md p-1 w-3/4 "
//                       />
//                       <p className="text-xs text-orange-500 text-center">
//                         Maximum Size: 1MB
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 ""
//               )}
//               {/* Publish Date and other Fields */}
//               <div className="mt-3 flex gap-5 text-sm">
//                 {/* Publish Date of article - Now non-editable with current date */}
//                 <div className="font-semibold text-sm w-full">
//                   <label htmlFor="publish-date">
//                     Publish Date <span className="text-red-600">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     value={data.publish_date}
//                     readOnly
//                     className="mt-2 border-2 border-gray-300 bg-gray-100 cursor-not-allowed w-full py-[.435rem] font-normal px-2 rounded text-gray-600"
//                     placeholder="Current date will be set automatically"
//                   />
//                   <p className="text-xs text-gray-500 mt-1">
//                     This field is automatically set to current date and time
//                   </p>
//                 </div>
//                 {/* Status of article*/}
//                 <div className="font-semibold w-full">
//                   <label htmlFor="status">
//                     Status <span className="text-red-600">*</span>
//                   </label>
//                   <div className="relative my-2 text-sm cursor-pointer">
//                     <select
//                       name="status"
//                       onChange={(e) =>
//                         setData({ ...data, status: e.target.value })
//                       }
//                       className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight outline-blue-400"
//                     >
//                       <option value="">Select One</option>
//                       <option value="active">Active</option>
//                       <option value="inactive">Inactive</option>
//                     </select>
//                     <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
//                       <svg
//                         className="h-4 w-4 text-gray-500"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Create Button */}
//               <div className="my-2 w-full flex justify-end">
//                 <Link
//                   disabled={isClicked}
//                   onClick={(e) => handleNews(e, data)}
//                   className=" px-3 py-2 font-semibold text-sm text-white rounded-md shadow cursor-pointer transition-colors bg-green-600 hover:bg-green-900"
//                 >
//                   Create News
//                 </Link>
//               </div>
//             </form>
//           </div>
//         </div>
//       </Portal>
//     </>
//   );
// };

// export default AddNews;

"use client";

import { useState } from "react";
import Location from "../global/Location";
import { useLocation, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createNews } from "../../Api";
import { toast } from "react-toastify";
import Portal from "../pages/Portal";

const AddNews = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Form states
  const [file, setFile] = useState(null);
  const [sourceType, setSourceType] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [imageType, setImageType] = useState("");
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  // Get current date and format it
  const getCurrentDateTime = () => {
    const now = new Date();
    return now.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const [data, setData] = useState({
    title: "",
    category: "",
    source_type: {
      other: {
        source_name: "",
        source_url: "",
      },
      own: {
        my_article: "",
      },
    },
    image_url: "",
    publish_date: getCurrentDateTime(),
    status: "",
  });

  // Utility function to strip HTML tags for validation
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    const textContent = tempDiv.textContent || tempDiv.innerText || "";
    return textContent.trim();
  };

  // Clear specific error when user starts typing
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  // Comprehensive validation function
  const validateForm = () => {
    const newErrors = {};

    // Basic field validations
    if (!data.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!data.category) {
      newErrors.category = "Category is required";
    }

    if (!sourceType) {
      newErrors.sourceType = "Source type is required";
    }

    if (!imageType) {
      newErrors.imageType = "Image type is required";
    }

    if (!data.status) {
      newErrors.status = "Status is required";
    }

    // Source type specific validations
    if (sourceType === "Others") {
      if (!data.source_type.other.source_name.trim()) {
        newErrors.source_name = "Source name is required";
      }
      if (!data.source_type.other.source_url.trim()) {
        newErrors.source_url = "Source URL is required";
      }
      // Validate URL format
      if (data.source_type.other.source_url.trim()) {
        const urlPattern =
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!urlPattern.test(data.source_type.other.source_url.trim())) {
          newErrors.source_url = "Please enter a valid URL";
        }
      }
    } else if (sourceType === "Own") {
      const articleText = stripHtmlTags(data.source_type.own.my_article);
      if (!articleText.trim()) {
        newErrors.my_article = "Article content is required";
      }
    }

    // Image validations
    if (imageType === "url") {
      if (!data.image_url.trim()) {
        newErrors.image_url = "Image URL is required";
      } else {
        // Validate image URL format
        const imageUrlPattern = /\.(jpg|jpeg|png|gif|bmp|webp)$/i;
        const generalUrlPattern =
          /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
        if (!generalUrlPattern.test(data.image_url.trim())) {
          newErrors.image_url = "Please enter a valid URL";
        }
      }
    } else if (imageType === "image") {
      if (!file) {
        newErrors.image_file = "Please select an image file";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Drag enter
  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const selectedFile = files[0];
      if (selectedFile.type.startsWith("image/")) {
        if (selectedFile.size > 1024 * 1024) {
          toast.error("File size should not exceed 1MB");
          return;
        }
        setFile(selectedFile);
        handleFilePreview(selectedFile);
        clearError("image_file");
      } else {
        toast.error("Please select an image file");
      }
    }
  };

  const handleSourceTypeChange = (event) => {
    const newSourceType = event.target.value;
    setSourceType(newSourceType);
    clearError("sourceType");

    // Clear opposite source type data
    if (newSourceType === "Own") {
      setData((prev) => ({
        ...prev,
        source_type: {
          ...prev.source_type,
          other: { source_name: "", source_url: "" },
        },
      }));
    } else if (newSourceType === "Others") {
      setData((prev) => ({
        ...prev,
        source_type: {
          ...prev.source_type,
          own: { my_article: "" },
        },
      }));
    }
  };

  const handleImageTypeChange = (event) => {
    const newImageType = event.target.value;
    setImageType(newImageType);
    clearError("imageType");

    // Clear opposite image data
    if (newImageType === "url") {
      setFile(null);
      setImagePreview("");
    } else if (newImageType === "image") {
      setData((prev) => ({ ...prev, image_url: "" }));
      setImagePreview("");
    }
  };

  // Handle file preview
  const handleFilePreview = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handlefile = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) {
        toast.error("File size should not exceed 1MB");
        return;
      }
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please select an image file");
        return;
      }
      setFile(selectedFile);
      handleFilePreview(selectedFile);
      clearError("image_file");
      console.log("Selected file:", selectedFile);
    }
  };

  // Function to submit form data
  const handleSubmit = (data) => {
    const formData = new FormData();

    // Append each field in the data object to the formData
    for (const key in data) {
      if (key === "source_type") {
        // Traverse through the nested source_type object
        for (const nestedKey in data[key]) {
          for (const nestedField in data[key][nestedKey]) {
            formData.append(
              `source_type[${nestedKey}][${nestedField}]`,
              data[key][nestedKey][nestedField]
            );
          }
        }
      } else {
        // Append other fields directly
        formData.append(key, data[key]);
      }
    }
    if (file) formData.append("file", file);

    return formData;
  };

  const handleNews = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix all validation errors before submitting");
      // Scroll to first error
      const firstErrorElement = document.querySelector(".border-red-500");
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
      return;
    }

    setIsClicked(true);

    try {
      let res;
      if (imageType === "url" || !file) {
        res = await createNews(data);
      } else {
        res = await createNews(handleSubmit(data));
      }

      if (res?.data?.success) {
        toast.success(res.data?.message || "News created successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/admin/news");
      } else {
        toast.error(res?.data?.message || "Failed to create news");
      }
    } catch (error) {
      console.error("Error creating news:", error);
      toast.error("Failed to create news. Please try again.");
    } finally {
      setIsClicked(false);
    }
  };

  const handleSourceTypeValue = (type, field, value) => {
    setData((prevData) => ({
      ...prevData,
      source_type: {
        ...prevData.source_type,
        [type]: {
          ...prevData.source_type[type],
          [field]: value,
        },
      },
    }));
    clearError(field);
  };

  const handleEditorChange = (content) => {
    setData({
      ...data,
      source_type: {
        ...data.source_type,
        own: {
          ...data.source_type.own,
          my_article: content,
        },
      },
    });
    clearError("my_article");
  };

  // ReactQuill modules configuration
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "list",
    "bullet",
    "align",
    "link",
    "image",
  ];

  // Error message component
  const ErrorMessage = ({ error }) => {
    if (!error) return null;
    return <p className="text-red-500 text-xs mt-1">{error}</p>;
  };

  return (
    <>
      <Portal>
        <div className="bg-gray-100 min-h-screen p-3">
          <div className="w-[95%] m-1 mx-auto">
            <Location location={location} />
          </div>
          <div className="bg-white rounded-md shadow-md w-[95%] mx-auto p-5">
            <h2 className="font-semibold text-lg">Create a News Article</h2>
            <form className="mt-2 p-2 w-full" onSubmit={handleNews}>
              {/*Title Field*/}
              <div className="my-2 font-semibold text-sm">
                <div className="flex gap-3 items-center">
                  <label htmlFor="title">
                    Title <span className="text-red-600">*</span>
                  </label>
                  {errors.title && (
                    <span className="text-red-600 text-xs">
                      ({errors.title})
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  name="title"
                  placeholder="Type something here..."
                  className={`mt-1 w-full bg-white border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } text-gray-700 py-[.435rem] px-2 rounded outline-blue-400`}
                  value={data.title}
                  onChange={(e) => {
                    setData({ ...data, title: e.target.value });
                    clearError("title");
                  }}
                />
              </div>

              {/*category and source type*/}
              <div className="flex gap-5 text-sm">
                <div className="font-semibold w-full">
                  <div className="flex gap-2 items-center">
                    <label htmlFor="category">
                      Category <span className="text-red-600">*</span>
                    </label>
                    {errors.category && (
                      <span className="text-red-600 text-xs">
                        ({errors.category})
                      </span>
                    )}
                  </div>
                  {/*category*/}
                  <div className="relative w-full my-2 text-sm cursor-pointer">
                    <select
                      name="category"
                      value={data.category}
                      onChange={(e) => {
                        setData({ ...data, category: e.target.value });
                        clearError("category");
                      }}
                      className={`block appearance-none w-full bg-white border ${
                        errors.category ? "border-red-500" : "border-gray-300"
                      } text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
                    >
                      <option value="">Select One</option>
                      <option value="Champions League">
                        UEFA Champions League
                      </option>
                      <option value="Premier League">Premier League</option>
                      <option value="La Liga">La Liga</option>
                    </select>
                    <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                {/*source type*/}
                <div className="font-semibold w-full">
                  <div className="flex gap-2 items-center">
                    <label htmlFor="source-type">
                      Source Type <span className="text-red-600">*</span>
                    </label>
                    {errors.sourceType && (
                      <span className="text-red-600 text-xs">
                        ({errors.sourceType})
                      </span>
                    )}
                  </div>
                  <div className="relative my-2 text-sm cursor-pointer">
                    <select
                      className={`block appearance-none w-full bg-white border ${
                        errors.sourceType ? "border-red-500" : "border-gray-300"
                      } text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
                      value={sourceType}
                      onChange={handleSourceTypeChange}
                    >
                      <option value="">Select One</option>
                      <option value="Own">Own</option>
                      <option value="Others">Others</option>
                    </select>
                    <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other source fields, only visible if you select source type: others */}
              <div>
                {/* Fields for Image URL Image Drag and Drop */}
                {sourceType === "Others" ? (
                  <div className="mt-3 flex flex-col gap-3">
                    {/* Source name and url fields */}
                    <div className="flex gap-5 text-sm">
                      <div className="font-semibold w-full">
                        <div className="flex gap-2 items-center">
                          <label htmlFor="title">
                            Source Name <span className="text-red-600">*</span>
                          </label>
                          {errors.source_name && (
                            <span className="text-red-600 text-xs">
                              ({errors.source_name})
                            </span>
                          )}
                        </div>
                        <input
                          type="text"
                          value={data.source_type.other.source_name}
                          onChange={(e) =>
                            handleSourceTypeValue(
                              "other",
                              "source_name",
                              e.target.value
                            )
                          }
                          className={`mt-1 p-1 border ${
                            errors.source_name
                              ? "border-red-500"
                              : "border-gray-300"
                          } outline-blue-400 w-full rounded-md font-normal`}
                          placeholder="Enter source name..."
                        />
                      </div>
                      <div className="font-semibold w-full">
                        <div className="flex gap-2 items-center">
                          <label htmlFor="title">
                            Source URL <span className="text-red-600">*</span>
                          </label>
                          {errors.source_url && (
                            <span className="text-red-600 text-xs">
                              ({errors.source_url})
                            </span>
                          )}
                        </div>
                        <input
                          type="url"
                          value={data.source_type.other.source_url}
                          onChange={(e) =>
                            handleSourceTypeValue(
                              "other",
                              "source_url",
                              e.target.value
                            )
                          }
                          className={`mt-1 p-1 border ${
                            errors.source_url
                              ? "border-red-500"
                              : "border-gray-300"
                          } outline-blue-400 w-full rounded-md font-normal`}
                          placeholder="Enter source url here..."
                        />
                      </div>
                    </div>
                  </div>
                ) : sourceType === "Own" ? (
                  <div className="my-2">
                    <div className="flex gap-2 items-center mb-2">
                      <label className="font-semibold text-sm">
                        Write Article <span className="text-red-600">*</span>
                      </label>
                      {errors.my_article && (
                        <span className="text-red-600 text-xs">
                          ({errors.my_article})
                        </span>
                      )}
                    </div>
                    <div
                      className={`${
                        errors.my_article ? "border border-red-500 rounded" : ""
                      }`}
                    >
                      <ReactQuill
                        theme="snow"
                        value={data.source_type.own.my_article}
                        onChange={handleEditorChange}
                        modules={quillModules}
                        formats={quillFormats}
                        style={{ height: "200px", marginBottom: "50px" }}
                        placeholder="Write your article content here..."
                      />
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>

              {/* News image type select fields */}
              <div className="my-3 font-semibold w-full text-sm">
                <div className="flex gap-2 items-center">
                  <label htmlFor="category">
                    News Image Type <span className="text-red-600">*</span>
                  </label>
                  {errors.imageType && (
                    <span className="text-red-600 text-xs">
                      ({errors.imageType})
                    </span>
                  )}
                </div>
                <div className="relative text-sm cursor-pointer">
                  <select
                    className={`my-2 block appearance-none w-full bg-white border ${
                      errors.imageType ? "border-red-500" : "border-gray-300"
                    } text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500`}
                    value={imageType}
                    onChange={handleImageTypeChange}
                  >
                    <option value="">Select One</option>
                    <option value="url">URL</option>
                    <option value="image">Image</option>
                  </select>
                  <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                    <svg
                      className="h-4 w-4 text-gray-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* URL / Image type fields */}
              {imageType === "url" ? (
                <div className="font-semibold text-sm">
                  <div className="flex gap-2 items-center">
                    <label htmlFor="title">
                      Image URL <span className="text-red-600">*</span>
                    </label>
                    {errors.image_url && (
                      <span className="text-red-600 text-xs">
                        ({errors.image_url})
                      </span>
                    )}
                  </div>
                  <input
                    type="url"
                    name="image_url"
                    placeholder="Enter image URL here..."
                    className={`mt-1 p-1 border ${
                      errors.image_url ? "border-red-500" : "border-gray-300"
                    } outline-blue-400 w-full rounded-md font-normal`}
                    value={data.image_url}
                    onChange={(e) => {
                      setData({ ...data, image_url: e.target.value });
                      setImagePreview(e.target.value);
                      clearError("image_url");
                    }}
                  />
                </div>
              ) : imageType === "image" ? (
                <div
                  id="drag-and-drop"
                  className="w-full bg-white rounded-md p-2 flex flex-col gap-2"
                >
                  <div className="flex gap-2 items-center">
                    <h2 className="text-sm font-semibold">
                      Upload Image <span className="text-red-600">*</span>
                    </h2>
                    {errors.image_file && (
                      <span className="text-red-600 text-xs">
                        ({errors.image_file})
                      </span>
                    )}
                  </div>
                  <div
                    className={`w-full flex justify-center transition-all items-center border-2 border-dashed rounded-md p-6 ${
                      dragging
                        ? "border-blue-500 bg-blue-50"
                        : errors.image_file
                        ? "border-red-500 bg-red-50"
                        : "border-gray-400 bg-blue-50"
                    }`}
                    onDragEnter={handleDragEnter}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                  >
                    <div className="flex flex-col justify-center items-center gap-2">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <h4 className="text-sm font-semibold text-gray-600">
                        Drag & Drop Image here
                      </h4>
                      <p className="text-gray-400 text-center">OR</p>
                      <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                        <span>Browse Files</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handlefile}
                        />
                      </label>
                      <p className="text-xs text-orange-500 text-center">
                        Maximum Size: 1MB
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              {/* Image Preview */}
              {imagePreview && (
                <div className="my-3">
                  <label className="font-semibold text-sm">
                    Image Preview:
                  </label>
                  <div className="mt-2 border rounded-lg p-2 bg-gray-50">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="max-w-full h-48 object-cover rounded mx-auto"
                      onError={(e) => {
                        e.target.style.display = "none";
                        setImagePreview("");
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Publish Date and other Fields */}
              <div className="mt-3 flex gap-5 text-sm">
                {/* Publish Date of article - Now non-editable with current date */}
                <div className="font-semibold text-sm w-full">
                  <label htmlFor="publish-date">
                    Publish Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.publish_date}
                    readOnly
                    className="mt-2 border-2 border-gray-300 bg-gray-100 cursor-not-allowed w-full py-[.435rem] font-normal px-2 rounded text-gray-600"
                    placeholder="Current date will be set automatically"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This field is automatically set to current date and time
                  </p>
                </div>
                {/* Status of article*/}
                <div className="font-semibold w-full">
                  <div className="flex gap-2 items-center">
                    <label htmlFor="status">
                      Status <span className="text-red-600">*</span>
                    </label>
                    {errors.status && (
                      <span className="text-red-600 text-xs">
                        ({errors.status})
                      </span>
                    )}
                  </div>
                  <div className="relative my-2 text-sm cursor-pointer">
                    <select
                      name="status"
                      value={data.status}
                      onChange={(e) => {
                        setData({ ...data, status: e.target.value });
                        clearError("status");
                      }}
                      className={`block appearance-none w-full bg-white border ${
                        errors.status ? "border-red-500" : "border-gray-300"
                      } text-gray-700 py-2 px-2 pr-8 rounded leading-tight outline-blue-400`}
                    >
                      <option value="">Select One</option>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                    <div className="my-1 absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none border-l border-gray-300">
                      <svg
                        className="h-4 w-4 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Create Button */}
              <div className="my-2 w-full flex justify-end">
                <button
                  type="submit"
                  disabled={isClicked}
                  className={`px-6 py-2 font-semibold text-sm text-white rounded-md shadow transition-colors ${
                    isClicked
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {isClicked ? "Creating..." : "Create News"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default AddNews;
