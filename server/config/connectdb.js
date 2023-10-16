import mongoose, { mongo } from "mongoose";

const connectDb = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS = {
            dbName: "authdb"
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("db connected successfully");
    } catch (error) {
        console.log(error);
    }
}

export {connectDb};