import express from 'express'

import {
  getHotelsImages,
  getByIds,
  getByHotelId,
} from '../controllers/hotelImagesController.js'
import { verifyToken, verifyRole } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', getHotelsImages)
router.get('/:id', getByIds)
router.get(
  '/image/:hotel_id/images',
  verifyToken,
  verifyRole(['operator']),
  getByHotelId
)


export default router
