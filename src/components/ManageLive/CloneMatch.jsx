// import Location from "../global/Location";
// import { useEffect, useState } from "react";
// import { getMatch, getThumbnail, createMatch } from "../../Api.js";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { FaRegArrowAltCircleUp } from "react-icons/fa";
// import Portal from "../pages/Portal.jsx";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/dark.css";
// import moment from "moment-timezone";
// import { toast } from "react-toastify";

// const CloneMatch = () => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const [localDate, setLocalDate] = useState("");
//   const [showRestrictedFields, setShowRestrictedFields] = useState(false);

//   const defaultPortraitWatermark = {
//     top: 1.1,
//     bottom: null,
//     left: null,
//     right: 1.1,
//     height: 2.0,
//     width: 10.0,
//     image: "http://windfootball.com/logo/logo1.png",
//   };

//   const [data, setData] = useState({
//     sport_type: "",
//     league_type: "",
//     match_title: "",
//     match_time: "",
//     fixture_id: "",
//     hot_match: false,
//     status: "active",
//     team_one: {
//       name: "",
//       image: "",
//     },
//     team_two: {
//       name: "",
//       image: "",
//     },
//     streaming_source: [
//       {
//         streaming_title: "Server SD",
//         is_premium: false,
//         resolution: "480p",
//         platform: "both",
//         portrait_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
//         landscape_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
//         status: "active",
//         stream_type: "",
//         stream_url: "",
//         stream_thumbnail: "",
//       },
//     ],
//   });

//   const { id } = useParams();

