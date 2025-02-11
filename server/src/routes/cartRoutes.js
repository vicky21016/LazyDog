import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer();

router.post("/", upload.none(), async (req, res) => {
  const { data } = req.body;
  res.status(200).json({
    status: "success",
    data,
    message: "",
  });
});
router.post("/pay", upload.none(), async (req, res) => {});

export default router;
