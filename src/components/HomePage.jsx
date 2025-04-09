import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="w-full max-w-3xl p-6">
        <h1 className="text-4xl font-bold text-center mb-6 text-yellow-300">
          🚍 Bus Ticket Portal
        </h1>

        {/* Tab Buttons */}
        <div className="flex justify-center space-x-2 mb-6">
        <Link
         to="/passenger"
            className="px-6 py-3 rounded-md bg-gray-800 !text-white font-medium transition duration-300 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-transparent hover:!text-black hover:bg-yellow-400"
>
  Go to Passenger
</Link>
          
<Link
         to="/admin"
            className="px-6 py-3 rounded-md bg-gray-800 !text-white font-medium transition duration-300 outline-none ring-0 focus:outline-none focus:ring-0 focus:ring-transparent hover:!text-black hover:bg-yellow-400"
>
            Bus Administration
          </Link>
        </div>

        
      </div>

      {/* Moving Bus */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/2282/2282123.png"
        alt="Moving Bus"
        className="bus-animation"
      />
    </div>
  );
};

export default HomePage;
