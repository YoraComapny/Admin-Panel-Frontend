import LoadingBall from "../global/LoadingBall";
import PropTypes from "prop-types";
import Portal from "./Portal";
import { fetchAllMatches } from "../../Api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllMatches(1, "", 10);
        const { paginatedMatches } = response.data;
        const extractedMatches = paginatedMatches.map((match) => ({
          id: match._id,
          status: match.status,
        }));
        setTime(getTimeInfo());
        setMatches(extractedMatches);
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Get time variable
  function getTimeInfo() {
    const currentDate = new Date();

    // Get timezone name
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Get time (HH:MM AM/PM format)
    const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedTime = currentDate.toLocaleTimeString(
      undefined,
      timeOptions
    );

    // Get day (e.g., "Tuesday")
    const dayOptions = { weekday: "long" };
    const formattedDay = currentDate.toLocaleDateString(undefined, dayOptions);

    // Get date (e.g., "13, May, 2024")
    const dateOptions = { day: "2-digit", month: "long", year: "numeric" };
    const formattedDate = currentDate.toLocaleDateString(
      undefined,
      dateOptions
    );

    // Construct the timezone string
    const timezoneOffsetHours = currentDate.getTimezoneOffset() / 60;
    const timezoneOffsetMinutes = Math.abs(
      currentDate.getTimezoneOffset() % 60
    );
    const timezoneOffsetSign = currentDate.getTimezoneOffset() < 0 ? "+" : "-";
    const formattedTimezone = `${timezoneName} UTC ${timezoneOffsetSign}${
      timezoneOffsetHours < 10 ? "0" : ""
    }${timezoneOffsetHours}:${
      timezoneOffsetMinutes < 10 ? "0" : ""
    }${timezoneOffsetMinutes}`;

    return {
      timezone: formattedTimezone,
      time: formattedTime,
      day: formattedDay,
      date: formattedDate,
    };
  }

  return (
    <>
      <Portal>
        <div className="bg-[#fafafa] p-5 min-h-screen">
          {loading ? (
            <LoadingBall />
          ) : (
            <div className="flex flex-col gap-5">
              <div className="flex gap-1">
                <div className="flex flex-col bg-[#7c3aed] p-5 rounded-2xl m-1 justify-center items-center text-white h-[130px] w-[195px]   transition-colors">
                  <h3 className="text-2xl font-medium">{matches.length}</h3>
                  <p className="mt-2 text-base font-normal">Total Matches</p>
                </div>

                <div className="flex flex-col bg-[#7c3aed] p-5 rounded-2xl m-1 justify-center items-center text-white h-[130px] w-[195px] transition-colors">
                  <h3 className="text-2xl font-medium">
                    {
                      matches.filter((match) => match.status === "active")
                        .length
                    }
                  </h3>
                  <p className="mt-2 text-base font-normal">Total Live</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </Portal>
    </>
  );
};

Dashboard.propTypes = {
  list: PropTypes.array,
};

export default Dashboard;
