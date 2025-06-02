// // Reusing the InputField component from the parent
// const InputField = ({
//   label,
//   name,
//   value,
//   onChange,
//   placeholder,
//   required,
// }) => (
//   <div>
//     <p className="mb-2 font-medium text-xs ">{label}</p>
//     <input
//       type="text"
//       name={name}
//       value={value || ""}
//       onChange={onChange}
//       placeholder={placeholder || "N/A"}
//       className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//       required={required}
//     />
//   </div>
// );

// const IosSettingAdds = ({
//   androidAdsList,
//   toggleAdsExpanded,
//   deleteAd,
//   handleAdsChange,
//   addNewAd,
//   handleSave,
//   loading,
// }) => {
//   return (
//     <div className="flex flex-col gap-2">
//       <div className="w-full bg-white rounded-md p-2 flex flex-col gap-2">
//         <h2 className="text-sm font-semibold mb-4 text-gray-700">
//           IOS Ads List
//         </h2>

//         {androidAdsList.map((ad, index) => (
//           <div key={ad.id} className="border rounded mb-4">
//             <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
//               <div className="flex items-center">
//                 <button
//                   onClick={() => toggleAdsExpanded(ad.id)}
//                   className="mr-4"
//                 >
//                   {ad.expanded ? (
//                     <svg
//                       className="w-4 h-4"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         d="M5 15l7-7 7 7"
//                       ></path>
//                     </svg>
//                   ) : (
//                     <svg
//                       className="w-4 h-4"
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
//                   )}
//                 </button>
//                 <span className="font-medium text-sm">
//                   {ad.name || "New Ad"}
//                 </span>
//               </div>
//               <div className="flex items-center">
//                 <span className="mr-6 text-sm">{ad.ads_type}</span>
//                 <span className="bg-green-400 text-white px-4 py-1 rounded-full text-sm mr-6">
//                   {ad.is_active ? "Active" : "Inactive"}
//                 </span>
//                 <button
//                   className="text-gray-400 hover:text-red-500"
//                   onClick={() => deleteAd(ad.id)}
//                 >
//                   <svg
//                     className="w-5 h-5"
//                     fill="currentColor"
//                     viewBox="0 0 20 20"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                       clipRule="evenodd"
//                     ></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {ad.expanded && (
//               <div className="p-4">
//                 <div className="bg-gray-100 mb-4 py-1 px-3 inline-block rounded text-sm">
//                   IOS Ads No: {index + 1}
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <InputField
//                     label="Name:"
//                     name={`ads_name_${ad.id}`}
//                     value={ad.name}
//                     onChange={(e) =>
//                       handleAdsChange(ad.id, "name", e.target.value)
//                     }
//                     placeholder="N/A"
//                   />
//                   <div>
//                     <p className="mb-2 font-medium text-xs">Ads Type:</p>
//                     <select
//                       value={ad.ads_type}
//                       onChange={(e) =>
//                         handleAdsChange(ad.id, "ads_type", e.target.value)
//                       }
//                       className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
//                     >
//                       <option>Google</option>
//                       <option>Facebook</option>
//                       <option>Unity</option>
//                       <option>AppLovin</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <InputField
//                     label="Application ID:"
//                     name={`application_id_${ad.id}`}
//                     value={ad.application_id}
//                     onChange={(e) =>
//                       handleAdsChange(ad.id, "application_id", e.target.value)
//                     }
//                     placeholder="N/A"
//                   />
//                   <InputField
//                     label="App Open Ad Code:"
//                     name={`app_open_ad_code_${ad.id}`}
//                     value={ad.app_open_ad_code}
//                     onChange={(e) =>
//                       handleAdsChange(ad.id, "app_open_ad_code", e.target.value)
//                     }
//                     placeholder="N/A"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <InputField
//                     label="Banner Ad Code:"
//                     name={`banner_ad_code_${ad.id}`}
//                     value={ad.banner_ad_code}
//                     onChange={(e) =>
//                       handleAdsChange(ad.id, "banner_ad_code", e.target.value)
//                     }
//                     placeholder="N/A"
//                   />
//                   <InputField
//                     label="Interstitial Ad Code:"
//                     name={`interstitial_ad_code_${ad.id}`}
//                     value={ad.interstitial_ad_code}
//                     onChange={(e) =>
//                       handleAdsChange(
//                         ad.id,
//                         "interstitial_ad_code",
//                         e.target.value
//                       )
//                     }
//                     placeholder="N/A"
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                   <InputField
//                     label="Native Ad Code:"
//                     name={`native_ad_code_${ad.id}`}
//                     value={ad.native_ad_code}
//                     onChange={(e) =>
//                       handleAdsChange(ad.id, "native_ad_code", e.target.value)
//                     }
//                     placeholder="N/A"
//                   />
//                   <InputField
//                     label="Rewarded Ad Code:"
//                     name={`rewarded_ad_code_${ad.id}`}
//                     value={ad.rewarded_ad_code}
//                     onChange={(e) =>
//                       handleAdsChange(ad.id, "rewarded_ad_code", e.target.value)
//                     }
//                     placeholder="N/A"
//                   />
//                 </div>

