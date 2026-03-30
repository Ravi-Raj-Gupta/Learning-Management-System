import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "react-toastify";

const Dashboard = () => {
   const { getToken } = useAuth();

   const [enrolledCourses, setEnrolledCourses] = useState([]);
   const [progressArray, setProgressArray] = useState([]);

   const backendUrl = "http://localhost:5000"; // 🔁 change if deployed

   // 📥 Fetch Enrolled Courses
   const fetchEnrolledCourses = async () => {
      try {
         const token = await getToken();

         const { data } = await axios.get(
            `${backendUrl}/api/user/enrolled-courses`,
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );

         if (data.success) {
            setEnrolledCourses(data.enrolledCourses);
         }

      } catch (error) {
         console.error(error);
         toast.error("Failed to load courses");
      }
   };

   // 📊 Fetch Progress for each course
   const getCourseProgress = async () => {
      try {
         const token = await getToken();

         if (!enrolledCourses.length) return;

         const tempProgressArray = await Promise.all(
            enrolledCourses.map(async (course) => {
               try {
                  const { data } = await axios.post(
                     `${backendUrl}/api/user/get-course-progress`,
                     { courseId: course._id },
                     {
                        headers: {
                           Authorization: `Bearer ${token}`,
                        },
                     }
                  );

                  const totalLectures = calculateNoofLectures(course);

                  const lectureCompleted =
                     data?.progressData?.lectureCompleted?.length || 0;

                  return {
                     courseId: course._id,
                     totalLectures,
                     lectureCompleted,
                  };

               } catch (err) {
                  console.error("Course error:", err.message);

                  return {
                     courseId: course._id,
                     totalLectures: 0,
                     lectureCompleted: 0,
                  };
               }
            })
         );

         setProgressArray(tempProgressArray);

      } catch (error) {
         console.error(error);
         toast.error(error.message);
      }
   };

   // 🧮 Count total lectures
   const calculateNoofLectures = (course) => {
      let total = 0;

      course.courseContent?.forEach((chapter) => {
         total += chapter.chapterContent?.length || 0;
      });

      return total;
   };

   // 🔄 Load Data
   useEffect(() => {
      fetchEnrolledCourses();
   }, []);

   useEffect(() => {
      if (enrolledCourses.length) {
         getCourseProgress();
      }
   }, [enrolledCourses]);

   // 🎨 UI
   return (
      <div className="p-6">
         <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

         {enrolledCourses.length === 0 ? (
            <p>No courses enrolled yet.</p>
         ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               
               {enrolledCourses.map((course) => {
                  const progress = progressArray.find(
                     (p) => p.courseId === course._id
                  );

                  const percentage = progress
                     ? Math.floor(
                          (progress.lectureCompleted /
                             progress.totalLectures) *
                             100
                       )
                     : 0;

                  return (
                     <div
                        key={course._id}
                        className="border rounded-xl p-4 shadow"
                     >
                        <img
                           src={course.courseThumbnail}
                           alt=""
                           className="rounded-lg mb-3"
                        />

                        <h2 className="text-lg font-semibold">
                           {course.courseTitle}
                        </h2>

                        <p className="text-sm text-gray-500 mb-2">
                           {course.educator?.name}
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 h-2 rounded mb-2">
                           <div
                              className="bg-blue-500 h-2 rounded"
                              style={{ width: `${percentage}%` }}
                           ></div>
                        </div>

                        <p className="text-sm">
                           {progress?.lectureCompleted || 0} /{" "}
                           {progress?.totalLectures || 0} lectures
                        </p>

                        <p className="text-sm font-semibold text-blue-600">
                           {percentage}% completed
                        </p>
                     </div>
                  );
               })}
            </div>
         )}
      </div>
   );
};

export default Dashboard;