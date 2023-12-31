import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../Loader";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const GetAndDeleteItems = () => {
  // get the current theme from local storage
  const currentTheme = localStorage.getItem("theme");
  // Define a function to fetch items from the backend
  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "https://budget-app-server-five.vercel.app/budget/get?sort=-timestamp"
      );
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch items");
    }
  };
  const {
    data: items,
    isLoading,
    refetch,
  } = useQuery("items", fetchItems, {
    refetchInterval: 500, // Set the interval in milliseconds (e.g., 5000ms = 5 seconds)
  });
  // get the array from the items object
  const actualItems = items?.data;

  // Define an asynchronous function to handle the delete button click event
  const handleDeleteItem = async (itemId: string) => {
    try {
      const response = await axios.delete(
        `https://budget-app-server-five.vercel.app/budget/delete/${itemId}`
      );

      if (response.data.success) {
        // Handle successful deletion (e.g., refetch data, show a success message, etc.)
        refetch(); // Refetch data after successful deletion
      } else {
        // Handle unsuccessful deletion (e.g., show an error message)
        console.error("Item not found");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      {isLoading ? (
        // show the loader if the data is loading
        <Loader/>
      ) : (
        <div>
          <div className="flex">
            {/* show the added items depending on user input */}
            <div className="">
              {actualItems.length > 0 ? (
                actualItems.map((item: { _id: Key | null | undefined; item: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; price: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) => (
                  <div key={item._id} className="flex items-center mt-10">
                    <button
                      className="bg-red-500 hover:bg-red-700  font-bold py-2 px-4 rounded"
                      onClick={() => handleDeleteItem(item._id as string)}
                    >
                      X
                    </button>
                    <h3 className="text-2xl ml-4">{item.item}</h3>
                    <h3 className="text-2xl ml-4"> -${item.price}</h3>
                  </div>
                ))
              ) : (
                <div className={`bg-red-500 hover:bg-red-700  font-bold py-2 px-4 rounded mt-5 ${
                  currentTheme === "dark" ? "text-white" : ""}`}>
                  No Budget Items
                </div>
              )}
            </div>
          </div>
          {/* show total price for the added items */}
          {actualItems.length > 0 && (
            <div>
              <hr className="mt-5 mb-2" />
              <h3
                className={`text-2xl ${
                  actualItems.reduce((total: any, item: { price: any; }) => total + item.price, 0) ===
                  0
                    ? "bg-red-500 hover:bg-red-700"
                    : ""
                }  font-bold py-2 px-4 rounded`}
              >
                {/* Calculate total price */}
                Total: $
                {actualItems.reduce((total: any, item: { price: any; }) => total + item.price, 0)}
              </h3>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default GetAndDeleteItems;
