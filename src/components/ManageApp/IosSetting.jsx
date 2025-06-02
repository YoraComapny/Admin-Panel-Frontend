import { useState } from "react";
import IosSettingAdds from "./IosSettingAdds";
import IosSettingGeneral from "./IosSettingGeneral";

// Common InputField component that can be used by child components
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

const NotificationDropdown = ({ label, value, options, onChange }) => (
  <div className="mb-4">
    <p className="mb-2 font-medium text-xs">{label}</p>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-2 border rounded text-sm"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const IosSettings = () => {
  const [activeTab, setActiveTab] = useState("GENERAL");
  // const [loading, setLoading] = useState(false);

  // Ads forms (initialized with an empty array)
  // const [androidAdsList, setAndroidAdsList] = useState([]);

  // Handle main form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes for ads forms
  // const handleAdsChange = (id, field, value) => {
  //   setAndroidAdsList((prev) =>
  //     prev.map((ad) => (ad.id === id ? { ...ad, [field]: value } : ad))
  //   );
  // };

  // // Toggle expanded state for ads
  // const toggleAdsExpanded = (id) => {
  //   setAndroidAdsList((prev) =>
  //     prev.map((ad) => (ad.id === id ? { ...ad, expanded: !ad.expanded } : ad))
  //   );
  // };

  // Delete an ad
  // const deleteAd = (id) => {
  //   setAndroidAdsList((prev) => prev.filter((ad) => ad.id !== id));
  // };

  // Add a new ad form
  // const addNewAd = () => {
  //   const newId =
  //     androidAdsList.length > 0
  //       ? Math.max(...androidAdsList.map((ad) => ad.id)) + 1
  //       : 1;

  //   setAndroidAdsList((prev) => [
  //     ...prev,
  //     {
  //       id: newId,
  //       expanded: true,
  //       name: "",
  //       ads_type: "Google",
  //       status: "Active",
  //       application_id: "",
  //       app_open_ad_code: "",
  //       banner_ad_code: "",
  //       interstitial_ad_code: "",
  //       native_ad_code: "",
  //       rewarded_ad_code: "",
  //       is_active: true,
  //     },
  //   ]);
  // };

  // Save all form data
  // const handleSave = () => {
  //   setLoading(true);

  //   // Prepare data to send to backend
  //   const formData = {
  //     ...data,
  //     androidAdsList: androidAdsList,
  //   };

  //   console.log("Sending data to backend:", formData);

  //   // Simulate API call
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  // };

  return (
    <div className="w-full max-w-6xl mx-auto bg-[#fafafa] border p-4 font-sans">
      {/* Tabs */}
      <div className="flex mb-6">
        <button
          className={`rounded-full px-8 h-7 text-xs mr-4 text-center ${
            activeTab === "GENERAL"
              ? "bg-[#00a4e6] text-white"
              : "bg-white text-[#00a4e6] border border-[#00a4e6]"
          }`}
          onClick={() => setActiveTab("GENERAL")}
        >
          GENERAL
        </button>

        <button
          className={`rounded-full px-8 h-7 text-xs mr-4 text-center ${
            activeTab === "ADS"
              ? "bg-[#00a4e6] text-white"
              : "bg-white text-[#00a4e6] border border-[#00a4e6]"
          }`}
          onClick={() => setActiveTab("ADS")}
        >
          ADS
        </button>
      </div>

      {/* Render the appropriate component based on active tab */}
      {activeTab === "GENERAL" && (
        <IosSettingGeneral
        // data={data}
        // handleChange={handleChange}
        // handleSave={handleSave}
        // loading={loading}
        />
      )}

      {activeTab === "ADS" && (
        <IosSettingAdds
        // androidAdsList={androidAdsList}
        // toggleAdsExpanded={toggleAdsExpanded}
        // deleteAd={deleteAd}
        // handleAdsChange={handleAdsChange}
        // addNewAd={addNewAd}
        // handleSave={handleSave}
        // loading={loading}
        />
      )}
    </div>
  );
};

export default IosSettings;
