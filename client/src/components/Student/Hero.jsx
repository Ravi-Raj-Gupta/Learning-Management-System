import { assets } from "../../assets/assets";
import React from "react";
import SearchBar from "./SearchBar";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
   const { openSignIn } = useClerk();
   const { user } = useUser();
   const navigate = useNavigate();

   const handleGetStarted = async () => {
      if (user) {
         navigate("/course-list");
         return;
      }

      await openSignIn?.({
         forceRedirectUrl: "/course-list",
      });
   };

   return (
      <div className="flex w-full flex-col items-center justify-center space-y-6 bg-gradient-to-b from-cyan-100/70 px-4 pt-20 text-center sm:px-6 md:pt-36">
         <h1 className="relative mx-auto max-w-3xl text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
            Empower your future with the courses desgined to <span className="text-blue-600">fit your choice </span>
            <img className="absolute -bottom-7 right-0 hidden md:block" src={assets.sketch} alt="sketch" />
         </h1>

         <p className="hidden max-w-2xl text-gray-500 md:block">
            We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
         </p>

         <p className="max-w-2xl text-sm text-gray-500 md:hidden">
            We bring together world-class instructors, interactive content, and a supportive community to help you achieve your personal and professional goals.
         </p>
         <div className="flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <button
               type="button"
               onClick={handleGetStarted}
               className="w-full rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 sm:w-auto"
            >
               Get Started
            </button>
            <button
               type="button"
               onClick={() => navigate("/course-list")}
               className="w-full rounded-full border border-blue-200 bg-white px-6 py-3 text-sm font-semibold text-blue-700 transition hover:border-blue-300 hover:bg-blue-50 sm:w-auto"
            >
               Explore Courses
            </button>
         </div>
         <SearchBar />
      </div>
   );
};

export default Hero;
