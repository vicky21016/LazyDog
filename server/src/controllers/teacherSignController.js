import { getTeacherInfo, updateTeacherInfo, getCoursesByTeacher, createCourseWithSession} from "../services/teacherSignService.js";

export const getInfo = async (req, res) => {
  try {
    const teacherId = req.decoded.id; // 從 token 中獲取教師的 ID 
    const infos = await getTeacherInfo(teacherId);
    res.json({ status: "success", data: infos, message: "師資查詢成功" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateInfo = async (req, res) => {
  try {
    const teacherId = req.decoded.id; // 從 token 中獲取教師的 ID
    const updateData = req.body; // 從請求的 body 取得要更新的資料

    // 呼叫更新函數，傳入 teacherId 和要更新的資料
    const success = await updateTeacherInfo(teacherId, updateData);

    // 如果更新成功
    if (success) {
      return res.json({ status: "success", message: "師資資訊更新成功" });
    } else {
      // 如果沒有更新任何資料（可能是資料沒有變更或其他原因）
      return res.status(400).json({ status: "fail", message: "更新失敗，請確認資料是否正確" });
    }
  } catch (err) {
    console.error("更新師資資訊失敗：", err);
    res.status(500).json({ status: "error", message: "內部伺服器錯誤" });
  }
};

export const getCourse = async (req, res) => {
  try {
    const teacherId = req.decoded.id; // 從 token 中獲取教師的 ID 
    const courses = await getCoursesByTeacher(teacherId);
    res.json({ status: "success", data: courses, message: "課程查詢成功" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCourse = async (req, res) => {
  try{
    // 檢查上傳的圖片
    const imgData = {
      mainImage: req.files?.mainImage?.[0]? `/teacherSign/img/${req.files.mainImage[0].filename}` : null,
      otherImages: req.files?.otherImages?  req.files.otherImages.map((file) => `/teacherSign/img/${file.filename}`) : [],
    };

    const {courseData, sessionData} = req.body;

    const result = await createCourseWithSession(courseData, sessionData, imgData)
    console.log(result);

    res.status(201).json({
      message:"課程建立成功",
      courseId:  result.courseId,
      sessionId: result.sessionId,
      mainImageId: result.mainImageId,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// export const updateCourse = async (req, res) => {
//   const {courseId, courseData, sessionId, sessionData} = req.body;

//   if(!courseId || !sessionId){
//     return res.status(400).json({error: "缺少courseId 或 sessionId"})
//   }

//   try{
//     const result = await updateCourseWithSession(courseId, courseData, sessionId, sessionData)
//     console.log(result);

//     res.status(200).json({
//       message:"課程更新成功",
//       courseId,
//       sessionId
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// export const deleteSessionOnly = async (req, res) => {
//   const {sessionId} = req.body;

//   if(!sessionId){
//     return res.status(400).json({error: "缺少 sessionId"})
//   }

//   try{
//     await deleteCourseSession(sessionId);
//     res.status(200).json({
//       message:"該梯次已標記為刪除",
//       sessionId
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };


