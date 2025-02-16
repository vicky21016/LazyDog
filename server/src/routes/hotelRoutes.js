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

//  所有人都可以查詢hotel+search
router.get('/', getAllHotels)
router.get('/search', getSearch)
router.get('/:id', getByIds)

//自己可以看自己的hotel
router.get('/operator/:id', verifyToken, verifyRole(['operator']), getByIds)

//  新增、更新、刪除自己管理的飯店
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
