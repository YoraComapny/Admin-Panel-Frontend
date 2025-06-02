import Location from "../global/Location";
import { useEffect, useState } from "react";
import { createMatch } from "../../Api.js";
import { useLocation, useNavigate } from "react-router-dom";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import Portal from "../pages/Portal.jsx";
import { toast } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";
import moment from "moment-timezone";
import { getThumbnail } from "../../Api.js";

const CreateHighlights = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);


  const [localDate, setLocalDate] = useState("");
 
 
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

  // ... (keep other functions)

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
    setData({
      ...data,
      streaming_source: updatedStreamingSources,
    });
  };

 
  const formatTime = (time) => {
    return moment.utc(time).format("YYYY-MM-DD HH:mm:ss [UTC]");
  };

  

  const handleSubmit = async () => {
    setLoading(true);

   
   
      }
     

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
                        dateFormat: "Z",
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
                             
                        
                            </div>

                           
                          </div>
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

export default CreateHighlights;
