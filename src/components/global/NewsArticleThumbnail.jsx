// import { LuPencilLine } from "react-icons/lu";
// import { MdOutlineEditNote } from "react-icons/md";
// import { MdDelete } from "react-icons/md";
// import { Link } from "react-router-dom";
// import { deleteSingleNews } from "../../Api";
// import { toast } from "react-toastify";

// const NewsArticleThumbnail = ({ isGrid, data }) => {
//   console.log(data);
//   const handleDelete = async (id) => {
//     const res = await deleteSingleNews(id);
//     if (res?.data?.success) {
//       toast.success(`${res.data?.message}`, {
//         position: "top-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//     }
//     window.location.reload();
//   };
//   // const hanldeEdit = (id) => {
//   //   navigation(`/manage-live/edit/${id}`);
//   // };

//   if (isGrid) {
//     return (
//       <div
//         id="card"
//         className="shadow-md h-[370px] w-[230px] bg-gray-200 rounded-md flex flex-col   "
//       >
//         <div className="rounded-t-md   p-3">
//           {data?.image_url ? (
//             <img
//               src={data?.image_url}
//               alt={`${data?.title}`}
//               className="w-full h-[160px]  object-fill rounded-md overflow-hidden  "
//             />
//           ) : (
//             <img
//               src={`${import.meta.env.VITE_BASE_API_URL}/${data?.image}`}
//               alt="news-1"
//               className="w-full h-[160px]  object-fill rounded-md overflow-hidden  "
//             />
//           )}
//         </div>
//         <div className=" mx-2 flex flex-col text-center h-full ">
//           <h3 className="text-gray-600 font-light text-sm ">
//             <span className="text-black font-light text-xs">Title:</span>{" "}
//             {data?.title}
//           </h3>
//           <div className=" m-2 flex justify-center ">
//             <div className=" bg-green-400 rounded-md p-2 text-center">
//               <p className="text-xs text-white">{data?.status}</p>
//             </div>
//           </div>

//           <div className="m-1 flex justify-center gap-2 ">
//             <div className="p-2 bg-orange-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:text-white">
//               <Link to={`/admin/news/edit-news/${data?._id}`}>
//                 <MdOutlineEditNote className="text-xl" />
//               </Link>
//             </div>
//             <div
//               onClick={() => {
//                 handleDelete(data._id);
//               }}
//               className="p-2 bg-red-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:text-white"
//             >
//               <MdDelete className="text-xl" />
//             </div>
//           </div>

//           <div className="h-full flex justify-center items-start m-2">
//             <h4 className="text-xs items-end">
//               <span className="font-normal">Category:</span> {data?.category}
//             </h4>
//             <LuPencilLine className="text-green-400 text-lg hover:text-green-600 transition-colors ml-1" />
//           </div>
//         </div>
//       </div>
//     );
//   } else {
//     return (
//       <div className="mt-2 bg-gray-200 w-full rounded-md shadow-md flex justify-between">
//         <div className="rounded-md w-max">
//           {data?.image_url ? (
//             <img
//               src={data?.image_url}
//               alt={data?.title}
//               className="w-[170px] h-[90px]  rounded-l-lg object-fill"
//             />
//           ) : (
//             <img
//               src={`${import.meta.env.VITE_BASE_API_URL}/${data?.image}`}
//               alt="news-1"
//               className="w-[220px] h-[150px] rounded-md object-fill"
//             />
//           )}
//         </div>
//         <div id="news-info" className="p-3 flex justify-around w-full">
//           <div className="h-full flex flex-col justify-between max-w-[40%]">
//             <h3 className="text-gray-900 text-sm font-medium">
//               Title: <span className="uppercase text-sm">{data.title}</span>
//             </h3>
//             <div className="flex gap-2 min-w-[200px]">
//               <h4 className="text-xs font-medium">
//                 <span className="font-normal">Category:</span> {data?.category}
//               </h4>
//               <LuPencilLine className="text-green-400 text-base hover:text-green-600 transition-colors" />
//             </div>
//           </div>
//           <div className="flex flex-col justify-center items-center w-full">
//             {/* <p className="font-semibold">Publish Date</p> */}
//             <p className="text-center text-gray-600 text-sm font-semibold">
//               {data?.publish_date}
//             </p>
//           </div>

//           <div className="flex items-center">
//             {data?.status === "active" ? (
//               <div className=" bg-green-400 rounded-md p-1 text-center">
//                 <p className="text-xs text-white uppercase font-semibold">
//                   {data?.status}
//                 </p>
//               </div>
//             ) : (
//               <div className=" bg-red-400 rounded-md p-1 text-center">
//                 <p className="text-xs text-white uppercase font-semibold">
//                   {data?.status}
//                 </p>
//               </div>
//             )}
//           </div>

//           <div className="ml-20 flex items-center gap-2">
//             <Link to={`/admin/news/edit-news/${data?._id}`}>
//               <div className="p-2 bg-orange-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:text-white">
//                 <MdOutlineEditNote className="text-xl" />
//               </div>
//             </Link>
//             <div
//               onClick={() => {
//                 handleDelete(data._id);
//               }}
//               className="p-2 bg-red-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:text-white"
//             >
//               <MdDelete className="text-xl" />
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// };

// export default NewsArticleThumbnail;

"use client";

import { useState } from "react";
import { LuPencilLine } from "react-icons/lu";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteSingleNews } from "../../Api";
import { toast } from "react-toastify";

