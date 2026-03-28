import Footer from "@/components/Educator/Footer";
import Navbar from "@/components/Educator/Navbar";
import Sidebar from "@/components/Educator/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";

const Educator = () => {
   return (
      <div className="min-h-screen bg-white ">
         <Navbar />
         <div className="flex">
            <Sidebar />
            <div className="flex-1">
               {<Outlet />}
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Educator;
