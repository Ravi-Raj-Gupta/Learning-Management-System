import { Webhook } from "svix";
import User from "../models/User.js";
import Stripe from "stripe";
import Purchase from "../models/purchase.js";
import Course from "../models/Course.js";
import { purchaseCourse } from "./userController.js";

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

            await User.findOneAndUpdate({ _id: data.id }, userData);

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
      console.log(error);

      return res.status(500).json({
         success: false,
         message: error.message,
      });
   }
};

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
   console.log("🔴 Webhook hit");

   const sig = req.headers["stripe-signature"];
   console.log("🔴 Signature:", sig);

   let event;

   try {
      event = stripeInstance.webhooks.constructEvent(
         req.body,
         sig,
         process.env.STRIPE_WEBHOOK_SECRET
      );
      console.log("🔴 Event type:", event.type);
   } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
   }

   try {
      switch (event.type) {
         case "payment_intent.succeeded": {
            const paymentIntent = event.data.object;

            const session = await stripeInstance.checkout.sessions.list({
               payment_intent: paymentIntent.id,
            });

            if (!session.data.length) return res.json({ received: true });

            const { purchaseId } = session.data[0].metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            if (!purchaseData) return res.json({ received: true });

            const userData = await User.findById(purchaseData.userId);
            const courseData = await Course.findById(purchaseData.courseId);

            courseData.enrolledStudents.push(userData._id);
            await courseData.save();

            userData.enrolledCourses.push(courseData._id);
            await userData.save();

            purchaseData.status = "completed";
            await purchaseData.save();

            break;
         }

         case "payment_intent.payment_failed": {
            const paymentIntent = event.data.object;

            const session = await stripeInstance.checkout.sessions.list({
               payment_intent: paymentIntent.id,
            });

            if (!session.data.length) return res.json({ received: true });

            const { purchaseId } = session.data[0].metadata;

            const purchaseData = await Purchase.findById(purchaseId);
            if (!purchaseData) return res.json({ received: true });

            purchaseData.status = "failed";
            await purchaseData.save();

            break;
         }

         default:
            console.log(`Unhandled event type ${event.type}`);
      }
   } catch (error) {
      console.log("Webhook processing error:", error.message);
   }

   res.json({ received: true });
};