//   useEffect(() => {
//     try {
//       setLoading(true);
//       getSingleMatch();
//     } catch (err) {
//       setLoading(false);
//       console.error("Error: ", err);
//     } finally {
//       setLoading(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const {
//     sport_type,
//     league_type,
//     match_title,
//     match_time,
//     fixture_id,
//     hot_match,
//     status,
//     team_one,
//     team_two,
//     streaming_source,
//   } = data;

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setData((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleTeamChange = (team, e) => {
//     const { name, value } = e.target;

//     setData((prevState) => ({
//       ...prevState,
//       [team]: {
//         ...prevState[team],
//         [name]: value,
//       },
//     }));
//   };

//   const handleStreamingChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedStreamingSources = [...data.streaming_source];
//     updatedStreamingSources[index][name] = value;

//     // Check if stream_type is "Restricted"
//     if (name === "stream_type") {
//       setShowRestrictedFields(value === "restricted");
//     }

//     setData({
//       ...data,
//       streaming_source: updatedStreamingSources,
//     });
//   };

//   const addStreamingSource = (e) => {
//     e.preventDefault();
//     setData({
//       ...data,
//       streaming_source: [
//         ...data.streaming_source,
//         {
//           streaming_title: "Server SD",
//           is_premium: false,
//           resolution: "480p",
//           platform: "both",
//           portrait_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
//           landscape_watermark: JSON.stringify(
//             defaultPortraitWatermark,
//             null,
//             2
//           ),
//           status: "active",
//           stream_type: "",
//           stream_url: "",
//           stream_thumbnail: "",
//         },
//       ],
//     });
//   };

//   const navigation = useNavigate();

//   // set date handler
//   const handleDateChange = (selectedDates) => {
//     if (selectedDates.length > 0) {
//       const utcDate = moment(selectedDates[0]).utc();
//       setLocalDate(utcDate.toDate());
//       setData((prevData) => ({
//         ...prevData,
//         match_time: utcDate.toISOString(),
//       }));
//     }
//   };

//   // scroll to top button
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const formatTime = (time) => {
//     return moment.utc(time).format("YYYY-MM-DD HH:mm:ss [UTC]");
//   };

//   const getSingleMatch = async () => {
//     const res = await getMatch(id);
//     if (res?.data?.success) {
//       const value = res?.data?.match;
//       // Iterate through each element in the streaming_source array
//       value.streaming_source.forEach((source) => {
//         // Check if portrait_watermark exists and is a string
//         if (
//           source.portrait_watermark &&
//           typeof source.portrait_watermark === "string"
//         ) {
//           // Remove extra backslashes and parse JSON for portrait_watermark
//           const portraitWatermark = JSON.parse(
//             source.portrait_watermark.replace(/\\/g, "")
//           );
//           // Update portrait_watermark
//           source.portrait_watermark = JSON.stringify(
//             portraitWatermark,
//             null,
//             2
//           );
//         }

//         // Check if landscape_watermark exists and is a string
//         if (
//           source.landscape_watermark &&
//           typeof source.landscape_watermark === "string"
//         ) {
//           // Remove extra backslashes and parse JSON for landscape_watermark
//           const landscapeWatermark = JSON.parse(
//             source.landscape_watermark.replace(/\\/g, "")
//           );
//           // Update landscape_watermark
//           source.landscape_watermark = JSON.stringify(
//             landscapeWatermark,
//             null,
//             2
//           );
//         }
//       });

//       setData(value);
//       setLocalDate(value.match_time);
//     }
//   };

//   const validateFields = () => {
//     const validationArray = [];

//     if (data?.sport_type === "") {
//       validationArray.push("Sport Type");
//     }
//     if (data?.match_title === "") {
//       validationArray.push("Match Title");
//     }
//     if (data?.league_type === "") {
//       validationArray.push("League Type");
//     }
//     if (data?.match_time === "") {
//       validationArray.push("Match Time");
//     }
//     if (data?.team_one.name === "") {
//       validationArray.push("Team One");
//     }
//     if (data?.team_two.name === "") {
//       validationArray.push("Team Two");
//     }

//     if (validationArray.length !== 0)
//       return { status: false, data: validationArray };

//     return true;
//   };

//   // submits the form to the api
//   const handleSubmit = async () => {
//     setLoading(true);

//     const validationStatus = validateFields();
//     if (validationStatus !== true && !validationStatus.status) {
//       const missing = validationStatus.data.join(", ");
//       toast.error(`Missing fields: ${missing}`);
//       setLoading(false);
//       return false;
//     }

//     try {
//       const thumbdata = {
//         logo1: data.team_one.image,
//         name1: data.team_one.name,
//         logo2: data.team_two.image,
//         name2: data.team_two.name,
//         time: formatTime(data.match_time),
//       };

//       const thumbnail = await getThumbnail(thumbdata);

//       if (!thumbnail) {
//         toast.error(
//           `Thumbnail generation error, please check your team logo links`
//         );
//         setLoading(false);
//         return false;
//       }
//       const newData = { ...data, thumbnail: thumbnail };

//       const res = await createMatch(newData);
//       if (res?.data?.success) {
//         toast.success(`${res?.data?.message}`, {
//           position: "top-right",
//           autoClose: 1000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         navigation("/admin/manage-live");
//       }
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       console.log(error?.message);
//     }
//   };

//   return (
//     <>
//       <Portal>
//         <div className="relative w-full ">
//           <div className="h-max w-[95%]mx-auto rounded-md p-3 border">
//             <h2 className="py-2">
//               <Location location={location} />
//             </h2>
//             <div className="rounded-md p-3 border bg-[#fafafa]">
//               <form
//                 action="submit"
//                 id="match-info"
//                 className="w-full bg-[#fff] rounded-md p-2 border"
//               >
//                 <h2 className="font-semibold text-base p-1">
//                   Match Information
//                 </h2>

//                 <div className="flex gap-5 w-full">
//                   <div className="p-2 w-1/2">
//                     <label htmlFor="sports-type" className="text-xs font-bold">
//                       Sports Type <span className="text-red-500">*</span>
//                     </label>
//                     <div className="mt-2">
//                       <select
//                         className="border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
//                         name="sport_type"
//                         value={sport_type}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select a Sport</option>
//                         <option value="football">Football</option>
//                         <option value="sports">Sports</option>
//                       </select>
//                     </div>
//                   </div>
//                   <div className="p-2 w-1/2">
//                     <label htmlFor="sports-type" className="text-xs font-bold">
//                       League Type <span className="text-red-500">*</span>
//                     </label>
//                     <div className="mt-2 text-xs">
//                       <select
//                         className="border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full text-sm"
//                         name="league_type"
//                         value={league_type}
//                         onChange={handleChange}
//                       >
//                         <option value="">Select a League</option>
//                         <option value="friendlies">Friendlies</option>
//                         <option value="la-liga">La Liga</option>
//                         <option value="bundesliga">Bundesliga</option>
//                         <option value="uefa-champions-league">
//                           UEFA Champions League
//                         </option>
//                         <option value="ligue-1">Ligue 1</option>
//                         <option value="copa-del-rey">Copa del Rey</option>
//                         <option value="fa-cup">FA Cup</option>
//                         <option value="coppa-italia">Coppa Italia</option>
//                         <option value="coupe-de-france">Coupe de France</option>
//                         <option value="afc-champions-league">
//                           AFC Champions League
//                         </option>
//                         <option value="world-cup-qualification-asia">
//                           World Cup - Qualification Asia
//                         </option>
//                         <option value="uefa-europa-league">
//                           UEFA Europa League
//                         </option>
//                         <option value="dfb-pokal">DFB Pokal</option>
//                         <option value="premier-league">Premier League</option>
//                         <option value="arab-club-champions-cup">
//                           Arab Club Champions Cup
//                         </option>
//                         <option value="pro-league">Pro League</option>
//                         <option value="africa-cup-of-nations-qualification">
//                           Africa Cup of Nations - Qualification
//                         </option>
//                         <option value="world-cup-qualification-africa">
//                           World Cup - Qualification Africa
//                         </option>
//                         <option value="uefa-europa-conference-league">
//                           UEFA Europa Conference League
//                         </option>
//                         <option value="uefa-nations-league">
//                           UEFA Nations League
//                         </option>
//                         <option value="uefa-super-cup">UEFA Super Cup</option>
//                         <option value="kings-cup">King's Cup</option>
//                         <option value="eredivisie">Eredivisie</option>
//                         <option value="friendlies-clubs">
//                           Friendlies Clubs
//                         </option>
//                         <option value="serie-a">Serie A</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex gap-5 w-full">
//                   <div className="p-2 w-[33.3%]">
//                     <label htmlFor="sports-type" className="text-xs font-bold">
//                       Match Title <span className="text-red-500">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full block p-1 rounded-md border border-gray-200"
//                       name="match_title"
//                       value={match_title}
//                       onChange={handleChange}
//                     />
//                   </div>

//                   <div className="p-2 w-[33.3%] relative">
//                     <label htmlFor="sports-type" className="text-xs font-bold">
//                       Match Time <span className="text-red-500">*</span>
//                     </label>
//                     <Flatpickr
//                       className="border border-gray-300 cursor-pointer w-full rounded-md p-1 text-black"
//                       options={{
//                         enableTime: true,
//                         dateFormat: "Y-m-d H:i",
//                         time_24hr: true,
//                         utc: true,
//                       }}
//                       placeholder="YYYY-MM-DD HH:MM"
//                       value={localDate}
//                       onChange={handleDateChange}
//                     />
//                     {localDate && (
//                       <p className="text-xs mt-1">
//                         Selected UTC time:{" "}
//                         {moment.utc(localDate).format("YYYY-MM-DD HH:mm")} UTC
//                       </p>
//                     )}
//                   </div>

//                   <div className="p-2 w-[33.3%]">
//                     <label htmlFor="sports-type" className="text-xs font-bold">
//                       Fixture ID
//                     </label>
//                     <input
//                       type="text"
//                       className="w-full block p-1 rounded-md border border-gray-300"
//                       name="fixture_id"
//                       value={fixture_id}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 </div>

//                 <div className="flex gap-5">
//                   <div className="p-2 w-1/2">
//                     <label htmlFor="sports-type" className="text-xs font-bold">
//                       Is Hot Match? <span className="text-red-500">*</span>
//                     </label>
//                     <div className="mt-2">
//                       <select
//                         className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
//                         name="hot_match"
//                         value={hot_match}
//                         onChange={handleChange}
//                       >
//                         <option value={false}>No</option>
//                         <option value={true}>Yes</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="p-2 w-1/2">
//                     <label htmlFor="sports-type" className="text-xs font-bold">
//                       Status <span className="text-red-500">*</span>
//                     </label>
//                     <div className="mt-2">
//                       <select
//                         className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
//                         name="status"
//                         value={status}
//                         onChange={handleChange}
//                       >
//                         <option value="active">Active</option>
//                         <option value="inactive">Inactive</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>
//               </form>
//               <form
//                 action="submit"
//                 className="mt-3 w-full bg-white rounded-md px-2 py-4 flex border"
//               >
//                 <div className="p-3 border-r-2 border-gray-200 w-1/2">
//                   <h2 className="font-semibold text-base mb-4">Team One</h2>
//                   <label htmlFor="sports-type" className="text-xs font-bold">
//                     Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full block p-1 rounded-md border border-gray-200"
//                     name="name"
//                     value={team_one.name}
//                     onChange={(e) => handleTeamChange("team_one", e)}
//                   />

//                   <label htmlFor="sports-type" className="text-xs font-bold">
//                     Image URL
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full block p-1 rounded-md border border-gray-200"
//                     name="image"
//                     value={team_one.image}
//                     onChange={(e) => handleTeamChange("team_one", e)}
//                   />
//                 </div>

//                 <div className="p-3 w-1/2">
//                   <h2 className="font-semibold text-base mb-4">Team Two</h2>
//                   <label className="text-xs font-bold">
//                     Name <span className="text-red-500">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     className="w-full block p-1 rounded-md border border-gray-200"
//                     name="name"
//                     value={team_two.name}
//                     onChange={(e) => handleTeamChange("team_two", e)}
//                   />

//                   <label className="text-xs font-bold">Image URL</label>
//                   <input
//                     type="text"
//                     className="w-full block p-1 rounded-md border border-gray-200"
//                     name="image"
//                     value={team_two.image}
//                     onChange={(e) => handleTeamChange("team_two", e)}
//                   />
//                 </div>
//               </form>
//               <div className="flex gap-y-5 w-full">
//                 <div className="w-full flex justify-end flex-col py-10 ">
//                   {data.streaming_source.map((streaming, index) => (
//                     <div
//                       key={index}
//                       className="flex flex-col p-2 border border-gray-200 rounded-md"
//                     >
//                       <form
//                         action="submit"
//                         className="mt-3 w-full bg-white rounded-md border px-2 py-4 flex flex-col"
//                       >
//                         <h2 className="text-lg font-semibold p-1">
//                           Streaming Source
//                         </h2>
//                         <div className="flex flex-col p-2 border border-gray-200 rounded-md">
//                           <p className="p-1 text-[#00a6e5] text-xs font-semibold">
//                             Streaming Source: {index + 1}
//                           </p>
//                           <div className="p-3 flex gap-5 w-full">
//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="sports-type"
//                                 className="text-xs font-bold"
//                               >
//                                 Streaming Title
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 className="w-full block p-1 rounded-md border border-gray-200"
//                                 name="streaming_title"
//                                 value={streaming.streaming_title}
//                                 onChange={(e) =>
//                                   handleStreamingChange(e, index)
//                                 }
//                               />
//                             </div>

//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="sports-type"
//                                 className="text-xs font-bold"
//                               >
//                                 Is Premium?
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <div>
//                                 <select
//                                   className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
//                                   name="is_premium"
//                                   value={streaming.is_premium}
//                                   onChange={(e) =>
//                                     handleStreamingChange(e, index)
//                                   }
//                                 >
//                                   <option value={false}>No</option>
//                                   <option value={true}>Yes</option>
//                                 </select>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="p-3 flex gap-5">
//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="sports-type"
//                                 className="text-xs font-bold"
//                               >
//                                 Resolution{" "}
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <div>
//                                 <select
//                                   className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
//                                   name="resolution"
//                                   value={streaming?.resolution}
//                                   onChange={(e) =>
//                                     handleStreamingChange(e, index)
//                                   }
//                                 >
//                                   <option value="">Select One</option>
//                                   <option value="1080p">1080p</option>
//                                   <option value="720p">720p</option>
//                                   <option value="480p">480p</option>
//                                   <option value="360p">360p</option>
//                                 </select>
//                               </div>
//                             </div>

//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="sports-type"
//                                 className="text-xs font-bold"
//                               >
//                                 Platform <span className="text-red-500">*</span>
//                               </label>

//                               <div>
//                                 <select
//                                   className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
//                                   name="platform"
//                                   onChange={(e) =>
//                                     handleStreamingChange(e, index)
//                                   }
//                                   value={streaming?.platform}
//                                 >
//                                   <option value="">Both</option>
//                                   <option value="Android">Android</option>
//                                   <option value="iOS">iOS</option>
//                                 </select>
//                               </div>
//                             </div>
//                           </div>

//                           <div className="p-3 flex gap-5">
//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="potrait"
//                                 className="text-xs font-bold"
//                               >
//                                 Portrait Watermark(json)
//                               </label>
//                               <textarea
//                                 placeholder="Enter json object..."
//                                 className="block border border-gray-300 rounded-md p-2 w-full"
//                                 name="potrait_watermark"
//                                 rows={5}
//                                 value={streaming?.portrait_watermark}
//                                 onChange={(e) =>
//                                   handleStreamingChange(e, index)
//                                 }
//                               ></textarea>
//                             </div>

//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="landscape"
//                                 className="text-xs font-bold"
//                               >
//                                 Landscape Watermark(json)
//                               </label>
//                               <textarea
//                                 placeholder="Enter json object..."
//                                 className="block border border-gray-300 rounded-md p-2 w-full"
//                                 name="landscape_watermark"
//                                 rows={5}
//                                 value={streaming?.landscape_watermark}
//                                 onChange={(e) =>
//                                   handleStreamingChange(e, index)
//                                 }
//                               ></textarea>
//                             </div>
//                           </div>

//                           <div className="p-3 flex gap-5">
//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="sports-type"
//                                 className="text-xs font-bold"
//                               >
//                                 Status <span className="text-red-500">*</span>
//                               </label>
//                               <div>
//                                 <select
//                                   className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
//                                   name="status"
//                                   onChange={(e) =>
//                                     handleStreamingChange(e, index)
//                                   }
//                                   value={streaming?.status}
//                                 >
//                                   <option value="">Select One</option>
//                                   <option value="active">Active</option>
//                                   <option value="inactive">Inactive</option>
//                                 </select>
//                               </div>
//                             </div>

//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="sports-type"
//                                 className="text-xs font-bold"
//                               >
//                                 Stream Type{" "}
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <div>
//                                 <select
//                                   className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
//                                   name="stream_type"
//                                   onChange={(e) =>
//                                     handleStreamingChange(e, index)
//                                   }
//                                   value={streaming?.stream_type}
//                                 >
//                                   <option value="">Select One</option>
//                                   <option value="root stream">
//                                     Root Stream
//                                   </option>
//                                   <option value="restricted">Restricted</option>
//                                   <option value="m3u8">M3u8</option>
//                                   <option value="web">Web</option>
//                                 </select>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Stream URL Section */}
//                           <div className="p-3 flex gap-5">
//                             <div className="w-1/2">
//                               <label
//                                 htmlFor="stream_url"
//                                 className="text-xs font-bold"
//                               >
//                                 Stream URL
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 type="text"
//                                 className="w-full block p-1 rounded-md border border-gray-200"
//                                 name="stream_url"
//                                 value={streaming.stream_url}
//                                 onChange={(e) =>
//                                   handleStreamingChange(e, index)
//                                 }
//                               />
//                             </div>
//                           </div>

//                           {/* Conditional fields that appear only when "restricted" is selected */}
//                           {streaming?.stream_type === "restricted" && (
//                             <div className="p-3 flex gap-5 bg-[#f9fafb] border shadow-md mb-5 rounded-md">
//                               <div className="w-1/2">
//                                 <label
//                                   htmlFor="key"
//                                   className="text-xs font-bold"
//                                 >
//                                   Key <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="w-full block p-1 rounded-md border border-gray-200"
//                                   name="key"
//                                   value={streaming.key || ""}
//                                   onChange={(e) =>
//                                     handleStreamingChange(e, index)
//                                   }
//                                 />
//                               </div>

//                               <div className="w-1/2">
//                                 <label
//                                   htmlFor="value"
//                                   className="text-xs font-bold"
//                                 >
//                                   Value <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="w-full block p-1 rounded-md border border-gray-200"
//                                   name="value"
//                                   value={streaming.value || ""}
//                                   onChange={(e) =>
//                                     handleStreamingChange(e, index)
//                                   }
//                                 />
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </form>
//                     </div>
//                   ))}
//                   <div className="flex justify-start">
//                     <button
//                       className="text-xs my-4 font-medium right-12 bottom-5 bg-[#00a6e5] py-2 px-4 text-white uppercase transition active:scale-95 rounded-md shadow-lg"
//                       onClick={addStreamingSource}
//                     >
//                       + Streaming
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className={`absolute text-xs font-medium right-12 bottom-[60px] py-2 px-4 text-white uppercase animate-bounce transition active:scale-95 rounded-md shadow-lg ${
//                 loading ? "bg-gray-500" : "bg-[#00a6e5] "
//               }`}
//             >
//               Clone Match
//             </button>

//             <FaRegArrowAltCircleUp
//               className="absolute h-6 w-6 bottom-3 right-2 text-[#00a6e5] transition cursor-pointer"
//               onClick={scrollToTop}
//             />
//           </div>
//         </div>
//       </Portal>
//     </>
//   );
// };

// export default CloneMatch;

"use client";

import Location from "../global/Location";
import { useEffect, useState } from "react";
import { getMatch, getThumbnail, createMatch } from "../../Api.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaRegArrowAltCircleUp, FaTimes } from "react-icons/fa";
import Portal from "../pages/Portal.jsx";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import moment from "moment-timezone";
import { toast } from "react-toastify";

const CloneMatch = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [localDate, setLocalDate] = useState("");
  const [showRestrictedFields, setShowRestrictedFields] = useState(false);

  const defaultPortraitWatermark = {
    top: 1.1,
    bottom: null,
    left: null,
    right: 1.1,
    height: 2.0,
    width: 10.0,
    image: "http://windfootball.com/logo/logo1.png",
  };

  const [data, setData] = useState({
    sport_type: "",
    league_type: "",
    match_title: "",
    match_time: "",
    fixture_id: "",
    hot_match: false,
    status: "active",
    team_one: {
      name: "",
      image: "",
    },
    team_two: {
      name: "",
      image: "",
    },
    streaming_source: [
      {
        streaming_title: "Server SD",
        is_premium: false,
        resolution: "480p",
        platform: "both",
        portrait_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
        landscape_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
        status: "active",
        stream_type: "",
        stream_url: "",
        stream_thumbnail: "",
        headers: [{ key: "", value: "", isDefault: true }],
      },
    ],
  });

  const { id } = useParams();

  useEffect(() => {
    try {
      setLoading(true);
      getSingleMatch();
    } catch (err) {
      setLoading(false);
      console.error("Error: ", err);
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    sport_type,
    league_type,
    match_title,
    match_time,
    fixture_id,
    hot_match,
    status,
    team_one,
    team_two,
    streaming_source,
  } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTeamChange = (team, e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [team]: {
        ...prevState[team],
        [name]: value,
      },
    }));
  };

  const handleStreamingChange = (e, index) => {
    const { name, value } = e.target;
    const updatedStreamingSources = [...data.streaming_source];
    updatedStreamingSources[index][name] = value;

    // Check if stream_type is "Restricted"
    if (name === "stream_type") {
      setShowRestrictedFields(value === "restricted");

      // Initialize headers array with a default entry if stream type is restricted
      if (
        value === "restricted" &&
        (!updatedStreamingSources[index].headers ||
          updatedStreamingSources[index].headers.length === 0)
      ) {
        updatedStreamingSources[index].headers = [
          { key: "", value: "", isDefault: true },
        ];
      }
    }

    setData({
      ...data,
      streaming_source: updatedStreamingSources,
    });
  };

  const handleHeaderChange = (e, streamIndex, headerIndex) => {
    const { name, value } = e.target;
    const updatedStreamingSources = [...data.streaming_source];

    if (!updatedStreamingSources[streamIndex].headers) {
      updatedStreamingSources[streamIndex].headers = [
        { key: "", value: "", isDefault: true },
      ];
    }

    updatedStreamingSources[streamIndex].headers[headerIndex][name] = value;

    setData({
      ...data,
      streaming_source: updatedStreamingSources,
    });
  };

  const addHeader = (e, index) => {
    e.preventDefault();
    const updatedStreamingSources = [...data.streaming_source];

    if (!updatedStreamingSources[index].headers) {
      updatedStreamingSources[index].headers = [];
    }

    updatedStreamingSources[index].headers.push({
      key: "",
      value: "",
      isDefault: false,
    });

    setData({
      ...data,
      streaming_source: updatedStreamingSources,
    });
  };

  const removeHeader = (streamIndex, headerIndex) => {
    const updatedStreamingSources = [...data.streaming_source];
    updatedStreamingSources[streamIndex].headers.splice(headerIndex, 1);

    setData({
      ...data,
      streaming_source: updatedStreamingSources,
    });
  };

  const addStreamingSource = (e) => {
    e.preventDefault();
    setData({
      ...data,
      streaming_source: [
        ...data.streaming_source,
        {
          streaming_title: "Server SD",
          is_premium: false,
          resolution: "480p",
          platform: "both",
          portrait_watermark: JSON.stringify(defaultPortraitWatermark, null, 2),
          landscape_watermark: JSON.stringify(
            defaultPortraitWatermark,
            null,
            2
          ),
          status: "active",
          stream_type: "",
          stream_url: "",
          stream_thumbnail: "",
          headers: [{ key: "", value: "", isDefault: true }],
        },
      ],
    });
  };

  const navigation = useNavigate();

  // set date handler
  const handleDateChange = (selectedDates) => {
    if (selectedDates.length > 0) {
      const utcDate = moment(selectedDates[0]).utc();
      setLocalDate(utcDate.toDate());
      setData((prevData) => ({
        ...prevData,
        match_time: utcDate.toISOString(),
      }));
    }
  };

  // scroll to top button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formatTime = (time) => {
    return moment.utc(time).format("YYYY-MM-DD HH:mm:ss [UTC]");
  };

  const getSingleMatch = async () => {
    const res = await getMatch(id);
    if (res?.data?.success) {
      const value = res?.data?.match;
      // Iterate through each element in the streaming_source array
      value.streaming_source.forEach((source) => {
        // Check if portrait_watermark exists and is a string
        if (
          source.portrait_watermark &&
          typeof source.portrait_watermark === "string"
        ) {
          // Remove extra backslashes and parse JSON for portrait_watermark
          const portraitWatermark = JSON.parse(
            source.portrait_watermark.replace(/\\/g, "")
          );
          // Update portrait_watermark
          source.portrait_watermark = JSON.stringify(
            portraitWatermark,
            null,
            2
          );
        }

        // Check if landscape_watermark exists and is a string
        if (
          source.landscape_watermark &&
          typeof source.landscape_watermark === "string"
        ) {
          // Remove extra backslashes and parse JSON for landscape_watermark
          const landscapeWatermark = JSON.parse(
            source.landscape_watermark.replace(/\\/g, "")
          );
          // Update landscape_watermark
          source.landscape_watermark = JSON.stringify(
            landscapeWatermark,
            null,
            2
          );
        }

        // Initialize headers array if it doesn't exist
        if (!source.headers) {
          source.headers = [{ key: "", value: "", isDefault: true }];
        } else if (typeof source.headers === "string") {
          try {
            source.headers = JSON.parse(source.headers);
          } catch (e) {
            source.headers = [{ key: "", value: "", isDefault: true }];
          }
        }
      });

      setData(value);
      setLocalDate(value.match_time);
    }
  };

  const validateFields = () => {
    const validationArray = [];

    if (data?.sport_type === "") {
      validationArray.push("Sport Type");
    }
    if (data?.match_title === "") {
      validationArray.push("Match Title");
    }
    if (data?.league_type === "") {
      validationArray.push("League Type");
    }
    if (data?.match_time === "") {
      validationArray.push("Match Time");
    }
    if (data?.team_one.name === "") {
      validationArray.push("Team One");
    }
    if (data?.team_two.name === "") {
      validationArray.push("Team Two");
    }

    if (validationArray.length !== 0)
      return { status: false, data: validationArray };

    return true;
  };

  // submits the form to the api
  const handleSubmit = async () => {
    setLoading(true);

    const validationStatus = validateFields();
    if (validationStatus !== true && !validationStatus.status) {
      const missing = validationStatus.data.join(", ");
      toast.error(`Missing fields: ${missing}`);
      setLoading(false);
      return false;
    }

    try {
      const thumbdata = {
        logo1: data.team_one.image,
        name1: data.team_one.name,
        logo2: data.team_two.image,
        name2: data.team_two.name,
        time: formatTime(data.match_time),
      };

      const thumbnail = await getThumbnail(thumbdata);

      if (!thumbnail) {
        toast.error(
          `Thumbnail generation error, please check your team logo links`
        );
        setLoading(false);
        return false;
      }
      const newData = { ...data, thumbnail: thumbnail };

      const res = await createMatch(newData);
      if (res?.data?.success) {
        toast.success(`${res?.data?.message}`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigation("/admin/manage-live");
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.message);
    }
  };

  return (
    <>
      <Portal>
        <div className="relative w-full ">
          <div className="h-max w-[95%]mx-auto rounded-md p-3 border">
            <h2 className="py-2">
              <Location location={location} />
            </h2>
            <div className="rounded-md p-3 border bg-[#fafafa]">
              <form
                action="submit"
                id="match-info"
                className="w-full bg-[#fff] rounded-md p-2 border"
              >
                <h2 className="font-semibold text-base p-1">
                  Match Information
                </h2>

                <div className="flex gap-5 w-full">
                  <div className="p-2 w-1/2">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      Sports Type <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        className="border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                        name="sport_type"
                        value={sport_type}
                        onChange={handleChange}
                      >
                        <option value="">Select a Sport</option>
                        <option value="football">Football</option>
                        <option value="sports">Sports</option>
                      </select>
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      League Type <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 text-xs">
                      <select
                        className="border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full text-sm"
                        name="league_type"
                        value={league_type}
                        onChange={handleChange}
                      >
                        <option value="">Select a League</option>
                        <option value="friendlies">Friendlies</option>
                        <option value="la-liga">La Liga</option>
                        <option value="bundesliga">Bundesliga</option>
                        <option value="uefa-champions-league">
                          UEFA Champions League
                        </option>
                        <option value="ligue-1">Ligue 1</option>
                        <option value="copa-del-rey">Copa del Rey</option>
                        <option value="fa-cup">FA Cup</option>
                        <option value="coppa-italia">Coppa Italia</option>
                        <option value="coupe-de-france">Coupe de France</option>
                        <option value="afc-champions-league">
                          AFC Champions League
                        </option>
                        <option value="world-cup-qualification-asia">
                          World Cup - Qualification Asia
                        </option>
                        <option value="uefa-europa-league">
                          UEFA Europa League
                        </option>
                        <option value="dfb-pokal">DFB Pokal</option>
                        <option value="premier-league">Premier League</option>
                        <option value="arab-club-champions-cup">
                          Arab Club Champions Cup
                        </option>
                        <option value="pro-league">Pro League</option>
                        <option value="africa-cup-of-nations-qualification">
                          Africa Cup of Nations - Qualification
                        </option>
                        <option value="world-cup-qualification-africa">
                          World Cup - Qualification Africa
                        </option>
                        <option value="uefa-europa-conference-league">
                          UEFA Europa Conference League
                        </option>
                        <option value="uefa-nations-league">
                          UEFA Nations League
                        </option>
                        <option value="uefa-super-cup">UEFA Super Cup</option>
                        <option value="kings-cup">King's Cup</option>
                        <option value="eredivisie">Eredivisie</option>
                        <option value="World Cup - Qualification South America">
                          World Cup - Qualification South America
                        </option>
                        <option value="friendlies-clubs">
                          Friendlies Clubs
                        </option>
                        <option value="serie-a">Serie A</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex gap-5 w-full">
                  <div className="p-2 w-[33.3%]">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      Match Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full block p-1 rounded-md border border-gray-200"
                      name="match_title"
                      value={match_title}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="p-2 w-[33.3%] relative">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      Match Time <span className="text-red-500">*</span>
                    </label>
                    <Flatpickr
                      className="border border-gray-300 cursor-pointer w-full rounded-md p-1 text-black"
                      options={{
                        enableTime: true,
                        dateFormat: "Y-m-d H:i",
                        time_24hr: true,
                        utc: true,
                      }}
                      placeholder="YYYY-MM-DD HH:MM"
                      value={localDate}
                      onChange={handleDateChange}
                    />
                    {localDate && (
                      <p className="text-xs mt-1">
                        Selected UTC time:{" "}
                        {moment.utc(localDate).format("YYYY-MM-DD HH:mm")} UTC
                      </p>
                    )}
                  </div>

                  <div className="p-2 w-[33.3%]">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      Fixture ID
                    </label>
                    <input
                      type="text"
                      className="w-full block p-1 rounded-md border border-gray-300"
                      name="fixture_id"
                      value={fixture_id}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="flex gap-5">
                  <div className="p-2 w-1/2">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      Is Hot Match? <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                        name="hot_match"
                        value={hot_match}
                        onChange={handleChange}
                      >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="p-2 w-1/2">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                        name="status"
                        value={status}
                        onChange={handleChange}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </div>
              </form>
              <form
                action="submit"
                className="mt-3 w-full bg-white rounded-md px-2 py-4 flex border"
              >
                <div className="p-3 border-r-2 border-gray-200 w-1/2">
                  <h2 className="font-semibold text-base mb-4">Team One</h2>
                  <label htmlFor="sports-type" className="text-xs font-bold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full block p-1 rounded-md border border-gray-200"
                    name="name"
                    value={team_one.name}
                    onChange={(e) => handleTeamChange("team_one", e)}
                  />

                  <label htmlFor="sports-type" className="text-xs font-bold">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="w-full block p-1 rounded-md border border-gray-200"
                    name="image"
                    value={team_one.image}
                    onChange={(e) => handleTeamChange("team_one", e)}
                  />
                </div>

                <div className="p-3 w-1/2">
                  <h2 className="font-semibold text-base mb-4">Team Two</h2>
                  <label className="text-xs font-bold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className="w-full block p-1 rounded-md border border-gray-200"
                    name="name"
                    value={team_two.name}
                    onChange={(e) => handleTeamChange("team_two", e)}
                  />

                  <label className="text-xs font-bold">Image URL</label>
                  <input
                    type="text"
                    className="w-full block p-1 rounded-md border border-gray-200"
                    name="image"
                    value={team_two.image}
                    onChange={(e) => handleTeamChange("team_two", e)}
                  />
                </div>
              </form>
              <div className="flex gap-y-5 w-full">
                <div className="w-full flex justify-end flex-col py-10 ">
                  {data.streaming_source.map((streaming, index) => (
                    <div
                      key={index}
                      className="flex flex-col p-2 border border-gray-200 rounded-md"
                    >
                      <form
                        action="submit"
                        className="mt-3 w-full bg-white rounded-md border px-2 py-4 flex flex-col"
                      >
                        <h2 className="text-lg font-semibold p-1">
                          Streaming Source
                        </h2>
                        <div className="flex flex-col p-2 border border-gray-200 rounded-md">
                          <p className="p-1 text-[#00a6e5] text-xs font-semibold">
                            Streaming Source: {index + 1}
                          </p>
                          <div className="p-3 flex gap-5 w-full">
                            <div className="w-1/2">
                              <label
                                htmlFor="sports-type"
                                className="text-xs font-bold"
                              >
                                Streaming Title
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                className="w-full block p-1 rounded-md border border-gray-200"
                                name="streaming_title"
                                value={streaming.streaming_title}
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                              />
                            </div>

                            <div className="w-1/2">
                              <label
                                htmlFor="sports-type"
                                className="text-xs font-bold"
                              >
                                Is Premium?
                                <span className="text-red-500">*</span>
                              </label>
                              <div>
                                <select
                                  className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                  name="is_premium"
                                  value={streaming.is_premium}
                                  onChange={(e) =>
                                    handleStreamingChange(e, index)
                                  }
                                >
                                  <option value={false}>No</option>
                                  <option value={true}>Yes</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 flex gap-5">
                            <div className="w-1/2">
                              <label
                                htmlFor="sports-type"
                                className="text-xs font-bold"
                              >
                                Resolution{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <div>
                                <select
                                  className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                  name="resolution"
                                  value={streaming?.resolution}
                                  onChange={(e) =>
                                    handleStreamingChange(e, index)
                                  }
                                >
                                  <option value="">Select One</option>
                                  <option value="1080p">1080p</option>
                                  <option value="720p">720p</option>
                                  <option value="480p">480p</option>
                                  <option value="360p">360p</option>
                                </select>
                              </div>
                            </div>

                            <div className="w-1/2">
                              <label
                                htmlFor="sports-type"
                                className="text-xs font-bold"
                              >
                                Platform <span className="text-red-500">*</span>
                              </label>

                              <div>
                                <select
                                  className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                  name="platform"
                                  onChange={(e) =>
                                    handleStreamingChange(e, index)
                                  }
                                  value={streaming?.platform}
                                >
                                  <option value="">Both</option>
                                  <option value="Android">Android</option>
                                  <option value="iOS">iOS</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          <div className="p-3 flex gap-5">
                            <div className="w-1/2">
                              <label
                                htmlFor="potrait"
                                className="text-xs font-bold"
                              >
                                Portrait Watermark(json)
                              </label>
                              <textarea
                                placeholder="Enter json object..."
                                className="block border border-gray-300 rounded-md p-2 w-full"
                                name="portrait_watermark"
                                rows={5}
                                value={streaming?.portrait_watermark}
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                              ></textarea>
                            </div>

                            <div className="w-1/2">
                              <label
                                htmlFor="landscape"
                                className="text-xs font-bold"
                              >
                                Landscape Watermark(json)
                              </label>
                              <textarea
                                placeholder="Enter json object..."
                                className="block border border-gray-300 rounded-md p-2 w-full"
                                name="landscape_watermark"
                                rows={5}
                                value={streaming?.landscape_watermark}
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                              ></textarea>
                            </div>
                          </div>

                          <div className="p-3 flex gap-5">
                            <div className="w-1/2">
                              <label
                                htmlFor="sports-type"
                                className="text-xs font-bold"
                              >
                                Status <span className="text-red-500">*</span>
                              </label>
                              <div>
                                <select
                                  className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                  name="status"
                                  onChange={(e) =>
                                    handleStreamingChange(e, index)
                                  }
                                  value={streaming?.status}
                                >
                                  <option value="">Select One</option>
                                  <option value="active">Active</option>
                                  <option value="inactive">Inactive</option>
                                </select>
                              </div>
                            </div>

                            <div className="w-1/2">
                              <label
                                htmlFor="sports-type"
                                className="text-xs font-bold"
                              >
                                Stream Type{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <div>
                                <select
                                  className="border border-gray-300 rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full"
                                  name="stream_type"
                                  onChange={(e) =>
                                    handleStreamingChange(e, index)
                                  }
                                  value={streaming?.stream_type}
                                >
                                  <option value="">Select One</option>
                                  <option value="root stream">
                                    Root Stream
                                  </option>
                                  <option value="restricted">Restricted</option>
                                  <option value="m3u8">M3u8</option>
                                  <option value="web">Web</option>
                                </select>
                              </div>
                            </div>
                          </div>

                          {/* Stream URL Section */}
                          <div className="p-3 flex gap-5">
                            <div className="w-1/2">
                              <label
                                htmlFor="stream_url"
                                className="text-xs font-bold"
                              >
                                Stream URL
                                <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                className="w-full block p-1 rounded-md border border-gray-200"
                                name="stream_url"
                                value={streaming.stream_url}
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                              />
                            </div>
                          </div>

                          {/* Conditional fields that appear only when "restricted" is selected */}
                          {streaming?.stream_type === "restricted" && (
                            <>
                              {streaming.headers &&
                                streaming.headers.map((header, headerIndex) => (
                                  <div
                                    key={headerIndex}
                                    className="p-3 flex gap-5 bg-[#f9fafb] border shadow-md mb-3 rounded-md ml-3 relative"
                                  >
                                    <div className="w-1/2">
                                      <label
                                        htmlFor={`key-${headerIndex}`}
                                        className="text-xs font-bold"
                                      >
                                        Key{" "}
                                        <span className="text-red-500">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full block p-1 rounded-md border border-gray-200"
                                        name="key"
                                        value={header.key || ""}
                                        onChange={(e) =>
                                          handleHeaderChange(
                                            e,
                                            index,
                                            headerIndex
                                          )
                                        }
                                      />
                                    </div>

                                    <div className="w-1/2">
                                      <label
                                        htmlFor={`value-${headerIndex}`}
                                        className="text-xs font-bold"
                                      >
                                        Value{" "}
                                        <span className="text-red-500">*</span>
                                      </label>
                                      <input
                                        type="text"
                                        className="w-full block p-1 rounded-md border border-gray-200"
                                        name="value"
                                        value={header.value || ""}
                                        onChange={(e) =>
                                          handleHeaderChange(
                                            e,
                                            index,
                                            headerIndex
                                          )
                                        }
                                      />
                                    </div>

                                    {!header.isDefault && (
                                      <button
                                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                                        onClick={() =>
                                          removeHeader(index, headerIndex)
                                        }
                                      >
                                        <FaTimes size={10} />
                                      </button>
                                    )}
                                  </div>
                                ))}

                              {/* Add Header button */}
                              <div className="flex justify-end">
                                <button
                                  className="text-xs my-4 font-medium right-12 bottom-5 bg-[#00a6e5] py-2 px-4 text-white uppercase transition active:scale-95 rounded-md shadow-lg"
                                  onClick={(e) => addHeader(e, index)}
                                >
                                  + Header
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </form>
                    </div>
                  ))}
                  <div className="flex justify-start">
                    <button
                      className="text-xs my-4 font-medium right-12 bottom-5 bg-[#00a6e5] py-2 px-4 text-white uppercase transition active:scale-95 rounded-md shadow-lg"
                      onClick={addStreamingSource}
                    >
                      + Streaming
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`absolute text-xs font-medium right-12 bottom-[60px] py-2 px-4 text-white uppercase animate-bounce transition active:scale-95 rounded-md shadow-lg ${
                loading ? "bg-gray-500" : "bg-[#00a6e5] "
              }`}
            >
              Clone Match
            </button>

            <FaRegArrowAltCircleUp
              className="absolute h-6 w-6 bottom-3 right-2 text-[#00a6e5] transition cursor-pointer"
              onClick={scrollToTop}
            />
          </div>
        </div>
      </Portal>
    </>
  );
};

export default CloneMatch;
