import {
  getId,
  updateCouponById,
  softDeleteCouponById,
  getCouponByCodes,
  createCoupons,
} from "../services/couponService.js";
import pool from "../config/mysql.js";
export const getCoupons = async (user_id, role) => {
  try {
    let coupons;

    if (role == "operator") {
      // 業者只能獲取自己管理的旅館優惠券
      [coupons] = await pool.query(
        `SELECT c.* FROM coupons c
         JOIN hotel h ON c.hotel_id = h.id
         WHERE h.operator_id = ? AND c.is_deleted = 0`,
        [user_id]
      );
    } else if (role == "teacher") {
      // 老師只能獲取自己創建的優惠券
      [coupons] = await pool.query(
        "SELECT * FROM coupons WHERE creator_id = ? AND is_deleted = 0",
        [user_id]
      );
    } else if (role == "user") {
      // 使用者只能獲取自己擁有的優惠券 (JOIN coupons)
      [coupons] = await pool.query(
        `SELECT c.* FROM coupons c
         JOIN coupon_usage cu ON c.id = cu.coupon_id
         WHERE cu.user_id = ? AND c.is_deleted = 0`,
        [user_id]
      );
    } else {
      throw new Error("無權限獲取優惠券");
    }

    return coupons;
  } catch (error) {
    throw new Error("無法取得優惠券列表：" + error.message);
  }
};


export const getCouponById = async (req, res) => {
  try {
    const id = Number(req.params.id, 10);
    const [coupon] = await getId(id);
    res.json(coupon);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};
export const getCouponByCode = async (req, res) => {
  try {
    const { code } = req.params;
    const { userId } = req.query;

    const result = await getCouponByCodes(code, userId);
    res.status(result.status || 200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCoupon = async (req, res) => {
  console.log("📌 進入 createCoupon，解析 req.user:", req.user); // ✅ 檢查是否有用戶資訊

  try {
    const user_id = req.user?.id;
    const role = req.user?.role;

    if (!user_id || !role) {
      return res.status(403).json({ error: "未授權：缺少用戶資訊" });
    }

    const result = await createCoupons(req.body, user_id, role);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "無法創建優惠券：" + error.message });
  }
};


export const updateCoupon = async (req, res) => {
  try {
    const { id } = req.params;
    const couponData = req.body;
    const user_id = req.user.id;
    const role = req.user.role;

    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "無效的優惠券 ID" });
    }

    console.log(" 更新請求：", { id, couponData, user_id, role });

    //  確保只有管理者 (operator, teacher) 才能更新
    if (!["operator", "teacher"].includes(role)) {
      return res.status(403).json({ error: "無權限更新優惠券" });
    }

    const result = await updateCouponById(id, couponData);

    if (result.error) {
      return res.status(400).json({ error: result.error });
    }

    res.json({ success: true, message: "優惠券更新成功" });
  } catch (err) {
    console.error(" 更新優惠券錯誤：", err);
    res.status(500).json({ error: "內部伺服器錯誤：" + err.message });
  }
};

export const softDeleteCoupon = async (id, user_id, role) => {
  console.log("嘗試刪除優惠券", { id, user_id, role });

  if (!id || isNaN(Number(id))) {
    return { success: false, message: "無效的優惠券 ID" };
  }

  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    // 確保優惠券存在
    const [existingCoupon] = await connection.query(
      "SELECT * FROM coupons WHERE id = ? AND is_deleted = 0",
      [id]
    );

    if (existingCoupon.length === 0) {
      await connection.rollback();
      return { success: false, message: `找不到優惠券 id=${id} 或已刪除` };
    }

    // 軟刪除優惠券
    const [result] = await connection.query(
      "UPDATE coupons SET is_deleted = 1, updated_at = NOW() WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return { success: false, message: `軟刪除失敗，找不到 id=${id}` };
    }

    // 軟刪除優惠券的使用限制
    await connection.query(
      "UPDATE coupon_restrictions SET is_deleted = 1, updated_at = NOW() WHERE coupon_id = ?",
      [id]
    );

    await connection.commit();
    return { success: true, message: `優惠券 id=${id} 已成功軟刪除` };
  } catch (error) {
    await connection.rollback();
    console.error("刪除優惠券失敗:", error);
    return { success: false, message: "無法刪除優惠券：" + error.message };
  } finally {
    connection.release();
  }
};
