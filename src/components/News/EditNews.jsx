// "use client";

// import { useEffect, useState } from "react";
// import Location from "../global/Location";
// import { useLocation, useParams, useNavigate } from "react-router-dom";
// import SunEditor from "suneditor-react";
// import "../../../node_modules/suneditor/dist/css/suneditor.min.css";
// import { editNews, getSingleNews } from "../../Api";
// import { toast } from "react-toastify";
// import Portal from "../pages/Portal";

// const AddNews = () => {
//   const location = useLocation();
//   const { id } = useParams();
//   const navigation = useNavigate();

//   // Form states
//   const [file, setFile] = useState(null);
//   const [sourceType, setSourceType] = useState("");
//   const [imageType, setImageType] = useState("");
//   const [isClicked, setIsClicked] = useState(false);
//   const [dragging, setDragging] = useState(false);
//   const [imagePreview, setImagePreview] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState({});

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

//   // **FIXED: Utility function to strip HTML tags and decode HTML entities**
//   const stripHtmlTags = (html) => {
//     if (!html) return "";

//     // Create a temporary div element to parse HTML
//     const tempDiv = document.createElement("div");
//     tempDiv.innerHTML = html;

//     // Get text content and replace &nbsp; with regular spaces
//     let textContent = tempDiv.textContent || tempDiv.innerText || "";

//     // Replace common HTML entities
//     textContent = textContent
//       .replace(/&nbsp;/g, " ")
//       .replace(/&amp;/g, "&")
//       .replace(/&lt;/g, "<")
//       .replace(/&gt;/g, ">")
//       .replace(/&quot;/g, '"')
//       .replace(/&#39;/g, "'");

//     return textContent.trim();
//   };

//   // **FIXED: Function to get current date and time**
//   const getCurrentDateTime = () => {
//     const now = new Date();
//     return now.toLocaleString("en-US", {
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   // **FIXED: Utility function to format date from API response**
//   const formatDateFromAPI = (dateString) => {
//     if (!dateString) return getCurrentDateTime();

//     try {
//       // If it's already in the correct format, return as is
//       if (typeof dateString === "string" && dateString.includes("/")) {
//         return dateString;
//       }

//       // Parse the date and format it
//       const date = new Date(dateString);
//       return date.toLocaleString("en-US", {
//         year: "numeric",
//         month: "2-digit",
//         day: "2-digit",
//         hour: "2-digit",
//         minute: "2-digit",
//         hour12: true,
//       });
//     } catch (error) {
//       console.error("Error formatting date:", error);
//       return getCurrentDateTime();
//     }
//   };

//   useEffect(() => {
//     if (id) {
//       getNews();
//     } else {
//       // **FIXED: Set current date/time for new entries**
//       setData((prev) => ({
//         ...prev,
//         publish_date: getCurrentDateTime(),
//       }));
//       setLoading(false);
//     }
//   }, [id]);

//   // Fetch existing news data
//   const getNews = async () => {
//     try {
//       setLoading(true);
//       const res = await getSingleNews(id);
//       console.log("111------", res?.data?.news);
//       if (res?.data?.success && res?.data?.news) {
//         const newsData = res.data.news;

//         // **FIXED: Process the data to handle HTML content properly**
//         const processedData = {
//           ...newsData,
//           // **FIXED: Format publish_date properly**
//           publish_date: formatDateFromAPI(newsData.publish_date),
//           source_type: {
//             other: {
//               source_name: newsData.source_type?.other?.source_name || "",
//               source_url: newsData.source_type?.other?.source_url || "",
//             },
//             own: {
//               // **FIXED: Keep HTML content for SunEditor, but ensure it's properly formatted**
//               my_article: newsData.source_type?.own?.my_article || "",
//             },
//           },
//         };

//         setData(processedData);

//         // Set sourceType based on data structure
//         if (
//           newsData.source_type?.other?.source_name ||
//           newsData.source_type?.other?.source_url
//         ) {
//           setSourceType("Others");
//         } else if (newsData.source_type?.own?.my_article) {
//           console.log("22222222------", newsData.source_type?.own?.my_article);
//           setSourceType("Own");
//         }

//         // Set imageType based on existing image_url
//         if (newsData.image_url) {
//           setImageType("url");
//           setImagePreview(newsData.image_url);
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching news:", error);
//       toast.error("Failed to load news data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Validation function
//   const validateForm = () => {
//     const newErrors = {};

//     if (!data.title.trim()) newErrors.title = "Title is required";
//     if (!data.category) newErrors.category = "Category is required";
//     if (!sourceType) newErrors.sourceType = "Source type is required";
//     if (!imageType) newErrors.imageType = "Image type is required";
//     if (!data.publish_date) newErrors.publish_date = "Publish date is required";
//     if (!data.status) newErrors.status = "Status is required";

