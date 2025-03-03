// "use client";

// import React from "react";
// import hotelStyles from "../../../../styles/modules/operatorHotel.module.css";

// const HotelInfoForm = ({ formData, onChange }) => {
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     onChange((prev) => ({ ...prev, [name]: value }));
//   };

//   return (
//     <div className="section">
//       <h5>基本資訊</h5>
//       <div className="mb-3">
//         <label>旅館名稱 <span style={{ color: "red" }}>*</span></label>
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           className="form-control"
//         />
//       </div>
//       {/* 其他表單欄位 */}
//     </div>
//   );
// };

// export default HotelInfoForm;