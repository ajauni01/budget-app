import { useState, useRef } from "react";

function App() {
  // useState to hold the list of items
  const [items, setItems] = useState<string[]>([]);
  // useState to hold the list of prices
  const [prices, setPrices] = useState<number[]>([]);
  // useRef to get the value of the input field for items (hold the user value unlike useState which re-renders the component)
  const inputRefItem = useRef<HTMLInputElement>(null);
  // useRef to get the value of the input field for price (hold the user value unlike useState which re-renders the component)
  const inputRefPrice = useRef<HTMLInputElement>(null);

  // handleAddedItem function to handle the ading of items and prices
  const handleAddedItem = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent the default behavior of the form
    event.preventDefault();
    // get the value of the input field for adding of items using the useRef hook
    const userInputValueItem = inputRefItem.current?.value;
    if (userInputValueItem) {
      // add the item to the list of items
      setItems([...items, userInputValueItem]);
      // clear the input field
      inputRefItem.current!.value = '';
    }
    // get the value of the input field for adding of prices using the useRef hook
    const userInputValuePrice = inputRefPrice.current?.value;
    if(userInputValuePrice){
      // add the price to the list of prices
      setPrices([...prices, parseInt(userInputValuePrice)]);
      // clear the input field
      inputRefPrice.current!.value = '';
    }
  };

  // handleDeleteItem function to handle the delete button click
const handleDeleteItem = (index: number) => {
  // create a copy of the items array
  const newItems = [...items];
  // remove the item at the specified index
  newItems.splice(index, 1);
  // update the state with the new items array
  setItems(newItems);

  // create a copy of the prices array
  const newPrices = [...prices];
  // remove the price at the specified index
  newPrices.splice(index, 1);
  // update the state with the new prices array
  setPrices(newPrices);
};

  return (
    <div className="text-white mt-20">
      <h2 className="text-5xl mb-10">Budget App Version 2.0</h2>
      <form onSubmit={handleAddedItem} className="w-full max-w-sm">
        
        <div className="flex mb-5">
        <p className="text-2xl mr-12 mt-10">Name:</p>
          {/* input field to add items */}
          <input
            ref={inputRefItem}
            required
            className="appearance-none bg-transparent border-b  border-teal-500 w-full mr-3  px-2  leading-tight"
            type="text"
            placeholder="Monthly Budget Items"
            aria-label="Item Names"
          />
        </div>
          {/* input field to add prices */}
          <div className="flex mb-10">
        <p className="text-2xl mr-6 mt-8">Amount:</p>
          {/* input field to add items */}
          <input
          required
            ref={inputRefPrice}
            className=" appearance-none bg-transparent border-b  border-teal-500 w-full mr-3 py-5 px-2 mb-5 leading-tight"
            type="number"
            placeholder="Amount($)"
            aria-label="Item Prices"
          />
        </div>
          

          <button
            className="w-full h-11 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add Items
          </button>
        
      </form>
      
      {items.length > 0 ? (
        <div className="flex">
           {/* show the added items depending on user input */}
  <div>
    {items.map((item, index) => (
      <div key={index} className="flex items-center mt-10">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => handleDeleteItem(index)}
        >
          X
        </button>
        <h3 className="text-2xl ml-4">{item}</h3>
      </div>
    ))}
  </div>

{/* show the added prices depending on the user input */}
  <div>
 {prices.map((price, index) => (
      <div key={index} className="flex items-center mt-10">
        <h3 className="text-2xl ml-4 mt-1"> -${price}</h3>
      </div>
    ))}
  </div>

  </div>
) : (
  <p className="text-5xl text-red-700 mt-10">No Budget Items</p>
)}
    </div>
  );
}

export default App;