const NewsArticleThumbnail = ({ isGrid, data }) => {
  console.log(data);

  // State for confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    setIsDeleting(true);

    try {
      const res = await deleteSingleNews(data._id);
      if (res?.data?.success) {
        toast.success(res.data?.message || "News deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // Close modal and reload page
        setShowDeleteModal(false);
        window.location.reload();
      } else {
        toast.error(res?.data?.message || "Failed to delete news");
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      toast.error("An error occurred while deleting the news");
    } finally {
      setIsDeleting(false);
    }
  };

  // Confirmation Modal Component
  const DeleteConfirmationModal = () => {
    if (!showDeleteModal) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">
              Confirm Delete
            </h3>
            <button
              onClick={handleCancelDelete}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isDeleting}
            >
              <MdClose className="text-xl" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0 w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                <MdDelete className="text-red-600 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-600">
                  Are you sure you want to delete this news article?
                </p>
              </div>
            </div>

            {/* Article Info */}
            <div className="bg-gray-50 rounded-md p-3 mb-4">
              <p className="text-sm font-medium text-gray-900 mb-1">
                Title: {data?.title}
              </p>
              <p className="text-xs text-gray-600">
                Category: {data?.category}
              </p>
              <p className="text-xs text-gray-600">Status: {data?.status}</p>
            </div>

            <p className="text-sm text-red-600 font-medium">
              This action cannot be undone.
            </p>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end gap-3 p-4 border-t bg-gray-50 rounded-b-lg">
            <button
              onClick={handleCancelDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isDeleting ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Deleting...
                </div>
              ) : (
                "Delete"
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (isGrid) {
    return (
      <>
        <div
          id="card"
          className="shadow-md h-[370px] w-[230px] bg-gray-200 rounded-md flex flex-col"
        >
          <div className="rounded-t-md p-3">
            {data?.image_url ? (
              <img
                src={data?.image_url || "/placeholder.svg"}
                alt={data?.title}
                className="w-full h-[160px] object-fill rounded-md overflow-hidden"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_BASE_API_URL}/${data?.image}`}
                alt="news-1"
                className="w-full h-[160px] object-fill rounded-md overflow-hidden"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
          </div>
          <div className="mx-2 flex flex-col text-center h-full">
            <h3 className="text-gray-600 font-light text-sm">
              <span className="text-black font-light text-xs">Title:</span>{" "}
              {data?.title}
            </h3>
            <div className="m-2 flex justify-center">
              <div
                className={`rounded-md p-2 text-center ${
                  data?.status === "active" ? "bg-green-400" : "bg-red-400"
                }`}
              >
                <p className="text-xs text-white uppercase font-semibold">
                  {data?.status}
                </p>
              </div>
            </div>

            <div className="m-1 flex justify-center gap-2">
              <div className="p-2 bg-orange-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:bg-orange-600 transition-colors">
                <Link to={`/admin/news/edit-news/${data?._id}`}>
                  <MdOutlineEditNote className="text-xl text-white" />
                </Link>
              </div>
              <div
                onClick={handleDeleteClick}
                className="p-2 bg-red-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:bg-red-600 transition-colors"
              >
                <MdDelete className="text-xl text-white" />
              </div>
            </div>

            <div className="h-full flex justify-center items-start m-2">
              <h4 className="text-xs items-end">
                <span className="font-normal">Category:</span> {data?.category}
              </h4>
              <LuPencilLine className="text-green-400 text-lg hover:text-green-600 transition-colors ml-1" />
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal />
      </>
    );
  } else {
    return (
      <>
        <div className="mt-2 bg-gray-200 w-full rounded-md shadow-md flex justify-between">
          <div className="rounded-md w-max">
            {data?.image_url ? (
              <img
                src={data?.image_url || "/placeholder.svg"}
                alt={data?.title}
                className="w-[170px] h-[90px] rounded-l-lg object-fill"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_BASE_API_URL}/${data?.image}`}
                alt="news-1"
                className="w-[220px] h-[150px] rounded-md object-fill"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}
          </div>
          <div id="news-info" className="p-3 flex justify-around w-full">
            <div className="h-full flex flex-col justify-between max-w-[40%]">
              <h3 className="text-gray-900 text-sm font-medium">
                Title: <span className="uppercase text-sm">{data.title}</span>
              </h3>
              <div className="flex gap-2 min-w-[200px]">
                <h4 className="text-xs font-medium">
                  <span className="font-normal">Category:</span>{" "}
                  {data?.category}
                </h4>
                <LuPencilLine className="text-green-400 text-base hover:text-green-600 transition-colors" />
              </div>
            </div>
            <div className="flex flex-col justify-center items-center w-full">
              <p className="text-center text-gray-600 text-sm font-semibold">
                {data?.publish_date}
              </p>
            </div>

            <div className="flex items-center">
              {data?.status === "active" ? (
                <div className="bg-green-400 rounded-md p-1 text-center">
                  <p className="text-xs text-white uppercase font-semibold">
                    {data?.status}
                  </p>
                </div>
              ) : (
                <div className="bg-red-400 rounded-md p-1 text-center">
                  <p className="text-xs text-white uppercase font-semibold">
                    {data?.status}
                  </p>
                </div>
              )}
            </div>

            <div className="ml-20 flex items-center gap-2">
              <Link to={`/admin/news/edit-news/${data?._id}`}>
                <div className="p-2 bg-orange-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:bg-orange-600 transition-colors">
                  <MdOutlineEditNote className="text-xl text-white" />
                </div>
              </Link>
              <div
                onClick={handleDeleteClick}
                className="p-2 bg-red-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:bg-red-600 transition-colors"
              >
                <MdDelete className="text-xl text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal />
      </>
    );
  }
};

export default NewsArticleThumbnail;
