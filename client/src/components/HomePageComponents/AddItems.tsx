import { useRef } from "react";
import axios from "axios";

const AddItems = () => {
// get the current theme from local storage
  const currentTheme = localStorage.getItem("theme");
  // useRef to get the value of the input field for items (hold the user value unlike useState which re-renders the component)
  const inputRefItem = useRef<HTMLInputElement>(null);
  // useRef to get the value of the input field for price (hold the user value unlike useState which re-renders the component)
  const inputRefPrice = useRef<HTMLInputElement>(null);
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
  return (
    <>
      {/* form to write the items and prices  */}
      <form onSubmit={handleAddedItem} className="w-full">
        <div className="flex mb-5">
          <p className="text-2xl mr-12 mt-10">Name:</p>
          {/* input field to write the name of the items */}
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
          {/* input field to write the prices */}
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
        {/*action button to add items */}
        <button
          className={`w-full h-11 bg-teal-500 hover:bg-teal-700 text-xl  py-1 px-2 rounded ${
            currentTheme === "dark" ? "text-white" : ""}`}
          type="submit"
        >
          Add Items
        </button>
      </form>
      {/* form ends */}
    </>
  );
};

export default AddItems;
