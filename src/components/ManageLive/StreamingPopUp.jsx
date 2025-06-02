// 1-----code----comment
// import React, { useEffect } from "react";
// import { Dialog } from "@headlessui/react";
// import { FaTimes } from "react-icons/fa";
// import { format } from "date-fns";
// import { MdDragIndicator } from "react-icons/md";

// const StreamingPopUp = ({ isOpen, onClose, match }) => {
//   // Disable background scrolling when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isOpen]);

//   // If no match is provided, don't render
//   if (!match) return null;

//   console.log("streaming-console", match);
//   return (
//     <Dialog
//       open={isOpen}
//       onClose={() => {}} // Prevent closing by clicking outside
//       className="fixed inset-0 z-50"
//     >
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black/20" />

//       {/* Modal Container */}
//       <div className="fixed inset-0 flex items-center justify-center p-4">
//         <Dialog.Panel className="bg-white rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/3 max-w-xl relative">
//           {/* Header */}
//           <div className="flex justify-between items-center p-2 border-b bg-[#fbfbfb] rounded-md">
//             <Dialog.Title className="text-base font-semibold text-gray-800 p-1">
//               Sort Streaming Sources
//             </Dialog.Title>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-red-500 p-1 rounded-full"
//             >
//               <FaTimes className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Match Details */}
//           <div className="flex flex-col md:flex-row justify-around items-center p-4">
//             {/* Team 1 */}
//             <div className="flex flex-col items-center mb-4 md:mb-0">
//               <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-md border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={match.team_one_img || "/placeholder.svg"}
//                   alt={match.team_one}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <h4 className="mt-2 text-sm font-medium text-center">
//                 {match.team_one}
//               </h4>
//             </div>

