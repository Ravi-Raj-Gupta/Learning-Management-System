import { assets } from "@/assets/assets";
import Footer from "@/components/Student/Footer";
import Loading from "@/components/Student/Loading";
import Rating from "@/components/Student/Rating";
import { AppContext } from "@/Context/AppContext";
import axios from "axios";
import humanizeDuration from "humanize-duration";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import YouTube from "react-youtube";

const getYoutubeVideoId = (url = "") => {
   try {
      const parsedUrl = new URL(url);

      if (parsedUrl.hostname.includes("youtu.be")) {
         return parsedUrl.pathname.replace("/", "");
      }

      if (parsedUrl.hostname.includes("youtube.com")) {
         return parsedUrl.searchParams.get("v") || "";
      }
   } catch {
      return "";
   }

   return "";
};

const Player = () => {
   const { enrolledcourses, calculateChapterTime, backendUrl, getToken, userData, fetchUserEnrolledCourses } = useContext(AppContext);
   const { courseId } = useParams();
   const [courseData, setCourseData] = useState(null);
   const [opensection, setOpensection] = useState({});
   const [playerData, setPlayerData] = useState(null);
   const [progressData, setProgressData] = useState(null)
   const [initialRating, setIntialRating] = useState(0)
   


   const getcourseData = () => {
      enrolledcourses.forEach((course) => {
         if (course._id === courseId) {
            setCourseData(course);
            let matchedRating = 0;
            course.courseRatings?.forEach((item) => {
               if(item.userId === userData?._id){
                  matchedRating = item.rating;
               }
            });
            setIntialRating(matchedRating);
         }
      });
   };


   const toggleSection = (index) => {
      setOpensection((prev) => ({ ...prev, [index]: !prev[index] }));
   };

   useEffect(() => {
      if(enrolledcourses.length >0) {
         getcourseData();
      }
   }, [enrolledcourses, courseId, userData]);

   useEffect(() => {
      if (!enrolledcourses.length) {
         fetchUserEnrolledCourses();
      }
   }, [enrolledcourses.length, fetchUserEnrolledCourses]);

   const markLectureAsCompleted = async(lectureId) => {
      try {
         const token = await getToken()
         const {data} = await axios.post(backendUrl + '/api/user/update-course-progress', {courseId, lectureId}, {headers : {Authorization : `Bearer ${token}`}})

         if(data.success) {
           toast.success(data.message) 
         }
         else{
            toast.error(data.message)
         }
      } catch (error) {
            toast.error(error.message)
      }
   }


   const getCourseProgress = async() =>{
      try {
         const token = await getToken()
         const {data} = await axios.post(backendUrl + '/api/user/get-course-progress', {courseId} , {headers : {Authorization : `Bearer ${token}`}})
         if(data.success) { 
            setProgressData(data.progressData)
         }
         else{
            toast.error(data.message)
         }
      } catch (error) {
         toast.error(error.message)
         
      }  

   }


   const handleRate = async(rating) => {
      try {
         const token = await getToken()
         const {data} = await axios.post(backendUrl + '/api/user/add-rating', {courseId, rating}, {headers : {Authorization : `Bearer ${token}`}})

         if(data.success) {
            toast.success(data.message)
            setIntialRating(rating)
            fetchUserEnrolledCourses()
         }
         else{
            toast.error(data.message)
         }
      } catch (error) {
         
         toast.error(error.message)
      }
   }

useEffect(() => {
    getCourseProgress()
}, [courseId])




   return courseData ? (
      <>
         <div className="flex flex-col gap-8 p-4 sm:p-6 md:px-12 lg:flex-row lg:items-start lg:px-20 xl:px-36">
            {/* left column */}
            <div className="w-full text-gray-800 lg:w-3/5">
               <h2 className="text-xl font-semibold">Course Structure</h2>
               <div className="pt-6 text-gray-800">
                  <div className="pt-5">
                     {courseData &&
                        courseData.courseContent.map((chapter, index) => (
                           <div
                              key={index}
                              className="border border-gray-400 bg-white mb-2 rounded "
                           >
                              <div
                                 className="flex items-center justify-between  px-4 py-3 cursor-pointer select-none"
                                 onClick={() => toggleSection(index)}
                              >
                                 <div className="flex items-center gap-2">
                                    <img
                                       className={`transition transition-transform ${opensection[index] ? "rotate-180" : ""}`}
                                       src={assets.down_arrow_icon}
                                       alt="arrow_icon"
                                    />
                                    <p className="font-medium md:text-base text-sm ">
                                       {chapter.chapterTitle}
                                    </p>
                                 </div>
                                 <p className="text-gray-600 text-sm md:text-default ">
                                    {chapter.chapterContent.length} lectures -{" "}
                                    {calculateChapterTime(chapter)}
                                 </p>
                              </div>

                              <div
                                 className={`overflow-hidden transition-all duration-300 ${opensection[index] ? "max-h-96" : "max-h-0"}`}
                              >
                                 <ul className="list-disc md:pl-0 pl-4 py-2 text-gray-600 border-t border-gray-300">
                                    {chapter.chapterContent.map(
                                       (lecture, i) => (
                                          <li
                                             className="flex items-start gap-2 px-4 py-2 sm:px-7"
                                             key={i}
                                          >
                                             <img
                                                src={progressData && progressData.lectureCompleted.includes(lecture.lectureId)
                                                      ? assets.blue_tick_icon
                                                      : assets.play_icon
                                                }
                                                alt="play icon"
                                                className="w-4 h-4 "
                                             />
                                             <div className="flex w-full flex-col gap-2 text-gray-800 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                                                <p className="pr-2">
                                                   {lecture.lectureTitle}
                                                </p>
                                                <div className="flex shrink-0 gap-2">
                                                   {lecture.lectureUrl && (
                                                      <p
                                                         onClick={() =>
                                                            setPlayerData({
                                                               ...lecture,
                                                               chapter:
                                                                  index + 1,
                                                               lecture: i + 1,
                                                            })
                                                         }
                                                         className="text-blue-500 cursor-pointer"
                                                      >
                                                         Watch
                                                      </p>
                                                   )}
                                                   <p>
                                                      {humanizeDuration(
                                                         lecture.lectureDuration *
                                                            60 *
                                                            1000,
                                                         { units: ["h", "m"] },
                                                      )}
                                                   </p>
                                                </div>
                                             </div>
                                          </li>
                                       ),
                                    )}
                                 </ul>
                              </div>
                           </div>
                        ))}
                  </div>
               </div>
            </div>

            {/* right column */}
            <div className="w-full lg:mt-10 lg:w-2/5" >
               {playerData ? (
                  <div>
                     {getYoutubeVideoId(playerData.lectureUrl) ? (
                      <YouTube
                        videoId={getYoutubeVideoId(playerData.lectureUrl)}
                        iframeClassName="aspect-video w-full"
                     />
                     ) : (
                        <div className="w-full aspect-video flex items-center justify-center bg-gray-100 text-sm text-gray-500">
                           Invalid video URL
                        </div>
                     )}
                     <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                        <p>{playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
                        <button onClick={() => markLectureAsCompleted(playerData.lectureId)} className="text-blue-600"> { progressData && progressData.lectureCompleted.includes(playerData.lectureId) ? 'completed' :'Mark as Complete'}</button>
                     </div>
                  </div>
               ) : 
               <img className="w-full rounded-lg object-cover lg:max-w-md" src={courseData ? courseData.courseThumbnail : '' } alt="" />
               }

               <div className="mt-6">
                  <Rating initialValue={initialRating} onRate={handleRate} />
               </div>
            </div>
         </div>
         <Footer />
      </>
   ) : <Loading />
};

export default Player;
