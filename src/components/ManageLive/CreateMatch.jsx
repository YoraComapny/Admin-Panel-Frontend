// import Location from "../global/Location";
// import { useEffect, useState } from "react";
// import { createMatch } from "../../Api.js";
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaRegArrowAltCircleUp, FaTimes } from "react-icons/fa";
// import Portal from "../pages/Portal.jsx";
// import { toast } from "react-toastify";
// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/dark.css";
// import moment from "moment-timezone";
// import { getThumbnail } from "../../Api.js";

// const CreateMatch = () => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);
//   const defaultPortraitWatermark = {
//     top: 1.1,
//     bottom: null,
//     left: null,
//     right: 1.1,
//     height: 2.0,
//     width: 10.0,
//     image: "http://windfootball.com/logo/logo1.png",
//   };

//   const [localDate, setLocalDate] = useState("");
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
//         headers: [{ key: "", value: "", isDefault: true }],
//       },
//     ],
//   });

//   const [showRestrictedFields, setShowRestrictedFields] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     const searchParams = new URLSearchParams(location.search);
//     if (searchParams) {
//       const id = searchParams.get("id");
//       const date = searchParams.get("date");
//       const homeName = searchParams.get("homeName");
//       const homeLogo = searchParams.get("homeLogo");
//       const awayName = searchParams.get("awayName");
//       const awayLogo = searchParams.get("awayLogo");
//       const matchTitle = searchParams.get("matchTitle");
//       const sports = searchParams.get("sports");
//       const leagueName = searchParams.get("leagueName");

//       // ===============start add all leagues =====================
//       // Define the mapping of league names to league type values
//       const leagueTypeMapping = {
//         "La Liga": "la-liga",
//         Bundesliga: "bundesliga",
//         "Ligue 1": "ligue-1",
//         "Serie A": "serie-a",
//         "Premier League": "premier-league",
//         "UEFA Champions League": "uefa-champions-league",
//         "Major League Soccer": "major-league-soccer",
//         "UEFA Europa League": "uefa-europa-league",
//         Friendlies: "friendlies",
//         "Copa del Rey": "copa-del-rey",
//         "FA Cup": "fa-cup",
//         "Coppa Italia": "coppa-italia",
//         "Coupe de France": "coupe-de-france",
//         "AFC Champions League": "afc-champions-league",
//         "World Cup - Qualification Asia": "world-cup-qualification-asia",
//         "DFB Pokal": "dfb-pokal",
//         "Arab Club Champions Cup": "arab-club-champions-cup",
//         "Pro League": "pro-league",
//         "Africa Cup of Nations - Qualification":
//           "africa-cup-of-nations-qualification",
//         "World Cup - Qualification Africa": "world-cup-qualification-africa",
//         "UEFA Europa Conference League": "uefa-europa-conference-league",
//         "UEFA Nations League": "uefa-nations-league",
//         "UEFA Super Cup": "uefa-super-cup",
//         "King's Cup": "kings-cup",
//         Eredivisie: "eredivisie",
//         "Friendlies Clubs": "friendlies-clubs",
//         "World Cup - Qualification South America":
//           "World Cup - Qualification South America",
//       };

//       // Function to determine the league type from the league name
//       const getLeagueType = (leagueName) => {
//         if (!leagueName) return "international"; // Default value

//         // Check for exact matches first
//         if (leagueTypeMapping[leagueName]) {
//           return leagueTypeMapping[leagueName];
//         }

//         // If no exact match, check if the league name includes any of our known leagues
//         for (const [knownLeague, leagueType] of Object.entries(
//           leagueTypeMapping
//         )) {
//           if (leagueName.includes(knownLeague)) {
//             return leagueType;
//           }
//         }

//         // If no match is found, return the default
//         return "international";
//       };

//       // Usage in your code
//       const leagueType = getLeagueType(leagueName);
//       // ===============end add all leagues =====================

//       // Format the date properly for the Flatpickr
//       let formattedDate = "";
//       if (date) {
//         // Parse the date string in format "2025-03-15 19:45"
//         const [datePart, timePart] = date.split(" ");
//         // Create a UTC date from parts
//         const dateObj = moment.utc(`${datePart}T${timePart}`);
//         formattedDate = dateObj.toDate();
//         setLocalDate(formattedDate);
//       }