//             {/* Match Info */}
//             <div className="flex flex-col text-center mx-4 mb-4 md:mb-0">
//               <h3 className="text-sm font-semibold uppercase">
//                 {match.league_type
//                   ? match.league_type.split("-").join(" ")
//                   : ""}
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 {match.match_time
//                   ? format(new Date(match.match_time), "MMMM do yyyy")
//                   : format(new Date(), "MMMM do yyyy")}
//               </p>
//               <p className="text-gray-600 text-sm">
//                 {match.match_time
//                   ? format(new Date(match.match_time), "h:mm a")
//                   : ""}
//               </p>
//             </div>

//             {/* Team 2 */}
//             <div className="flex flex-col items-center">
//               <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-md border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={match.team_two_img || "/placeholder.svg"}
//                   alt={match.team_two}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <h4 className="mt-2 text-sm font-medium text-center">
//                 {match.team_two}
//               </h4>
//             </div>
//           </div>

//           {/* Streaming links */}
//           <div className="px-4 pb-6 space-y-4">
//             {match.streaming_source.streaming_source.map((stream, index) => (
//               <div
//                 key={index}
//                 className="border-[1.5px] border-[#c4b5fd] rounded-lg p-1"
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <div>
//                       <span className="font-semibold text-sm text-black">
//                         Stream Title:{" "}
//                       </span>
//                       <span className="text-xs text-[#101928]">
//                         {stream.streaming_title}
//                       </span>
//                     </div>
//                     <div>
//                       <span className="font-semibold text-sm text-[#101928]">
//                         Link:{" "}
//                       </span>
//                       <span className="text-xs font-normal text-black">
//                         {stream.stream_url}
//                       </span>
//                     </div>
//                   </div>
//                   <button className="text-[#0e1726] p-1 pt-6">
//                     <MdDragIndicator className="w-5 h-5" />
//                   </button>
//                 </div>
//                 <div className="mt-1 flex gap-3">
//                   <span className="bg-[#00a0e9] text-white rounded-sm px-1 py-1 text-xs">
//                     {stream.stream_type}
//                   </span>
//                   <span className="bg-[#4cd964] text-white rounded-sm px-1 py-1 text-xs">
//                     {stream.status}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// };

// export default StreamingPopUp;

// 2---code---comment--
// import React, { useEffect, useState } from "react";
// import { Dialog } from "@headlessui/react";
// import { FaTimes } from "react-icons/fa";
// import { format } from "date-fns";
// import { MdDragIndicator } from "react-icons/md";
// import { Reorder } from "framer-motion";

// const StreamingPopUp = ({ isOpen, onClose, match }) => {
//   const [streams, setStreams] = useState([]);

//   // Disable background scrolling when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "auto";
//     }
//   }, [isOpen]);

//   // Load streaming sources when match is provided
//   useEffect(() => {
//     if (match?.streaming_source?.streaming_source) {
//       setStreams(match.streaming_source.streaming_source);
//     }
//   }, [match]);

//   // If no match is provided, don't render
//   if (!match) return null;

//   return (
//     <Dialog open={isOpen} onClose={() => {}} className="fixed inset-0 z-50">
//       {/* Overlay */}
//       <div className="fixed inset-0 bg-black/20" />

//       {/* Modal Container */}
//       <div className="fixed inset-0 flex items-center justify-center p-4">
//         <Dialog.Panel className="bg-white rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 max-w-xl relative">
//           {/* Header */}
//           <div className="flex justify-between items-center p-2 border-b bg-[#fbfbfb] rounded-md">
//             <Dialog.Title className="text-base font-semibold text-gray-800 p-1">
//               Sort Streaming Sources
//             </Dialog.Title>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-red-500 p-1 rounded-full"
//             >
//               <FaTimes className="w-5 h-5" />
//             </button>
//           </div>

//           {/* Match Details */}
//           <div className="flex flex-col md:flex-row justify-around items-center p-4">
//             {/* Team 1 */}
//             <div className="flex flex-col items-center mb-4 md:mb-0">
//               <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-md border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={match.team_one_img || "/placeholder.svg"}
//                   alt={match.team_one}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <h4 className="mt-2 text-sm font-medium text-center">
//                 {match.team_one}
//               </h4>
//             </div>

//             {/* Match Info */}
//             <div className="flex flex-col text-center mx-4 mb-4 md:mb-0">
//               <h3 className="text-sm font-semibold uppercase">
//                 {match.league_type
//                   ? match.league_type.split("-").join(" ")
//                   : ""}
//               </h3>
//               <p className="text-gray-600 text-sm">
//                 {match.match_time
//                   ? format(new Date(match.match_time), "MMMM do yyyy")
//                   : format(new Date(), "MMMM do yyyy")}
//               </p>
//               <p className="text-gray-600 text-sm">
//                 {match.match_time
//                   ? format(new Date(match.match_time), "h:mm a")
//                   : ""}
//               </p>
//             </div>

//             {/* Team 2 */}
//             <div className="flex flex-col items-center">
//               <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-md border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
//                 <img
//                   src={match.team_two_img || "/placeholder.svg"}
//                   alt={match.team_two}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//               <h4 className="mt-2 text-sm font-medium text-center">
//                 {match.team_two}
//               </h4>
//             </div>
//           </div>

//           {/* Streaming links - Draggable */}
//           <div className="px-4 pb-6 space-y-4">
//             <Reorder.Group
//               values={streams}
//               onReorder={setStreams}
//               className="space-y-2"
//               axis="y"
//             >
//               {streams.map((stream, index) => (
//                 <Reorder.Item
//                   key={stream.stream_url}
//                   value={stream}
//                   className="border-[1.5px] border-[#c4b5fd] rounded-lg p-2 cursor-grab"
//                 >
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <div>
//                         <span className="font-semibold text-sm text-black">
//                           Stream Title:
//                         </span>
//                         <span className="text-xs text-[#101928]">
//                           {stream.streaming_title}
//                         </span>
//                       </div>
//                       <div>
//                         <span className="font-semibold text-sm text-[#101928]">
//                           Link :
//                         </span>
//                         <span className="text-xs font-normal text-black">
//                           {stream.stream_url}
//                         </span>
//                       </div>
//                     </div>
//                     <button className="text-[#0e1726] p-1 pt-6 cursor-grab">
//                       <MdDragIndicator className="w-5 h-5" />
//                     </button>
//                   </div>
//                   <div className="mt-1 flex gap-3">
//                     <span className="bg-[#00a0e9] text-white rounded-sm px-1 py-1 text-xs">
//                       {stream.stream_type}
//                     </span>
//                     <span className="bg-[#4cd964] text-white rounded-sm px-1 py-1 text-xs">
//                       {stream.status}
//                     </span>
//                   </div>
//                 </Reorder.Item>
//               ))}
//             </Reorder.Group>
//           </div>
//         </Dialog.Panel>
//       </div>
//     </Dialog>
//   );
// };

// export default StreamingPopUp;

import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { FaTimes } from "react-icons/fa";
import { format } from "date-fns";
import { MdDragIndicator } from "react-icons/md";
import { Reorder } from "framer-motion";

const StreamingPopUp = ({ isOpen, onClose, match }) => {
  const [streams, setStreams] = useState([]);

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  // Load streaming sources when match is provided
  useEffect(() => {
    if (match?.streaming_source?.streaming_source) {
      setStreams(match.streaming_source.streaming_source);
    }
  }, [match]);

  // If no match is provided, don't render
  if (!match) return null;

  return (
    <Dialog open={isOpen} onClose={() => {}} className="fixed inset-0 z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/20" />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg w-full md:w-2/3 lg:w-1/2 max-w-xl relative">
          {/* Header */}
          <div className="flex justify-between items-center p-2 border-b bg-[#fbfbfb] rounded-md">
            <Dialog.Title className="text-base font-semibold text-gray-800 p-1">
              Sort Streaming Sources
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-red-500 p-1 rounded-full"
            >
              <FaTimes className="w-5 h-5" />
            </button>
          </div>

          {/* Match Details */}
          <div className="flex flex-col md:flex-row justify-around items-center p-4">
            {/* Team 1 */}
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-md border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={match.team_one_img || "/placeholder.svg"}
                  alt={match.team_one}
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="mt-2 text-sm font-medium text-center">
                {match.team_one}
              </h4>
            </div>

            {/* Match Info */}
            <div className="flex flex-col text-center mx-4 mb-4 md:mb-0">
              <h3 className="text-sm font-semibold uppercase">
                {match.league_type
                  ? match.league_type.split("-").join(" ")
                  : ""}
              </h3>
              <p className="text-gray-600 text-sm">
                {match.match_time
                  ? format(new Date(match.match_time), "MMMM do yyyy")
                  : format(new Date(), "MMMM do yyyy")}
              </p>
              <p className="text-gray-600 text-sm">
                {match.match_time
                  ? format(new Date(match.match_time), "h:mm a")
                  : ""}
              </p>
            </div>

            {/* Team 2 */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-md border border-gray-100 p-2 flex items-center justify-center overflow-hidden">
                <img
                  src={match.team_two_img || "/placeholder.svg"}
                  alt={match.team_two}
                  className="w-full h-full object-contain"
                />
              </div>
              <h4 className="mt-2 text-sm font-medium text-center">
                {match.team_two}
              </h4>
            </div>
          </div>

          {/* Streaming links - Draggable */}
          <div className="px-4 pb-6 space-y-4">
            <Reorder.Group
              values={streams}
              onReorder={setStreams}
              className="space-y-2"
              axis="y"
            >
              {streams.map((stream) => (
                <Reorder.Item
                  key={stream.stream_url}
                  value={stream}
                  className="border-[1.5px] border-[#c4b5fd] rounded-lg p-2 cursor-grab"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div>
                        <span className="font-semibold text-sm text-black">
                          Stream Title:
                        </span>
                        <span className="text-xs text-[#101928]">
                          {stream.streaming_title}
                        </span>
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-[#101928]">
                          Link :
                        </span>
                        <span className="text-xs font-normal text-black">
                          {stream.stream_url}
                        </span>
                      </div>
                    </div>
                    <button className="text-[#0e1726] p-1 pt-6 cursor-grab">
                      <MdDragIndicator className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="mt-1 flex gap-3">
                    <span className="bg-[#00a0e9] text-white rounded-sm px-1 py-1 text-xs">
                      {stream.stream_type}
                    </span>
                    {/* <span className="bg-[#4cd964] text-white rounded-sm px-1 py-1 text-xs">
                      {stream.status}
                    </span> */}
                    <span
                      className={`${
                        stream.status === "active"
                          ? "bg-[#4cd964]"
                          : "bg-[#f87171]"
                      } text-white rounded-sm px-1 py-1 text-xs`}
                    >
                      {stream.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default StreamingPopUp;
