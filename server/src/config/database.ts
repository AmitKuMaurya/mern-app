import mongoose from "mongoose";
import {MongoClient} from "mongodb"
import {config} from "dotenv";
config();
const runDB = async() => {
    await mongoose.connect('mongodb://amit69maurya69:amit69maurya69@ac-gjridgf-shard-00-00.ew9zfyy.mongodb.net:27017,ac-gjridgf-shard-00-01.ew9zfyy.mongodb.net:27017,ac-gjridgf-shard-00-02.ew9zfyy.mongodb.net:27017/?ssl=true&replicaSet=atlas-ppj754-shard-0&authSource=admin&retryWrites=true&w=majority')
    .then(() => {
        console.log({ msg: `DataBase Connected Susscessfully !` });
    })
    .catch((err) => {
        console.log({ error: err });
        process.exit(1);
    })
}
export default runDB;