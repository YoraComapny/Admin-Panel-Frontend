import DateSelector from "../global/DateSelector";
import LeagueFixtures from "../global/LeagueFixture";
import Location from "../global/Location";
import { useLocation } from "react-router-dom";
import Portal from "./Portal";
import { useEffect, useState } from "react";
import { getFixtures } from "../../Api";
import LoadingBall from "../global/LoadingBall.jsx";

const Fixtures = () => {
  const location = useLocation();
  const [fixtureData, setFixtureData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0].toString()
  );

  useEffect(() => {
    setLoading(true);
    const fetchFixtures = async () => {
      try {
        const response = await getFixtures({
          date: selectedDate,
        });

        if (response && response.success) {
          // Format data structure to match what LeagueFixtures expects
          setFixtureData({
            data: {
              response: response.fixture,
            },
          });
          console.log("1--", response.fixture);
          setError(null);
        } else {
          setError("Could not fetch fixtures");
          setFixtureData(null);
        }
      } catch (err) {
        console.error("Error fetching fixtures:", err);
        setError("Failed to load fixtures");
        setFixtureData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchFixtures();
  }, [selectedDate]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Portal>
        <div className="w-full flex flex-col gap-5 bg-[#fafafa] p-5 min-h-screen">
          <div>
            <Location location={location} />
          </div>
          <div className="flex flex-col gap-10 bg-white shadow-md w-full mx-auto rounded-md p-5">
            <p className="font-medium">Pick Your Date</p>
            <DateSelector onDateSelect={handleDateSelect} />
          </div>

          <div className="min-h-[200px] bg-white shadow-md w-full mx-auto rounded-md p-5">
            {loading ? (
              <div className="mt-5">
                <LoadingBall />
              </div>
            ) : error ? (
              <div className="text-center w-full text-bold text-red-500 font-semibold">
                {error}
              </div>
            ) : fixtureData ? (
              <LeagueFixtures fixture={fixtureData} />
            ) : (
              <div className="text-center w-full text-bold text-gray-500 font-semibold">
                No fixtures found for selected date
              </div>
            )}
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Fixtures;
