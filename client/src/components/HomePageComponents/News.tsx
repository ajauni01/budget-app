import { useQuery } from "react-query";
import axios from "axios";
import { useEffect } from "react";
import Loader from "../Loader";

const News = () => {
  // fetch the stock market news
  const fetchNews = async () => {
    const pages = [1, 2, 3, 4, 5]; // Array of page numbers
    const allNews = [];
    // get the news from the api and push it to the allNews array
    for (let page of pages) {
      const response = await axios.get(
        `https://stocknewsapi.com/api/v1/category?section=general&items=3&page=${page}&token=${
          import.meta.env.VITE_APP_NEWS_API_KEY
        }`
      );
      allNews.push(...response.data.data);
    }
    return allNews;
  };

  // useQuery hook to fetch the news
  const {
    data: allNews,
    isLoading,
    isError,
    refetch,
  } = useQuery("generalNews", fetchNews, {
    refetchInterval: 3600000, // 1 hour in milliseconds
  });

  // Refetch or update the data every 10 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 3600000); // Refetch in every one hour

    return () => clearInterval(interval);
  }, [refetch]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {isLoading ? (
        <p>
          <Loader />
        </p>
      ) : isError ? (
        <p>Error fetching data</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {allNews?.map((newsItem) => (
            <div className="flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* news thumbnail */}
              <a href={newsItem.news_url} target="_blank">
                <img className="rounded-t-lg" src={newsItem.image_url} alt="" />
              </a>
              <div className="p-5 flex-grow">
                {/* news title */}
                <a href={newsItem.news_url} target="_blank">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {newsItem.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {newsItem.text}
                </p>
              </div>
              {/* news url and read more button */}
              <div className="p-5">
                <button className="btn btn-active btn-accent w-full">
                  <a
                    href={newsItem.news_url}
                    target="_blank"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center focus:ring-4 focus:outline-none focus:ring-blue-300"
                  >
                    Read more ...
                  </a>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default News;