//     // Validate source type specific fields
//     if (sourceType === "Others") {
//       if (!data.source_type.other.source_name.trim()) {
//         newErrors.source_name = "Source name is required";
//       }
//       if (!data.source_type.other.source_url.trim()) {
//         newErrors.source_url = "Source URL is required";
//       }
//     } else if (sourceType === "Own") {
//       // **FIXED: Check for content in the article (strip HTML for validation)**
//       const articleText = stripHtmlTags(data.source_type.own.my_article);
//       console.log("articleText", articleText);
//       if (!articleText.trim()) {
//         newErrors.my_article = "Article content is required";
//       }
//     }

//     // Validate image
//     if (imageType === "url" && !data.image_url.trim()) {
//       newErrors.image_url = "Image URL is required";
//     } else if (imageType === "image" && !file && !data.image_url) {
//       newErrors.image_file = "Image file is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Drag and drop handlers
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
//     if (files.length > 0) {
//       const selectedFile = files[0];
//       if (selectedFile.type.startsWith("image/")) {
//         setFile(selectedFile);
//         handleFilePreview(selectedFile);
//         setErrors({ ...errors, image_file: "" });
//       } else {
//         toast.error("Please select an image file");
//       }
//     }
//   };

//   // Handle file input change
//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     if (selectedFile) {
//       if (selectedFile.size > 1024 * 1024) {
//         // 1MB limit
//         toast.error("File size should not exceed 1MB");
//         return;
//       }
//       setFile(selectedFile);
//       handleFilePreview(selectedFile);
//       setErrors({ ...errors, image_file: "" });
//     }
//   };

//   // Handle file preview
//   const handleFilePreview = (file) => {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       setImagePreview(e.target.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   // Handle source type change
//   const handleSourceTypeChange = (event) => {
//     const newSourceType = event.target.value;
//     setSourceType(newSourceType);
//     setErrors({ ...errors, sourceType: "" });

//     // Clear opposite source type data
//     if (newSourceType === "Own") {
//       setData((prev) => ({
//         ...prev,
//         source_type: {
//           ...prev.source_type,
//           other: { source_name: "", source_url: "" },
//         },
//       }));
//     } else if (newSourceType === "Others") {
//       setData((prev) => ({
//         ...prev,
//         source_type: {
//           ...prev.source_type,
//           own: { my_article: "" },
//         },
//       }));
//     }
//   };

//   // Handle image type change
//   const handleImageTypeChange = (event) => {
//     const newImageType = event.target.value;
//     setImageType(newImageType);
//     setErrors({ ...errors, imageType: "" });

//     // Clear opposite image data
//     if (newImageType === "url") {
//       setFile(null);
//       setImagePreview("");
//     } else if (newImageType === "image") {
//       setData((prev) => ({ ...prev, image_url: "" }));
//       setImagePreview("");
//     }
//   };

//   // Handle nested source type values
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
//     setErrors({ ...errors, [field]: "" });
//   };

//   // **FIXED: Handle publish date change (simple input)**
//   const handlePublishDateChange = (e) => {
//     setData({ ...data, publish_date: e.target.value });
//     setErrors({ ...errors, publish_date: "" });
//   };

//   // Handle editor change
//   const handleEditorChange = (content) => {
//     setData({
//       ...data,
//       source_type: {
//         ...data.source_type,
//         own: {
//           ...data.source_type.own,
//           my_article: content,
//         },
//       },
//     });
//     setErrors({ ...errors, my_article: "" });
//   };

//   // Handle image URL change
//   const handleImageUrlChange = (e) => {
//     const url = e.target.value;
//     setData({ ...data, image_url: url });
//     setImagePreview(url);
//     setErrors({ ...errors, image_url: "" });
//   };

//   // Handle form submission
//   const handleSubmit = (formData) => {
//     const data = new FormData();

//     // Append form fields
//     for (const key in formData) {
//       if (key === "source_type") {
//         for (const nestedKey in formData[key]) {
//           for (const nestedField in formData[key][nestedKey]) {
//             data.append(
//               `source_type[${nestedKey}][${nestedField}]`,
//               formData[key][nestedKey][nestedField]
//             );
//           }
//         }
//       } else {
//         data.append(key, formData[key]);
//       }
//     }

//     // Append file if exists
//     if (file) {
//       data.append("file", file);
//     }

//     return data;
//   };

//   // Handle news update
//   const handleNews = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       toast.error("Please fill in all required fields");
//       return;
//     }

//     setIsClicked(true);

//     try {
//       let submitData;

//       if (imageType === "url" || !file) {
//         // Submit as JSON if no file upload
//         submitData = data;
//       } else {
//         // Submit as FormData if file upload
//         submitData = handleSubmit(data);
//       }
//       console.log("submitData", submitData);
//       const res = await editNews(id, submitData);

