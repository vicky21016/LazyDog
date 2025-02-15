import {
  getCoupons,
  getId,
  createCoupons,
  updateCouponById,
  softDeleteCouponById,
  getCouponByCode,
  claimCouponByUser,
} from '../services/couponService.js'

export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await getCoupons()
    res.json(coupons)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

export const getCouponById = async (req, res) => {
  try {
    const id = Number(req.params.id, 10)
    const [coupon] = await getId(id)
    res.json(coupon)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}
export const claimCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const userId = req.user.id;
    if (!code) {
      return res
        .status(400)
        .json({ status: "error", message: "請提供優惠券代碼" });
    }
    // 查詢優惠券
    const result = await getCouponByCode(code, userId);
    if (!result.success) {
      return res.status(result.status).json({ status: "error", message: result.message });
    }
    const coupon = result.data;
    //  檢查使用者是否已領取過
    const claimResult = await claimCouponByUser(userId, coupon.id);
    if (!claimResult.success) {
      return res.status(claimResult.status).json({ status: "error", message: claimResult.message });
    }
    res.json({ status: "success", message: claimResult.message, data: coupon });
  } catch (err) {
    console.error("領取優惠券失敗:", err);
    res.status(500).json({ status: "error", message: "伺服器錯誤" });
  }
};


export const createCoupon = async (req, res) => {
  try {
    const {
      name,
      type,
      content,
      value,
      min_order_value,
      start_time,
      end_time,
      status,
      max_usage,
      max_usage_per_user,
      code,
    } = req.body

    if (
      !name ||
      !type ||
      !content ||
      !value ||
      !min_order_value ||
      !start_time ||
      !end_time ||
      !status ||
      !max_usage ||
      !max_usage_per_user ||
      !code
    ) {
      return res.status(400).json({ error: '缺少必要欄位' })
    }
    const newCoupon = await createCoupons({
      name,
      type,
      content,
      value,
      min_order_value,
      start_time,
      end_time,
      status,
      max_usage,
      max_usage_per_user,
      code,
    })

    res.json(newCoupon)
  } catch (err) {
    res.status(500).json({ err: err.message })
  }
}

export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params
    const couponData = req.body

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: '無效的 ID' })
    }

    const result = await updateCouponById(id, couponData)

    if (result.error) {
      return res.status(404).json({ error: result.error })
    }

    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const softDeleteCoupon = async (req, res) => {
  try {
    const { id } = req.params
    const result = await softDeleteCouponById(id)

    if (result.error) {
      return res.status(404).json({ error: result.error })
    }
    res.json(result)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
