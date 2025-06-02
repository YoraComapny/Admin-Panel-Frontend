import { BsSortUpAlt } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdDragIndicator } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { deleteMatch, duplicateMatch } from "../../Api.js";
import LoadingBall from "../global/LoadingBall.jsx";
import { updateMatchOrder, getOrder } from "../../Api.js";
import PropTypes from "prop-types";
import { format } from "date-fns";
import StreamingPopUp from "./StreamingPopUp.jsx";

const MatchList = ({ isGrid, matchesArray }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runCount, setRunCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);

  const handleMoveUp = (match) => {
    setSelectedMatch(match);
    setShowPopup(true);
  };

  // Update the handleClosePopup function
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedMatch(null);
  };

  const sortMatchesByDateTime = (matches) => {
    return [...matches].sort((a, b) => {
      const dateA = new Date(a.match_time);
      const dateB = new Date(b.match_time);
      return dateA - dateB; // Earlier dates first
    });
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await myOrder();
        let order = res;
        if (matchesArray.length >= res.length) {
          const orderValues = matchesArray.map((item) => item.order);
          await updateMatchOrder(orderValues);
          order = orderValues;
        }
        if (!res) {
          const orderValues = matchesArray.map((item) => item.order);
          await updateMatchOrder(orderValues);
          order = orderValues;
          //console.log(req.status);

          // Sort matches by date and time before setting state
          const sortedMatches = sortMatchesByDateTime(matchesArray);
          setMatches(sortedMatches);
          //console.log(orderValues);
        } else {
          // First arrange by custom order
          const arrangedMatches = sortObjectsByOrder(
            matchesArray.slice(),
            order
          );

          // Then sort by date and time
          const sortedMatches = sortMatchesByDateTime(arrangedMatches);
          setMatches(sortedMatches);
        }
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchesArray]);

  // Arranging items
  function sortObjectsByOrder(arrayOfObjects, orderArray) {
    const uniqueOrders = new Set(arrayOfObjects.map((obj) => obj.order));

    // Filter the orderArray to only include values that exist in uniqueOrders
    const validOrders = orderArray.filter((order) => uniqueOrders.has(order));

    return arrayOfObjects.sort((a, b) => {
      const aIndex = validOrders.indexOf(a.order);
      const bIndex = validOrders.indexOf(b.order);

      if (aIndex === -1 && bIndex === -1) {
        // If both orders are not present in the validOrders array, maintain their original order
        return 0;
      }

      if (aIndex === -1) {
        // If a.order is not present in the validOrders array, move it to the end
        return 1;
      }

      if (bIndex === -1) {
        // If b.order is not present in the validOrders array, move it to the end
        return -1;
      }

      // Sort based on the order of elements in the validOrders array
      return aIndex - bIndex;
    });
  }

  // const handleMoveUp = (index) => {
  //   if (index > 0) {
  //     const newItems = [...matches];
  //     [newItems[index - 1], newItems[index]] = [
  //       newItems[index],
  //       newItems[index - 1],
  //     ];
  //     setMatches(newItems);
  //   }
  // };

  // get the order of the list items
  const myOrder = async () => {
    const res = await getOrder();
    return res;
  };

  useEffect(() => {
    if (runCount < 3) {
      setRunCount((prevRunCount) => prevRunCount + 1);
    }
    if (runCount >= 2) {
      const timeoutId = setTimeout(async () => {
        const newOrder = matches.map((item) => item.order);
        const res = await updateMatchOrder(newOrder);
        console.log(res.status);
        // toast.success(`List reordered successfully`, {
        //   position: "top-right",
        //   autoClose: 1000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: false,
        //   draggable: false,
        //   progress: undefined,
        //   theme: "light",
        // });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const handleDelete = async (id) => {
    const res = await deleteMatch(id);
    setMatches(matches.filter((match) => match.id !== id));
    // console.log(res);
  };

  // console.log("1--1-1--1 Matches", matches);
  return (
    <main>
      {loading ? (
        <LoadingBall />
      ) : (
        <Reorder.Group
          axis={isGrid ? "x" : "y"}
          values={matches}
          onReorder={setMatches}
          className={`${isGrid ? "flex flex-wrap gap-1" : "flex flex-col"}`}
        >
          {/* list view  */}
          {matches.map((match, index) => (
            <Reorder.Item value={match} key={match.id}>
              {!isGrid ? (
                <div className="w-full h-32 flex border bg-[#ffffff] rounded-md m-1">
                  {/* Match Details Section */}
                  <div className="flex justify-around items-center pl-2 pr-10 pt-5 pb-5 w-[59%] mx-auto">
                    {/* Team 1 */}
                    <div className="flex gap-1 items-center">
                      <div className="bg-white rounded-md border border-gray-100 p-2">
                        <img
                          src={match.team_one_img || "/placeholder.svg"}
                          alt={match.team_one}
                          className="h-[60px] w-[80px] object-cover aspect-square"
                        />
                      </div>
                      <h4 className="text-xs font-medium text-center">
                        {match.team_one}
                      </h4>
                    </div>

                    {/* Match Info */}
                    <div className="flex flex-col text-center w-[50%]">
                      <h3 className="text-sm font-semibold uppercase p-1">
                        {match.league_type.split("-").join(" ")}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {format(
                          new Date(match.match_time),
                          "MMMM d'st' yyyy / h:mm a"
                        )}
                      </p>
                      <div>
                        <p className="border-t border-gray-300 w-full mb-1"></p>
                        <p className="text-gray-500 text-xs font-medium">VS</p>
                      </div>
                    </div>

                    {/* Team 2 */}
                    <div className="flex items-center gap-1">
                      <h4 className="text-xs font-medium text-center">
                        {match.team_two}
                      </h4>
                      <div className="bg-white rounded-md border border-gray-100 p-2">
                        <img
                          src={match.team_two_img || "/placeholder.svg"}
                          alt={match.team_two}
                          className="h-[60px] w-[80px] object-cover aspect-square"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Streams and Actions Section */}
                  <div className="border-l-2 border-gray-100 w-[41%] flex justify-between items-center pl-2 text-xs">
                    {/* Streams */}
                    <p className="w-[18%] overflow-hidden font-normal p-1">
                      Streams: <span>{match.stream_count}</span>
                    </p>

                    {/* Status */}
                    <div
                      className={`w-max h-max p-1 rounded-full text-center shadow-md ${
                        match.status === "active"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    >
                      <p className="text-white text-sm font-normal">
                        {match.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-1 flex gap-4 text-xl w-max justify-end mr-5">
                      {/* Move Up */}
                      {/* <div className="relative group inline-block">
                        <BsSortUpAlt
                          className="cursor-pointer"
                          onClick={() => handleMoveUp(index)}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-md">
                          Source
                        </div>
                      </div> */}
                      <div className="relative group inline-block">
                        <BsSortUpAlt
                          className="cursor-pointer"
                          onClick={() => handleMoveUp(match)}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-md">
                          Source
                        </div>
                      </div>
                      {showPopup && (
                        <StreamingPopUp
                          isOpen={showPopup}
                          onClose={handleClosePopup}
                          match={selectedMatch}
                        />
                      )}
                      {/* Clone */}
                      <Link to={`/admin/manage-live/clone/${match.id}`}>
                        <div className="relative group inline-block">
                          <IoCopyOutline className="text-blue-400 cursor-pointer" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-blue-400 text-white text-xs px-2 py-1 rounded shadow-md">
                            Clone
                          </div>
                        </div>
                      </Link>
                      {/* Edit */}
                      <Link to={`/admin/manage-live/edit/${match.id}`}>
                        <div className="relative group inline-block">
                          <FiEdit className="text-blue-400 cursor-pointer" />
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-blue-400 text-white text-xs px-2 py-1 rounded shadow-md">
                            Edit
                          </div>
                        </div>
                      </Link>
                      {/* Delete */}
                      <div className="relative group inline-block">
                        <RiDeleteBin5Line
                          className="text-red-400 cursor-pointer"
                          onClick={() => handleDelete(match.id)}
                        />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-red-400 text-white text-xs px-2 py-1 rounded shadow-md">
                          Delete
                        </div>
                      </div>
                      {/* Drag Handle */}
                      <div className="relative group inline-block">
                        <MdDragIndicator className="cursor-grab" />
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded shadow-md">
                          Grab
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // box view
                <div className="w-[325px] h-auto flex flex-col items-center border rounded-lg bg-white shadow-sm m-1">
                  <div className="flex items-center justify-between w-full p-4">
                    {/* team 1 */}
                    <div
                      id="team-1"
                      className="flex flex-col items-center w-[40%]"
                    >
                      <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
                        <img
                          src={match.team_one_img || "/placeholder.svg"}
                          alt=""
                          className="size-[70px] object-contain"
                        />
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-center text-nowrap">
                        {match.team_one}
                      </h4>
                    </div>

                    {/* match info */}
                    <div id="match-info" className="flex flex-col text-center">
                      <h3 className="text-lg font-semibold uppercase text-gray-800">
                        {match.league_type}
                      </h3>

                      {/* time format start  */}
                      {/* <p className="text-gray-500 text-xs">
                        {format(new Date(match.match_time), "MMMM do yyyy")}
                        <br />
                        <span className="text-gray-500">
                          {format(new Date(match.match_time), "H:mm")}
                        </span>
                      </p> */}

                      <p className="text-gray-500 text-sm font-medium">
                        {format(new Date(match.match_time), "MMMM do yyyy")} /{" "}
                        {format(new Date(match.match_time), "h:mm")}
                      </p>

                      {/* time format start  */}

                      <div className="h-px w-full bg-gray-200 my-1"></div>

                      <p className="mt-2 text-base font-medium text-gray-600">
                        VS
                      </p>
                    </div>

                    {/* team 2 */}
                    <div
                      id="team-2"
                      className="w-[40%] flex flex-col items-center"
                    >
                      <div className="bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
                        <img
                          src={match.team_two_img || "/placeholder.svg"}
                          alt=""
                          className="size-[70px] object-contain"
                        />
                      </div>
                      <h4 className="mt-2 text-sm font-semibold text-center text-nowrap">
                        {match.team_two}
                      </h4>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px w-full bg-gray-200 my-1"></div>

                  {/* Actions */}
                  <div className="p-3 w-full flex justify-between items-center">
                    <div
                      className={`px-3 py-1 rounded-full text-center shadow-sm ${
                        match.status === "active"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      }`}
                    >
                      <p className="text-xs font-medium">
                        {match.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>

                    <p className="text-xs border rounded-full px-3 py-1 bg-gray-50">
                      Streams: <span>{match.stream_count}</span>
                    </p>

                    <div className="flex gap-2 text-lg">
                      <div className="relative group">
                        <BsSortUpAlt
                          className="cursor-pointer text-gray-600 hover:text-gray-900"
                          onClick={handleMoveUp} // Pass the appropriate index  onClick={handleMoveUp} // Pass the appropriate index
                        />
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block
                    bg-black text-white text-xs px-2 py-1 rounded shadow-md"
                        >
                          Source
                        </div>
                      </div>

                      <Link to={`/admin/manage-live/clone/${match.id}`}>
                        <div className="relative group">
                          <IoCopyOutline className="text-blue-500 cursor-pointer hover:text-blue-700" />
                          <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block
                      bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-md"
                          >
                            Clone
                          </div>
                        </div>
                      </Link>

                      <Link to={`/admin/manage-live/edit/${match.id}`}>
                        <div className="relative group">
                          <FiEdit className="text-blue-500 cursor-pointer hover:text-blue-700" />
                          <div
                            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block
                    bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-md"
                          >
                            Edit
                          </div>
                        </div>
                      </Link>

                      <div className="relative group">
                        <RiDeleteBin5Line
                          className="text-red-500 cursor-pointer hover:text-red-700"
                          onClick={() => handleDelete(match.id)}
                        />
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block
                    bg-red-500 text-white text-xs px-2 py-1 rounded shadow-md"
                        >
                          Delete
                        </div>
                      </div>

                      <div className="relative group">
                        <MdDragIndicator className="cursor-grab text-gray-600 hover:text-gray-900" />
                        <div
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 hidden group-hover:block
                    bg-black text-white text-xs px-2 py-1 rounded shadow-md"
                        >
                          Grab
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </main>
  );
};

const Team = PropTypes.shape({
  name: PropTypes.string,
  image: PropTypes.string,
});

const Match = PropTypes.shape({
  _id: PropTypes.string,
  sport_type: PropTypes.string,
  league_type: PropTypes.string,
  match_title: PropTypes.string,
  match_time: PropTypes.string,
  fixture_id: PropTypes.string,
  hot_match: PropTypes.bool,
  status: PropTypes.string,
  team_one: PropTypes.oneOfType([Team, PropTypes.any]),
  team_two: PropTypes.oneOfType([Team, PropTypes.any]),
  streaming_source: PropTypes.arrayOf(PropTypes.any), // Flexible for streaming source structure
  order: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  __v: PropTypes.number,
});

MatchList.propTypes = {
  isGrid: PropTypes.bool,
  matchesArray: PropTypes.arrayOf(Match),
};

export default MatchList;