//       setData((prevData) => ({
//         ...prevData,
//         sport_type: sports || prevData.sport_type,
//         match_title: matchTitle || prevData.match_title,
//         match_time: date
//           ? moment.utc(`${date.replace(" ", "T")}`).toISOString()
//           : prevData.match_time,
//         league_type: leagueType,
//         fixture_id: id || prevData.fixture_id,
//         team_one: {
//           ...prevData.team_one,
//           name: homeName || prevData.team_one.name,
//           image: homeLogo || prevData.team_one.image,
//         },
//         team_two: {
//           ...prevData.team_two,
//           name: awayName || prevData.team_two.name,
//           image: awayLogo || prevData.team_two.image,
//         },
//       }));
//     }
//     setLoading(false);
//   }, [location.search]);

//   const {
//     sport_type,
//     league_type,
//     match_title,
//     fixture_id,
//     hot_match,
//     status,
//     team_one,
//     team_two,
//     //streaming_source,
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

//   // ... (keep other functions)

//   // scroll to top button
//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   const handleStreamingChange = (e, index) => {
//     const { name, value } = e.target;
//     const updatedStreamingSources = [...data.streaming_source];
//     updatedStreamingSources[index][name] = value;

//     // Check if stream_type is "Restricted"
//     if (name === "stream_type") {
//       setShowRestrictedFields(value === "restricted");

//       // Initialize headers array with a default entry if stream type is restricted
//       if (
//         value === "restricted" &&
//         (!updatedStreamingSources[index].headers ||
//           updatedStreamingSources[index].headers.length === 0)
//       ) {
//         updatedStreamingSources[index].headers = [
//           { key: "", value: "", isDefault: true },
//         ];
//       }
//     }

//     setData({
//       ...data,
//       streaming_source: updatedStreamingSources,
//     });
//   };

//   const handleHeaderChange = (e, streamIndex, headerIndex) => {
//     const { name, value } = e.target;
//     const updatedStreamingSources = [...data.streaming_source];

//     if (!updatedStreamingSources[streamIndex].headers) {
//       updatedStreamingSources[streamIndex].headers = [
//         { key: "", value: "", isDefault: true },
//       ];
//     }

//     updatedStreamingSources[streamIndex].headers[headerIndex][name] = value;

//     setData({
//       ...data,
//       streaming_source: updatedStreamingSources,
//     });
//   };

//   const addHeader = (e, index) => {
//     e.preventDefault();
//     const updatedStreamingSources = [...data.streaming_source];

//     if (!updatedStreamingSources[index].headers) {
//       updatedStreamingSources[index].headers = [];
//     }

//     updatedStreamingSources[index].headers.push({
//       key: "",
//       value: "",
//       isDefault: false,
//     });

//     setData({
//       ...data,
//       streaming_source: updatedStreamingSources,
//     });
//   };

//   const removeHeader = (streamIndex, headerIndex) => {
//     const updatedStreamingSources = [...data.streaming_source];
//     updatedStreamingSources[streamIndex].headers.splice(headerIndex, 1);

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
//           headers: [],
//         },
//       ],
//     });
//   };

//   const formatTime = (time) => {
//     return moment.utc(time).format("YYYY-MM-DD HH:mm:ss [UTC]");
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

//   const handleSubmit = async () => {
//     setLoading(true);

//     const validationStatus = validateFields();
//     if (validationStatus !== true && !validationStatus.status) {
//       const missing = validationStatus.data.join(", ");
//       toast.error(`Missing fields: ${missing}`);
//       setLoading(false);
//       // commit change for second time
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
//       console.log("1111111111----------res", res);
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
//           <div className="h-max w-[95%]mx-auto  rounded-md p-3 border ">
//             <h2 className="py-2">
//               <Location location={location} />
//             </h2>
//             <div className="rounded-md p-3 border  bg-[#fafafa]">
//               <form
//                 action="submit"
//                 id="match-info"
//                 className="w-full bg-[#fff] rounded-md p-2 border "
//               >
//                 <h2 className="font-semibold text-base p-1 ">
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
//                         <option value="World Cup - Qualification South America">
//                           World Cup - Qualification South America
//                         </option>
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
//                     {/* <Flatpickr
//                       className="border border-gray-300 cursor-pointer w-full rounded-md p-1 text-black"
//                       options={{
//                         enableTime: true,
//                         dateFormat: "Z",
//                         time_24hr: true,
//                         utc: true,
//                       }}
//                       placeholder="YYYY-MM-DD HH:MM"
//                       value={localDate}
//                       onChange={handleDateChange}
//                     /> */}

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
//                       className="flex flex-col p-2 border  border-gray-200 rounded-md"
//                     >
//                       <form
//                         action="submit"
//                         className="mt-3 w-full bg-white rounded-md border px-2 py-4 flex flex-col"
//                       >
//                         <h2 className="text-lg  font-semibold p-1">
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

