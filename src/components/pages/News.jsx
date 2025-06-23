import Location from "../global/Location";
import { Link, useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import NewsArticleThumbnail from "../global/NewsArticleThumbnail";
import { useEffect, useState } from "react";
import { getAllNews } from "../../Api";
import LoadingBall from "../global/LoadingBall";
import Portal from "./Portal";

const News = () => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);

  const [news, setNews] = useState([]);
  const [isGrid, setIsGrid] = useState(false);
  const disableGrid = () => {
    setIsGrid(false);
  };
  const enableGrid = () => {
    setIsGrid(true);
  };
  const location = useLocation();
  useEffect(() => {
    allNews();
  }, [currentPage, searchQuery, perPage]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const allNews = async () => {
    try {
      const res = await getAllNews(currentPage, searchQuery, perPage);
      if (res?.data?.success) {
        setLoading(false);
        setNews(res?.data?.paginatedNews);
        setCurrentPage(res?.data?.totalPages);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  return (
    <>
      <Portal>
        <div>
          <div className="bg-[#fafafa] flex flex-col gap-2 w-full min-h-screen p-3">
            <Location location={location} />
            <div className="flex justify-end ">
              <Link to="/admin/news/create-news">
                <button className="p-2 font-normal text-xs uppercase text-white rounded-md bg-[#00a4e6]  transition w-max h-max active:scale-95">
                  + Add New News
                </button>
              </Link>
            </div>

            <div
              id="news-list"
              className="mt-2 flex min-h-[200px] flex-col gap-2 bg-white rounded-md shadow-md p-3"
            >
              <h2 className="mt-4 text-lg font-medium">News List</h2>
              <div className="flex justify-between">
                <input
                  type="text"
                  name="search"
                  onChange={(e) => handleSearchChange(e)}
                  className="p-2 text-xs bg-white rounded-md border border-gray-400 w-full sm:w-[160px] 
             focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[200px]
             focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  placeholder="Search..."
                />

                <div className="flex gap-2 items-center">
                  <div className="p-1 h-max w-max bg-[#fff]">
                    <IoGrid
                      className={`cursor-pointer text-lg ${
                        isGrid ? "text-blue-500" : "text-black"
                      }`}
                      onClick={enableGrid}
                    />
                  </div>
                  <div className="p-1 h-max w-max bg-[#fff] rounded-md">
                    <FaList
                      className={`cursor-pointer text-lg  ${
                        !isGrid ? "text-blue-500" : "text-black"
                      }`}
                      onClick={disableGrid}
                    />
                  </div>
                  <div className="flex gap-3">
                    <p className="text-sm">Page Size: </p>
                    <select
                      className="bg-[#fff] rounded-md border-2 border-black h-max text-xs text-center pl-2"
                      value={perPage}
                      onChange={(e) => setPerPage(parseInt(e.target.value))}
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
              {loading ? (
                <LoadingBall />
              ) : (
                <div
                  className={`mt-2 flex ${
                    isGrid ? "flex-row flex-wrap" : "flex-col"
                  } gap-2`}
                >
                  {news?.map((obj, _) => (
                    <div key={obj._id}>
                      <NewsArticleThumbnail data={obj} isGrid={isGrid} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default News;