//       if (res?.data?.success) {
//         toast.success(res.data?.message || "News updated successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         navigation("/admin/news/");
//       } else {
//         toast.error(res?.data?.message || "Failed to update news");
//       }
//     } catch (error) {
//       console.error("Error updating news:", error);
//       toast.error("An error occurred while updating news");
//     } finally {
//       setIsClicked(false);
//     }
//   };

//   if (loading) {
//     return (
//       <Portal>
//         <div className="bg-gray-100 min-h-screen p-3 flex justify-center items-center">
//           <div className="text-lg">Loading...</div>
//         </div>
//       </Portal>
//     );
//   }

//   const { title, category, image_url, publish_date, source_type, status } =
//     data;

//   return (
//     <Portal>
//       <div className="bg-gray-100 min-h-screen p-3">
//         <div className="w-[95%] m-1 mx-auto">
//           <Location location={location} />
//         </div>

//         <div className="bg-white rounded-md shadow-md w-[95%] mx-auto p-5">
//           <h2 className="font-semibold text-lg mb-4">Update News Article</h2>

//           <form className="space-y-4" onSubmit={handleNews}>
//             {/* Title Field */}
//             <div className="space-y-1">
//               <label className="flex items-center gap-2 font-semibold text-sm">
//                 Title <span className="text-red-600">*</span>
//                 {errors.title && (
//                   <span className="text-red-600 text-xs">({errors.title})</span>
//                 )}
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter news title..."
//                 className={`w-full bg-white border ${
//                   errors.title ? "border-red-500" : "border-gray-300"
//                 } text-gray-700 py-2 px-3 rounded outline-blue-400`}
//                 value={title}
//                 onChange={(e) => {
//                   setData({ ...data, title: e.target.value });
//                   setErrors({ ...errors, title: "" });
//                 }}
//               />
//             </div>

//             {/* Category and Source Type */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Category */}
//               <div className="space-y-1">
//                 <label className="flex items-center gap-2 font-semibold text-sm">
//                   Category <span className="text-red-600">*</span>
//                   {errors.category && (
//                     <span className="text-red-600 text-xs">
//                       ({errors.category})
//                     </span>
//                   )}
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={category}
//                     onChange={(e) => {
//                       setData({ ...data, category: e.target.value });
//                       setErrors({ ...errors, category: "" });
//                     }}
//                     className={`w-full bg-white border ${
//                       errors.category ? "border-red-500" : "border-gray-300"
//                     } text-gray-700 py-2 px-3 pr-8 rounded outline-blue-400 appearance-none`}
//                   >
//                     <option value="">Select Category</option>
//                     <option value="Champions League">
//                       UEFA Champions League
//                     </option>
//                     <option value="Premier League">Premier League</option>
//                     <option value="La Liga">La Liga</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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

//               {/* Source Type */}
//               <div className="space-y-1">
//                 <label className="flex items-center gap-2 font-semibold text-sm">
//                   Source Type <span className="text-red-600">*</span>
//                   {errors.sourceType && (
//                     <span className="text-red-600 text-xs">
//                       ({errors.sourceType})
//                     </span>
//                   )}
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={sourceType}
//                     onChange={handleSourceTypeChange}
//                     className={`w-full bg-white border ${
//                       errors.sourceType ? "border-red-500" : "border-gray-300"
//                     } text-gray-700 py-2 px-3 pr-8 rounded outline-blue-400 appearance-none`}
//                   >
//                     <option value="">Select Source Type</option>
//                     <option value="Own">Own</option>
//                     <option value="Others">Others</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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
//             </div>

//             {/* Source Type Specific Fields */}
//             {sourceType === "Others" && (
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="space-y-1">
//                   <label className="flex items-center gap-2 font-semibold text-sm">
//                     Source Name <span className="text-red-600">*</span>
//                     {errors.source_name && (
//                       <span className="text-red-600 text-xs">
//                         ({errors.source_name})
//                       </span>
//                     )}
//                   </label>
//                   <input
//                     type="text"
//                     placeholder="Enter source name..."
//                     className={`w-full border ${
//                       errors.source_name ? "border-red-500" : "border-gray-300"
//                     } py-2 px-3 rounded outline-blue-400`}
//                     value={source_type?.other?.source_name || ""}
//                     onChange={(e) =>
//                       handleSourceTypeValue(
//                         "other",
//                         "source_name",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//                 <div className="space-y-1">
//                   <label className="flex items-center gap-2 font-semibold text-sm">
//                     Source URL <span className="text-red-600">*</span>
//                     {errors.source_url && (
//                       <span className="text-red-600 text-xs">
//                         ({errors.source_url})
//                       </span>
//                     )}
//                   </label>
//                   <input
//                     type="url"
//                     placeholder="Enter source URL..."
//                     className={`w-full border ${
//                       errors.source_url ? "border-red-500" : "border-gray-300"
//                     } py-2 px-3 rounded outline-blue-400`}
//                     value={source_type?.other?.source_url || ""}
//                     onChange={(e) =>
//                       handleSourceTypeValue(
//                         "other",
//                         "source_url",
//                         e.target.value
//                       )
//                     }
//                   />
//                 </div>
//               </div>
//             )}

