import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();
const from = "frontend/public";
const to = "frontend/public/images/";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "frontend/public/images");
  },
  filename(req, file, cb) {
    console.log(file);
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Image only!");
  }
}
const upload = multer({ storage });
router.post("/", upload.single("image"), (req, res) => {
  const path1 = path.relative(from, req.file.path).split("\\").join("/");

  res.send({ message: "Image Uploaded", image: `/${path1}` });
});

export default router;
