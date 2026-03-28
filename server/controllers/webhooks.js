import { Webhook } from "svix";
import User from "../models/User.js";

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