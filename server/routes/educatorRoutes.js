import express from "express"
import { updateRoletoEducator } from "../controllers/educatorController.js"


const educatorRouter = express.Router()


// add educator role
educatorRouter.get('/update-role', updateRoletoEducator)


export default educatorRouter