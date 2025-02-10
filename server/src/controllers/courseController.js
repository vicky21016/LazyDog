import { getCourses, getId ,createCourses } from "../services/courseService.js";

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
    const {id}=req.params;
    // console.log(id);
    const courses = await getId(id);
    res.json(courses);
  }catch(err){
    res.status(500).json({err:err.message})
  }
};


export const createCourse = async (req, res) => {
  try{
    const newCourse = req.body;
    const courses = await createCourses();
    newCourse.id = courses.length + 1;
    courses.push(newCourse);
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


