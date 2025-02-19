import {
  getCoupons,
  getId,
  createCoupons,
  updateCouponById,
  softDeleteCouponById,
  getCouponByCode,
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
export const createCouponRestriction = async (req, res) => {
  try {
    const { coupon_id, restricted_id, restricted_table, restriction_type } = req.body;

    if (!coupon_id || !restricted_id || !restricted_table || !restriction_type) {
      return res.status(400).json({ error: "缺少必要欄位" });
    }

    // 確保 restricted_table 是合法的
    const validTables = ["course", "yi_product", "hotel"];
    if (!validTables.includes(restricted_table)) {
      return res.status(400).json({ error: "無效的 restricted_table 值" });
    }

    const [result] = await pool.query(
      `INSERT INTO coupon_restrictions (coupon_id, restricted_id, restricted_table, restriction_type, created_at, updated_at, is_deleted) 
       VALUES (?, ?, ?, ?, NOW(), NOW(), 0)`,
      [coupon_id, restricted_id, restricted_table, restriction_type]
    );

    res.json({ id: result.insertId, coupon_id, restricted_id, restricted_table, restriction_type });
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