//                 <div className="mb-4">
//                   <p className="mb-2 font-medium text-xs">Status</p>
//                   <label className="inline-flex items-center">
//                     <input
//                       type="checkbox"
//                       className="hidden"
//                       checked={ad.is_active}
//                       onChange={() =>
//                         handleAdsChange(ad.id, "is_active", !ad.is_active)
//                       }
//                     />
//                     <span className="relative">
//                       <span
//                         className={`block w-10 h-6 ${
//                           ad.is_active ? "bg-[#00a4e6]" : "bg-gray-300"
//                         } rounded-full shadow-inner`}
//                       ></span>
//                       <span
//                         className={`absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out transform ${
//                           ad.is_active ? "translate-x-4" : "translate-x-0"
//                         }`}
//                       >
//                         <input
//                           type="checkbox"
//                           className="absolute opacity-0 w-0 h-0"
//                         />
//                       </span>
//                     </span>
//                   </label>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}

//         <button
//           onClick={addNewAd}
//           className="bg-[#00a4e6] text-white rounded px-4 py-2 text-sm w-fit self-start flex items-center"
//         >
//           <span className="mr-1 font-bold">+</span> Add New IOS Ads
//         </button>
//       </div>

//       <div className="flex justify-end">
//         <button
//           className={`text-sm my-4 font-normal right-12 bottom-5 py-1 px-2 text-white uppercase transition active:scale-95 rounded-md shadow-lg ${
//             loading ? "bg-gray-600" : "bg-[#00a4e6]"
//           }`}
//           onClick={handleSave}
//         >
//           Update
//         </button>
//       </div>
//     </div>
//   );
// };

// export default IosSettingAdds;

import React, { useEffect, useState } from "react";
import {
  createUpdateIosAdSettings,
  deleteIosads,
  getIosAdsSettings,
} from "../../Api";

// Improved InputField component to ensure proper value handling
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required,
}) => (
  <div>
    <p className="mb-2 font-medium text-xs ">{label}</p>
    <input
      type="text"
      name={name}
      value={value || ""}
      onChange={onChange}
      placeholder={placeholder || "N/A"}
      className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
      required={required}
    />
  </div>
);

