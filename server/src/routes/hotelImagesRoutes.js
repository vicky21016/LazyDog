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
  '/hotel/:hotel_id',
  verifyToken,
  verifyRole(['operator']),
  getByHotelId
)


export default router
