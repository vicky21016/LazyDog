// 用MVC架構，步驟二 Controller 處理請求
import { getCourses, getId, searchCourses } from "../services/courseService.js";

export const getAllCourse = async (req, res) => {
  try {
    // const { type, place, minPrice, maxPrice, keyword } = req.query;
    const { keyword = "", typeF = "", placeF = "" } = req.query;
    console.log("📌 接收到的查詢參數:", req.query);

    const typeList = typeF ? typeF.split(",") : [];
    const placeList = placeF ? placeF.split(",") : [];

    console.log("後端接收到的篩選條件 轉換：", {
      keyword,
      typeList,
      placeList,
    });

    const { courses, types, places, latest, newest } = await getCourses({
      keyword,
      typeList,
      placeList,
    });

    res.status(200).json({
      status: "success",
      data: {
        courses: courses || [],
        types: types || [],
        places: places || [],
        latest: latest || [],
        newest: newest || [],
      },
      message: "讀取course資料表成功!",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSearch = async (req, res) => {
  try {
    const { keyword } = req.query;
    // console.log({keyword});
    if (!keyword) {
      return res.status(400).json({ error: "請提供關鍵字" });
    }

    const courses = await searchCourses(keyword);
    if (!courses.length) {
      return res.status(404).json({ error: "查無資料" });
    }

    res.status(200).json({
      status: "success",
      data: courses,
      message: `查詢： ${keyword} 相關成功，共${courses.length}筆資料`,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIdCourse = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("找到旅館ID", id);

    if (isNaN(id)) {
      return res.status(400).json({ error: "請提供有效的課程 ID" });
    }

    const course = await getId(id);
    res.json(course);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// export const createCourse = async (req, res) => {
//   const {courseData, sessionData} = req.body;

//   try{
//     const result = await createCourseWithSession(courseData, sessionData)
//     console.log(result);

//     res.status(201).json({
//       message:"課程建立成功",
//       courseId:  result.courseId,
//       sessionId: result.sessionId
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

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
