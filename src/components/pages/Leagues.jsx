import { CiSearch } from "react-icons/ci";
import { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import LoadingBall from "../global/LoadingBall.jsx";
import {
  getLeagues,
  addLeague,
  getSelectedLeagues,
  removeLeague,
} from "../../Api";
import Portal from "./Portal";
import SelectedLeagues from "../global/SelectedLeagues";

const Leagues = () => {
  // State variables
  const [searchQuery, setSearchQuery] = useState("");
  const [allLeagues, setAllLeagues] = useState([]); // All leagues from API
  const [filteredLeagues, setFilteredLeagues] = useState([]); // Filtered leagues for dropdown
  const [selectedLeagues, setSelectedLeagues] = useState([]); // User's selected leagues
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const LeaegusFromApi = await getLeagues();
      setAllLeagues(LeaegusFromApi);
      console.log("1-LeaegusFromApi (for-search-bar)", LeaegusFromApi);

      // Fetch user's selected leagues
      const userLeagues = await getSelectedLeagues();
      setSelectedLeagues(userLeagues || []);
      console.log("2-userLeagues (for-frontend)", userLeagues);
      // Ensure it's an array even if API fails
    } catch (error) {
      console.error("Error fetching data:", error);
      setSelectedLeagues([]); // Fallback to empty array on error
      toast.error("Failed to load leagues");
    } finally {
      setLoading(false);
    }
  };

  // Fetch all leagues and user's selected leagues when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Filter leagues based on search query
  useEffect(() => {
    if (searchQuery || showDropdown) {
      const filtered = allLeagues.filter(
        (league) =>
          league.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !(selectedLeagues || []).some(
            (selected) => selected.leagueId === league._id
          ) // Ensure selectedLeagues is an array
      );

      setFilteredLeagues(filtered);
    } else {
      setFilteredLeagues([]);
    }
  }, [searchQuery, allLeagues, selectedLeagues, showDropdown]);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation(); // Stop event from bubbling up to Reorder.Item

    try {
      console.log("Attempting to delete league with ID:", id);

      // Call the API to remove the league
      const response = await removeLeague(id);
      console.log("API response:", response);

      fetchData();

      toast.success("League removed successfully");
    } catch (error) {
      console.error("Delete error details:", error);
      toast.error(
        `Failed to remove league: ${error.message || "Unknown error"}`
      );
    }
  };

  // Add league to selected leagues
  const handleAddLeague = async (league) => {
    try {
      // Check if already in selected leagues
      if ((selectedLeagues || []).some((item) => item.id === league.id)) {
        toast.info(`${league.name} is already in your leagues`);
        return;
      }

      // Call API to add league
      await addLeague(league.name, league.image_path);

      // Update local state
      setSelectedLeagues([...(selectedLeagues || []), league]);
      fetchData();
      setSearchQuery(""); // Clear search after adding

      toast.success(`${league.name} added to your leagues`);
    } catch (error) {
      console.error("Error adding league:", error);
      toast.error("Failed to add league");
    }
  };

  return (
    <Portal>
      <div className="bg-gray-100 w-full min-h-screen p-3 ">
        {/* Search Section Start  */}

        {/* <div className="mt-4 p-5 w-[90%] mx-auto bg-white shadow-md rounded-md flex flex-col"> */}
        <div className="mt-4 p-5 w-[95%] h-40 mx-auto bg-white shadow-md rounded-3xl flex flex-col">
          <h3 className="font-medium text-[#4b5563] pt-4 text-xl ">
            Search Popular Leagues
          </h3>

          <div className="relative w-1/3 input-wrapper pt-3" ref={dropdownRef}>
            <input
              type="text"
              placeholder="Type here..."
              className="border border-gray-300 w-full  p-3 rounded-md transition text-base"
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => setShowDropdown(true)}
            />
            <CiSearch className="absolute text-black font-bold text-2xl top-6 right-4 cursor-pointer hover:text-black" />

            {/* Dropdown for search results */}
            {showDropdown && (
              <div className="absolute z-20 w-full mt-1 bg-[#d1d5db] rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center">
                    <LoadingBall />
                  </div>
                ) : filteredLeagues.length > 0 ? (
                  filteredLeagues.map((league) => (
                    <div
                      key={league.id}
                      className="p-3 border-b border-gray-300 flex items-center justify-between bg-[#e5e7eb]"
                    >
                      <div className="flex items-center">
                        <img
                          src={
                            league.image_path ||
                            "https://via.placeholder.com/30"
                          }
                          alt={league.name}
                          className="w-8 h-8 mr-3 rounded-full border-2 border-[#cccfd5]"
                        />
                        <span className="font-medium text-sm">
                          {league.name}
                        </span>
                      </div>
                      <button
                        onClick={() => handleAddLeague(league)}
                        className="px-3 text-xs py-1 bg-[#e5e7eb] text-gray-800 rounded border border-black hover:bg-gray-100 flex items-center"
                      >
                        ADD +
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">
                    No leagues found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Search Section End  */}

        {/* Selected Leagues Section */}
        <div className="mt-12 w-[92%] mx-auto">
          <h2 className="text-lg font-medium text-black mb-2">
            Selected Leagues
          </h2>
          <div className="mt-2 flex flex-col gap-2">
            {loading ? (
              <div className="flex justify-center items-center h-20 ">
                <LoadingBall />
              </div>
            ) : (
              <SelectedLeagues
                handleDelete={handleDelete}
                leagues={selectedLeagues || []}
              />
            )}
          </div>
        </div>
      </div>
    </Portal>
  );
};

export default Leagues;