//                           {/* =======================Stram URL Section start  ================ */}

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

//                           {/* =======================Stram URL Section end  ================ */}

//                           {/* Conditional fields that appear only when "restricted" is selected */}
//                           {streaming?.stream_type === "restricted" && (
//                             <>
//                               {streaming.headers &&
//                                 streaming.headers.map((header, headerIndex) => (
//                                   <div
//                                     key={headerIndex}
//                                     className="p-3 flex gap-5 bg-[#f9fafb] border shadow-md mb-3 rounded-md ml-3 relative"
//                                   >
//                                     <div className="w-1/2">
//                                       <label
//                                         htmlFor={`key-${headerIndex}`}
//                                         className="text-xs font-bold"
//                                       >
//                                         Key{" "}
//                                         <span className="text-red-500">*</span>
//                                       </label>
//                                       <input
//                                         type="text"
//                                         className="w-full block p-1 rounded-md border border-gray-200"
//                                         name="key"
//                                         value={header.key || ""}
//                                         onChange={(e) =>
//                                           handleHeaderChange(
//                                             e,
//                                             index,
//                                             headerIndex
//                                           )
//                                         }
//                                       />
//                                     </div>

//                                     <div className="w-1/2">
//                                       <label
//                                         htmlFor={`value-${headerIndex}`}
//                                         className="text-xs font-bold"
//                                       >
//                                         Value{" "}
//                                         <span className="text-red-500">*</span>
//                                       </label>
//                                       <input
//                                         type="text"
//                                         className="w-full block p-1 rounded-md border border-gray-200"
//                                         name="value"
//                                         value={header.value || ""}
//                                         onChange={(e) =>
//                                           handleHeaderChange(
//                                             e,
//                                             index,
//                                             headerIndex
//                                           )
//                                         }
//                                       />
//                                     </div>

//                                     {!header.isDefault && (
//                                       <button
//                                         className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
//                                         onClick={() =>
//                                           removeHeader(index, headerIndex)
//                                         }
//                                       >
//                                         <FaTimes size={10} />
//                                       </button>
//                                     )}
//                                   </div>
//                                 ))}

//                               {/* ============button start ================= */}
//                               <div className="flex justify-end">
//                                 <button
//                                   className="text-xs my-4 font-medium right-12 bottom-5 bg-[#00a6e5] py-2 px-4 text-white uppercase transition active:scale-95 rounded-md shadow-lg"
//                                   onClick={(e) => addHeader(e, index)}
//                                 >
//                                   + Header
//                                 </button>
//                               </div>
//                               {/* ============button end ================= */}
//                             </>
//                           )}
//                         </div>

//                         <div className="flex justify-start">
//                           <button
//                             className="text-xs my-4 font-medium right-12 bottom-5 bg-[#00a6e5] py-2 px-4 text-white uppercase  transition active:scale-95 rounded-md shadow-lg"
//                             onClick={addStreamingSource}
//                           >
//                             + Streaming
//                           </button>
//                         </div>
//                       </form>
//                     </div>
//                   ))}
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
//               Create Match
//             </button>
//           </div>

//           <FaRegArrowAltCircleUp
//             className="absolute h-6 w-6 bottom-3 right-2 text-[#00a6e5] transition cursor-pointer"
//             onClick={scrollToTop}
//           />
//         </div>
//       </Portal>
//     </>
//   );
// };

// export default CreateMatch;

"use client";

import Location from "../global/Location";
import { useEffect, useState } from "react";
import { createMatch } from "../../Api.js";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleUp, FaTimes } from "react-icons/fa";
import Portal from "../pages/Portal.jsx";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import moment from "moment-timezone";
import { getThumbnail } from "../../Api.js";

