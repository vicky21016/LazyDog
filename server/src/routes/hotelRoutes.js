import express from 'express'
import {
  getAllHotels,
  getByIds,
  createHotel,
  updateHotel,
  softDeleteHotel,
  getSearch,
} from '../controllers/hotelController.js'
import { verifyToken, verifyRole } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getAllHotels)
router.get('/search', getSearch)
router.get('/:id', verifyToken, verifyRole(['operator']), getByIds)
router.post('/', verifyToken, verifyRole(['operator']), createHotel)
router.patch('/:id', verifyToken, verifyRole(['operator']), updateHotel)
router.patch(
  '/:id/soft-delete',
  verifyToken,
  verifyRole(['operator']),
  softDeleteHotel
)
// EX: ("/hotels/:id", verifyToken, verifyRole(["operator", "admin"]), softDeleteHotel)
// import的參數要放在最後免以免驗證出錯

export default router
