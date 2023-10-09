import mongoose from "mongoose";
import {MongoClient} from "mongodb"
import {config} from "dotenv";
config();
const runDB = async() => {
    // await mongoose.connect(process.env.MONGO_URL as string)
    await MongoClient.connect(process.env.MONGO_URL as string )
    .then(() => {
        console.log({ msg: `DataBase Connected Susscessfully !` });
    })
    .catch((err) => {
        console.log({ error: err });
        process.exit(1);
    })

}
export default runDB;