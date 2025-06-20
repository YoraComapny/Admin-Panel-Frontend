// import { useState } from "react";
// import Location from "../global/Location";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import SunEditor from "suneditor-react";
// import "../../../node_modules/suneditor/dist/css/suneditor.min.css";
// import { createNews } from "../../Api";
// import { toast } from "react-toastify";
// import Portal from "../pages/Portal";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/dark.css";

// const AddNews = () => {
//   const location = useLocation();
//   // Creating a state to check if title input exists
//   const [file, setFile] = useState("");
//   const [sourceType, setSourceType] = useState("");
//   const [isClicked, setIsClicked] = useState(false);
//   const [imageType, setImageType] = useState("");
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
//     publish_date: "",
//     status: "",
//   });

//   const handleDateChange = (date) => {
//     const selectedDateTime = new Date(date);

//     // Format the date and time
//     const formattedDateTime = selectedDateTime.toLocaleString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true, // Include AM/PM indicator
//     });
//     setData({ ...data, publish_date: formattedDateTime });
//   };

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
//     console.log("mmmmmmmmm", file);

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
//                 {/* Publish Date of article */}
//                 <div className="font-semibold text-sm w-full">
//                   <label htmlFor="publish-date">
//                     Publish Date <span className="text-red-600">*</span>
//                   </label>
//                   <Flatpickr
//                     className="mt-2 border-2 border-gray-300 cursor-pointer w-full py-[.435rem] font-normal px-2 rounded p-1 text-black "
//                     options={{
//                       enableTime: true,
//                       dateFormat: "Y-m-d h:i K",
//                     }}
//                     value={data.publish_date}
//                     onChange={handleDateChange}
//                   />
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

import { useState, useCallback, useMemo } from "react";
import Location from "../global/Location";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SunEditor from "suneditor-react";
import "../../../node_modules/suneditor/dist/css/suneditor.min.css";
import { createNews } from "../../Api";
import { toast } from "react-toastify";
import Portal from "../pages/Portal";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