const CreateMatch = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const defaultPortraitWatermark = {
    top: 1.1,
    bottom: null,
    left: null,
    right: 1.1,
    height: 2.0,
    width: 10.0,
    image: "http://windfootball.com/logo/logo1.png",
  };

  const [localDate, setLocalDate] = useState("");
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

  const [showRestrictedFields, setShowRestrictedFields] = useState(false);

  useEffect(() => {
    setLoading(true);
    const searchParams = new URLSearchParams(location.search);
    if (searchParams) {
      const id = searchParams.get("id");
      const date = searchParams.get("date");
      const homeName = searchParams.get("homeName");
      const homeLogo = searchParams.get("homeLogo");
      const awayName = searchParams.get("awayName");
      const awayLogo = searchParams.get("awayLogo");
      const matchTitle = searchParams.get("matchTitle");
      const sports = searchParams.get("sports");
      const leagueName = searchParams.get("leagueName");

      // ===============start add all leagues =====================
      // Define the mapping of league names to league type values
      const leagueTypeMapping = {
        "La Liga": "la-liga",
        Bundesliga: "bundesliga",
        "Ligue 1": "ligue-1",
        "Serie A": "serie-a",
        "Premier League": "premier-league",
        "UEFA Champions League": "uefa-champions-league",
        "Major League Soccer": "major-league-soccer",
        "UEFA Europa League": "uefa-europa-league",
        Friendlies: "friendlies",
        "Copa del Rey": "copa-del-rey",
        "FA Cup": "fa-cup",
        "Coppa Italia": "coppa-italia",
        "Coupe de France": "coupe-de-france",
        "AFC Champions League": "afc-champions-league",
        "World Cup - Qualification Asia": "world-cup-qualification-asia",
        "DFB Pokal": "dfb-pokal",
        "Arab Club Champions Cup": "arab-club-champions-cup",
        "Pro League": "pro-league",
        "Africa Cup of Nations - Qualification":
          "africa-cup-of-nations-qualification",
        "World Cup - Qualification Africa": "world-cup-qualification-africa",
        "UEFA Europa Conference League": "uefa-europa-conference-league",
        "UEFA Nations League": "uefa-nations-league",
        "UEFA Super Cup": "uefa-super-cup",
        "King's Cup": "kings-cup",
        Eredivisie: "eredivisie",
        "Friendlies Clubs": "friendlies-clubs",
        "World Cup - Qualification South America":
          "World Cup - Qualification South America",
      };

      // Function to determine the league type from the league name
      const getLeagueType = (leagueName) => {
        if (!leagueName) return "international"; // Default value

        // Check for exact matches first
        if (leagueTypeMapping[leagueName]) {
          return leagueTypeMapping[leagueName];
        }

        // If no exact match, check if the league name includes any of our known leagues
        for (const [knownLeague, leagueType] of Object.entries(
          leagueTypeMapping
        )) {
          if (leagueName.includes(knownLeague)) {
            return leagueType;
          }
        }

        // If no match is found, return the default
        return "international";
      };

      // Usage in your code
      const leagueType = getLeagueType(leagueName);
      // ===============end add all leagues =====================

      // Format the date properly for the Flatpickr
      let formattedDate = "";
      if (date) {
        // Parse the date string in format "2025-03-15 19:45"
        const [datePart, timePart] = date.split(" ");
        // Create a UTC date from parts
        const dateObj = moment.utc(`${datePart}T${timePart}`);
        formattedDate = dateObj.toDate();
        setLocalDate(formattedDate);
      }

      setData((prevData) => ({
        ...prevData,
        sport_type: sports || prevData.sport_type,
        match_title: matchTitle || prevData.match_title,
        match_time: date
          ? moment.utc(`${date.replace(" ", "T")}`).toISOString()
          : prevData.match_time,
        league_type: leagueType,
        fixture_id: id || prevData.fixture_id,
        team_one: {
          ...prevData.team_one,
          name: homeName || prevData.team_one.name,
          image: homeLogo || prevData.team_one.image,
        },
        team_two: {
          ...prevData.team_two,
          name: awayName || prevData.team_two.name,
          image: awayLogo || prevData.team_two.image,
        },
      }));
    }
    setLoading(false);
  }, [location.search]);

  const {
    sport_type,
    league_type,
    match_title,
    fixture_id,
    hot_match,
    status,
    team_one,
    team_two,
    //streaming_source,
  } = data;

  // Clear error when field is filled
  const clearError = (fieldName) => {
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (value.trim()) {
      clearError(name);
    }
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

    // Clear error when user starts typing
    if (value.trim()) {
      clearError(`${team}.${name}`);
    }
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

      // Clear error when date is selected
      clearError("match_time");
    }
  };

  // scroll to top button
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

    // Clear streaming source errors
    if (value.trim()) {
      clearError(`streaming_source.${index}.${name}`);
    }
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
          headers: [],
        },
      ],
    });
  };

  const formatTime = (time) => {
    return moment.utc(time).format("YYYY-MM-DD HH:mm:ss [UTC]");
  };

  const validateFields = () => {
    const newErrors = {};

    // Validate main fields
    if (!data?.sport_type || data.sport_type.trim() === "") {
      newErrors.sport_type = "This field is required";
    }
    if (!data?.match_title || data.match_title.trim() === "") {
      newErrors.match_title = "This field is required";
    }
    if (!data?.league_type || data.league_type.trim() === "") {
      newErrors.league_type = "This field is required";
    }
    if (!data?.match_time || data.match_time.trim() === "") {
      newErrors.match_time = "This field is required";
    }
    if (!data?.team_one?.name || data.team_one.name.trim() === "") {
      newErrors["team_one.name"] = "This field is required";
    }
    if (!data?.team_two?.name || data.team_two.name.trim() === "") {
      newErrors["team_two.name"] = "This field is required";
    }

    // Validate streaming sources
    data.streaming_source.forEach((stream, index) => {
      if (!stream.streaming_title || stream.streaming_title.trim() === "") {
        newErrors[`streaming_source.${index}.streaming_title`] =
          "This field is required";
      }
      if (!stream.resolution || stream.resolution.trim() === "") {
        newErrors[`streaming_source.${index}.resolution`] =
          "This field is required";
      }
      if (!stream.status || stream.status.trim() === "") {
        newErrors[`streaming_source.${index}.status`] =
          "This field is required";
      }
      if (!stream.stream_type || stream.stream_type.trim() === "") {
        newErrors[`streaming_source.${index}.stream_type`] =
          "This field is required";
      }
      if (!stream.stream_url || stream.stream_url.trim() === "") {
        newErrors[`streaming_source.${index}.stream_url`] =
          "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    // Validate fields before API call
    if (!validateFields()) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);

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
      console.log("1111111111----------res", res);
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
          <div className="h-max w-[95%]mx-auto  rounded-md p-3 border ">
            <h2 className="py-2">
              <Location location={location} />
            </h2>
            <div className="rounded-md p-3 border  bg-[#fafafa]">
              <form
                action="submit"
                id="match-info"
                className="w-full bg-[#fff] rounded-md p-2 border "
              >
                <h2 className="font-semibold text-base p-1 ">
                  Match Information
                </h2>

                <div className="flex gap-5 w-full">
                  <div className="p-2 w-1/2">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      Sports Type <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <select
                        className={`border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full ${
                          errors.sport_type
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        name="sport_type"
                        value={sport_type}
                        onChange={handleChange}
                      >
                        <option value="">Select a Sport</option>
                        <option value="football">Football</option>
                        <option value="sports">Sports</option>
                      </select>
                      {errors.sport_type && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.sport_type}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      League Type <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2 text-xs">
                      <select
                        className={`border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full text-sm ${
                          errors.league_type
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
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
                      {errors.league_type && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.league_type}
                        </p>
                      )}
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
                      className={`w-full block p-1 rounded-md border ${
                        errors.match_title
                          ? "border-red-500"
                          : "border-gray-200"
                      }`}
                      name="match_title"
                      value={match_title}
                      onChange={handleChange}
                    />
                    {errors.match_title && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.match_title}
                      </p>
                    )}
                  </div>

                  <div className="p-2 w-[33.3%] relative">
                    <label htmlFor="sports-type" className="text-xs font-bold">
                      Match Time <span className="text-red-500">*</span>
                    </label>
                    <Flatpickr
                      className={`border cursor-pointer w-full rounded-md p-1 text-black ${
                        errors.match_time ? "border-red-500" : "border-gray-300"
                      }`}
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
                    {errors.match_time && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.match_time}
                      </p>
                    )}
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
                    className={`w-full block p-1 rounded-md border ${
                      errors["team_one.name"]
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    name="name"
                    value={team_one.name}
                    onChange={(e) => handleTeamChange("team_one", e)}
                  />
                  {errors["team_one.name"] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors["team_one.name"]}
                    </p>
                  )}

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
                    className={`w-full block p-1 rounded-md border ${
                      errors["team_two.name"]
                        ? "border-red-500"
                        : "border-gray-200"
                    }`}
                    name="name"
                    value={team_two.name}
                    onChange={(e) => handleTeamChange("team_two", e)}
                  />
                  {errors["team_two.name"] && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors["team_two.name"]}
                    </p>
                  )}

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
                      className="flex flex-col p-2 border  border-gray-200 rounded-md"
                    >
                      <form
                        action="submit"
                        className="mt-3 w-full bg-white rounded-md border px-2 py-4 flex flex-col"
                      >
                        <h2 className="text-lg  font-semibold p-1">
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
                                className={`w-full block p-1 rounded-md border ${
                                  errors[
                                    `streaming_source.${index}.streaming_title`
                                  ]
                                    ? "border-red-500"
                                    : "border-gray-200"
                                }`}
                                name="streaming_title"
                                value={streaming.streaming_title}
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                              />
                              {errors[
                                `streaming_source.${index}.streaming_title`
                              ] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {
                                    errors[
                                      `streaming_source.${index}.streaming_title`
                                    ]
                                  }
                                </p>
                              )}
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
                                  className={`border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full ${
                                    errors[
                                      `streaming_source.${index}.resolution`
                                    ]
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
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
                                {errors[
                                  `streaming_source.${index}.resolution`
                                ] && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {
                                      errors[
                                        `streaming_source.${index}.resolution`
                                      ]
                                    }
                                  </p>
                                )}
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
                                name="potrait_watermark"
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
                                  className={`border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full ${
                                    errors[`streaming_source.${index}.status`]
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
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
                                {errors[`streaming_source.${index}.status`] && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {errors[`streaming_source.${index}.status`]}
                                  </p>
                                )}
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
                                  className={`border rounded-md py-1 focus:outline-blue focus:ring-1 focus:ring-indigo-500 w-full ${
                                    errors[
                                      `streaming_source.${index}.stream_type`
                                    ]
                                      ? "border-red-500"
                                      : "border-gray-300"
                                  }`}
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
                                {errors[
                                  `streaming_source.${index}.stream_type`
                                ] && (
                                  <p className="text-red-500 text-xs mt-1">
                                    {
                                      errors[
                                        `streaming_source.${index}.stream_type`
                                      ]
                                    }
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* =======================Stram URL Section start  ================ */}

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
                                className={`w-full block p-1 rounded-md border ${
                                  errors[`streaming_source.${index}.stream_url`]
                                    ? "border-red-500"
                                    : "border-gray-200"
                                }`}
                                name="stream_url"
                                value={streaming.stream_url}
                                onChange={(e) =>
                                  handleStreamingChange(e, index)
                                }
                              />
                              {errors[
                                `streaming_source.${index}.stream_url`
                              ] && (
                                <p className="text-red-500 text-xs mt-1">
                                  {
                                    errors[
                                      `streaming_source.${index}.stream_url`
                                    ]
                                  }
                                </p>
                              )}
                            </div>
                          </div>

                          {/* =======================Stram URL Section end  ================ */}

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

                              {/* ============button start ================= */}
                              <div className="flex justify-end">
                                <button
                                  className="text-xs my-4 font-medium right-12 bottom-5 bg-[#00a6e5] py-2 px-4 text-white uppercase transition active:scale-95 rounded-md shadow-lg"
                                  onClick={(e) => addHeader(e, index)}
                                >
                                  + Header
                                </button>
                              </div>
                              {/* ============button end ================= */}
                            </>
                          )}
                        </div>

                        <div className="flex justify-start">
                          <button
                            className="text-xs my-4 font-medium right-12 bottom-5 bg-[#00a6e5] py-2 px-4 text-white uppercase  transition active:scale-95 rounded-md shadow-lg"
                            onClick={addStreamingSource}
                          >
                            + Streaming
                          </button>
                        </div>
                      </form>
                    </div>
                  ))}
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
              Create Match
            </button>
          </div>

          <FaRegArrowAltCircleUp
            className="absolute h-6 w-6 bottom-3 right-2 text-[#00a6e5] transition cursor-pointer"
            onClick={scrollToTop}
          />
        </div>
      </Portal>
    </>
  );
};

export default CreateMatch;
