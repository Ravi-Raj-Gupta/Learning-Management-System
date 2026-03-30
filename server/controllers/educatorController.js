import { clerkClient, getAuth} from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import Purchase from "../models/Purchase.js";
import User from "../models/User.js";

const uploadToCloudinary = (buffer) =>
   new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
         { resource_type: "image" },
         (error, result) => {
            if (error) {
               reject(error);
               return;
            }

            resolve(result);
         }
      );

      stream.end(buffer);
   });

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

      if (!userId) {
         return res.status(401).json({
            success: false,
            message: "User not authenticated",
         });
      }

      if (!courseData) {
         return res.status(400).json({
            success: false,
            message: "Course data is required",
         });
      }

      if (!imageFile?.buffer) {
         return res.status(400).json({
            success: false,
            message: "Course thumbnail is required",
         });
      }

      if (
         !process.env.CLOUDINARY_NAME ||
         !process.env.CLOUDINARY_API_KEY ||
         !process.env.CLOUDINARY_SECRET_KEY
      ) {
         return res.status(500).json({
            success: false,
            message: "Cloudinary environment variables are missing",
         });
      }

      let parsedCourseData;

      try {
         parsedCourseData = JSON.parse(courseData);
      } catch {
         return res.status(400).json({
            success: false,
            message: "Invalid course data format",
         });
      }

      const imageUpload = await uploadToCloudinary(imageFile.buffer);
      parsedCourseData.educator = userId;
      parsedCourseData.courseThumbnail = imageUpload.secure_url;

      await Course.create(parsedCourseData);

      return res.json({
         success: true,
         message: "course added successfully",
      });
   } catch (error) {
      console.error("Add course error:", error);
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
      const { userId: educator } = getAuth(req);

      if (!educator) {
         return res.status(401).json({
            success: false,
            message: "User not authenticated",
         });
      }

      const courses = await Course.find({ educator });
      const totalCourses = courses.length;
      const enrolledStudents = [];

      const courseIds = courses.map((course) => course._id);

      const purchases = await Purchase.find({
         courseId: { $in: courseIds },
         status: "completed",
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
      const { userId: educator } = getAuth(req);

      if (!educator) {
         return res.status(401).json({
            success: false,
            message: "User not authenticated",
         });
      }

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
