import { dummyCourses } from "@/assets/assets";
import humanizeDuration from "humanize-duration";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import {useAuth, useUser} from '@clerk/clerk-react'
import axios from "axios";
import { toast } from "react-toastify";



export const AppContext = createContext();

export const AppContextProvider = (props) => {
   
   const backendBaseUrl = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || "";
   const backendUrl = backendBaseUrl.replace(/\/+$/, "");


   const currency = import.meta.env.VITE_CURRENCY;
   const navigate = useNavigate();

   const {getToken}  =useAuth()
   const {user}  = useUser()

   const [allcourses, setAllcourses] = useState([]);
   const [isEducator, setIsEducator] = useState(false);
   const [enrolledcourses, setEnrolledcourses] = useState([]);
   const [userData, setUserData] = useState(null);

   // Fetch all Courses
   const fetchAllCourses = async () => {
      try {
         const {data} = await axios.get(backendUrl + "/api/course/all")

         if(data.success){
            setAllcourses(data.courses)
         }
         else{
            toast.error(data.message)
         }

      } catch (error) {
         toast.error(error.message)
      }
   };

   // fetch user data to check if user is educator or not
   const fetchUserData = async () => {

      if (user.publicMetadata.role === "educator") {
         setIsEducator(true);
      }

      try{
         const token = await getToken();
         const {data} = await axios.get(backendUrl + "/api/user/data", {headers: {Authorization: `Bearer ${token}`}})
         if(data.success){
            setUserData(data.user)
         }
         else{
            toast.error(data.message)
         }

      }
      catch(error){
         toast.error(error.message)
      }
   }


   // function to calculate average rating of the course

   const calculateRating = (course) => {
      if (course.courseRatings.length === 0) {
         return 0;
      }
      let totalRating = 0;
      course.courseRatings.forEach((rating) => {
         totalRating += rating.rating;
      });
      return Math.floor(totalRating / course.courseRatings.length);
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
      try{
         const token = await getToken();
         const {data} = await axios.get(backendUrl + "/api/user/enrolled-courses", {headers: {Authorization: `Bearer ${token}`}})

         if(data.success){
            setEnrolledcourses(data.enrolledCourses.reverse())
         }
         else{
            toast.error(data.message)
         }
      }
      catch(error){
         toast.error(error.message)
      }
      
   };

   useEffect(() => {
      fetchAllCourses();
      
   }, []);


   useEffect(() => {
      if(user){
         fetchUserData();
         fetchUserEnrolledCourses();
      }
   },[user])

   const becomeEducator = async () => {
      const token = await getToken();
      const res = await fetch(`${backendUrl}/api/educator/update-role`, {
         method: "GET",
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
      backendUrl,
      userData,
      setUserData,
      getToken,
      fetchAllCourses,
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
