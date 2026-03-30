import { assets } from "../../assets/assets";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { AppContext } from "@/Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Menu, X } from "lucide-react";

const Navbar = () => {
   const location = useLocation();
   const isCourseListPage = location.pathname.includes("/course-list");
   const { navigate, isEducator, backendUrl, setIsEducator, getToken } = useContext(AppContext);
   const { openSignIn, signOut } = useClerk();
   const { user } = useUser();
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
   const mobileMenuRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
            setIsMobileMenuOpen(false);
            setIsProfileMenuOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
   }, []);

   useEffect(() => {
      setIsMobileMenuOpen(false);
      setIsProfileMenuOpen(false);
   }, [location.pathname]);

   const becomeEducator = async () => {
      try {
         if (isEducator) {
            navigate("/educator");
            return true;
         }

         const token = await getToken();
         const { data } = await axios.get(backendUrl + "/api/educator/update-role", {
            headers: { Authorization: `Bearer ${token}` },
         });

         if (data.success) {
            setIsEducator(true);
            toast.success(data.message);
            return true;
         }

         toast.error(data.message);
         return false;
      } catch (error) {
         toast.error(error.message);
         return false;
      }
   };

   const goEducator = async () => {
      const ok = await becomeEducator();
      if (ok) {
         navigate("/educator");
      }
   };

   const handleGetStarted = async () => {
      if (user) {
         navigate("/course-list");
         return;
      }

      await openSignIn?.({
         forceRedirectUrl: "/course-list",
      });
   };

   const mobileLinks = (
      <>
         <Link className="rounded-lg px-3 py-2 hover:bg-gray-100" to="/course-list">
            Explore Courses
         </Link>
         {user && (
            <>
               <button className="rounded-lg px-3 py-2 text-left hover:bg-gray-100" type="button" onClick={goEducator}>
                  {isEducator ? "Educator Dashboard" : "Become Educator"}
               </button>
               <Link className="rounded-lg px-3 py-2 hover:bg-gray-100" to="/my-enrollments">
                  My Enrollments
               </Link>
            </>
         )}
      </>
   );

   return (
      <div
         className={`flex flex-wrap items-center justify-between gap-3 border-b border-gray-500 px-4 py-4 sm:px-6 md:px-14 lg:px-20 xl:px-36 ${isCourseListPage ? "bg-white" : "bg-cyan-100/70"}`}
      >
         <img onClick={() => navigate("/")} src={assets.logo} alt="Logo" className="w-28 cursor-pointer lg:w-32" />

         <div className="hidden items-center gap-5 text-gray-500 md:flex">
            <div className="flex items-center gap-5">
               <Link to="/course-list">Explore Courses</Link>
               {user && (
                  <>
                     <button className="cursor-pointer" type="button" onClick={goEducator}>
                        {isEducator ? "Educator Dashboard" : "Become Educator"}
                     </button>
                     <span>|</span>
                     <Link to="/my-enrollments">My Enrollments</Link>
                  </>
               )}
            </div>
            {user ? (
               <UserButton />
            ) : (
               <button onClick={handleGetStarted} className="cursor-pointer rounded-full bg-blue-600 px-5 py-2 text-white">
                  Get Started
               </button>
            )}
         </div>

         <div className="relative ml-auto flex items-center gap-2 md:hidden" ref={mobileMenuRef}>
            {user ? (
               <button
                  type="button"
                  className="overflow-hidden rounded-full border border-gray-200"
                  onClick={() => {
                     setIsProfileMenuOpen((prev) => !prev);
                     setIsMobileMenuOpen(false);
                  }}
               >
                  <img src={user.imageUrl || assets.user_icon} alt="profile" className="h-10 w-10 object-cover" />
               </button>
            ) : (
               <button
                  type="button"
                  onClick={handleGetStarted}
                  className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white"
               >
                  Sign In
               </button>
            )}

            <button
               type="button"
               className="rounded-full border border-gray-200 p-2 text-gray-700"
               onClick={() => {
                  setIsMobileMenuOpen((prev) => !prev);
                  setIsProfileMenuOpen(false);
               }}
               aria-label="Toggle menu"
            >
               {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {isProfileMenuOpen && user && (
               <div className="absolute right-0 top-14 z-30 flex min-w-[220px] flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                  <p className="px-3 py-2 text-sm font-semibold text-gray-800">{user.fullName || "Learner"}</p>
                  <Link className="rounded-lg px-3 py-2 hover:bg-gray-100" to="/course-list">
                     Explore Courses
                  </Link>
                  <button className="rounded-lg px-3 py-2 text-left hover:bg-gray-100" type="button" onClick={goEducator}>
                     {isEducator ? "Educator Dashboard" : "Become Educator"}
                  </button>
                  <Link className="rounded-lg px-3 py-2 hover:bg-gray-100" to="/my-enrollments">
                     My Enrollments
                  </Link>
                  <button
                     type="button"
                     className="rounded-lg px-3 py-2 text-left text-red-500 hover:bg-red-50"
                     onClick={() => signOut()}
                  >
                     Sign Out
                  </button>
               </div>
            )}

            {isMobileMenuOpen && (
               <div className="absolute right-0 top-14 z-20 flex min-w-[220px] flex-col rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                  {mobileLinks}
                  {!user && (
                     <button
                        type="button"
                        className="mt-1 rounded-lg bg-blue-600 px-3 py-2 text-left text-white"
                        onClick={handleGetStarted}
                     >
                        Get Started
                     </button>
                  )}
               </div>
            )}
         </div>
      </div>
   );
};

export default Navbar;
