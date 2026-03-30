import { assets } from "@/assets/assets";
import Footer from "@/components/Student/Footer";
import Loading from "@/components/Student/Loading";
import { AppContext } from "@/Context/AppContext";
import axios from "axios";
import humanizeDuration from "humanize-duration";
import { Axis3D, BookOpen, Clock, Currency, Star, Timer } from "lucide-react";
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

const CourseDetails = () => {
   const { id } = useParams();

   const [courseData, setCourseData] = useState(null);
   const [opensection, setOpensection] = useState({});
   const [playerData, setPlayerData] = useState(null);
   const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);

   const { calculateRating } = useContext(AppContext);

   const {
      allcourses,
      calculateNoOfLectures,
      calculateCourseDuration,
      calculateChapterTime,
      Currency,
      backendUrl,
      userData,
      getToken,
   } = useContext(AppContext);

   const fetchCourseData = async () => {
      try {
         const { data } = await axios.get(backendUrl + "/api/course/" + id);

         if (data.success) {
            setCourseData(data.courseData);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         toast.error(error.message);
      }
   };

   const enrollCourse = async () => {
      try {
         if (!userData) {
            return toast.warn("login to enroll");
         }
         if (isAlreadyEnrolled) {
            return toast.warn("already enrolled");
         }
         const token = await getToken();
         const { data } = await axios.post(
            backendUrl + "/api/user/purchase",
            { courseId: courseData._id },
            { headers: { Authorization: `Bearer ${token}` } },
         );

         if (data.success) {
            const { session_url } = data;
            window.location.replace(session_url);
         } else {
            toast.error(data.message);
         }
      } catch (error) {
         toast.error(error.message);
      }
   };

   useEffect(() => {
      fetchCourseData();
   }, []);

   useEffect(() => {
      if (userData && courseData) {
         setIsAlreadyEnrolled(
            userData.enrolledCourses.includes(courseData._id),
         );
      }
   }, [userData, courseData]);
   const toggleSection = (index) => {
      setOpensection((prev) => ({ ...prev, [index]: !prev[index] }));
   };

   return courseData ? (
      <>
         <div className="relative">
            {/* Gradient background */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-100/70 to-transparent pointer-events-none"></div>

            <div className="relative z-10 flex flex-col-reverse gap-8 px-4 pt-8 text-left sm:px-6 sm:pt-10 md:px-12 lg:flex-row lg:items-start lg:justify-between lg:px-20 lg:pt-20 xl:px-36">
               {/* left column */}
               <div className="z-10 w-full max-w-3xl text-gray-500">
                  <h1 className="course-details-heading-large font-semibold text-gray-800">
                     {courseData.courseTitle}
                  </h1>
                  <p
                     className="pt-4 text-sm leading-7 md:text-base"
                     dangerouslySetInnerHTML={{
                        __html: courseData.courseDescription.slice(0, 200),
                     }}
                  ></p>

                  {/* review and ratings */}
                  <div className="flex flex-wrap items-center gap-2 pt-3 pb-1.5 text-sm">
                     <p>{calculateRating(courseData)}</p>
                     <div className="flex">
                        {[...Array(5)].map((_, i) => (
                           <img
                              className="w-3.5 h-3.5"
                              key={i}
                              src={
                                 i < Math.floor(calculateRating(courseData))
                                    ? assets.star
                                    : assets.star_blank
                              }
                              alt=""
                           />
                        ))}
                     </div>
                     <p className="text-blue-600">
                        ({courseData.courseRatings.length}{" "}
                        {courseData.courseRatings.length > 1
                           ? "ratings"
                           : "rating"}
                        )
                     </p>

                     <p>
                        {courseData.enrolledStudents.length}
                        {courseData.enrolledStudents.length > 1
                           ? " students"
                           : " student"}
                     </p>
                  </div>
                  <p className="text-sm ">
                     Course By{" "}
                     <span className="text-blue-600 underline">
                        {courseData.educator.name}
                     </span>
                  </p>

                  <div className="pt-8 text-gray-800">
                     <h2 className="text-2xl font-semibold">Course Structure</h2>

                     <div className="pt-5">
                        {courseData.courseContent.map((chapter, index) => (
                           <div
                              key={index}
                              className="border border-gray-400 bg-white mb-2 rounded "
                           >
                              <div
                                 className="flex flex-col gap-3 px-4 py-3 cursor-pointer select-none sm:flex-row sm:items-center sm:justify-between"
                                 onClick={() => toggleSection(index)}
                              >
                                 <div className="flex items-start gap-2">
                                    <img
                                       className={`mt-1 transition transition-transform ${opensection[index] ? "rotate-180" : ""}`}
                                       src={assets.down_arrow_icon}
                                       alt="arrow_icon"
                                    />
                                    <p className="font-medium md:text-base text-sm ">
                                       {chapter.chapterTitle}
                                    </p>
                                 </div>
                                 <p className="text-sm text-gray-600 sm:text-right md:text-default">
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
                                                src={assets.play_icon}
                                                alt="play icon"
                                                className="w-4 h-4 "
                                             />
                                             <div className="flex w-full flex-col gap-2 text-gray-800 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
                                                <p className="pr-2">
                                                   {lecture.lectureTitle}
                                                </p>
                                                <div className="flex shrink-0 gap-2">
                                                   {lecture.isPreviewFree && (
                                                      <p
                                                         onClick={() =>
                                                            setPlayerData({
                                                               videoId:
                                                                  getYoutubeVideoId(
                                                                     lecture.lectureUrl,
                                                                  ),
                                                            })
                                                         }
                                                         className="text-blue-500 cursor-pointer"
                                                      >
                                                         Preview
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

                     <div className="py-12 text-sm text-default md:py-20">
                        <h3 className="text-xl font-semibold text-gray-800">
                           Course Description
                        </h3>
                        <p
                           className="pt-3 rich-text "
                           dangerouslySetInnerHTML={{
                              __html: courseData.courseDescription,
                           }}
                        ></p>
                     </div>
                  </div>
               </div>
               {/* right column */}

               <div className="course-card w-full overflow-hidden rounded-2xl bg-white shadow-xl lg:sticky lg:top-24">
                  {/* Offer */}
                  {playerData ? (
                     playerData.videoId ? (
                        <YouTube
                           videoId={playerData.videoId}
                           opts={{ playerVars: { autoplay: 1 } }}
                           iframeClassName="w-full aspect-video"
                        />
                     ) : (
                        <div className="w-full aspect-video flex items-center justify-center bg-gray-100 text-sm text-gray-500">
                           Invalid preview URL
                        </div>
                     )
                  ) : (
                     <img
                        src={courseData.courseThumbnail}
                        alt={courseData.courseTitle}
                        className="aspect-video w-full object-cover"
                     />
                  )}
                  <div className="p-4 sm:p-6">
                     <div className="mb-4 flex items-center gap-2 text-red-500 font-medium">
                        <Timer size={18} />
                        <p>5 days left at this price!</p>
                     </div>

                     {/* Price */}
                     <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
                        <h1 className="md:text-4xl text-2xl font-bold text-gray-900">
                           {Currency}{" "}
                           {(
                              courseData.coursePrice -
                              (courseData.discount * courseData.coursePrice) /
                                 100
                           ).toFixed(2)}
                        </h1>

                        <p className="text-gray-400 md:text-xl line-through">
                           {Currency} {courseData.coursePrice}
                        </p>

                        <p className="text-gray-600 text-lg">
                           {courseData.discount} % off
                        </p>
                     </div>

                     {/* Stats */}
                     <div className="mb-8 flex flex-wrap items-center gap-3 text-gray-600 sm:gap-4">
                        <div className="flex items-center gap-1">
                           <img
                              className="text-orange-500"
                              src={assets.star}
                              alt="star icon"
                           />
                           <span>{calculateRating(courseData)}</span>
                        </div>

                        <div className="hidden h-4 w-px bg-gray-500/40 sm:block"></div>

                        <div className="flex items-center gap-1">
                           <Clock size={18} />
                           <span>{calculateCourseDuration(courseData)}</span>
                        </div>

                        <div className="hidden h-4 w-px bg-gray-500/40 sm:block"></div>

                        <div className="flex items-center text-sm gap-1">
                           <BookOpen size={18} />
                           <span>
                              {calculateNoOfLectures(courseData)} lessons
                           </span>
                        </div>
                     </div>

                     {/* Button */}
                     <button
                        onClick={enrollCourse}
                        className="mb-6 w-full rounded-lg bg-blue-600 py-3 text-base font-semibold text-white hover:bg-blue-700"
                     >
                        {isAlreadyEnrolled ? "Already Enrolled " : "Enroll Now"}
                     </button>

                     {/* Course Details */}
                     <div>
                        <h2 className="text-xl font-semibold mb-4">
                           What's in the course?
                        </h2>

                        <ul className="space-y-1 text-gray-600 list-disc pl-5">
                           <li>Lifetime access with free updates.</li>
                           <li>Step-by-step, hands-on project guidance.</li>
                           <li>Downloadable resources and source code.</li>
                           <li>Quizzes to test your knowledge.</li>
                           <li>Certificate of completion.</li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <Footer />
      </>
   ) : (
      <Loading />
   );
};

export default CourseDetails;