//             {sourceType === "Own" && (
//               <div className="space-y-1">
//                 <label className="flex items-center gap-2 font-semibold text-sm">
//                   Write Article <span className="text-red-600">*</span>
//                   {errors.my_article && (
//                     <span className="text-red-600 text-xs">
//                       ({errors.my_article})
//                     </span>
//                   )}
//                 </label>
//                 {/* **FIXED: Show plain text preview of the content** */}
//                 {source_type?.own?.my_article && (
//                   <div className="mb-2 p-2 bg-gray-50 border rounded text-sm text-gray-600">
//                     <strong>Current content (plain text):</strong>{" "}
//                     {stripHtmlTags(source_type.own.my_article)}
//                   </div>
//                 )}
//                 <div
//                   className={`${
//                     errors.my_article ? "border border-red-500 rounded" : ""
//                   }`}
//                 >
//                   <SunEditor
//                     value={source_type?.own?.my_article || ""}
//                     onChange={handleEditorChange}
//                     setOptions={{
//                       height: 200,
//                       buttonList: [
//                         ["undo", "redo"],
//                         ["bold", "underline", "italic"],
//                         ["fontColor", "hiliteColor"],
//                         ["align", "list"],
//                         ["link", "image"],
//                       ],
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* News Image Type */}
//             <div className="space-y-1">
//               <label className="flex items-center gap-2 font-semibold text-sm">
//                 News Image Type <span className="text-red-600">*</span>
//                 {errors.imageType && (
//                   <span className="text-red-600 text-xs">
//                     ({errors.imageType})
//                   </span>
//                 )}
//               </label>
//               <div className="relative">
//                 <select
//                   value={imageType}
//                   onChange={handleImageTypeChange}
//                   className={`w-full bg-white border ${
//                     errors.imageType ? "border-red-500" : "border-gray-300"
//                   } text-gray-700 py-2 px-3 pr-8 rounded outline-blue-400 appearance-none`}
//                 >
//                   <option value="">Select Image Type</option>
//                   <option value="url">URL</option>
//                   <option value="image">Upload Image</option>
//                 </select>
//                 <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
//                   <svg
//                     className="h-4 w-4 text-gray-500"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M19 9l-7 7-7-7"
//                     />
//                   </svg>
//                 </div>
//               </div>
//             </div>

//             {/* Image URL Field */}
//             {imageType === "url" && (
//               <div className="space-y-1">
//                 <label className="flex items-center gap-2 font-semibold text-sm">
//                   Image URL <span className="text-red-600">*</span>
//                   {errors.image_url && (
//                     <span className="text-red-600 text-xs">
//                       ({errors.image_url})
//                     </span>
//                   )}
//                 </label>
//                 <input
//                   type="url"
//                   placeholder="Enter image URL..."
//                   className={`w-full border ${
//                     errors.image_url ? "border-red-500" : "border-gray-300"
//                   } py-2 px-3 rounded outline-blue-400`}
//                   value={image_url}
//                   onChange={handleImageUrlChange}
//                 />
//               </div>
//             )}

//             {/* Image Upload Field */}
//             {imageType === "image" && (
//               <div className="space-y-2">
//                 <label className="flex items-center gap-2 font-semibold text-sm">
//                   Upload Image <span className="text-red-600">*</span>
//                   {errors.image_file && (
//                     <span className="text-red-600 text-xs">
//                       ({errors.image_file})
//                     </span>
//                   )}
//                 </label>
//                 <div
//                   className={`w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//                     dragging
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-300 hover:border-gray-400"
//                   } ${errors.image_file ? "border-red-500" : ""}`}
//                   onDragEnter={handleDragEnter}
//                   onDragOver={handleDragOver}
//                   onDragLeave={handleDragLeave}
//                   onDrop={handleDrop}
//                 >
//                   <div className="space-y-2">
//                     <div className="text-gray-600">
//                       <svg
//                         className="mx-auto h-12 w-12 text-gray-400"
//                         stroke="currentColor"
//                         fill="none"
//                         viewBox="0 0 48 48"
//                       >
//                         <path
//                           d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
//                           strokeWidth={2}
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                         />
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm font-medium text-gray-600">
//                         Drag and drop image here
//                       </p>
//                       <p className="text-xs text-gray-500">or</p>
//                     </div>
//                     <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
//                       <span>Browse Files</span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         className="hidden"
//                         onChange={handleFileChange}
//                       />
//                     </label>
//                     <p className="text-xs text-orange-600">Maximum size: 1MB</p>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Image Preview */}
//             {imagePreview && (
//               <div className="space-y-2">
//                 <label className="font-semibold text-sm">Image Preview:</label>
//                 <div className="border rounded-lg p-2 bg-gray-50">
//                   <img
//                     src={imagePreview || "/placeholder.svg"}
//                     alt="Preview"
//                     className="max-w-full h-48 object-cover rounded mx-auto"
//                     onError={(e) => {
//                       e.target.style.display = "none";
//                       setImagePreview("");
//                     }}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* **FIXED: Publish Date and Status** */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {/* Publish Date */}
//               <div className="space-y-1">
//                 <label className="flex items-center gap-2 font-semibold text-sm">
//                   Publish Date <span className="text-red-600">*</span>
//                   {errors.publish_date && (
//                     <span className="text-red-600 text-xs">
//                       ({errors.publish_date})
//                     </span>
//                   )}
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="MM/DD/YYYY, HH:MM AM/PM"
//                   className={`w-full border ${
//                     errors.publish_date ? "border-red-500" : "border-gray-300"
//                   } py-2 px-3 rounded outline-blue-400`}
//                   value={publish_date}
//                   onChange={handlePublishDateChange}
//                   readOnly
//                 />
//                 <p className="text-xs text-gray-500">
//                   Current date and time is automatically set
//                 </p>
//               </div>

