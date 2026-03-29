import { clerkClient } from "@clerk/express";
import { getAuth } from "@clerk/express";

export const protectEducator = async (req, res, next) => {
   try {
      const { userId } = getAuth(req)  // ✅ pehle userId lo
      const response = await clerkClient.users.getUser(userId)  // ✅ phir use karo

      if (response.publicMetadata.role !== 'educator') {  // ✅ typo fix
         return res.json({
            success: false,
            message: 'unauthorized access',
         })
      }

      next()  // ✅ next call hoga ab

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message,
      })
   }
}