const IosSettingAdds = () => {
  const [iosAdsList, setIosAdsList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        // Call API function
        const response = await getIosAdsSettings();

        console.log("API Response:", response?.adSettings?.ios);

        // Check if response contains data
        if (response?.data) {
          console.log("Settings Fetched Successfully!", response.data.ios);
          // Make sure we're setting the state with the correct data structure
          const adsData = response.data.iosAdsList || [];
          setIosAdsList(adsData);
        } else if (response?.adSettings?.ios) {
          // Alternative data structure
          setIosAdsList(response.adSettings.ios);
        } else {
          console.error(
            "Error: Response does not contain expected data structure"
          );
          // Initialize with empty array if no data
          setIosAdsList([]);
        }
      } catch (error) {
        console.error(
          "Error fetching settings:",
          error.response?.data || error.message
        );
        // Initialize with empty array on error
        setIosAdsList([]);
      }
    };
    fetchAds();
  }, []);

  const addNewAd = () => {
    const newId =
      iosAdsList.length > 0
        ? Math.max(...iosAdsList.map((ad) => ad.id || 0)) + 1
        : 1;

    setIosAdsList((prev) => [
      ...prev,
      {
        id: newId,
        expanded: true,
        name: "",
        ads_type: "Google",
        status: "Active",
        application_id: "",
        app_open_ad_code: "",
        banner_ad_code: "",
        interstitial_ad_code: "",
        native_ad_code: "",
        rewarded_ad_code: "",
        is_active: true,
      },
    ]);
  };

  const handleAdsChange = (id, field, value) => {
    setIosAdsList((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, [field]: value } : ad))
    );
  };

  // Toggle expanded state for ads
  const toggleAdsExpanded = (id) => {
    setIosAdsList((prev) =>
      prev.map((ad) => (ad.id === id ? { ...ad, expanded: !ad.expanded } : ad))
    );
  };

  const handleSave = async () => {
    setLoading(true);

    // Prepare data to send to backend
    const formData = {
      iosAdsList: iosAdsList,
    };

    console.log("Sending data to backend:", formData);

    try {
      // Call API function
      const response = await createUpdateIosAdSettings(formData);

      console.log("API Response:", response);

      // Check if response contains data
      if (response?.data) {
        console.log("Settings Updated Successfully!", response.data);
      } else {
        console.error("Error: Response does not contain data");
      }
    } catch (error) {
      console.error(
        "Error updating settings:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Call API function to delete the ad
      const response = await deleteIosads(id);
      console.log("Delete function API Response:", response);
      // Check if the ad was deleted successfully
      if (response?.success) {
        setIosAdsList((prev) => prev.filter((ad) => ad.id !== id));
        // Remove the ad from the state
        console.log("Ad deleted successfully!");
      } else {
        console.error("Error: Failed to delete ad");
      }
    } catch (error) {
      console.error("Error deleting ad:", error.message);
    }
  };

  // If there are no ads yet, initialize with one
  useEffect(() => {
    if (iosAdsList.length === 0) {
      addNewAd();
    }
  }, [iosAdsList.length]);

  return (
    <div className="flex flex-col gap-2">
      <div className="w-full bg-white rounded-md p-2 flex flex-col gap-2">
        <h2 className="text-sm font-semibold mb-4 text-gray-700">
          IOS Ads List
        </h2>

        {iosAdsList.map((ad, index) => (
          <div key={ad.id || index} className="border rounded mb-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 border-b">
              <div className="flex items-center">
                <button
                  onClick={() => toggleAdsExpanded(ad.id)}
                  className="mr-4"
                  type="button"
                >
                  {ad.expanded ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 15l7-7 7 7"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
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
                  )}
                </button>
                <span className="font-medium text-sm">
                  {ad.name || "New Ad"}
                </span>
              </div>
              <div className="flex items-center">
                <span className="mr-6 text-sm">{ad.ads_type}</span>
                <span className="bg-green-400 text-white px-4 py-1 rounded-full text-sm mr-6">
                  {ad.is_active ? "Active" : "Inactive"}
                </span>

                <button
                  className="text-gray-400 hover:text-red-500"
                  onClick={() => handleDelete(ad._id)} // handleDelete function call
                  type="button"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {ad.expanded && (
              <div className="p-4">
                <div className="bg-gray-100 mb-4 py-1 px-3 inline-block rounded text-sm">
                  IOS Ads No: {index + 1}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField
                    label="Name:"
                    name={`ads_name_${ad.id}`}
                    value={ad.name}
                    onChange={(e) =>
                      handleAdsChange(ad.id, "name", e.target.value)
                    }
                    placeholder="Enter ad name"
                  />
                  <div>
                    <p className="mb-2 font-medium text-xs">Ads Type:</p>
                    <select
                      value={ad.ads_type || "Google"}
                      onChange={(e) =>
                        handleAdsChange(ad.id, "ads_type", e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="Google">Google</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Unity">Unity</option>
                      <option value="AppLovin">AppLovin</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField
                    label="Application ID:"
                    name={`application_id_${ad.id}`}
                    value={ad.application_id}
                    onChange={(e) =>
                      handleAdsChange(ad.id, "application_id", e.target.value)
                    }
                    placeholder="Enter application ID"
                  />
                  <InputField
                    label="App Open Ad Code:"
                    name={`app_open_ad_code_${ad.id}`}
                    value={ad.app_open_ad_code}
                    onChange={(e) =>
                      handleAdsChange(ad.id, "app_open_ad_code", e.target.value)
                    }
                    placeholder="Enter app open ad code"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField
                    label="Banner Ad Code:"
                    name={`banner_ad_code_${ad.id}`}
                    value={ad.banner_ad_code}
                    onChange={(e) =>
                      handleAdsChange(ad.id, "banner_ad_code", e.target.value)
                    }
                    placeholder="Enter banner ad code"
                  />
                  <InputField
                    label="Interstitial Ad Code:"
                    name={`interstitial_ad_code_${ad.id}`}
                    value={ad.interstitial_ad_code}
                    onChange={(e) =>
                      handleAdsChange(
                        ad.id,
                        "interstitial_ad_code",
                        e.target.value
                      )
                    }
                    placeholder="Enter interstitial ad code"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <InputField
                    label="Native Ad Code:"
                    name={`native_ad_code_${ad.id}`}
                    value={ad.native_ad_code}
                    onChange={(e) =>
                      handleAdsChange(ad.id, "native_ad_code", e.target.value)
                    }
                    placeholder="Enter native ad code"
                  />
                  <InputField
                    label="Rewarded Ad Code:"
                    name={`rewarded_ad_code_${ad.id}`}
                    value={ad.rewarded_ad_code}
                    onChange={(e) =>
                      handleAdsChange(ad.id, "rewarded_ad_code", e.target.value)
                    }
                    placeholder="Enter rewarded ad code"
                  />
                </div>

                <div className="mb-4">
                  <p className="mb-2 font-medium text-xs">Status</p>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={ad.is_active}
                      onChange={() =>
                        handleAdsChange(ad.id, "is_active", !ad.is_active)
                      }
                    />
                    <span className="relative">
                      <span
                        className={`block w-10 h-6 ${
                          ad.is_active ? "bg-[#00a4e6]" : "bg-gray-300"
                        } rounded-full shadow-inner`}
                      ></span>
                      <span
                        className={`absolute block w-4 h-4 mt-1 ml-1 bg-white rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out transform ${
                          ad.is_active ? "translate-x-4" : "translate-x-0"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="absolute opacity-0 w-0 h-0"
                        />
                      </span>
                    </span>
                  </label>
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addNewAd}
          className="bg-[#00a4e6] text-white rounded px-4 py-2 text-sm w-fit self-start flex items-center"
          type="button"
        >
          <span className="mr-1 font-bold">+</span> Add New IOS Ads
        </button>
      </div>

      <div className="flex justify-end">
        <button
          className={`text-sm my-4 font-normal right-12 bottom-5 py-1 px-2 text-white uppercase transition active:scale-95 rounded-md shadow-lg ${
            loading ? "bg-gray-600" : "bg-[#00a4e6]"
          }`}
          onClick={handleSave}
          disabled={loading}
          type="button"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </div>
    </div>
  );
};

export default IosSettingAdds;
