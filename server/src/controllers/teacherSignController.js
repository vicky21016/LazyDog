import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

import {
  getTeacherInfo,
  updateTeacherInfo,
  getCoursesByTeacher,
  getCoursesIdByTeacher,
  createCourseWithSession,
  createGets,
  updateCourseWithSession,
  deleteCourseSession,
} from "../services/teacherSignService.js";

export const getInfo = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);

    const infos = await getTeacherInfo(userId);
    res.json({ status: "success", data: infos, message: "師資查詢成功" });
  } catch (err) {
    console.log(1);
    res.status(500).json({ error: err.message });
  }
};

export const updateInfo = async (req, res) => {
  try {
    console.log("📂 解析後的檔案:", req.file); // 🛠️ 查看 multer 是否成功處理圖片
    console.log("前端傳來的資料", req.body);

    const { name, category_id, Introduce, Experience, teacherId } = req.body; // 從請求的 body 取得要更新的資料
    const img = req.file ? req.file.filename : req.body.teacherPic; // 如果有檔案，使用檔案名稱，否則為 null
    const updateData = {
      name,
      category_id,
      Introduce,
      Experience,
      img,
      teacherId,
    };
    // console.log(img);

    // 呼叫更新函數，傳入 teacherId 和要更新的資料
    const success = await updateTeacherInfo(updateData);

    // 如果更新成功
    if (success) {
      return res.json({ status: "success", message: "師資資訊更新成功" });
    } else {
      // 如果沒有更新任何資料（可能是資料沒有變更或其他原因）
      return res
        .status(400)
        .json({ status: "fail", message: "更新失敗，請確認資料是否正確" });
    }
  } catch (err) {
    console.error("更新師資資訊失敗：", err);
    res.status(500).json({ status: "error", message: "內部伺服器錯誤" });
  }
};

export const getCourse = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const courses = await getCoursesByTeacher(teacherId);
    res.json({ status: "success", data: courses, message: "課程查詢成功" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCourseId = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("找到課程ID", id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "請提供有效的課程 ID" });
    }

    const course = await getCoursesIdByTeacher(id);
    res.json({ status: "success", data: course, message: "課程查詢成功" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCourse = async (req, res) => {
  try {
    console.log("後端收到的req.body:", req.body);

    // const { courseData, sessionData } = req.body;
    const courseData = JSON.parse(req.body.courseData);
    const sessionData = JSON.parse(req.body.sessionData);
    const imgData = {
      mainImage: req.files?.mainImage?.[0]
        ? req.files.mainImage[0].filename
        : null,
      otherImages: req.files?.otherImages
        ? req.files.otherImages.map((file) => file.filename)
        : [],
    };

    const result = await createCourseWithSession(
      courseData,
      sessionData,
      imgData
    );
    console.log(result);

    res.status(201).json({
      message: "課程建立成功",
      courseId: result.courseId,
      sessionId: result.sessionId,
      mainImageId: result.mainImageId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createGetNeed = async (req, res) => {
  try {
    const selects = await createGets();
    res.json({
      status: "success",
      data: selects,
      message: "新增課程 所需的資料GET成功",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    console.log("📂 解析後的檔案:", req.files); // 🛠️ 查看 multer 是否成功處理圖片
    console.log("📨 解析後的 body:", req.body); // 🛠️ 查看請求 body 是否正確

    const { courseId, sessionId, courseData, sessionData, deletedPics } =
      req.body;

    if (!courseId || !sessionId || !courseData || !sessionData) {
      return res.status(400).json({
        error: "缺少courseId 或 sessionId 或 courseData 或 sessionData",
      });
    }

    let mainpicName = req.files["mainImage"]
      ? req.files["mainImage"][0].filename
      : null;
    let otherpicsName = req.files["otherImages"]
      ? req.files["otherImages"].map((file) => file.filename)
      : [];

    let parsedDeletedPics = [];
    if (deletedPics) {
      try {
        parsedDeletedPics = JSON.parse(deletedPics);
        // console.log("JSON PARSE結果: ", deletedPics);
      } catch (error) {
        console.error("❌ 解析 deletedPics 失敗:", error);
        return res.status(400).json({ error: "無效的 deletedPics 格式" });
      }
    }
    // 刪除圖片
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const rootDir = path.resolve(__dirname, "../../../lazydog");
    const courseImgPath = path.join(rootDir, "/public/course/img"); // 設定圖片存放的路徑
    if (parsedDeletedPics && parsedDeletedPics.length > 0) {
      parsedDeletedPics.forEach((pic) => {
        const filePath = path.join(courseImgPath, pic.url); // 取得檔案的完整路徑

        // 刪除圖片檔案
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("刪除圖片失敗:", err);
          } else {
            console.log(`刪除圖片成功: ${filePath}`);
          }
        });
      });
    }

    const result = await updateCourseWithSession(
      courseId,
      JSON.parse(courseData),
      sessionId,
      JSON.parse(sessionData),
      {
        mainImage: mainpicName,
        otherImages: otherpicsName,
        deletedPics,
      }
    );
    console.log("更新結果:", result);

    res.status(200).json({
      message: "課程更新成功",
      // courseId,
      // sessionId,
      // mainImage: mainpicName,
      // otherImages: otherpicsName,
    });
  } catch (err) {
    res.status(500).json({ error: "無法更新課程" + err.message });
  }
};

export const deleteSessionOnly = async (req, res) => {
  const sessionId = req.params.id;
  console.log(req.params.id);

  if (!sessionId) {
    return res.status(400).json({ error: "缺少 sessionId" });
  }

  try {
    await deleteCourseSession(sessionId);
    res.status(200).json({
      message: "該梯次已標記為刪除",
      sessionId,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
