import pool from "../config/mysql.js";

//order_table 只有在 useUserCoupon 使用優惠券時，才會真正綁定訂單 未使用狀態就是ALL
export const claimUserCoupon = async (userId, couponId, orderTable = "ALL") => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const [[coupon]] = await connection.query(
      `SELECT id, name, code, end_time, type, is_global, max_usage, max_usage_per_user 
       FROM coupons WHERE id = ? AND is_deleted = 0`,
      [couponId]
    );
    if (!coupon) throw new Error("優惠券不存在或已刪除");

    const now = new Date();
    if (new Date(coupon.start_time) > now) throw new Error("優惠券尚未開始");
    if (new Date(coupon.end_time) < now) throw new Error("優惠券已過期");

    const [[totalUsage]] = await connection.query(
      `SELECT COUNT(*) AS total FROM coupon_usage WHERE coupon_id = ? AND is_deleted = 0`,
      [couponId]
    );
    if (totalUsage.total >= coupon.max_usage)
      throw new Error("此優惠券已被領取完畢");

    const [[userClaimed]] = await connection.query(
      `SELECT COUNT(*) AS count FROM coupon_usage WHERE user_id = ? AND coupon_id = ? AND is_deleted = 0`,
      [userId, couponId]
    );
    if (userClaimed.count >= coupon.max_usage_per_user)
      throw new Error("您已達此優惠券的領取上限");

    const isGlobalCoupon = coupon.is_global == 1;

    if (isGlobalCoupon) {
      console.log("此優惠券為全站適用");
    } else {
      console.log("此優惠券為特定店家適用，類型：", coupon.type);
    }
    await connection.query(
      `INSERT INTO coupon_usage (user_id, coupon_id, status, claimed_at, created_at, updated_at, is_deleted, is_global, order_table) 
       VALUES (?, ?, 'claimed', NOW(), NOW(), NOW(), 0, ?, ?)`,
      [userId, couponId, isGlobalCoupon ? 1 : 0, orderTable]
    );

    await connection.commit();

    return {
      success: true,
      message: "優惠券領取成功",
      coupon: {
        id: coupon.id,
        name: coupon.name,
        code: coupon.code,
        expiry: coupon.end_time.toISOString().split("T")[0],
        type: coupon.type,
        is_global: isGlobalCoupon ? 1 : 0,
        order_table: orderTable,
      },
    };
  } catch (error) {
    await connection.rollback();
    throw new Error(error.message);
  } finally {
    connection.release();
  }
};
export const claimUserCouponByCode = async (userId, code) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [[coupon]] = await connection.query(
      `SELECT * FROM coupons WHERE code = ? AND is_deleted = 0`,
      [code]
    );
    if (!coupon) throw new Error("優惠券代碼無效或已刪除");

    const couponId = coupon.id;
    const now = new Date();
    if (new Date(coupon.start_time) > now) throw new Error("優惠券尚未開始");
    if (new Date(coupon.end_time) < now) throw new Error("優惠券已過期");

    const [[totalUsage]] = await connection.query(
      `SELECT COUNT(*) AS total FROM coupon_usage WHERE coupon_id = ? AND is_deleted = 0`,
      [couponId]
    );
    if (totalUsage.total >= coupon.max_usage)
      throw new Error("此優惠券已被領取完畢");
    const [[userClaimed]] = await connection.query(
      `SELECT COUNT(*) AS count FROM coupon_usage WHERE user_id = ? AND coupon_id = ? AND is_deleted = 0`,
      [userId, couponId]
    );
    if (userClaimed.count >= coupon.max_usage_per_user)
      throw new Error("您已達此優惠券的領取上限");
    await connection.query(
      `INSERT INTO coupon_usage (user_id, coupon_id, status, claimed_at, created_at, updated_at, is_deleted) 
       VALUES (?, ?, 'claimed', NOW(), NOW(), NOW(), 0)`,
      [userId, couponId]
    );

    await connection.commit();
    return { success: true, message: "優惠券領取成功" };
  } catch (error) {
    await connection.rollback();
    throw new Error(error.message);
  } finally {
    connection.release();
  }
};

export const getUserCoupons = async (userId, status, type) => {
  try {
    let query = `
      SELECT 
        uc.id, 
        uc.status AS usage_status,  -- 來自 coupon_usage
        uc.claimed_at, 
        c.name, 
        c.type, 
        c.value, 
        c.start_time, 
        c.end_time,
        CASE 
          WHEN uc.status = 'claimed' AND c.end_time < NOW() THEN 'expired' 
          ELSE uc.status 
        END AS status -- 動態標記逾期優惠券
      FROM 
        coupon_usage uc
      JOIN 
        coupons c ON uc.coupon_id = c.id
      WHERE 
        uc.user_id = ? 
        AND uc.is_deleted = 0
    `;

    const params = [userId];

    if (status !== "all") {
      if (status === "expired") {
        query += ` AND c.end_time < NOW() AND uc.status = 'claimed'`;
      } else {
        query += ` AND uc.status = ?`;
        params.push(status);
      }
    }

    if (type !== "all") {
      query += ` AND c.type = ?`;
      params.push(type);
    }

    query += ` ORDER BY uc.claimed_at DESC`;

    const [coupons] = await pool.query(query, params);

    return { success: true, data: coupons };
  } catch (error) {
    console.error("SQL 查詢錯誤:", error);
    return { success: false, error: "資料庫查詢失敗" };
  }
};


export const useUserCoupon = async (userId, couponId, orderId, orderTable) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    console.log(
      "收到請求 - userId:", userId,
      "couponId:", couponId,
      "orderId:", orderId || "未提供",
      "orderTable:", orderTable || "未提供"
    );

    // 檢查 coupon_usage 記錄
    const [[couponUsage]] = await connection.query(
      `SELECT * FROM coupon_usage 
       WHERE user_id = ? AND coupon_id = ? AND status IN ('claimed', 'reserved') AND is_deleted = 0`,
      [userId, couponId]
    );

    if (!couponUsage) {
      throw new Error("優惠券無法使用或已使用");
    }

    // 更新 coupon_usage 狀態為 used
    const [couponUpdateResult] = await connection.query(
      `UPDATE coupon_usage 
       SET status = 'used', used_at = NOW(), updated_at = NOW(), order_id = ?, order_table = ? 
       WHERE user_id = ? AND coupon_id = ? AND status IN ('claimed', 'reserved') AND is_deleted = 0`,
      [orderId, orderTable, userId, couponId]
    );

    if (couponUpdateResult.affectedRows === 0) {
      throw new Error("優惠券狀態更新失敗，請檢查條件是否符合");
    }

    await connection.commit();

    return {
      success: true,
      message: "優惠券已成功使用",
    };
  } catch (error) {
    await connection.rollback();
    console.error(" 優惠券應用失敗:", error.message);
    throw new Error(error.message);
  } finally {
    connection.release();
  }
};


export const deleteUserCoupon = async (userId, couponId) => {
  try {
    const [[existing]] = await pool.query(
      `SELECT status FROM coupon_usage WHERE user_id = ? AND coupon_id = ? AND is_deleted = 0`,
      [userId, couponId]
    );
    if (!existing) throw new Error("找不到優惠券或已刪除");

    if (existing.status == "used") throw new Error("已使用的優惠券無法取消");

    await pool.query(
      `UPDATE coupon_usage SET is_deleted = 1, updated_at = NOW() WHERE user_id = ? AND coupon_id = ? AND status = 'claimed' AND is_deleted = 0`,
      [userId, couponId]
    );

    return { success: true, message: "優惠券已取消" };
  } catch (error) {
    throw new Error(error.message);
  }
};
