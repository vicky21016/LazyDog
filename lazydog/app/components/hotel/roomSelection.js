// import React from "react";
// import styles from "@/styles/modules/fontHotelDetail.module.css";
// import Image from "next/image";

// const RoomSelection = ({ rooms }) => {
//   return (
//     <div className="row mt-4">
//       {rooms.length > 0 ? (
//         rooms.map((room, index) => (
//           <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
//             <div className={`card ${styles.suRoomCard}`}>
//               <Image
//                 className={styles.suRoomImage}
//                 src={room.image || "/hotel/location.jpg"}
//                 alt={room.name}
//                 width={300}
//                 height={200}
//               />
//               <div className="card-body">
//                 <h3>{room.name}</h3>
//                 <p className={styles.suRoomPrice}>價格: {room.price}元</p>
//                 <select className="my-4 form-select">
//                   <option>選擇數量</option>
//                   {[1, 2, 3].map((num) => (
//                     <option key={num}>{num}</option>
//                   ))}
//                 </select>
//                 <button className={styles.suRoomBookBtn}>BOOK</button>
//               </div>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-center">暫無房型資料</p>
//       )}
//     </div>
//   );
// };

// export default RoomSelection;
