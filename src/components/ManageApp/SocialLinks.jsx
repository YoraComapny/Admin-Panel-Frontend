import { useEffect, useState } from "react";
import LoadingSemiCircle from "../global/LoadingSemiCircle";
import { toast } from "react-toastify";
import { CreateAndUpdateSocialLinks, getSocialLinks } from "../../Api";

export const SocialLinks = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    facebook: "",
    instagram: "",
    twitter: "",
    telegram: "",
    youtube: "",
  });
  useEffect(() => {
    const fetchSocialLinks = async () => {
      setLoading(true);
      try {
        const response = await getSocialLinks();
        console.log("socialLinks", response.socialLinks);
        if (response?.socialLinks) {
          //  setData(response.data);
          setData(response.socialLinks);
          console.log("my data", data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSocialLinks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await CreateAndUpdateSocialLinks(data);
      if (response.status === 200) {
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
    toast.success("Social links updated successfully!");
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      {loading ? (
        <LoadingSemiCircle />
      ) : (
        <form className="grid grid-cols-2 gap-3" onSubmit={handleSave}>
          {/* Facebook */}
          <div className="flex w-full ">
            <div className="w-full m-2">
              <label className="text-xs font-semibold flex items-center">
                Facebook <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="facebook"
                value={data.facebook}
                onChange={handleChange}
                className="w-full p-2 rounded-md block border border-gray-300 mt-1 text-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter Facebook link"
              />
            </div>
          </div>

          {/* Instagram */}
          <div className="flex w-full">
            <div className="w-full  m-2">
              <label className="text-xs font-semibold flex items-center">
                Instagram <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="instagram"
                value={data.instagram}
                onChange={handleChange}
                className="w-full p-2 rounded-md block border border-gray-300 mt-1 text-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter Instagram link"
              />
            </div>
          </div>

          {/* Twitter */}
          <div className="flex w-full">
            <div className="w-full m-2">
              <label className="text-xs font-semibold flex items-center">
                Twitter <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="twitter"
                value={data.twitter}
                onChange={handleChange}
                className="w-full p-2 rounded-md block border border-gray-300 mt-1 text-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter Twitter link"
              />
            </div>
          </div>

          {/* Telegram */}
          <div className="flex w-full">
            <div className="w-full m-2">
              <label className="text-xs font-semibold flex items-center">
                Telegram <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="telegram"
                value={data.telegram}
                onChange={handleChange}
                className="w-full p-2 rounded-md block border border-gray-300 mt-1 text-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter Telegram link"
              />
            </div>
          </div>

          {/* YouTube */}
          <div className="flex w-full">
            <div className="w-full m-2">
              <label className="text-xs font-semibold flex items-center">
                YouTube <span className="text-red-600 ml-1">*</span>
              </label>
              <input
                type="text"
                name="youtube"
                value={data.youtube}
                onChange={handleChange}
                className="w-full p-2 rounded-md block border border-gray-300 mt-1 text-sm focus:ring-0 focus:ring-blue-500 focus:border-blue-500 outline-none"
                placeholder="Enter YouTube link"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-2 py-1 h-8 bg-[#00a4e6] text-white text-sm font-medium rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-2"
            >
              UPDATE
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
