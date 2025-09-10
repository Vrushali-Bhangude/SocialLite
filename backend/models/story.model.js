import mongoose from "mongoose";


const storySchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.types.objectId,
        ref: "User",
        required: true,
    },
    mediaType: {
        type: String,
        enum: ["image", "video"],
        required: true,
    },
    media: {
        type: String,
        required: true,
    },
    viewers: [
        {
            type: mongoose.Schema.types.objectId,
            ref: "User",
            required: true,
        }
    ],
    createdAt:{
        type:Date,
        default:Date.now,
        expires:24*60*60,  
    }

}, { timestamps: true });

const Story = mongoose.model("Story", storySchema);

export default Story;