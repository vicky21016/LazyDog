import express from 'express'
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  softDeleteCoupon,
  claimCoupon,
} from '../controllers/couponController.js'
import { verifyToken, verifyRole } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.get('/', getAllCoupons)
router.get(
  '/:id',
  verifyToken,
  verifyRole(['operator', 'teacher']),
  getCouponById
)
router.post('/claim', verifyToken, verifyRole(['user']), claimCoupon)
router.post('/', verifyToken, verifyRole(['operator', 'teacher']), createCoupon)
router.patch(
  '/:id',
  verifyToken,
  verifyRole(['operator', 'teacher']),
  updateCoupon
)
router.patch(
  '/:id/soft-delete',
  verifyToken,
  verifyRole(['operator', 'teacher']),
  softDeleteCoupon
)

export default router
