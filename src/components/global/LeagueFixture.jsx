import { useState, useEffect, useCallback, memo } from "react";
import Circle from "./LoadingSemiCircle";
// import Football from "../../assets/ball-football-icon.svg";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context";
import LoadingBall from "./LoadingBall";
import { ALLOWED_LEAGUES } from "./alllowed_leagues.js";

// Extracted TableHeader component for better readability
const TableHeader = memo(() => (
  <thead className="border">
    <tr>
      <th className="bg-[#f6f7fa] p-5 font-medium text-sm">Status</th>
      <th className="bg-[#f6f7fa] p-5 font-medium text-sm">Team</th>
      <th className="bg-[#f6f7fa] p-5 font-medium text-sm">Time</th>
      <th className="bg-[#f6f7fa] p-5 font-medium text-sm">Team</th>
      <th className="bg-[#f6f7fa] p-5 font-medium text-sm">ID</th>
      <th className="bg-[#f6f7fa] p-5 font-medium text-sm">Action</th>
    </tr>
  </thead>
));

const FixtureRow = memo(({ fixture, onLiveClick }) => {
  const { fixture: fixtureData, teams, league } = fixture;

  // Format date in YYYY-MM-DD HH:MM format
  const formattedDate = fixtureData.timestamp
    ? new Date(fixtureData.timestamp * 1000)
        .toISOString()
        .slice(0, 16)
        .replace("T", " ")
    : "";

  // Fixed URL parameters with proper template literal syntax
  const liveMatchUrl = `/admin/manage-live/create-match?id=${
    fixtureData.id
  }&date=${encodeURIComponent(formattedDate)}&homeName=${encodeURIComponent(
    teams.home.name
  )}&homeLogo=${encodeURIComponent(
    teams.home.logo
  )}&awayName=${encodeURIComponent(
    teams.away.name
  )}&awayLogo=${encodeURIComponent(
    teams.away.logo
  )}&matchTitle=${encodeURIComponent(
    `${teams.home.name} vs ${teams.away.name}`
  )}&sports=football&leagueName=${encodeURIComponent(league.name)}`;

  return (
    <tr
      className="text-center items-center space-y-2 border"
      key={fixtureData.id}
    >
      <td className="py-5">
        <button className="bg-[#00a6e5] rounded-md px-2 py-1 text-xs text-white font-medium border">
          {fixtureData.status.short}
        </button>
      </td>
      <td className="flex gap-2 py-5 justify-center items-center">
        <img
          src={teams.home.logo}
          alt={teams.home.name}
          width="20"
          height="20"
          loading="lazy"
        />
        <span className="truncate max-w-[150px]">{teams.home.name}</span>
      </td>
      <td>
        {fixture?.fixture?.timestamp ? (
          <>
            <span className="text-sm">
              {new Date(fixture.fixture.timestamp * 1000).toLocaleString(
                "en-GB",
                {
                  day: "2-digit",
                  month: "short",
                }
              )}
            </span>
            <br />
            <strong className="text-sm font-medium">
              {new Date(fixture.fixture.timestamp * 1000).toLocaleString(
                "en-GB",
                {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false, // 24-hour format
                }
              )}
            </strong>
          </>
        ) : (
          "N/A"
        )}
      </td>
      <td className="flex gap-2 justify-center items-center">
        <img
          src={teams.away.logo}
          alt={teams.away.name}
          width="20"
          height="20"
          loading="lazy"
        />
        <span className="truncate max-w-[150px]">{teams.away.name}</span>
      </td>
      <td>{fixtureData.id}</td>
      <td>
        <Link
          to={liveMatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="py-2 px-2 text-sm text-white font-medium rounded-md shadow-md cursor-pointer bg-[#00a4e6] transition active:scale-95"
          onClick={() => onLiveClick(fixture)}
        >
          Add Live
        </Link>
      </td>
    </tr>
  );
});

// League Table Component
const LeagueTable = memo(
  ({ leagueName, leagueLogo, fixtures, onLiveClick }) => {
    if (fixtures.length === 0) return null;

    return (
      <div className="mb-12">
        <div className="flex gap-3 items-center mb-4">
          <img src={leagueLogo} alt={leagueName} width="30" height="30" />
          <h2 className="font-medium text-xl">{leagueName}</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <TableHeader />
            <tbody>
              {fixtures.map((fixture) => (
                <FixtureRow
                  key={fixture.fixture.id}
                  fixture={fixture}
                  onLiveClick={onLiveClick}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

const LeagueFixtures = ({ fixture }) => {
  const [loading, setLoading] = useState(false);
  const [fixturesByLeague, setFixturesByLeague] = useState({});
  const { setFixtureInContext } = useUserContext();

  // useEffect(() => {
  //   const getFixtures = async () => {
  //     setLoading(true);
  //     try {
  //       // Check if fixture data exists and has the expected structure
  //       if (fixture?.data?.response) {
  //         // Filter and group fixtures by league
  //         const grouped = fixture.data.response.reduce((acc, fixture) => {
  //           const leagueName = fixture.league.name;
  //           const leagueId = fixture.league.id;

  //           // Check if the league ID is in the ALLOWED_LEAGUES array
  //           const isAllowedLeague = ALLOWED_LEAGUES.some(
  //             (allowedLeague) => allowedLeague.id === leagueId
  //           );

  //           // Only add the fixture if it's in an allowed league
  //           if (isAllowedLeague) {
  //             if (!acc[leagueId]) {
  //               acc[leagueId] = {
  //                 id: leagueId,
  //                 name: fixture.league.name,
  //                 logo: fixture.league.logo,
  //                 fixtures: [],
  //               };
  //             }
  //             acc[leagueId].fixtures.push(fixture);
  //           }

  //           return acc;
  //         }, {});

  //         setFixturesByLeague(grouped);
  //       } else {
  //         console.warn("Fixtures data is not in the expected format:", fixture);
  //         setFixturesByLeague({});
  //       }
  //     } catch (err) {
  //       console.error("Error processing fixtures:", err);
  //       setFixturesByLeague({});
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getFixtures();
  // }, [fixture]);

  // Memoize the handleLive function to prevent unnecessary re-renders

  useEffect(() => {
    const getFixtures = async () => {
      setLoading(true);
      try {
        // Check if fixture data exists and has the expected structure
        if (fixture?.data?.response) {
          // Get array of allowed league IDs from ALLOWED_LEAGUES
          const allowedLeagueIds = ALLOWED_LEAGUES.map((league) => league.id);

          // Filter and group fixtures by league
          const grouped = fixture.data.response.reduce((acc, fixture) => {
            const leagueId = fixture.league.id;

            // Check if this league ID is in our allowed list
            if (allowedLeagueIds.includes(leagueId)) {
              // Create the league entry if it doesn't exist
              if (!acc[leagueId]) {
                // Find the league info from ALLOWED_LEAGUES
                const leagueInfo = ALLOWED_LEAGUES.find(
                  (league) => league.id === leagueId
                );

                acc[leagueId] = {
                  id: leagueId,
                  name: fixture.league.name || leagueInfo?.name,
                  logo: fixture.league.logo || leagueInfo?.logo,
                  fixtures: [],
                };
              }

              // Add the fixture to the appropriate league group
              acc[leagueId].fixtures.push(fixture);
            }

            return acc;
          }, {});

          setFixturesByLeague(grouped);
        } else {
          console.warn("Fixtures data is not in the expected format:", fixture);
          setFixturesByLeague({});
        }
      } catch (err) {
        console.error("Error processing fixtures:", err);
        setFixturesByLeague({});
      } finally {
        setLoading(false);
      }
    };

    getFixtures();
  }, [fixture]);

  const handleLive = useCallback(
    (currentFixture) => {
      setFixtureInContext(currentFixture);
    },
    [setFixtureInContext]
  );

  // Early rendering for loading state
  if (loading) {
    return (
      <div className="flex flex-col gap-10 w-full">
        {/* <div className="flex gap-3 items-center">
          <img src={Football} alt="league-emblem" width="30" height="30" />
          <h2 className="font-bold">DAILY FIXTURES</h2>
        </div> */}
        <Circle />
      </div>
    );
  }

  // If there are no fixtures
  if (Object.keys(fixturesByLeague).length === 0) {
    return (
      <div className="flex flex-col gap-10 w-full">
        {/* <div className="flex gap-3 items-center">
          <img src={Football} alt="league-emblem" width="30" height="30" />
          <h2 className="font-bold">DAILY FIXTURES</h2>
        </div> */}
        <LoadingBall />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* <div className="flex gap-3 items-center">
        <img src={Football} alt="league-emblem" width="30" height="30" />
        <h2 className="font-bold">DAILY FIXTURES</h2>
      </div> */}

      {Object.values(fixturesByLeague).map((league) => (
        <LeagueTable
          key={league.id}
          leagueName={league.name}
          leagueLogo={league.logo}
          fixtures={league.fixtures}
          onLiveClick={handleLive}
        />
      ))}
    </div>
  );
};

export default memo(LeagueFixtures);
