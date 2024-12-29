import express from 'express'
import { addFood, listFood, removeFood } from '../controllers/foodController.js'
import multer from 'multer' //For creating image storage system.

const foodRouter = express.Router(); //for get/post/etc methods

//Image storage engine (Storing images in Uploads folder)
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

//reqs using functions in controller file
foodRouter.post("/add", upload.single("image"), addFood)
foodRouter.get("/list", listFood) 
foodRouter.post("/remove", removeFood)





export default foodRouter;