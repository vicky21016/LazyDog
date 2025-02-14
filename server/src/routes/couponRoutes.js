import express from 'express'
import {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  softDeleteCoupon,
  // cliamCoupon
} from '../controllers/couponController.js'
import { verifyToken, verifyRole } from '../middlewares/authMiddleware.js'
const router = express.Router()

router.get('/', getAllCoupons)
// router.get("/search", getSearch);
router.get('/:id', getCouponById)
// router.post('/cliam',verifyToken, verifyRole(["operator,teacher"]),cliamCoupon)
router.post('/',verifyToken, verifyRole(["operator,teacher"]), createCoupon)
router.patch('/:id',verifyToken, verifyRole(["operator,teacher"]), updateCoupon)
router.patch('/:id/soft-delete', verifyToken, verifyRole(["operator,teacher"]),softDeleteCoupon)

export default router
