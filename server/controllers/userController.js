import { getAuth } from "@clerk/express";
import User from "../models/User.js";
import Purchase from "../models/purchase.js";
import Stripe from "stripe";
import Course from "../models/Course.js";
import { CourseProgress } from "../models/courseProgress.js";


// ✅ Get User Data
export const getUserData = async (req, res) => {
   try {
      const { userId } = getAuth(req);

      const user = await User.findById(userId);

      if (!user) {
         return res.json({
            success: false,
            message: "User not found",
         });
      }

      res.json({
         success: true,
         user,
      });

   } catch (error) {
      console.log("❌ ERROR:", error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};


// ✅ Get Enrolled Courses
export const userEnrolledCourses = async (req, res) => {
   try {
      const { userId } = getAuth(req);

      const userData = await User.findById(userId).populate("enrolledCourses");

      res.json({
         success: true,
         enrolledCourses: userData?.enrolledCourses || [],
      });

   } catch (error) {
      console.log("❌ ERROR:", error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};


// ✅ Purchase Course
export const purchaseCourse = async (req, res) => {
   try {
      const { courseId } = req.body;
      const { origin } = req.headers;
      const { userId } = getAuth(req);

      const userData = await User.findById(userId);
      const courseData = await Course.findById(courseId);

      if (!userData || !courseData) {
         return res.status(404).json({
            success: false,
            message: "Data not found",
         });
      }

      const amount = (
         courseData.coursePrice -
         (courseData.discount * courseData.coursePrice) / 100
      ).toFixed(2);

      const newPurchase = await Purchase.create({
         courseId: courseData._id,
         userId,
         amount,
      });

      const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
      const currency = process.env.CURRENCY.toLowerCase();

      const line_items = [
         {
            price_data: {
               currency,
               product_data: {
                  name: courseData.courseTitle,
               },
               unit_amount: Math.floor(amount) * 100,
            },
            quantity: 1,
         },
      ];

      const session = await stripeInstance.checkout.sessions.create({
         success_url: `${origin}/loading/my-enrollments`,
         cancel_url: `${origin}/`,
         line_items,
         mode: "payment",
         metadata: {
            purchaseId: newPurchase._id.toString(),
         },
      });

      res.json({
         success: true,
         session_url: session.url,
      });

   } catch (error) {
      console.log("❌ ERROR:", error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};


// ✅ Update Course Progress
export const updateUserCourseProgress = async (req, res) => {
   try {
      const { userId } = getAuth(req);
      const { courseId, lectureId } = req.body;

      if (!courseId || !lectureId) {
         return res.status(400).json({
            success: false,
            message: "courseId and lectureId are required",
         });
      }

      let progressData = await CourseProgress.findOne({ userId, courseId });

      if (progressData) {
         if (progressData.lectureCompleted.includes(lectureId)) {
            return res.json({
               success: true,
               message: "Lecture already completed",
            });
         }

         progressData.lectureCompleted.push(lectureId);
         await progressData.save();

      } else {
         await CourseProgress.create({
            userId,
            courseId,
            lectureCompleted: [lectureId],
         });
      }

      res.json({
         success: true,
         message: "Progress updated successfully",
      });

   } catch (err) {
      console.log("❌ ERROR:", err);
      res.status(500).json({
         success: false,
         message: err.message, // ✅ FIXED
      });
   }
};


// ✅ Get Course Progress (🔥 FIXED MAIN ERROR)
export const getUserCourseProgress = async (req, res) => {
   try {
      const { userId } = getAuth(req); // ✅ FIXED

      const { courseId } = req.body;

      if (!courseId) {
         return res.status(400).json({
            success: false,
            message: "courseId is required",
         });
      }

      const progressData = await CourseProgress.findOne({
         userId,
         courseId,
      });

      res.json({
         success: true,
         progressData,
      });

   } catch (error) {
      console.log("❌ ERROR:", error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};


// ✅ Add Rating
export const addUserRating = async (req, res) => {
   try {
      const { userId } = getAuth(req);
      const { courseId, rating } = req.body;

      if (!courseId || !userId || !rating || rating < 1 || rating > 5) {
         return res.json({
            success: false,
            message: "Invalid data",
         });
      }

      const course = await Course.findById(courseId);

      if (!course) {
         return res.json({
            success: false,
            message: "Course not found",
         });
      }

      const user = await User.findById(userId);

      if (!user || !user.enrolledCourses.includes(courseId)) {
         return res.json({
            success: false,
            message: "User not enrolled",
         });
      }

      const existingIndex = course.courseRatings.findIndex(
         (r) => r.userId.toString() === userId
      );

      if (existingIndex > -1) {
         course.courseRatings[existingIndex].rating = rating;
      } else {
         course.courseRatings.push({ userId, rating });
      }

      await course.save(); // ✅ IMPORTANT

      res.json({
         success: true,
         message: "Rating added successfully",
      });

   } catch (error) {
      console.log("❌ ERROR:", error);
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};