//               {/* **FIXED: Status Field** */}
//               <div className="space-y-1">
//                 <label className="flex items-center gap-2 font-semibold text-sm">
//                   Status <span className="text-red-600">*</span>
//                   {errors.status && (
//                     <span className="text-red-600 text-xs">
//                       ({errors.status})
//                     </span>
//                   )}
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={status}
//                     onChange={(e) => {
//                       setData({ ...data, status: e.target.value });
//                       setErrors({ ...errors, status: "" });
//                     }}
//                     className={`w-full bg-white border ${
//                       errors.status ? "border-red-500" : "border-gray-300"
//                     } text-gray-700 py-2 px-3 pr-8 rounded outline-blue-400 appearance-none`}
//                   >
//                     <option value="">Select Status</option>
//                     <option value="active">Active</option>
//                     <option value="inactive">Inactive</option>
//                   </select>
//                   <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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
//             </div>

//             {/* Submit Button */}
//             <div className="flex justify-end pt-4">
//               <button
//                 type="submit"
//                 disabled={isClicked}
//                 className={`px-6 py-2 font-semibold text-sm text-white rounded-md shadow transition-colors ${
//                   isClicked
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-green-600 hover:bg-green-700"
//                 }`}
//               >
//                 {isClicked ? "Updating..." : "Update News"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Portal>
//   );
// };

// export default AddNews;

"use client";

import { useEffect, useState } from "react";
import Location from "../global/Location";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { editNews, getSingleNews } from "../../Api";
import { toast } from "react-toastify";
import Portal from "../pages/Portal";

