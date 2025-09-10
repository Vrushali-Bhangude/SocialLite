import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized, no token" })
        }
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userID;
        next();

    } catch (error) {
        res.status(401).json({ message: "Unauthorized, invalid token", error: error.message })

    }
}

export default isAuth;