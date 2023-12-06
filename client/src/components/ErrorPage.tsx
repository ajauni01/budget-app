import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  // Define the navigate function
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate to the home page
    navigate("/");
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      {/* errorText */}
      <div>
        <p className="text-5xl text-white">404 - Page Not Found</p>
      </div>
      {/* go back button */}
      <div>
        <button className="btn btn-accent mt-5 text-2xl text-white" onClick={handleGoBack}>
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