const AddNews = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigation = useNavigate();

  // Form states
  const [file, setFile] = useState(null);
  const [sourceType, setSourceType] = useState("");
  const [imageType, setImageType] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [loading, setLoading] = useState(true);
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
    publish_date: "",
    status: "",
  });

  // Utility function to strip HTML tags and decode HTML entities
  const stripHtmlTags = (html) => {
    if (!html) return "";

    // Create a temporary div element to parse HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;

    // Get text content and replace &nbsp; with regular spaces
    let textContent = tempDiv.textContent || tempDiv.innerText || "";

    // Replace common HTML entities
    textContent = textContent
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    return textContent.trim();
  };

  // Function to get current date and time
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

  // Utility function to format date from API response
  const formatDateFromAPI = (dateString) => {
    if (!dateString) return getCurrentDateTime();

    try {
      // If it's already in the correct format, return as is
      if (typeof dateString === "string" && dateString.includes("/")) {
        return dateString;
      }

      // Parse the date and format it
      const date = new Date(dateString);
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return getCurrentDateTime();
    }
  };

  // Function to clean and prepare HTML content for editor
  const prepareContentForEditor = (htmlContent) => {
    if (!htmlContent) return "";

    try {
      // If content is JSON stringified, parse it first
      if (
        typeof htmlContent === "string" &&
        htmlContent.startsWith('"') &&
        htmlContent.endsWith('"')
      ) {
        htmlContent = JSON.parse(htmlContent);
      }

      // Clean up any escaped characters
      if (typeof htmlContent === "string") {
        htmlContent = htmlContent
          .replace(/\\"/g, '"')
          .replace(/\\n/g, "\n")
          .replace(/\\\\/g, "\\");
      }

      return htmlContent;
    } catch (error) {
      console.error("Error preparing content:", error);
      return htmlContent || "";
    }
  };

  useEffect(() => {
    if (id) {
      getNews();
    } else {
      // Set current date/time for new entries
      setData((prev) => ({
        ...prev,
        publish_date: getCurrentDateTime(),
      }));
      setLoading(false);
    }
  }, [id]);

  // Fetch existing news data
  const getNews = async () => {
    try {
      setLoading(true);
      const res = await getSingleNews(id);
      console.log("API Response:", res?.data?.news);

      if (res?.data?.success && res?.data?.news) {
        const newsData = res.data.news;

        // Process the article content properly
        const articleContent = newsData.source_type?.own?.my_article || "";
        const cleanedContent = prepareContentForEditor(articleContent);

        console.log("Original article content:", articleContent);
        console.log("Cleaned article content:", cleanedContent);
        console.log("Plain text version:", stripHtmlTags(cleanedContent));

        // Process the data to handle HTML content properly
        const processedData = {
          ...newsData,
          // Format publish_date properly
          publish_date: formatDateFromAPI(newsData.publish_date),
          source_type: {
            other: {
              source_name: newsData.source_type?.other?.source_name || "",
              source_url: newsData.source_type?.other?.source_url || "",
            },
            own: {
              // Use cleaned content for editor
              my_article: cleanedContent,
            },
          },
        };

        setData(processedData);

        // Set sourceType based on data structure
        if (
          newsData.source_type?.other?.source_name ||
          newsData.source_type?.other?.source_url
        ) {
          setSourceType("Others");
        } else if (newsData.source_type?.own?.my_article) {
          setSourceType("Own");
        }

        // Set imageType based on existing image_url
        if (newsData.image_url) {
          setImageType("url");
          setImagePreview(newsData.image_url);
        }
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Failed to load news data");
    } finally {
      setLoading(false);
    }
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!data.title.trim()) newErrors.title = "Title is required";
    if (!data.category) newErrors.category = "Category is required";
    if (!sourceType) newErrors.sourceType = "Source type is required";
    if (!imageType) newErrors.imageType = "Image type is required";
    if (!data.publish_date) newErrors.publish_date = "Publish date is required";
    if (!data.status) newErrors.status = "Status is required";

    // Validate source type specific fields
    if (sourceType === "Others") {
      if (!data.source_type.other.source_name.trim()) {
        newErrors.source_name = "Source name is required";
      }
      if (!data.source_type.other.source_url.trim()) {
        newErrors.source_url = "Source URL is required";
      }
    } else if (sourceType === "Own") {
      // Check for content in the article (strip HTML for validation)
      const articleText = stripHtmlTags(data.source_type.own.my_article);
      console.log("Validation - articleText:", articleText);
      if (!articleText.trim()) {
        newErrors.my_article = "Article content is required";
      }
    }

    // Validate image
    if (imageType === "url" && !data.image_url.trim()) {
      newErrors.image_url = "Image URL is required";
    } else if (imageType === "image" && !file && !data.image_url) {
      newErrors.image_file = "Image file is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Drag and drop handlers
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
        setFile(selectedFile);
        handleFilePreview(selectedFile);
        setErrors({ ...errors, image_file: "" });
      } else {
        toast.error("Please select an image file");
      }
    }
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 1024 * 1024) {
        // 1MB limit
        toast.error("File size should not exceed 1MB");
        return;
      }
      setFile(selectedFile);
      handleFilePreview(selectedFile);
      setErrors({ ...errors, image_file: "" });
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

  // Handle source type change
  const handleSourceTypeChange = (event) => {
    const newSourceType = event.target.value;
    setSourceType(newSourceType);
    setErrors({ ...errors, sourceType: "" });

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

  // Handle image type change
  const handleImageTypeChange = (event) => {
    const newImageType = event.target.value;
    setImageType(newImageType);
    setErrors({ ...errors, imageType: "" });

    // Clear opposite image data
    if (newImageType === "url") {
      setFile(null);
      setImagePreview("");
    } else if (newImageType === "image") {
      setData((prev) => ({ ...prev, image_url: "" }));
      setImagePreview("");
    }
  };

  // Handle nested source type values
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
    setErrors({ ...errors, [field]: "" });
  };

  // Handle publish date change
  const handlePublishDateChange = (e) => {
    setData({ ...data, publish_date: e.target.value });
    setErrors({ ...errors, publish_date: "" });
  };

  // Handle editor change for ReactQuill
  const handleEditorChange = (content) => {
    console.log("Editor content changed:", content);
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
    setErrors({ ...errors, my_article: "" });
  };

  // Handle image URL change
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setData({ ...data, image_url: url });
    setImagePreview(url);
    setErrors({ ...errors, image_url: "" });
  };

  // Handle form submission
  const handleSubmit = (formData) => {
    const data = new FormData();

    // Append form fields
    for (const key in formData) {
      if (key === "source_type") {
        for (const nestedKey in formData[key]) {
          for (const nestedField in formData[key][nestedKey]) {
            data.append(
              `source_type[${nestedKey}][${nestedField}]`,
              formData[key][nestedKey][nestedField]
            );
          }
        }
      } else {
        data.append(key, formData[key]);
      }
    }

    // Append file if exists
    if (file) {
      data.append("file", file);
    }

    return data;
  };

  // Handle news update
  const handleNews = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsClicked(true);

    try {
      let submitData;

      if (imageType === "url" || !file) {
        // Submit as JSON if no file upload
        submitData = data;
      } else {
        // Submit as FormData if file upload
        submitData = handleSubmit(data);
      }
      console.log("Submit data:", submitData);
      const res = await editNews(id, submitData);

      if (res?.data?.success) {
        toast.success(res.data?.message || "News updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigation("/admin/news/");
      } else {
        toast.error(res?.data?.message || "Failed to update news");
      }
    } catch (error) {
      console.error("Error updating news:", error);
      toast.error("An error occurred while updating news");
    } finally {
      setIsClicked(false);
    }
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

  if (loading) {
    return (
      <Portal>
        <div className="bg-gray-100 min-h-screen p-3 flex justify-center items-center">
          <div className="text-lg">Loading...</div>
        </div>
      </Portal>
    );
  }

  const { title, category, image_url, publish_date, source_type, status } =
    data;

  return (
    <Portal>
      <div className="bg-gray-100 min-h-screen p-3">
        <div className="w-[95%] m-1 mx-auto">
          <Location location={location} />
        </div>

        <div className="bg-white rounded-md shadow-md w-[95%] mx-auto p-5">
          <h2 className="font-semibold text-lg mb-4">Update News Article</h2>

          <form className="space-y-4" onSubmit={handleNews}>
            {/* Title Field */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 font-semibold text-sm">
                Title <span className="text-red-600">*</span>
                {errors.title && (
                  <span className="text-red-600 text-xs">({errors.title})</span>
                )}
              </label>
              <input
                type="text"
                placeholder="Enter news title..."
                className={`w-full bg-white border ${
                  errors.title ? "border-red-500" : "border-gray-300"
                } text-gray-700 py-2 px-3 rounded outline-blue-400`}
                value={title}
                onChange={(e) => {
                  setData({ ...data, title: e.target.value });
                  setErrors({ ...errors, title: "" });
                }}
              />
            </div>

            {/* Category and Source Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Category <span className="text-red-600">*</span>
                  {errors.category && (
                    <span className="text-red-600 text-xs">
                      ({errors.category})
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    value={category}
                    onChange={(e) => {
                      setData({ ...data, category: e.target.value });
                      setErrors({ ...errors, category: "" });
                    }}
                    className={`w-full bg-white border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } text-gray-700 py-2 px-3 pr-8 rounded outline-blue-400 appearance-none`}
                  >
                    <option value="">Select Category</option>
                    <option value="Champions League">
                      UEFA Champions League
                    </option>
                    <option value="Premier League">Premier League</option>
                    <option value="La Liga">La Liga</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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

              {/* Source Type */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Source Type <span className="text-red-600">*</span>
                  {errors.sourceType && (
                    <span className="text-red-600 text-xs">
                      ({errors.sourceType})
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    value={sourceType}
                    onChange={handleSourceTypeChange}
                    className={`w-full bg-white border ${
                      errors.sourceType ? "border-red-500" : "border-gray-300"
                    } text-gray-700 py-2 px-3 pr-8 rounded outline-blue-400 appearance-none`}
                  >
                    <option value="">Select Source Type</option>
                    <option value="Own">Own</option>
                    <option value="Others">Others</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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

            {/* Source Type Specific Fields */}
            {sourceType === "Others" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="flex items-center gap-2 font-semibold text-sm">
                    Source Name <span className="text-red-600">*</span>
                    {errors.source_name && (
                      <span className="text-red-600 text-xs">
                        ({errors.source_name})
                      </span>
                    )}
                  </label>
                  <input
                    type="text"
                    placeholder="Enter source name..."
                    className={`w-full border ${
                      errors.source_name ? "border-red-500" : "border-gray-300"
                    } py-2 px-3 rounded outline-blue-400`}
                    value={source_type?.other?.source_name || ""}
                    onChange={(e) =>
                      handleSourceTypeValue(
                        "other",
                        "source_name",
                        e.target.value
                      )
                    }
                  />
                </div>
                <div className="space-y-1">
                  <label className="flex items-center gap-2 font-semibold text-sm">
                    Source URL <span className="text-red-600">*</span>
                    {errors.source_url && (
                      <span className="text-red-600 text-xs">
                        ({errors.source_url})
                      </span>
                    )}
                  </label>
                  <input
                    type="url"
                    placeholder="Enter source URL..."
                    className={`w-full border ${
                      errors.source_url ? "border-red-500" : "border-gray-300"
                    } py-2 px-3 rounded outline-blue-400`}
                    value={source_type?.other?.source_url || ""}
                    onChange={(e) =>
                      handleSourceTypeValue(
                        "other",
                        "source_url",
                        e.target.value
                      )
                    }
                  />
                </div>
              </div>
            )}

            {sourceType === "Own" && (
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Write Article <span className="text-red-600">*</span>
                  {errors.my_article && (
                    <span className="text-red-600 text-xs">
                      ({errors.my_article})
                    </span>
                  )}
                </label>

                {/* ReactQuill Editor */}
                <div
                  className={`${
                    errors.my_article ? "border border-red-500 rounded" : ""
                  }`}
                >
                  <ReactQuill
                    theme="snow"
                    value={source_type?.own?.my_article || ""}
                    onChange={handleEditorChange}
                    modules={quillModules}
                    formats={quillFormats}
                    style={{ height: "200px", marginBottom: "50px" }}
                    placeholder="Write your article content here..."
                  />
                </div>
              </div>
            )}

            {/* News Image Type */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 font-semibold text-sm">
                News Image Type <span className="text-red-600">*</span>
                {errors.imageType && (
                  <span className="text-red-600 text-xs">
                    ({errors.imageType})
                  </span>
                )}
              </label>
              <div className="relative">
                <select
                  value={imageType}
                  onChange={handleImageTypeChange}
                  className={`w-full bg-white border ${
                    errors.imageType ? "border-red-500" : "border-gray-300"
                  } text-gray-700 py-2 px-3 pr-8 rounded outline-blue-400 appearance-none`}
                >
                  <option value="">Select Image Type</option>
                  <option value="url">URL</option>
                  <option value="image">Upload Image</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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

            {/* Image URL Field */}
            {imageType === "url" && (
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Image URL <span className="text-red-600">*</span>
                  {errors.image_url && (
                    <span className="text-red-600 text-xs">
                      ({errors.image_url})
                    </span>
                  )}
                </label>
                <input
                  type="url"
                  placeholder="Enter image URL..."
                  className={`w-full border ${
                    errors.image_url ? "border-red-500" : "border-gray-300"
                  } py-2 px-3 rounded outline-blue-400`}
                  value={image_url}
                  onChange={handleImageUrlChange}
                />
              </div>
            )}

            {/* Image Upload Field */}
            {imageType === "image" && (
              <div className="space-y-2">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Upload Image <span className="text-red-600">*</span>
                  {errors.image_file && (
                    <span className="text-red-600 text-xs">
                      ({errors.image_file})
                    </span>
                  )}
                </label>
                <div
                  className={`w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    dragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  } ${errors.image_file ? "border-red-500" : ""}`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-2">
                    <div className="text-gray-600">
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
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Drag and drop image here
                      </p>
                      <p className="text-xs text-gray-500">or</p>
                    </div>
                    <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors">
                      <span>Browse Files</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="text-xs text-orange-600">Maximum size: 1MB</p>
                  </div>
                </div>
              </div>
            )}

            {/* Image Preview */}
            {imagePreview && (
              <div className="space-y-2">
                <label className="font-semibold text-sm">Image Preview:</label>
                <div className="border rounded-lg p-2 bg-gray-50">
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

            {/* Publish Date and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Publish Date */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Publish Date <span className="text-red-600">*</span>
                  {errors.publish_date && (
                    <span className="text-red-600 text-xs">
                      ({errors.publish_date})
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  placeholder="MM/DD/YYYY, HH:MM AM/PM"
                  className={`w-full border ${
                    errors.publish_date ? "border-red-500" : "border-gray-300"
                  } py-2 px-3 rounded outline-blue-400`}
                  value={publish_date}
                  onChange={handlePublishDateChange}
                  readOnly
                />
                <p className="text-xs text-gray-500">
                  Current date and time is automatically set
                </p>
              </div>

              {/* Status Field */}
              <div className="space-y-1">
                <label className="flex items-center gap-2 font-semibold text-sm">
                  Status <span className="text-red-600">*</span>
                  {errors.status && (
                    <span className="text-red-600 text-xs">
                      ({errors.status})
                    </span>
                  )}
                </label>
                <div className="relative">
                  <select
                    value={status}
                    onChange={(e) => {
                      setData({ ...data, status: e.target.value });
                      setErrors({ ...errors, status: "" });
                    }}
                    className={`w-full bg-white border ${
                      errors.status ? "border-red-500" : "border-gray-300"
                    } text-gray-700 py-2 px-3 pr-8 rounded outline-blue-400 appearance-none`}
                  >
                    <option value="">Select Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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

            {/* Submit Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isClicked}
                className={`px-6 py-2 font-semibold text-sm text-white rounded-md shadow transition-colors ${
                  isClicked
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {isClicked ? "Updating..." : "Update News"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
};

export default AddNews;