const AddNews = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Form state
  const [file, setFile] = useState(null);
  const [sourceType, setSourceType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageType, setImageType] = useState("");
  const [dragging, setDragging] = useState(false);
  const [errors, setErrors] = useState({});

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
    publish_date: new Date(), // Keep as Date object
    status: "",
  });

  // Validation rules
  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!data.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!data.category) {
      newErrors.category = "Category is required";
    }

    if (!sourceType) {
      newErrors.sourceType = "Source type is required";
    }

    if (sourceType === "Others") {
      if (!data.source_type.other.source_name.trim()) {
        newErrors.sourceName = "Source name is required";
      }
      if (!data.source_type.other.source_url.trim()) {
        newErrors.sourceUrl = "Source URL is required";
      }
    }

    if (sourceType === "Own" && !data.source_type.own.my_article.trim()) {
      newErrors.article = "Article content is required";
    }

    if (!imageType) {
      newErrors.imageType = "Image type is required";
    }

    if (imageType === "url" && !data.image_url.trim()) {
      newErrors.imageUrl = "Image URL is required";
    }

    if (imageType === "image" && !file) {
      newErrors.file = "Image file is required";
    }

    if (!data.status) {
      newErrors.status = "Status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [data, sourceType, imageType, file]);

  // Fixed date change handler
  const handleDateChange = useCallback((dates) => {
    const selectedDate = dates[0];
    if (selectedDate) {
      setData((prevData) => ({
        ...prevData,
        publish_date: selectedDate, // Keep as Date object
      }));
    }
  }, []);

  // Drag and drop handlers
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);
    if (files[0]) {
      handleFileSelection(files[0]);
    }
  }, []);

  // File handling
  const handleFileSelection = useCallback((selectedFile) => {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Please select a valid image file (JPEG, PNG, GIF, WebP)");
      return;
    }

    // Validate file size (1MB = 1024 * 1024 bytes)
    if (selectedFile.size > 1024 * 1024) {
      toast.error("File size must be less than 1MB");
      return;
    }

    setFile(selectedFile);

    // Upload to Cloudinary if function exists
    if (typeof uploadToCloudinary === "function") {
      uploadToCloudinary(selectedFile)
        .then((url) => {
          setData((prevData) => ({ ...prevData, image_url: url }));
        })
        .catch((error) => {
          console.error("Cloudinary upload error:", error);
          toast.error("Failed to upload image to cloud storage");
        });
    }
  }, []);

  const handleFileInput = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        handleFileSelection(selectedFile);
      }
    },
    [handleFileSelection]
  );

  // Form data preparation
  const prepareFormData = useCallback(
    (formData) => {
      const data = new FormData();

      // Add basic fields
      Object.keys(formData).forEach((key) => {
        if (key === "source_type") {
          // Handle nested source_type object
          Object.keys(formData[key]).forEach((nestedKey) => {
            Object.keys(formData[key][nestedKey]).forEach((nestedField) => {
              data.append(
                `source_type[${nestedKey}][${nestedField}]`,
                formData[key][nestedKey][nestedField]
              );
            });
          });
        } else if (key === "publish_date") {
          // Format date for submission
          const formattedDate = formData[key].toLocaleString("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          });
          data.append(key, formattedDate);
        } else {
          data.append(key, formData[key]);
        }
      });

      if (file) {
        data.append("file", file);
      }

      return data;
    },
    [file]
  );

  // Form submission
  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();

      if (!validateForm()) {
        toast.error("Please fix the validation errors");
        return;
      }

      setIsSubmitting(true);

      try {
        let response;

        if (imageType === "url" && data.image_url) {
          response = await createNews(data);
        } else {
          response = await createNews(prepareFormData(data));
        }

        if (response?.data?.success) {
          toast.success(response.data.message || "News created successfully!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          navigate("/admin/news");
        } else {
          throw new Error(response?.data?.message || "Failed to create news");
        }
      } catch (error) {
        console.error("Error creating news:", error);
        toast.error(
          error.message || "Failed to create news. Please try again."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [data, imageType, validateForm, prepareFormData, navigate]
  );

  // Input change handlers
  const handleInputChange = useCallback(
    (field, value) => {
      setData((prevData) => ({ ...prevData, [field]: value }));
      // Clear error when user starts typing
      if (errors[field]) {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
      }
    },
    [errors]
  );

  const handleSourceTypeChange = useCallback(
    (event) => {
      const value = event.target.value;
      setSourceType(value);
      if (errors.sourceType) {
        setErrors((prevErrors) => ({ ...prevErrors, sourceType: "" }));
      }
    },
    [errors.sourceType]
  );

  const handleImageTypeChange = useCallback(
    (event) => {
      const value = event.target.value;
      setImageType(value);
      if (errors.imageType) {
        setErrors((prevErrors) => ({ ...prevErrors, imageType: "" }));
      }
    },
    [errors.imageType]
  );

  const handleSourceTypeValue = useCallback(
    (type, field, value) => {
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

      // Clear related errors
      const errorField = field === "source_name" ? "sourceName" : "sourceUrl";
      if (errors[errorField]) {
        setErrors((prevErrors) => ({ ...prevErrors, [errorField]: "" }));
      }
    },
    [errors]
  );

  const handleEditorChange = useCallback(
    (content) => {
      setData((prevData) => ({
        ...prevData,
        source_type: {
          ...prevData.source_type,
          own: {
            ...prevData.source_type.own,
            my_article: content,
          },
        },
      }));

      if (errors.article) {
        setErrors((prevErrors) => ({ ...prevErrors, article: "" }));
      }
    },
    [errors.article]
  );

  // Memoized options for selects
  const categoryOptions = useMemo(
    () => [
      { value: "Champions League", label: "UEFA Champions League" },
      { value: "Premier League", label: "Premier League" },
      { value: "La Liga", label: "La Liga" },
    ],
    []
  );

  const sourceTypeOptions = useMemo(
    () => [
      { value: "Own", label: "Own" },
      { value: "Others", label: "Others" },
    ],
    []
  );

  const statusOptions = useMemo(
    () => [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    []
  );

  const imageTypeOptions = useMemo(
    () => [
      { value: "url", label: "URL" },
      { value: "image", label: "Image" },
    ],
    []
  );

  // Helper component for error display
  const ErrorMessage = ({ error }) =>
    error ? <p className="text-red-600 text-xs mt-1">({error})</p> : null;

  // Helper component for select dropdown
  const SelectField = ({
    label,
    value,
    onChange,
    options,
    error,
    required = true,
  }) => (
    <div className="font-semibold w-full">
      <div className="flex gap-2 items-center">
        <label htmlFor={label}>
          {label} {required && <span className="text-red-600">*</span>}
        </label>
        <ErrorMessage error={error} />
      </div>
      <div className="relative my-2 text-sm cursor-pointer">
        <select
          value={value}
          onChange={onChange}
          className="block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        >
          <option value="">Select One</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
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
  );

  return (
    <Portal>
      <div className="bg-gray-100 min-h-screen p-3">
        <div className="w-[95%] m-1 mx-auto">
          <Location location={location} />
        </div>
        <div className="bg-white rounded-md shadow-md w-[95%] mx-auto p-5">
          <h2 className="font-semibold text-lg">Create a News Article</h2>
          <form onSubmit={handleSubmit} className="mt-2 p-2 w-full">
            {/* Title Field */}
            <div className="my-2 font-semibold text-sm">
              <div className="flex gap-3 items-center">
                <label htmlFor="title">
                  Title <span className="text-red-600">*</span>
                </label>
                <ErrorMessage error={errors.title} />
              </div>
              <input
                type="text"
                name="title"
                placeholder="Type something here..."
                className="mt-1 w-full bg-white border border-gray-300 text-gray-700 py-[.435rem] px-2 rounded outline-blue-400"
                value={data.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
              />
            </div>

            {/* Category and Source Type */}
            <div className="flex gap-5 text-sm">
              <SelectField
                label="Category"
                value={data.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                options={categoryOptions}
                error={errors.category}
              />
              <SelectField
                label="Source Type"
                value={sourceType}
                onChange={handleSourceTypeChange}
                options={sourceTypeOptions}
                error={errors.sourceType}
              />
            </div>

            {/* Source Type Specific Fields */}
            {sourceType === "Others" && (
              <div className="mt-3 flex flex-col gap-3">
                <div className="flex gap-5 text-sm">
                  <div className="font-semibold w-full">
                    <div className="flex gap-2 items-center">
                      <label htmlFor="sourceName">
                        Source Name <span className="text-red-600">*</span>
                      </label>
                      <ErrorMessage error={errors.sourceName} />
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
                      className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
                      placeholder="Enter source name..."
                    />
                  </div>
                  <div className="font-semibold w-full">
                    <div className="flex gap-2 items-center">
                      <label htmlFor="sourceUrl">
                        Source URL <span className="text-red-600">*</span>
                      </label>
                      <ErrorMessage error={errors.sourceUrl} />
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
                      className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
                      placeholder="https://example.com"
                    />
                  </div>
                </div>
              </div>
            )}

            {sourceType === "Own" && (
              <div className="my-2">
                <div className="flex gap-2 items-center">
                  <label className="font-semibold text-sm">
                    Write Article <span className="text-red-600">*</span>
                  </label>
                  <ErrorMessage error={errors.article} />
                </div>
                <div className="mt-2">
                  <SunEditor
                    onChange={handleEditorChange}
                    setOptions={{
                      buttonList: [
                        ["undo", "redo"],
                        ["bold", "underline", "italic", "strike"],
                        ["fontColor", "hiliteColor"],
                        ["align", "list"],
                        ["link", "image"],
                        ["fullScreen", "showBlocks", "codeView"],
                      ],
                      height: 300,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Image Type Selection */}
            <SelectField
              label="News Image Type"
              value={imageType}
              onChange={handleImageTypeChange}
              options={imageTypeOptions}
              error={errors.imageType}
            />

            {/* Image Fields */}
            {imageType === "url" && (
              <div className="font-semibold text-sm">
                <div className="flex gap-2 items-center">
                  <label htmlFor="imageUrl">
                    Image URL <span className="text-red-600">*</span>
                  </label>
                  <ErrorMessage error={errors.imageUrl} />
                </div>
                <input
                  type="url"
                  name="image_url"
                  placeholder="https://example.com/image.jpg"
                  className="mt-1 p-1 border border-gray-300 outline-blue-400 w-full rounded-md font-normal"
                  value={data.image_url}
                  onChange={(e) =>
                    handleInputChange("image_url", e.target.value)
                  }
                />
              </div>
            )}

            {imageType === "image" && (
              <div className="w-full bg-white rounded-md p-2 flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <h2 className="text-sm font-semibold">
                    Upload Image <span className="text-red-600">*</span>
                  </h2>
                  <ErrorMessage error={errors.file} />
                </div>
                <div
                  className={`w-full flex justify-center transition-all items-center border-2 border-dashed border-gray-400 rounded-md ${
                    dragging ? "bg-blue-400" : "bg-blue-200"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col justify-center items-center gap-2 p-4">
                    <h4 className="text-sm font-semibold text-gray-600">
                      Drag & Drop Image here
                    </h4>
                    <p className="text-gray-400 text-center">OR</p>
                    <input
                      type="file"
                      name="file"
                      onChange={handleFileInput}
                      accept="image/*"
                      className="text-sm text-white bg-blue-600 hover:bg-blue-800 rounded-md p-1 w-3/4"
                    />
                    {file && (
                      <p className="text-sm text-green-600">
                        Selected: {file.name}
                      </p>
                    )}
                    <p className="text-xs text-orange-500 text-center">
                      Maximum Size: 1MB | Formats: JPEG, PNG, GIF, WebP
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Publish Date and Status */}
            <div className="mt-3 flex gap-5 text-sm">
              <div className="font-semibold text-sm w-full">
                <label htmlFor="publish-date">
                  Publish Date <span className="text-red-600">*</span>
                </label>
                <Flatpickr
                  className="mt-2 border-2 border-gray-300 cursor-pointer w-full py-[.435rem] font-normal px-2 rounded p-1 text-black"
                  options={{
                    enableTime: true,
                    dateFormat: "Y-m-d h:i K",
                    defaultDate: data.publish_date,
                  }}
                  value={data.publish_date}
                  onChange={handleDateChange}
                />
              </div>
              <SelectField
                label="Status"
                value={data.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                options={statusOptions}
                error={errors.status}
              />
            </div>

            {/* Submit Button */}
            <div className="my-4 w-full flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 font-semibold text-sm text-white rounded-md shadow transition-colors ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 cursor-pointer"
                }`}
              >
                {isSubmitting ? "Creating..." : "Create News"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default AddNews;
