import { useState, useRef } from "react";

function App() {
  const [items, setItems] = useState<string[]>([]);
  // useRef to get the value of the input field (hold the user value unlike useState which re-renders the component)
  const inputRef = useRef<HTMLInputElement>(null);

  // handleAddedItem function to handle the form submission
  const handleAddedItem = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent the default behavior of the form
    event.preventDefault();
    // get the value of the input field using the ref
    const userInputValue = inputRef.current?.value;
    if (userInputValue) {
      // add the item to the list of items
      setItems([...items, userInputValue]);
      // clear the input field
      inputRef.current!.value = '';
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
  };

  return (
    <div className="text-white mt-20">
      <h2 className="text-5xl mb-10">Budget App Version 1.0</h2>
      <form onSubmit={handleAddedItem} className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            ref={inputRef}
            className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Add Your Monthly Budget Items"
            aria-label="Item Names"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Add Items
          </button>
        </div>
      </form>
      {/* show the added items depending on user input */}
      {items.length > 0 ? (
  items.map((item, index) => (
    <div key={index} className="flex items-center mt-10">
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => handleDeleteItem(index)}
      >
        X
      </button>
      <h3 className="text-2xl ml-4">{item}</h3>
    </div>
  ))
) : (
  <p className="text-5xl text-red-700 mt-10">No Budget Items</p>
)}
    </div>
  );
}

export default App;