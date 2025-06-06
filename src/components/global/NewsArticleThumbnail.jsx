import { LuPencilLine } from "react-icons/lu";
import { MdOutlineEditNote } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { deleteSingleNews } from "../../Api";
import { toast } from "react-toastify";

const NewsArticleThumbnail = ({ isGrid, data }) => {
  console.log(data);
  const handleDelete = async (id) => {
    const res = await deleteSingleNews(id);
    if (res?.data?.success) {
      toast.success(`${res.data?.message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    window.location.reload();
  };
  // const hanldeEdit = (id) => {
  //   navigation(`/manage-live/edit/${id}`);
  // };

  if (isGrid) {
    return (
      <div
        id="card"
        className="shadow-md h-[370px] w-[230px] bg-gray-200 rounded-md flex flex-col   "
      >
        <div className="rounded-t-md   p-3">
          {data?.image_url ? (
            <img
              src={data?.image_url}
              alt={`${data?.title}`}
              className="w-full h-[160px]  object-fill rounded-md overflow-hidden  "
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_BASE_API_URL}/${data?.image}`}
              alt="news-1"
              className="w-full h-[160px]  object-fill rounded-md overflow-hidden  "
            />
          )}
        </div>
        <div className=" mx-2 flex flex-col text-center h-full ">
          <h3 className="text-gray-600 font-light text-sm ">
            <span className="text-black font-light text-xs">Title:</span>{" "}
            {data?.title}
          </h3>
          <div className=" m-2 flex justify-center ">
            <div className=" bg-green-400 rounded-md p-2 text-center">
              <p className="text-xs text-white">{data?.status}</p>
            </div>
          </div>

          <div className="m-1 flex justify-center gap-2 ">
            <div className="p-2 bg-orange-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:text-white">
              <Link to={`/news/edit-news/${data?._id}`}>
                <MdOutlineEditNote className="text-xl" />
              </Link>
            </div>
            <div
              onClick={() => {
                handleDelete(data._id);
              }}
              className="p-2 bg-red-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:text-white"
            >
              <MdDelete className="text-xl" />
            </div>
          </div>

          <div className="h-full flex justify-center items-start m-2">
            <h4 className="text-xs items-end">
              <span className="font-normal">Category:</span> {data?.category}
            </h4>
            <LuPencilLine className="text-green-400 text-lg hover:text-green-600 transition-colors ml-1" />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="mt-2 bg-gray-200 w-full rounded-md shadow-md flex justify-between">
        <div className="rounded-md w-max">
          {data?.image_url ? (
            <img
              src={data?.image_url}
              alt={data?.title}
              className="w-[170px] h-[90px]  rounded-l-lg object-fill"
            />
          ) : (
            <img
              src={`${import.meta.env.VITE_BASE_API_URL}/${data?.image}`}
              alt="news-1"
              className="w-[220px] h-[150px] rounded-md object-fill"
            />
          )}
        </div>
        <div id="news-info" className="p-3 flex justify-around w-full">
          <div className="h-full flex flex-col justify-between max-w-[40%]">
            <h3 className="text-gray-900 text-sm font-medium">
              Title: <span className="uppercase text-sm">{data.title}</span>
            </h3>
            <div className="flex gap-2 min-w-[200px]">
              <h4 className="text-xs font-medium">
                <span className="font-normal">Category:</span> {data?.category}
              </h4>
              <LuPencilLine className="text-green-400 text-base hover:text-green-600 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            {/* <p className="font-semibold">Publish Date</p> */}
            <p className="text-center text-gray-600 text-sm font-semibold">
              {data?.publish_date}
            </p>
          </div>

          <div className="flex items-center">
            {data?.status === "active" ? (
              <div className=" bg-green-400 rounded-md p-1 text-center">
                <p className="text-xs text-white uppercase font-semibold">
                  {data?.status}
                </p>
              </div>
            ) : (
              <div className=" bg-red-400 rounded-md p-1 text-center">
                <p className="text-xs text-white uppercase font-semibold">
                  {data?.status}
                </p>
              </div>
            )}
          </div>

          <div className="ml-20 flex items-center gap-2">
            <Link to={`/admin/news/edit-news/${data?._id}`}>
              <div className="p-2 bg-orange-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:text-white">
                <MdOutlineEditNote className="text-xl" />
              </div>
            </Link>
            <div
              onClick={() => {
                handleDelete(data._id);
              }}
              className="p-2 bg-red-500 cursor-pointer rounded-md w-[50px] flex justify-center h-max hover:text-white"
            >
              <MdDelete className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default NewsArticleThumbnail;
