import express from "express"
import { updateRoletoEducator } from "../controllers/educatorController.js"
import { requireAuth } from "@clerk/express"


const educatorRouter = express.Router()


// add educator role
educatorRouter.get('/update-role',requireAuth(),  updateRoletoEducator)


export default educatorRouter