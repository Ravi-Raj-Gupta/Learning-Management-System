import { assets } from "@/assets/assets";
import CourseCard from "@/components/Student/CourseCard";
import Footer from "@/components/Student/Footer";
import SearchBar from "@/components/Student/SearchBar";
import { AppContext } from "@/Context/AppContext";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const CoursesList = () => {
   const { navigate, allcourses } = useContext(AppContext);
   const { input } = useParams();

   const [filteredCourse, setFilteredCourse] = useState([]);

   useEffect(() => {
      if (allcourses && allcourses.length > 0) {
         const tempCourses = allcourses.slice();

         input
            ? setFilteredCourse(
                 tempCourses.filter((item) =>
                    item.courseTitle
                       .toLowerCase()
                       .includes(input.toLowerCase()),
                 ),
              )
            : setFilteredCourse(tempCourses);
      }
   }, [allcourses, input]);

   return (
      <>
         <div className="relative px-4 pt-20 text-left sm:px-6 md:px-12 lg:px-20 xl:px-36">
            <div className="flex w-full flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
               <div>
                  <h1 className="text-3xl font-semibold text-gray-800 sm:text-4xl">
                     Course List
                  </h1>
                  <p className="text-gray-500">
                     <span
                        onClick={() => navigate("/")}
                        className="text-blue-600 cursor-pointer"
                     >
                        Home
                     </span>
                     /<span>Course List</span>
                  </p>
               </div>
               <SearchBar data={input} />
            </div>

            {input && (
               <div className="mt-8 -mb-4 inline-flex items-center gap-4 border px-4 py-2 text-gray-600">
                  <p>{input}</p>
                  <img
                     src={assets.cross_icon}
                     alt="cross icon"
                     className="cursor-pointer"
                     onClick={() => navigate("/course-list")}
                  />
               </div>
            )}

            <div className="my-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
               {filteredCourse.map((course, index) => (
                  <CourseCard key={index} course={course} />
               ))}
            </div>
         </div>
         <Footer />
      </>
   );
};

export default CoursesList;
