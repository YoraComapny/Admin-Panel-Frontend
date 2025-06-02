import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { getAppInformation, createUpdateAppInformation } from "../../Api";
import LoadingSemiCircle from "../global/LoadingSemiCircle";
import { toast } from "react-toastify";

export const AppInformation = () => {
  const [file, setFile] = useState();
  const [previewImage, setPreviewImage] = useState("/placeholder.svg");
  const [dragging, setDragging] = useState(false);
  const [isToggled, setIsToggled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    appName: "Yalla Football EN",
    app_unique_id: "17360571026786XolZ0aCob",
    sports_api_base_url: "https://api.yallafootballen.com/api/football/v3",
    sports_api_key: "b876482a56ab4de1ed581b576ae4dcea61b57f74",
    ip_api_key: "",
    highlights_type: "disable",
    app_logo: "",
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const form = await getAppInformation();
        console.log("MERA FORM ka data", form);
        setIsToggled(form.settings.status || true);
        setData({
          appName: form.settings.appName || "Yalla Football EN",
          app_unique_id:
            form.settings.app_unique_id || "17360571026786XolZ0aCob",
          sports_api_base_url:
            form.settings.sports_api_base_url ||
            "https://api.yallafootballen.com/api/football/v3",
          sports_api_key:
            form.settings.sports_api_key ||
            "b876482a56ab4de1ed581b576ae4dcea61b57f74",
          ip_api_key: form.settings.ip_api_key || "",
          highlights_type: form.settings.highlights_type || "disable",
        });

        const cloudinaryUrl = form.settings.app_logo.split(
          "appInformationupload/"
        )[1];
        setPreviewImage(cloudinaryUrl || "/placeholder.svg");
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const toggle = () => {
    setIsToggled(!isToggled);
  };

  const { appName, app_unique_id, sports_api_base_url, sports_api_key } = data;

  const handlefile = (event) => {
    setFile(event.target.files[0]);
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

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
    setFile(files[0]);
    setPreviewImage(URL.createObjectURL(files[0]));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFormData = (values) => {
    if (
      !values.appName ||
      !values.app_unique_id ||
      !values.sports_api_base_url ||
      !values.sports_api_key ||
      !values.ip_api_key
    ) {
      return false;
    } else {
      var formData = new FormData();
      formData.append("appName", values?.appName);
      if (file) formData.append("file", file);
      formData.append("app_unique_id", values?.app_unique_id);
      formData.append("sports_api_base_url", values?.sports_api_base_url);
      formData.append("sports_api_key", values?.sports_api_key);
      formData.append("ip_api_key", values?.ip_api_key);
      formData.append("highlights_type", values?.highlights_type);
      formData.append("status", isToggled);
      return formData;
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const val = handleFormData(data);
    if (val) {
      try {
        const res = await createUpdateAppInformation(val);
        console.log(res);
        toast.success("App information updated successfully");
      } catch (error) {
        console.log(error?.message);
        toast.error("Failed to update app information");
      }
    } else toast.error("Enter required fields first");
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      {loading ? (
        <LoadingSemiCircle />
      ) : (
        <form className="flex flex-col gap-3">
          <div className="flex w-full">
            <div className="w-1/2 m-2">
              <label className="text-xs font-semibold flex items-center">
                App Name <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                name="appName"
                onChange={handleChange}
                value={appName}
                className="w-full p-1.5 rounded-md block border border-gray-300 mt-1 text-xs focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                type="text"
                placeholder="Yalla Football EN"
              />
            </div>
            <div className="w-1/2 m-2">
              <label className="text-xs font-semibold flex items-center">
                App Unique Id <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="app_unique_id"
                onChange={handleChange}
                value={app_unique_id}
                className="w-full p-1.5 rounded-md block border border-gray-300 mt-1 bg-gray-100 text-xs focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="17360571026786XolZ0aCob"
                readOnly
              />
            </div>
          </div>

          <div className="flex w-full">
            <div className="w-1/2 m-2">
              <label className="text-xs font-semibold flex items-center">
                Sport API Base Url <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="sports_api_base_url"
                onChange={handleChange}
                value={sports_api_base_url}
                className="w-full p-1.5 rounded-md block border border-gray-300 mt-1 text-xs focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="https://api.yallafootballen.com/api/football/v3"
              />
            </div>
            <div className="w-1/2 m-2">
              <label className="text-xs font-semibold flex items-center">
                Sport API Key <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="sports_api_key"
                onChange={handleChange}
                value={sports_api_key}
                className="w-full p-1.5 rounded-md block border border-gray-300 mt-1 text-xs focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="b876482a56ab4de1ed581b576ae4dcea61b57f74"
              />
            </div>
          </div>

          <div className="m-2">
            <label className="text-xs font-semibold">App Logo</label>
            {previewImage && previewImage !== "/placeholder.svg" ? (
              <div className="mt-1 flex items-center">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={previewImage || "/placeholder.svg"}
                    alt="App Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setFile(null);
                    setPreviewImage("");
                  }}
                  className="ml-3 bg-red-100 p-2 rounded-md"
                >
                  <FaTrash className="text-red-500 text-xl" />
                </button>
              </div>
            ) : (
              <div
                className={`mt-1 border-2 border-dashed rounded-lg p-6 bg-[#f0fdf4] ${
                  dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="text-center">
                  <p className="text-sm text-gray-700 font-medium">
                    Drag & Drop Image here
                  </p>
                  <div className="mt-2 flex justify-center">
                    <div className="flex items-center">
                      <span className="text-gray-400 mx-2">OR</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={() =>
                        document.getElementById("file-upload").click()
                      }
                      className="inline-flex items-center px-4 py-2 bg-[#00a4e6] text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      BROWSE FILE
                    </button>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handlefile}
                      accept="image/*"
                    />
                  </div>
                  <p className="mt-1 text-xs text-orange-500">
                    Maximum Size: 1MB
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="m-2">
            <label className="text-xs font-semibold block mb-2">Status</label>
            <div className="relative inline-block w-12 h-6 select-none">
              <input
                type="checkbox"
                name="status"
                id="toggle"
                className="sr-only"
                checked={isToggled}
                onChange={toggle}
              />
              <label
                htmlFor="toggle"
                className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-200 ease-in-out ${
                  isToggled ? "bg-indigo-600" : "bg-red-200"
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${
                    isToggled ? "translate-x-6" : "translate-x-0"
                  }`}
                >
                  {isToggled ? (
                    <svg
                      className="h-6 w-6 text-indigo-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="px-2 py-1 bg-[#00a4e6] text-white font-medium rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-2"
            >
              UPDATE
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
