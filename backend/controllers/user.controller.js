import User from "../models/user.model.js";
const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        console.log("User ID from token:", userId); // Debugging line
        const user = await User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }   
        res.status(200).json({ user });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export  { getCurrentUser }