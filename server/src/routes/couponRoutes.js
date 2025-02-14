import express from 'express'
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  softDeleteCoupon,
} from '../controllers/couponController.js'
import { verifyToken, verifyRole } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', getAllCoupons)
// router.get("/search", getSearch);
router.get('/:id', getCouponById)
router.post('/',verifyToken, verifyRole(["operator"]), createCoupon)
router.patch('/:id',verifyToken, verifyRole(["operator"]), updateCoupon)
router.patch('/:id/soft-delete', verifyToken, verifyRole(["operator"]),softDeleteCoupon)

export default router
