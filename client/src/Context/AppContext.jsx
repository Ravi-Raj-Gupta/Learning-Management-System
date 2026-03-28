import { dummyCourses } from "@/assets/assets";
import humanizeDuration from "humanize-duration";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import {useAuth, useUser} from '@clerk/clerk-react'



export const AppContext = createContext();

export const AppContextProvider = (props) => {
   const currency = import.meta.env.VITE_CURRENCY;

   const navigate = useNavigate();

   const {getToken}  =useAuth()
   const {user}  = useUser()

   const [allcourses, setAllcourses] = useState([]);
   const [isEducator, setIsEducator] = useState(false);
   const [enrolledcourses, setEnrolledcourses] = useState([]);

   // Fetch all Courses
   const fetchAllCourses = async () => {
      setAllcourses(dummyCourses);
   };

   // function to calculate average rating of the course

   const calculateRating = (course) => {
      if (course.courseRatings.length === 0) {
         return 0;
      }
      let totalRating = 0;
      course.courseRatings.forEach((rating) => {
         totalRating += rating.rating;
      });
      return totalRating / course.courseRatings.length;
   };

   // function to calculate course chapter time

   const calculateChapterTime = (chapter) => {
      let time = 0;

      chapter.chapterContent.map(
         (lecture) => (time += lecture.lectureDuration),
      );
      return humanizeDuration(time * 60 * 100, { units: ["h", "m"] });
   };

   // function to calculate course duration

   const calculateCourseDuration = (course) => {
      let time = 0;

      course.courseContent.map((chapter) =>
         chapter.chapterContent.map(
            (lecture) => (time += lecture.lectureDuration),
         ),
      );

      return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
   };

   // function to calculate no of lectures in the course

   const calculateNoOfLectures = (course) => {
      let totalLectures = 0;

      course.courseContent.forEach((chapter) => {
         if (Array.isArray(chapter.chapterContent)) {
            totalLectures += chapter.chapterContent.length;
         }
      });
      return totalLectures;
   };

   // fetch user enrolled courses
   const fetchUserEnrolledCourses = async () => {
      setEnrolledcourses(dummyCourses);
   };

   useEffect(() => {
      fetchAllCourses();
      fetchUserEnrolledCourses();
   }, []);

const logToken = async() => {
   console.log(await getToken());
}
   useEffect(() => {
      if(user){
         logToken()
      }
   },[user])

   const becomeEducator = async () => {
      const token = await getToken();
      const apiBase = import.meta.env.VITE_API_URL ?? "";
      const res = await fetch(`${apiBase}/api/educator/update-role`, {
         method: "POST",
         credentials: "include",
         headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
         },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
         await user?.reload();
         return true;
      }
      return false;
   };

   const value = {
      currency,
      allcourses,
      navigate,
      calculateRating,
      isEducator,
      setIsEducator,
      becomeEducator,
      calculateNoOfLectures,
      calculateCourseDuration,
      calculateChapterTime,
      enrolledcourses,
      fetchUserEnrolledCourses,
   };
   return (
      <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
   );
};
