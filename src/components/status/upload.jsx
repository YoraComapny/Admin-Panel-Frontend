import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleUp, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import "flatpickr/dist/themes/dark.css";
import moment from "moment-timezone";
import Portal from "../pages/Portal.jsx";
import Location from "../global/Location";
import { getAllStatus, updateimages, updateImageStatus } from "../../Api.js";

const Upload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [localDate, setLocalDate] = useState("");
  const [statusToggle, setStatusToggle] = useState(false);
  const [dragging, setDragging] = useState({ football: false, team: false });

  // Enhanced team state with preview image tracking
  const [teams, setTeams] = useState({
    football: {
      name: "",
      uploadedImage: null,
      previewImage: null,
    },
    team: {
      name: "",
      uploadedImage: null,
      previewImage: null,
    },
  });

  const [data, setData] = useState({
    name: "",
    image_url: "",
    status: "active",
  });

  useEffect(() => {
    const fetchData = async () => {
      const statusToggle =
        localStorage.getItem("Toggle-image-status") === "true";
      // const statusToggle = localStorage.getItem("Toggle-image-status");
      setStatusToggle(statusToggle);
      try {
        const response = await getAllStatus();
        console.log("Response from getAllStatus:", response);

        // Set existing images if available
        if (response && response.data && response.data.data) {
          const existingData = response.data.data;

          setTeams((prevTeams) => ({
            ...prevTeams,
            football: {
              ...prevTeams.football,
              previewImage: existingData.imageFootBall || null,
            },
            team: {
              ...prevTeams.team,
              previewImage: existingData.imageTeam || null,
            },
          }));
        }
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };

    fetchData();
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleTeamChange = useCallback((teamKey, field, value) => {
    setTeams((prevTeams) => ({
      ...prevTeams,
      [teamKey]: {
        ...prevTeams[teamKey],
        [field]: value,
      },
    }));
  }, []);

  const toggleStatus = async () => {
    const newState = !statusToggle;
    console.log("Toggling status to:", newState);
    localStorage.setItem("Toggle-image-status", newState);
    setStatusToggle(newState);

    try {
      await updateImageStatus({ status: newState });
      console.log("Image status updated successfully:", newState);
    } catch (error) {
      setStatusToggle(!newState);
      console.error("Failed to update staus:", error.message);
    }
  };

  // Enhanced file upload handling
  const handleFileUpload = useCallback((teamKey, file) => {
    if (file) {
      if (file.size > 1024 * 1024) {
        toast.error("File size exceeds 1MB limit");
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      setTeams((prevTeams) => ({
        ...prevTeams,
        [teamKey]: {
          ...prevTeams[teamKey],
          uploadedImage: file,
          previewImage: previewUrl,
        },
      }));
    }
  }, []);

  // Enhanced remove function with proper cleanup
  const removeUploadedImage = useCallback(
    (teamKey) => {
      const currentTeam = teams[teamKey];

      // Clean up object URL if it exists
      if (currentTeam.previewImage && currentTeam.uploadedImage) {
        URL.revokeObjectURL(currentTeam.previewImage);
      }

      setTeams((prevTeams) => ({
        ...prevTeams,
        [teamKey]: {
          ...prevTeams[teamKey],
          uploadedImage: null,
          previewImage: null,
        },
      }));
    },
    [teams]
  );

  const handleDragEnter = useCallback((teamKey, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging((prev) => ({ ...prev, [teamKey]: true }));
  }, []);

  const handleDragOver = useCallback(
    (teamKey, e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!dragging[teamKey]) {
        setDragging((prev) => ({ ...prev, [teamKey]: true }));
      }
    },
    [dragging]
  );

  const handleDragLeave = useCallback((teamKey, e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging((prev) => ({ ...prev, [teamKey]: false }));
  }, []);

  const handleDrop = useCallback(
    (teamKey, e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragging((prev) => ({ ...prev, [teamKey]: false }));

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFileUpload(teamKey, e.dataTransfer.files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleImagesUpload = async () => {
    const footballImage = teams.football.uploadedImage;
    const teamImage = teams.team.uploadedImage;

    if (!footballImage && !teamImage) {
      toast.error("Please select at least one image to upload");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();

      if (footballImage) {
        formData.append("imageFootBall", footballImage);
      }
      if (teamImage) {
        formData.append("imageTeam", teamImage);
      }

      const response = await updateimages(formData);

      if (response && response.data && response.data.success) {
        // Reset uploaded images after successful upload, keep existing preview if no new upload
        setTeams((prevTeams) => ({
          football: {
            ...prevTeams.football,
            uploadedImage: null,
            previewImage:
              response.data.data?.imageFootBall ||
              prevTeams.football.previewImage,
          },
          team: {
            ...prevTeams.team,
            uploadedImage: null,
            previewImage:
              response.data.data?.imageTeam || prevTeams.team.previewImage,
          },
        }));

        toast.success("Images uploaded successfully!");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload images");
    } finally {
      setLoading(false);
    }
  };

  // Enhanced TeamUploadSection component
  const TeamUploadSection = ({ teamKey, label }) => {
    const team = teams[teamKey];
    const hasImage = team.previewImage;
    const hasNewUpload = team.uploadedImage;

    return (
      <div className="space-y-4">
        {/* Team Label */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            {label} <span className="text-red-500">*</span>
          </label>
        </div>

        {/* Image Display/Upload Section */}
        <div className="mb-4">
          {hasImage ? (
            // Show uploaded image with delete and replace options
            <div className="mt-1">
              <div className="flex items-center">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={team.previewImage}
                    alt={`${label} Logo`}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="ml-3 flex flex-col space-y-2">
                  {/* Delete Button */}
                  <button
                    type="button"
                    onClick={() => removeUploadedImage(teamKey)}
                    className="bg-red-100 p-2 rounded-md hover:bg-red-200 transition-colors"
                    title="Remove image"
                  >
                    <FaTrash className="text-red-500 text-sm" />
                  </button>
                </div>
              </div>

              {/* Hidden file input for replace */}
              <input
                id={`fileInput-${teamKey}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileUpload(teamKey, e.target.files[0])}
              />

              {hasNewUpload && (
                <p className="mt-2 text-xs text-green-600 font-medium">
                  New image selected - ready to upload
                </p>
              )}
            </div>
          ) : (
            // Show drag & drop upload area
            <div
              className={`mt-1 border-2 border-dashed rounded-lg p-6 bg-[#f0fdf4] transition-colors ${
                dragging[teamKey]
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300"
              }`}
              onDragEnter={(e) => handleDragEnter(teamKey, e)}
              onDragOver={(e) => handleDragOver(teamKey, e)}
              onDragLeave={(e) => handleDragLeave(teamKey, e)}
              onDrop={(e) => handleDrop(teamKey, e)}
            >
              <div className="text-center">
                <svg
                  className="w-12 h-12 text-gray-400 mb-4 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
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
                      document.getElementById(`fileInput-${teamKey}`).click()
                    }
                    className="inline-flex items-center px-4 py-2 bg-[#00a4e6] text-white text-sm font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    BROWSE FILE
                  </button>
                  <input
                    id={`fileInput-${teamKey}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) =>
                      handleFileUpload(teamKey, e.target.files[0])
                    }
                  />
                </div>
                <p className="mt-1 text-xs text-orange-500">
                  Maximum Size: 1MB
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Portal>
      <div className="relative w-full">
        <div className="h-max w-[95%] mx-auto rounded-md p-3 border mt-2">
          <h2 className="py-2">
            <div className="flex justify-between items-center">
              <div>
                <Location location={location} />
              </div>
              {/* Status Toggle */}
              <div className="">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={toggleStatus}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      statusToggle ? "bg-green-500" : "bg-red-500"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        statusToggle ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </h2>

          <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 rounded-md shadow p-6 bg-white">
            {/* Football Team Section */}
            <TeamUploadSection teamKey="football" label="Football" />

            {/* Team Section */}
            <TeamUploadSection teamKey="team" label="Team" />

            {/* Submit Button - spans both columns */}
            <div className="col-span-1 md:col-span-2 flex justify-end mt-6 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleImagesUpload}
                disabled={
                  loading ||
                  (!teams.football.uploadedImage && !teams.team.uploadedImage)
                }
                className="px-4 py-2 bg-[#00a4e6] text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-0 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                    Uploading...
                  </div>
                ) : (
                  "UPLOAD"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Upload;
