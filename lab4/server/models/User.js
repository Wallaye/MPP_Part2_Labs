import mongoose from "mongoose";

const User = new mongoose.Schema({
    userName: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    activities: {type: []}
})

export default mongoose.model('Users', User);