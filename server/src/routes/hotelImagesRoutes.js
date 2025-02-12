import express from 'express'

import {
  getHotelsImages,
  getByIds,
  
} from '../controllers/hotelImagesController.js'
const router = express.Router()
// getByhotelId,
router.get('/', getHotelsImages)
router.get('/:id', getByIds)
// router.get("/search", getByhotelId);
// router.post("/",)
// router.patch("/:id",)
// router.delete("/:id",)

export default router
