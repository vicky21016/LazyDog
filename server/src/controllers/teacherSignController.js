// 用MVC架構，步驟二 Controller 處理請求 
import { getCoursesByTeacher, createCourseWithSession} from "../services/teacherSignService.js";

export const getCourse = async (req, res) => {
  try {
    const teacherId = req.decoded.id; // 從 token 中獲取教師的 ID 
    const courses = await getCoursesByTeacher(teacherId);
    res.json({ status: "success", data: courses, message: "課程查詢成功" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// export const getCourseId = async (req, res) => {
//   try{
//     const id = Number(req.params.id);
//     console.log("找到課程ID", id);

//     const courses = await getCourseIds(id);
//     res.json(courses[0]);
//   }catch(err){
//     res.status(500).json({error:err.message})
//   }
// };



export const createCourse = async (req, res) => {
  const {courseData, sessionData} = req.body;

  try{
    const result = await createCourseWithSession(courseData, sessionData)
    console.log(result);

    res.status(201).json({
      message:"課程建立成功",
      courseId:  result.courseId,
      sessionId: result.sessionId
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


