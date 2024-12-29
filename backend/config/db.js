//logic to connect with the database
import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://falehkhalid:12345678!!!@cluster0.lafbv.mongodb.net/food-delivery').then(()=>console.log("DB Connected"));
}