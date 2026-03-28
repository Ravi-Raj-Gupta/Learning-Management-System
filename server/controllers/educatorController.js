
export const updateRoletoEducator = async (req, res) => {
   try {
      const  userId  = req.auth.userId

      await clerkClient.users.updateUserMetadata(userId, {
         publicMetadata: {
            role: "educator",
         }
      })
      res.json({
         success: true,
         message: "you can publish a course now"
      })
   }
   catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}