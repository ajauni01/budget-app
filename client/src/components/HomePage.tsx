import AddItems from "./HomePageComponents/AddItems";
import GetAndDeleteItems from "./HomePageComponents/GetAndDeleteItems";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-20 text-white">
        <h2 className="text-5xl mb-10">Budget App Version 2.0</h2>
        {/* form to write the items and prices  */}
        <AddItems />
        {/* form ends */}
      </div>

      {/* Display the list of items and prices */}
      <div>
        <GetAndDeleteItems/>
      </div>
    </div>
  );
};

export default HomePage;
