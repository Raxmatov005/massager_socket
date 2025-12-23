import express from "express";
import { register, login, profile } from "../controllers/auth.controller.ts";
import { routeProtect } from "../middleware/routeProtect.ts";
import multer from "multer";
import path from "path";

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // ✅ use relative folder (not /tmp unless you want temp)
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); // 🧠 get original extension (.jpg, .png)
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext); // ✅ add extension
    },
});

const upload = multer({ storage });

router.post("/register", register);
router.post("/login", login);
router.put("/profile", routeProtect, upload.single('profileImg'), profile);

export default router;