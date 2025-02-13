import express from 'express'

import {
  getHotelsImages,
  getByIds,
  getByHotelId,
} from '../controllers/hotelImagesController.js'
const router = express.Router()

router.get('/', getHotelsImages)
router.get('/:id', getByIds)
router.get('/image/:hotel_id', getByHotelId)
// router.post("/",)
// router.patch("/:id",)
// router.delete("/:id",)=>移至hotel

export default router
