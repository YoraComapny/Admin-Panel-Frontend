import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { toast } from "react-toastify";
import MatchList from "../ManageLive/MatchList";
import Location from "../global/Location";
import Portal from "./Portal";
import LoadingBall from "../global/LoadingBall";
import { fetchAllMatches, updateMobileView } from "../../Api.js";

const ManageLive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isGrid, setIsGrid] = useState(false);
  const location = useLocation();
  const [isToggled, setIsToggled] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const currentPage = 1;
    try {
      const response = await fetchAllMatches(currentPage, searchQuery, perPage);

      console.log("response", response.data);
      // Safely handle the response data
      if (!response || !response.data || !response.data.paginatedMatches) {
        throw new Error("Invalid response from the server");
      }

      const extractedMatches = response.data.paginatedMatches.map((match) => ({
        id: match._id || "N/A",
        status: match.status || "N/A",
        league_type: match.league_type || "N/A",
        hot_match: match.hot_match || false,
        match_title: match.match_title || "N/A",
        match_time: match.match_time || "N/A",
        sports_type: match.sport_type || "N/A",
        team_one: match.team_one?.name || "N/A",
        team_one_img: match.team_one?.image || "",
        team_two: match.team_two?.name || "N/A",
        team_two_img: match.team_two?.image || "",
        stream_count: match.streaming_source?.length || 0,
        order: match.order || 0,
        streaming_source: match,
      }));

      setMatches(extractedMatches);
      setFilteredMatches(extractedMatches);
    } catch (error) {
      console.error("Error fetching matches:", error);
      toast.error("Error fetching matches");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, perPage]);

  useEffect(() => {
    const isToggle = localStorage.getItem("Toggle");
    console.log("isToggle", isToggle);
    setIsToggled(isToggle);
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = matches.filter((match) =>
      match.league_type.toLowerCase().startsWith(lowerCaseQuery)
    );
    setFilteredMatches(filtered);
  }, [searchQuery, matches]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleGrid = (gridValue) => {
    setIsGrid(gridValue);
  };

  const handleToggle = async () => {
    const newState = !isToggled;
    localStorage.setItem("Toggle", newState);
    setIsToggled(newState);

    try {
      await updateMobileView(newState);
      console.log("Mobile view updated successfully to:", newState);
    } catch (error) {
      setIsToggled(!newState);
      console.error("Failed to update mobile view:", error.message);
    }
  };
  return (
    <Portal>
      <div className="flex flex-col min-h-screen bg-[#fafafa] p-3 md:p-6 ">
        <div className="flex flex-col md:flex-row justify-between p-2 gap-4 ">
          <Location location={location} />

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link to="/admin/manage-live/create-match">
              <button className="w-full sm:w-auto py-1 px-4 text-sm uppercase bg-[#00a4e6] text-[#d4e2f2] rounded-sm hover:bg-[#00a4e9] transition active:scale-95 font-normal">
                + Create a Match
              </button>
            </Link>
          </div>
        </div>

        <div className="p-2 flex flex-col  sm:flex-row justify-between items-center gap-3">
          <input
            type="text"
            className="p-2 text-xs bg-white rounded-md border border-gray-400 w-full sm:w-[160px] 
             focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[220px]
             focus:border-transparent focus:ring-2 focus:ring-blue-500"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="flex gap-2 items-center">
            {/* =========add toggle button start ============ */}
            <div className="flex items-center space-x-2">
              <button
                onClick={handleToggle}
                className={`w-8 h-5 flex items-center rounded-full  duration-300 ease-in-out
          ${isToggled ? "bg-green-500" : "bg-red-500"}`}
              >
                <div
                  className={`w-5 h-5 bg-gray-200 rounded-full shadow-md transform duration-300 ease-in-out border
            ${isToggled ? "translate-x-3" : "translate-x-0"}`}
                />
              </button>
            </div>

            {/* =========add toggle button end ============ */}
            {/* list view */}
            <div className="p-1 h-max w-max bg-[#fff] ">
              <FaList
                className={`cursor-pointer text-lg  ${
                  !isGrid ? "text-blue-500" : "text-black"
                }`}
                onClick={() => handleGrid(false)}
              />
            </div>

            {/* Grid view */}
            <div className="p-1 h-max w-max bg-[#fff] ">
              <IoGrid
                className={`cursor-pointer text-lg ${
                  isGrid ? "text-blue-500" : "text-black"
                }`}
                onClick={() => handleGrid(true)}
              />
            </div>

            <div className="flex gap-3 items-center">
              <p className="text-sm">Page Size: </p>
              <select
                className="bg-white rounded-md border-2 border-black h-max text-xs text-center pl-2 py-1"
                value={perPage}
                onChange={(e) =>
                  setPerPage(Number.parseInt(e.target.value, 10))
                }
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>
        <h3 className="text-base m-3 font-medium">ALL MATCHES</h3>
        {loading ? (
          <div className="mt-3">
            <LoadingBall />
          </div>
        ) : (
          <MatchList isGrid={isGrid} matchesArray={filteredMatches} />
        )}
      </div>
    </Portal>
  );
};

export default ManageLive;
