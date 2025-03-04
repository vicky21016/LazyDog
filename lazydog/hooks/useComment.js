import { useState } from 'react';

const useComment = () => {
  const [loading, setLoading] = useState(false); // 加載狀態
  const [error, setError] = useState(null); // 錯誤訊息
  const [data, setData] = useState(null); // 返回的資料

  const createComment = async (commentData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:5000/api/comment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData), // 將數據轉換為 JSON 字符串
      });

      if (!response.ok) {
        throw new Error(response.statusText || "留言創建失敗");
      }

      const result = await response.json(); // 將響應數據轉換為 JSON
      setData(result.article); // 保存返回的資料
      return result; // 返回資料供組件使用
    } catch (err) {
      setError(err.message || "留言創建失敗"); // 設置錯誤訊息
      throw err; // 拋出錯誤供組件處理
    } finally {
      setLoading(false); // 結束加載
    }
  };

  const deleteComment = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/comment/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(response.statusText || "留言刪除失敗");
      }

      const result = await response.json(); // 將響應數據轉換為 JSON
      
      setData(result.article); // 保存返回的資料
      return result; // 返回資料供組件使用
    } catch (err) {
      setError(err.message || "留言刪除失敗"); // 設置錯誤訊息
      throw err; // 拋出錯誤供組件處理
    } finally {
      setLoading(false); // 結束加載
    }
  };

  return { createComment, deleteComment, loading, error, data };
};

export default useComment;