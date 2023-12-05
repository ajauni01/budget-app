const ErrorPage = () => {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
          {/* errorText */}
       <div>
       <p className="text-5xl text-white">404 - Page Not Found</p>
       </div>
       {/* go back button */}
        <div>
        <button className="btn btn-accent mt-5">Go Back</button>
        </div>
      </div>
    );
  };
  
  export default ErrorPage;