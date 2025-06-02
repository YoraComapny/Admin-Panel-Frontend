import { androidCreateUpdateSettings, getAndroidSettings } from "../../Api";
import React, { useState, useRef, useEffect } from "react";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { FaTrash } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";

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

const AndroidSettingGeneral = () => {
  const [logoImage, setLogoImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(""); // Initialize to empty string
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    ios_privacy_policy: "",
    ios_terms_conditions: "",
    ios_app_share_link: "",
    app_rating_link: "",
    app_default_page: "Home",
    app_publishing_control: "On",
    hide_live_by_version_code: "",
    primary_ads_type: "",
    multiple_ad_service: "Enable",
    others_ads_type: "",
    ad_switch: "",
    interstitial_click_control: "0",
    ads_status: "Enable",
    version_name: "",
    version_code: "",
    force_update: "Yes",
    update_for: "In Store",
    app_url: "",
    button_text: "",
    description: "",
    required_enable_app: "Yes",
    application_id: "",
    required_app_url: "",
    app_name: "",
    required_description: "",
    promotion_status: "Active",
    button_name: "",
    promotion_text: "",
    promotion_link: "",
    logo_url: "", // To store the URL of the currently displayed logo
  });

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const response = await getAndroidSettings();
        if (response.status === 200) {
          const data = response.data?.settings || null;
          if (data) {
            setData(data);
          }
          setPreviewUrl(data.logo_url || ""); // Update previewUrl here
        }
      } catch (err) {
        console.error("Error occurred: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Handle file selection via the browse button
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileUpload(file);
  };

  // Handle file upload logic
  const handleFileUpload = (file) => {
    if (!file) return;

    // Check file size (limit to 1MB)
    if (file.size > 1024 * 1024) {
      alert("File size exceeds 1MB limit. Please choose a smaller file.");
      return;
    }

    // Check if file is an image
    if (!file.type.match("image.*")) {
      alert("Please select an image file.");
      return;
    }

    // Update state with the file
    setLogoImage(file);

    // Create preview URL
    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);

    // Update the data object (assuming you want to pass the file to parent component)
    handleChange({
      target: {
        name: "image",
        value: file,
      },
    });
  };

  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Trigger file input click
  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setLogoImage(null);
    setPreviewUrl("");
    setData((prev) => ({ ...prev, logo_url: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Update the data object
    handleChange({
      target: {
        name: "image",
        value: null,
      },
    });
  };

  // Handle main form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const formData = new FormData();

    // Append all the form data to the FormData object
    console.log("Data:", data);
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append the logo image file if it exists
    console.log("logo image:", logoImage);
    // if (logoImage) {
    //   formData.append("image", logoImage);
    // }

    // Set loading state to true
    setLoading(true);

    try {
      const response = await androidCreateUpdateSettings(formData);

      const { data } = response.data;
      setData(data);

      if (response.status === 200) {
        console.log("Settings updated successfully!", response.data.data);
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 gap-y-4 rounded-md">
      <div className="w-full bg-white rounded-md shadow-md flex flex-col gap-2 pt-6 pl-6 pr-6">
        <h2 className="text-sm font-semibold mb-4 text-gray-800">
          GENERAL SETTINGS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <InputField
            label="Android Privacy Policy"
            name="ios_privacy_policy"
            value={data.ios_privacy_policy}
            onChange={handleChange}
            placeholder="N/A"
          />
          <InputField
            label="Android Terms Conditions"
            name="ios_terms_conditions"
            value={data.ios_terms_conditions}
            onChange={handleChange}
            placeholder="N/A"
          />
          <InputField
            label="Android App Share Link"
            name="ios_app_share_link"
            value={data.ios_app_share_link}
            onChange={handleChange}
            placeholder="N/A"
          />
          {/* <InputField
            label="App Rating Link"
            name="app_rating_link"
            value={data.app_rating_link}
            onChange={handleChange}
            placeholder="N/A"
          /> */}
          <div>
            <p className="mb-2 font-medium text-xs">App Default Page</p>
            <select
              name="app_default_page"
              value={data.app_default_page}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Home</option>
              <option>Live</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 gap-y-4 rounded-md">
        <div className="w-full bg-white rounded-md shadow-md flex flex-col gap-2 pt-6 pl-6 pr-6">
          <h2 className="text-sm font-semibold mb-4 text-gray-800">
            LIVE CONTROL
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div>
              <p className="flex items-center mb-2 font-medium text-xs">
                App Publishing Control
                <span className="ml-1 bg-gray-400 text-red-600 text-xs font-medium rounded-full w-4 h-4 flex items-center justify-center">
                  ?
                </span>
              </p>
              <select
                name="app_publishing_control"
                value={data.app_publishing_control}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option>On</option>
                <option>Off</option>
              </select>
            </div>
            <InputField
              label="Hide Live by Version Code"
              name="hide_live_by_version_code"
              value={data.hide_live_by_version_code}
              onChange={handleChange}
              placeholder="N/A"
            />
          </div>
        </div>
      </div>
      {/* Live control ended */}

      {/* Ads Settings started */}
      <div className="w-full bg-white rounded-md shadow-md flex flex-col gap-2 pt-6 pl-6 pr-6 ">
        <h2 className="text-sm font-semibold mb-4 text-gray-800">
          ADS SETTINGS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="mb-2 font-medium text-xs">Primary Ads Type</p>
            <select
              name="primary_ads_type"
              value={data.primary_ads_type}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Select One</option>
              <option>Youtube</option>
              <option>Facebook</option>
              <option>Google</option>
            </select>
          </div>
          <div>
            <p className="mb-2 font-medium text-xs">Multiple Ad Service</p>
            <select
              name="multiple_ad_service"
              value={data.multiple_ad_service}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Enable</option>
              <option>Disable</option>
            </select>
          </div>
          <div>
            <p className="mb-2 font-medium text-xs">Others Ads Type</p>
            <select
              name="others_ads_type"
              value={data.others_ads_type}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Select...</option>
              <option>Youtube</option>
              <option>Facebook</option>
              <option>Google</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <InputField
            label="Ad Switch"
            name="ad_switch"
            value={data.ad_switch}
            onChange={handleChange}
            placeholder="N/A"
          />

          <div>
            <p className="mb-2 font-medium text-xs">
              Interstitial Click Control
            </p>
            <select
              name="interstitial_click_control"
              value={data.interstitial_click_control}
              onChange={handleChange}
              className="w-full p-1 border border-gray-200 rounded-md text-xs focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
            >
              {Array.from({ length: 11 }, (_, i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <p className="mb-2 font-medium text-xs">Ads Status</p>
            <select
              name="ads_status"
              value={data.ads_status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Enable</option>
              <option>Disable</option>
            </select>
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-md shadow-md flex flex-col gap-2 pt-6 pl-6 pr-6 ">
        <h2 className="text-sm font-semibold mb-4 text-gray-800">
          VERSION CONTROL
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <InputField
            label="Version Name"
            name="version_name"
            value={data.version_name}
            onChange={handleChange}
            placeholder="N/A"
          />
          <InputField
            label="Version Code"
            name="version_code"
            value={data.version_code}
            onChange={handleChange}
            placeholder="N/A"
          />
          <div>
            <p className="mb-2 font-medium text-xs">Force Update</p>
            <select
              name="force_update"
              value={data.force_update}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <p className="mb-2 font-medium text-xs">Update For</p>
            <select
              name="update_for"
              value={data.update_for}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>In Store</option>
              <option>Out side of Store</option>
            </select>
          </div>
          <InputField
            label="App Url"
            name="app_url"
            value={data.app_url}
            onChange={handleChange}
            placeholder="N/A"
          />
          <InputField
            label="Button Text"
            name="button_text"
            value={data.button_text}
            onChange={handleChange}
            placeholder="N/A"
          />
        </div>

        <div className="mb-6">
          <p className="mb-2 font-medium text-xs">Description</p>
          <textarea
            name="description"
            value={data.description}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm h-15"
            placeholder="N/A"
          />
        </div>
      </div>

      <div className="w-full bg-white rounded-md shadow-md flex flex-col gap-2 pt-6 pl-6 pr-6 ">
        <h2 className="text-sm font-semibold mb-4 text-gray-800">
          REQUIRED APP
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="mb-2 font-medium text-xs">Required Enable App</p>
            <select
              name="required_enable_app"
              value={data.required_enable_app}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
          <InputField
            label="Application Id"
            name="application_id"
            value={data.application_id}
            onChange={handleChange}
            placeholder="N/A"
          />
          <InputField
            label="App Url"
            name="required_app_url"
            value={data.required_app_url}
            onChange={handleChange}
            placeholder="N/A"
          />
          <InputField
            label="App Name"
            name="app_name"
            value={data.app_name}
            onChange={handleChange}
            placeholder="N/A"
          />
        </div>

        <div className="mb-6">
          <p className="mb-2 font-medium text-xs">Description</p>
          <textarea
            name="required_description"
            value={data.required_description}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm h-15"
            placeholder="N/A"
          />
        </div>

        <div className="mb-8">
          <p className="mb-2 font-medium text-xs">Logo</p>
          <div
            className={`border border-dashed ${
              dragActive
                ? "border-blue-500 bg-blue-500"
                : "border-gray-300 bg-white"
            } p-8 rounded text-center`}
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
          >
            {previewUrl || data?.logo_url ? (
              // ===========image preview start ====================

              <div className="mt-1 flex items-center">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={previewUrl || data?.logo_url}
                    alt="Logo Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={handleRemoveImage}
                  type="button"
                  className="ml-3 bg-red-100 p-2 rounded-md"
                >
                  <RiDeleteBin5Line className="text-red-500 text-xl" />
                </button>
              </div>
            ) : (
              <>
                <p className="text-gray-500 mb-2">Drag & Drop Image here</p>
                <div className="flex items-center justify-center">
                  <div className="border-t border-gray-300 w-16"></div>
                  <p className="mx-4 text-gray-400 text-sm">OR</p>
                  <div className="border-t border-gray-300 w-16"></div>
                </div>
                <button
                  className="bg-[#00a4e6] text-white rounded px-4 py-2 mt-4 text-sm"
                  onClick={handleBrowseClick}
                >
                  BROWSE FILE
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
                <p className="text-red-500 text-xs mt-2">Maximum Size: 1MB</p>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="w-full bg-white rounded-md shadow-md flex flex-col gap-2 pt-6 pl-6 pr-6">
        <h2 className="text-sm font-semibold mb-4 text-gray-800">PROMOTION</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <div>
            <p className="mb-2 font-medium text-xs">Promotion Status</p>
            <select
              name="promotion_status"
              value={data.promotion_status}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-md p-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option>Active</option>
              <option>In Active</option>
            </select>
          </div>
          <InputField
            label="Button Name"
            name="button_name"
            value={data.button_name}
            onChange={handleChange}
            placeholder="N/A"
          />
          <InputField
            label="Promotion Text"
            name="promotion_text"
            value={data.promotion_text}
            onChange={handleChange}
            placeholder="N/A"
          />
          <InputField
            label="Promotion Link"
            name="promotion_link"
            value={data.promotion_link}
            onChange={handleChange}
            placeholder="N/A"
          />
        </div>

        <div className="flex justify-end">
          <button
            className={`text-sm my-4 font-normal right-12 bottom-5 py-1 px-2 text-white uppercase transition active:scale-95 rounded-md shadow-lg ${
              loading ? "bg-gray-600" : "bg-[#00a4e6]"
            }`}
            onClick={handleSave}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default AndroidSettingGeneral;
