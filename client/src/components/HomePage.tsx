import { useRef, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const HomePage = () => {
  // useState to hold the list of items
  // const [items, setItems] = useState<string[]>([]);
  // useState to hold the list of prices
  const [prices, setPrices] = useState<number[]>([]);
  // useRef to get the value of the input field for items (hold the user value unlike useState which re-renders the component)
  const inputRefItem = useRef<HTMLInputElement>(null);
  // useRef to get the value of the input field for price (hold the user value unlike useState which re-renders the component)
  const inputRefPrice = useRef<HTMLInputElement>(null);

  // Define a function to fetch items from the backend
  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/budget/get?sort=-timestamp"
      );
      return res.data;
    } catch (error) {
      throw new Error("Failed to fetch items");
    }
  };
  const {
    data: items,
    isLoading,
    error,
    refetch,
  } = useQuery("items", fetchItems, {
    refetchInterval: 1000, // Set the interval in milliseconds (e.g., 5000ms = 5 seconds)
  });
  const actualItems = items?.data;

  console.log("actual items", actualItems);
  // Define an asynchronous function to handle the form submission event
  const handleAddedItem = async (event: React.FormEvent<HTMLFormElement>) => {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Get the current value of the item input field
    const userInputValueItem = inputRefItem.current?.value;
    // Get the current value of the price input field
    const userInputValuePrice = inputRefPrice.current?.value;
    // Check if both input fields have values
    if (userInputValueItem && userInputValuePrice) {
      try {
        // Create a new item object with the input field values
        const newItem = {
          item: userInputValueItem,
          price: parseInt(userInputValuePrice),
        };
        // Send a POST request to the backend with the new item object
        await axios.post("http://localhost:3000/budget/post", newItem);
        // Clear the item input field
        inputRefItem.current!.value = "";
        // Clear the price input field
        inputRefPrice.current!.value = "";
      } catch (error) {
        // Log any errors that occur during the POST request
        console.error(error);
      }
    }
  };

  // handleDeleteItem function to handle the delete button click
  // const handleDeleteItem = (index: number) => {
  //   // create a copy of the items array
  //   const newItems = [...items];
  //   // remove the item at the specified index
  //   newItems.splice(index, 1);
  //   // update the state with the new items array
  //   setItems(newItems);

  //   // create a copy of the prices array
  //   const newPrices = [...prices];
  //   // remove the price at the specified index
  //   newPrices.splice(index, 1);
  //   // update the state with the new prices array
  //   setPrices(newPrices);
  // };
  const handleDeleteItem = async (itemId: string) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/budget/delete/${itemId}`
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
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20 text-white">
        <h2 className="text-5xl mb-10">Budget App Version 2.0</h2>
        <form onSubmit={handleAddedItem} className="w-full">
          <div className="flex mb-5">
            <p className="text-2xl mr-12 mt-10">Name:</p>
            <input
              ref={inputRefItem}
              required
              className="appearance-none bg-transparent border-b border-teal-500 w-full mr-3 px-2 leading-tight"
              type="text"
              placeholder="Monthly Budget Items"
              aria-label="Item Names"
            />
          </div>
          <div className="flex mb-10">
            <p className="text-2xl mr-6 mt-8">Amount:</p>
            <input
              required
              ref={inputRefPrice}
              className="appearance-none bg-transparent border-b border-teal-500 w-full mr-3 py-5 px-2 mb-5 leading-tight"
              type="number"
              placeholder="Amount($)"
              aria-label="Item Prices"
            />
          </div>
          <button
            className="w-full h-11 bg-teal-500 hover:bg-teal-700 text-sm text-white py-1 px-2 rounded"
            type="submit"
          >
            Add Items
          </button>
        </form>
      </div>

      {/* Display the list of items and prices */}
      <div>
        {isLoading ? (
          "Loading"
        ) : (
          <div>
            <div className="flex">
              {/* show the added items depending on user input */}
              <div className="text-white">
                {actualItems.length > 0 ? (
                  actualItems.map((item) => (
                    <div key={item._id} className="flex items-center mt-10">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => handleDeleteItem(item._id)}
                      >
                        X
                      </button>
                      <h3 className="text-2xl ml-4">{item.item}</h3>
                      <h3 className="text-2xl ml-4"> - {item.price}</h3>
                    </div>
                  ))
                ) : (
                  <div className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-5">
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
                    actualItems.reduce(
                      (total, item) => total + item.price,
                      0
                    ) === 0
                      ? "bg-red-500 hover:bg-red-700"
                      : ""
                  } text-white font-bold py-2 px-4 rounded`}
                >
                  {/* Calculate total price */}
                  Total: $
                  {actualItems.reduce((total, item) => total + item.price, 0)}
                </h3>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
