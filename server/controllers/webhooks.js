import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import Purchase from "../models/Purchase.js"; // ✅ FIXED (capital P)
import Course from "../models/Course.js";


// ================= CLERK WEBHOOK =================
export const clerkWebhook = async (req, res) => {
   try {
      const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

      webhook.verify(JSON.stringify(req.body), {
         "svix-id": req.headers["svix-id"],
         "svix-timestamp": req.headers["svix-timestamp"],
         "svix-signature": req.headers["svix-signature"],
      });

      const { data, type } = req.body;

      switch (type) {

         case "user.created": {
            const userData = {
               _id: data.id,
               email: data.email_addresses?.[0]?.email_address,
               name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
               imageUrl: data.image_url,
            };

            await User.create(userData);

            return res.status(200).json({
               success: true,
               message: "User created successfully",
            });
         }

         case "user.updated": {
            const userData = {
               email: data.email_addresses?.[0]?.email_address,
               name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
               imageUrl: data.image_url,
            };

            await User.findByIdAndUpdate(data.id, userData);

            return res.json({
               success: true,
               message: "User updated successfully",
            });
         }

         case "user.deleted": {
            await User.findByIdAndDelete(data.id);

            return res.json({
               success: true,
               message: "User deleted successfully",
            });
         }

         default:
            return res.status(400).json({
               success: false,
               message: "Invalid webhook type",
            });
      }

   } catch (error) {
      console.log("Clerk Webhook Error:", error);

      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};


// ================= STRIPE SETUP =================
const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);


// ================= STRIPE WEBHOOK =================
export const stripeWebhooks = async (req, res) => {

   const sig = req.headers['stripe-signature'];
   let event;

   try {
      event = stripeInstance.webhooks.constructEvent(
         req.body,
         sig,
         process.env.STRIPE_WEBHOOK_SECRET
      );

   } catch (err) {
      console.error('❌ Stripe signature error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
   }

   try {
      switch (event.type) {

         // ===== PAYMENT SUCCESS =====
         case 'checkout.session.completed': {
            const session = event.data.object;
            const { purchaseId } = session.metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            if (!purchaseData) throw new Error("Purchase not found");

            const userData = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId);

            if (!userData || !courseData) {
               throw new Error("User or Course not found");
            }

            if (!courseData.enrolledStudents.includes(userData._id)) {
               courseData.enrolledStudents.push(userData._id);
               await courseData.save();
            }

            if (!userData.enrolledCourses.some((id) => id.toString() === courseData._id.toString())) {
               userData.enrolledCourses.push(courseData._id);
               await userData.save();
            }

            purchaseData.status = 'completed';
            await purchaseData.save();

            break;
         }

         // ===== PAYMENT FAILED =====
         case 'checkout.session.expired': {
            const session = event.data.object;
            const { purchaseId } = session.metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            if (purchaseData) {
               purchaseData.status = 'failed';
               await purchaseData.save();
            }

            break;
         }

         default:
            console.log(`Unhandled event type: ${event.type}`);
      }

      res.json({ received: true });

   } catch (error) {
      console.error('❌ Stripe webhook error:', error);
      res.status(500).json({ error: error.message });
   }
};
