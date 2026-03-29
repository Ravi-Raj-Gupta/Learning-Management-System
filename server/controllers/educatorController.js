import { clerkClient, getAuth } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/purchase.js";

export const updateRoletoEducator = async (req, res) => {
   try {
      const { userId } = getAuth(req);

      if (!userId) {
         return res.status(401).json({
            success: false,
            message: "User not authenticated",
         });
      }

      await clerkClient.users.updateUserMetadata(userId, {
         publicMetadata: {
            role: "educator",
         },
      });

      return res.json({
         success: true,
         message: "you can publish a course now",
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const addCourse = async (req, res) => {
   try {
      const { courseData } = req.body;
      const imageFile = req.file;
      const { userId } = getAuth(req);

      console.log("Image file:", imageFile);
      console.log("Course data:", courseData);

      if (!imageFile) {
         return res.status(400).json({
            success: false,
            message: "Course thumbnail is required",
         });
      }

      const imageUpload = await cloudinary.uploader.upload(imageFile.path);
      console.log("Cloudinary URL:", imageUpload.secure_url);

      const parsedCourseData = JSON.parse(courseData);
      parsedCourseData.educator = userId;
      parsedCourseData.courseThumbnail = imageUpload.secure_url; // ✅ pehle set karo

      console.log("Final course data:", parsedCourseData);

      await Course.create(parsedCourseData); // ✅ phir create karo

      return res.json({
         success: true,
         message: "course added successfully",
      });
   } catch (error) {
      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

export const getEducatorCourses = async (req, res) => {
   try {
      const { userId } = getAuth(req);

      if (!userId) {
         return res.status(401).json({
            success: false,
            message: "User not authenticated",
         });
      }

      const courses = await Course.find({ educator: userId });

      res.json({
         success: true,
         courses,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// get educator dashboard data (total earning, enrolled students, no of courses)

export const getEducatorDashboardData = async (req, res) => {
   try {
      const educator = req.auth.userId;
      const courses = await Course.find({ educator });
      const totalCourses = courses.length;

      const courseIds = courses.map((course) => course._id);

      const purchases = await Purchase.find({
         course: { $in: courseIds, status: "completed" },
      });

      const totalEarnings = purchases.reduce(
         (sum, purchase) => sum + purchase.amount,
         0,
      );

      // collect unique enrolled students id with their course titles

      for (const course of courses) {
         const students = await User.find(
            {
               _id: { $in: course.enrolledStudents },
            },
            "name imageUrl",
         );

         students.forEach((student) => {
            enrolledStudents.push({
               courseTitle: course.courseTitle,
               student,
            });
         });
      }
      res.json({
         success: true,
         DashboardData: {
            totalEarnings,
            enrolledStudents,
            totalCourses,
         },
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

// get enrolled student data with purchase data
export const getEnrolledStudentData = async (req, res) => {
   try {
      const educator = req.auth.userId;
      const courses = await Course.find({ educator });
      const courseIds = courses.map((course) => course._id);

      const purchases = await Purchase.find({
         courseId: { $in: courseIds },
         status: "completed",
      })
         .populate("userId", "name imageUrl")
         .populate("courseId", "courseTitle");

      const enrolledStudents = purchases.map((purchase) => ({
         student: purchase.userId,
         courseTitle: purchase.courseId.courseTitle,
         purchaseDate: purchase.createdAt,
      }));

      res.json({
         success: true,
         enrolledStudents,
      });

   } 
   catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};
