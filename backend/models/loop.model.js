import mongoose from "mongoose";


const loopSchema = new mongoose.Schema({
    author: {
        type: moongoose.Schema.types.objectId,
        ref: "User",
        required: true,
    },

    media: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    comments: [
        {
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            message: {
                type: String
            }
        }
    ]
}, { timestamps: true })

const loop = mongoose.model("Loop", loopSchema);

export default loop;