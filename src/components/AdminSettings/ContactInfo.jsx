// // const ContactInfo = ({ data, childFunction }) => {
// //   return (
// //     <>
// //       <div className="w-full flex flex-col m-3">
// //         <h2 className="font-semibold">Logo & Icon</h2>

// //         <div className="mt-4">
// //           <div className="text-sm flex flex-col w-full gap-1">
// //             <label className="font-semibold text-xs">Email</label>
// //             <input
// //               type="text"
// //               className="w-[95%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
// //               placeholder="Type something here..."
// //               name="email"
// //               value={data?.email}
// //               onChange={(e) => childFunction(e)}
// //             />
// //           </div>
// //         </div>

// //         <div className="mt-3 text-sm flex flex-col w-full gap-1">
// //           <label className="font-semibold text-xs">Phone</label>
// //           <input
// //             type="text"
// //             className="w-[95%] appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-xs"
// //             placeholder="Type something here..."
// //             name="phone"
// //             value={data?.phone}
// //             onChange={(e) => childFunction(e)}
// //           />
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default ContactInfo;

// "use client";

// import { useState } from "react";

// const ContactInfo = ({ data, childFunction }) => {
//   const [logoFile, setLogoFile] = useState(null);
//   const [iconFile, setIconFile] = useState(null);

//   const handleFileChange = (e, fileType) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (fileType === "logo") {
//         setLogoFile(file);
//         childFunction({ target: { name: "logo", value: file } });
//       } else {
//         setIconFile(file);
//         childFunction({ target: { name: "icon", value: file } });
//       }
//     }
//   };

//   const handleDrop = (e, fileType) => {
//     e.preventDefault();
//     const file = e.dataTransfer.files[0];
//     if (file) {
//       if (fileType === "logo") {
//         setLogoFile(file);
//         childFunction({ target: { name: "logo", value: file } });
//       } else {
//         setIconFile(file);
//         childFunction({ target: { name: "icon", value: file } });
//       }
//     }
//   };

//   const handleDragOver = (e) => {
//     e.preventDefault();
//   };

//   return (
//     <>
//       <div className="w-full flex flex-col m-3">
//         <h2 className="font-semibold">Logo & Icon</h2>

//         <div className="mt-4 flex flex-col md:flex-row gap-4">
//           <div className="w-full md:w-1/2">
//             <p className="font-semibold text-xs mb-2">Site Logo</p>
//             <div
//               className="border border-dashed border-gray-300 rounded-md p-6 bg-green-50 flex flex-col items-center justify-center"
//               onDrop={(e) => handleDrop(e, "logo")}
//               onDragOver={handleDragOver}
//             >
//               <p className="text-gray-600 text-sm">Drag & Drop Image here</p>
//               <div className="my-2 flex items-center">
//                 <div className="h-px bg-gray-300 w-12"></div>
//                 <span className="mx-2 text-gray-500 text-sm">OR</span>
//                 <div className="h-px bg-gray-300 w-12"></div>
//               </div>
//               <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer text-sm">
//                 BROWSE FILE
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, "logo")}
//                 />
//               </label>
//               <p className="text-orange-500 text-xs mt-2">Maximum Size: 1MB</p>
//               {logoFile && (
//                 <p className="text-xs mt-2 text-gray-600">
//                   Selected: {logoFile.name}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="w-full md:w-1/2">
//             <p className="font-semibold text-xs mb-2">Site Icon</p>
//             <div
//               className="border border-dashed border-gray-300 rounded-md p-6 bg-green-50 flex flex-col items-center justify-center"
//               onDrop={(e) => handleDrop(e, "icon")}
//               onDragOver={handleDragOver}
//             >
//               <p className="text-gray-600 text-sm">Drag & Drop Image here</p>
//               <div className="my-2 flex items-center">
//                 <div className="h-px bg-gray-300 w-12"></div>
//                 <span className="mx-2 text-gray-500 text-sm">OR</span>
//                 <div className="h-px bg-gray-300 w-12"></div>
//               </div>
//               <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer text-sm">
//                 BROWSE FILE
//                 <input
//                   type="file"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={(e) => handleFileChange(e, "icon")}
//                 />
//               </label>
//               <p className="text-orange-500 text-xs mt-2">Maximum Size: 1MB</p>
//               {iconFile && (
//                 <p className="text-xs mt-2 text-gray-600">
//                   Selected: {iconFile.name}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ContactInfo;

import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

const ContactInfo = ({ data, childFunction }) => {
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [iconFile, setIconFile] = useState(null);
  const [iconPreview, setIconPreview] = useState(null);

  useEffect(() => {
    // Clean up URLs when component unmounts
    return () => {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      if (iconPreview) URL.revokeObjectURL(iconPreview);
    };
  }, [logoPreview, iconPreview]);

  const handleFileChange = (e, fileType) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelection(file, fileType);
    }
  };

  const handleDrop = (e, fileType) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelection(file, fileType);
    }
  };

  const handleFileSelection = (file, fileType) => {
    if (fileType === "logo") {
      setLogoFile(file);
      setLogoPreview(URL.createObjectURL(file));
      childFunction({ target: { name: "logo", value: file } });
    } else {
      setIconFile(file);
      setIconPreview(URL.createObjectURL(file));
      childFunction({ target: { name: "icon", value: file } });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDelete = (fileType) => {
    if (fileType === "logo") {
      if (logoPreview) URL.revokeObjectURL(logoPreview);
      setLogoFile(null);
      setLogoPreview(null);
      childFunction({ target: { name: "logo", value: null } });
    } else {
      if (iconPreview) URL.revokeObjectURL(iconPreview);
      setIconFile(null);
      setIconPreview(null);
      childFunction({ target: { name: "icon", value: null } });
    }
  };

  const renderUploadArea = (fileType) => {
    const isLogo = fileType === "logo";
    const file = isLogo ? logoFile : iconFile;
    const preview = isLogo ? logoPreview : iconPreview;

    if (file && preview) {
      return (
        <div className="border rounded-md p-2 relative">
          <div className="flex items-center">
            <div className="w-16 h-16 overflow-hidden mr-2">
              <img
                src={preview || "/placeholder.svg"}
                alt={`${fileType} preview`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-sm">{file.name}</div>
            <button
              onClick={() => handleDelete(fileType)}
              className="ml-auto p-2 text-red-500 hover:text-red-700"
              aria-label={`Delete ${fileType}`}
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        className="border border-dashed border-gray-300 rounded-md p-6 bg-green-50 flex flex-col items-center justify-center"
        onDrop={(e) => handleDrop(e, fileType)}
        onDragOver={handleDragOver}
      >
        <p className="text-gray-600 text-sm">Drag & Drop Image here</p>
        <div className="my-2 flex items-center">
          <div className="h-px bg-gray-300 w-12"></div>
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <div className="h-px bg-gray-300 w-12"></div>
        </div>
        <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer text-sm">
          BROWSE FILE
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e, fileType)}
          />
        </label>
        <p className="text-orange-500 text-xs mt-2">Maximum Size: 1MB</p>
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col m-3">
      <h2 className="font-semibold text-lg mb-4">Logo & Icon</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="font-semibold text-sm mb-2">Site Logo</p>
          {renderUploadArea("logo")}
        </div>

        <div>
          <p className="font-semibold text-sm mb-2">Site Icon</p>
          {renderUploadArea("icon")}
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
