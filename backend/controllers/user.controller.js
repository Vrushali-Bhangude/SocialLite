import uploadToCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        const user = await User.findById(userId).select("-password").populate("posts");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: "Internal server error ", error: error.message });
    }
}

export const suggestedUsers = async (req, res) => {
    try {
        const users = await User.find({
            _id: { $ne: req.userId }
        }).select("-password").limit(10);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Internal server error in suggested user", error: error.message });
    }
}

export const editProfile = async (req, res) => {
    try {
        const { name, userName, bio, profession, gender } = req.body;
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const sameUserWithUsername = await User.findOne({ userName }).select("-password");

        if (sameUserWithUsername && sameUserWithUsername._id.toString() !== user._id.toString()) {
            return res.status(400).json({ message: "Username already taken" });
        }

        let profileImage;
        if (req.file) {
            try {
                profileImage = await uploadToCloudinary(req.file.path);
            } catch (error) {
                console.error("Cloudinary upload failed:", error);
                return res.status(500).json({ message: "Image upload failed" });
            }
        }

        user.name = name
        user.userName = userName
        user.bio = bio
        user.profession = profession
        user.gender = gender
        if (profileImage) {
            user.profileImage = profileImage;
        }
        await user.save();
        res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Internal server error in edit profile", error: error.message });
    }
}

export const getProfile = async (req, res) => {
    try {
        const userName = req.params.userName;
        const user = await User.findOne({ userName }).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Internal server error in get profile", error: error.message });
    }
}