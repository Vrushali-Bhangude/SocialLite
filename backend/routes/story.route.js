import express from "express";
import isAuth from "../middleware/isAuth.js";
import { upload } from "../middleware/multer.js";
import { getStoryByUserName, uploadStory, viewStory } from "../controllers/story.controller.js";

const storyRouter = express.Router();

storyRouter.post("/upload", isAuth,upload.single("media"), uploadStory);
storyRouter.get("/getByUserName/:userName", isAuth,getStoryByUserName);
storyRouter.get("/view/:storytId",isAuth,viewStory);

export default storyRouter;

