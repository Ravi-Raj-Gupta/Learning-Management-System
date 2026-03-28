import { assets } from "@/assets/assets";
import Footer from "@/components/Student/Footer";
import Loading from "@/components/Student/Loading";
import { AppContext } from "@/Context/AppContext";
import humanizeDuration from "humanize-duration";
import { BookOpen, Clock, Currency, Star, Timer } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

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
   } = useContext(AppContext);

   const fetchCourseData = async () => {
      const findCourse = allcourses.find((course) => course._id === id);

      setCourseData(findCourse);
   };

   useEffect(() => {
      fetchCourseData();
   }, [allcourses]);

   const toggleSection = (index) => {
      setOpensection((prev) => ({ ...prev, [index]: !prev[index] }));
   };

   return courseData ? (
      <>
         <div className="relative">
            {/* Gradient background */}
            <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-cyan-100/70 to-transparent pointer-events-none"></div>

            <div className="flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 md:pt-20 pt-20 text-left relative z-10">
               {/* left column */}
               <div className="max-w-xl z-10 text-gray-500">
                  <h1 className="course-details-heading-large course-details-heading-small font-semibold text-gray-800">
                     {courseData.courseTitle}
                  </h1>
                  <p
                     className="pt-4 md:text-base text-sm"
                     dangerouslySetInnerHTML={{
                        __html: courseData.courseDescription.slice(0, 200),
                     }}
                  ></p>

                  {/* review and ratings */}
                  <div className="flex items-center space-x-2 pt-3 pb-1.5 text-sm">
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
                     <span className="text-blue-600 underline">Ravi Raj</span>
                  </p>

                  <div className="pt-8 text-gray-800">
                     <h2 className="text-xl font-semibold">Course Strucure</h2>

                     <div className="pt-5">
                        {courseData.courseContent.map((chapter, index) => (
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
                                             className="flex px-7 items-start gap-2 py-1.5"
                                             key={i}
                                          >
                                             <img
                                                src={assets.play_icon}
                                                alt="play icon"
                                                className="w-4 h-4 "
                                             />
                                             <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-default">
                                                <p className="">
                                                   {lecture.lectureTitle}
                                                </p>
                                                <div className="flex gap-2">
                                                   {lecture.isPreviewFree && (
                                                      <p
                                                         onClick={() =>
                                                            setPlayerData({
                                                               videoId:
                                                                  lecture.lectureUrl
                                                                     .split("/")
                                                                     .pop(),
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

                     <div className="py-20 text-sm text-default">
                        <h3 className="text-xl text-sm font-semibold text-gray-800">
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

               <div className="bg-white course-card overflow-hidden shadow-xl rounded-md  max-w-xl">
                  {/* Offer */}
                  {playerData ? (
                     <YouTube
                        videoId={playerData.videoId}
                        opts={{ playerVars: { autoplay: 1 } }}
                        iframeClassName="w-full aspect-video"
                     />
                  ) : (
                     <img src={courseData.courseThumbnail} alt="" />
                  )}
                  <div className="p-6">
                     <div className="flex items-center gap-2  text-red-500 font-medium mb-4">
                        <Timer size={18} />
                        <p>5 days left at this price!</p>
                     </div>

                     {/* Price */}
                     <div className="flex items-center gap-4 mb-4">
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
                     <div className="flex gap-5 text-gray-600 mb-8">
                        <div className="flex items-center gap-1">
                           <img
                              className="text-orange-500"
                              src={assets.star}
                              alt="star icon"
                           />
                           <span>{calculateRating(courseData)}</span>
                        </div>

                        <div className="h-4 w-px bg-gray-500/40"></div>

                        <div className="flex items-center gap-1">
                           <Clock size={18} />
                           <span>{calculateCourseDuration(courseData)}</span>
                        </div>

                        <div className="h-4 w-px bg-gray-500/40"></div>

                        <div className="flex items-center text-sm gap-1">
                           <BookOpen size={18} />
                           <span>
                              {calculateNoOfLectures(courseData)} lessons
                           </span>
                        </div>
                     </div>

                     {/* Button */}
                     <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold mb-6">
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
