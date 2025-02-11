// 用MVC架構，步驟二 Controller 處理請求 
import { getCourses, getId, createCourseWithSession} from "../services/courseService.js";

export const getAllCourse = async (req, res) => {
  try {
    const courses = await getCourses();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getIdCourse = async (req, res) => {
  try{
    const id = Number(req.params.id);
    // console.log("找到旅館ID", id);

    const [course] = await getId(id);    
    res.json(course);
  }catch(err){
    res.status(500).json({err:err.message})
  }
};


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
//   try{
//     const newCourse = req.body;
//     const courses = await updateCourses();
//     newCourse.id = courses.length + 1;
//     courses.push(newCourse);
//     res.status(200).json(newCourse);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };


