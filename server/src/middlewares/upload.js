import multer from "multer";

// 設定圖片上傳位置
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/hotel/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // 避免檔名重複
  },
});

// 限制只接受圖片
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("只允許上傳圖片"), false);
  }
};

export const upload = multer({ storage: storage, fileFilter: fileFilter });
