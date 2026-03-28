import { clerkClient, getAuth } from "@clerk/express"

export const updateRoletoEducator = async (req, res) => {
  try {
    const { userId } = getAuth(req)  // ← yeh change karo
    
    console.log("User ID:", userId)

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated"
      })
    }

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator",
      },
    })

    return res.json({
      success: true,
      message: "you can publish a course now",
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}