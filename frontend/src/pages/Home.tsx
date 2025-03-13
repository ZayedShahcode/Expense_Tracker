import { Link } from "react-router-dom";
import landing from "../assets/landing.png";

export const Home = () => {
  return (
    <div className="relative z-12 border border-black overflow-hidden h-full ">
      {/* Hero Section with Background Image */}

      <img
        src={landing}
        alt="landing"
        className="absolute inset-0 mt-12 w-full h-full object-cover"
        />
      
      <div className="relative z-10 flex flex-col gap-5 items-center  text-center p-12 md:p-20 h-[89vh] bg-cover bg-center min-h-[60vh] min-w-full z-10 ">
        <h2 className="text-5xl  xl:text-6xl tracking-wide font-bold text-[#0092FB] [text-shadow:0_0_5px_white,0_0_5px_cyan,0_0_5px_black] w-full">
          Manage Your Expenses Like A Pro
        </h2>
        <p className="text-stone-800 text-2xl [text-shadow:0_0_5px_white,0_0_10px_cyan,0_0_20px_white] md:text-2xl md:w-8xl  mt-16  font-medium ">
          Use our smart expense tracker to manage your expenses
        </p>
        <Link to="/dashboard"><button className="mt-16 cursor-pointer bg-blue-600 text-white text-2xl font-semibold px-4 py-2 border border-black rounded-lg shadow-md hover:bg-blue-500 transition">
          Get Started
        </button></Link>
      </div>
    </div>
  );
};
