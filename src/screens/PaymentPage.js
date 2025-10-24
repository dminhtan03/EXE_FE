// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Header from "../components/HeaderHome";

// const PaymentPage = () => {
//   const [bookingData, setBookingData] = useState(null);
//   const [userInfo, setUserInfo] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     note: "",
//   });
//   const [paymentMethod, setPaymentMethod] = useState("");
//   const [isConfirming, setIsConfirming] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("campingBookingData"));
//     if (!data) {
//       navigate("/");
//     } else {
//       setBookingData(data);
//     }
//   }, [navigate]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInfo((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleConfirmBooking = () => {
//     if (
//       !userInfo.name ||
//       !userInfo.phone ||
//       !userInfo.email ||
//       !paymentMethod
//     ) {
//       alert("Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán!");
//       return;
//     }

//     setIsConfirming(true);

//     setTimeout(() => {
//       setSuccess(true);

//       const fullBooking = {
//         ...bookingData,
//         userInfo,
//         paymentMethod,
//       };

//       localStorage.setItem(
//         "confirmedCampingBooking",
//         JSON.stringify(fullBooking)
//       );
//       localStorage.removeItem("campingBookingData");

//       setTimeout(() => {
//         navigate("/my-bookings");
//       }, 2000);
//     }, 1500);
//   };

//   if (!bookingData) return null;

//   return (
//     <div
//       style={{
//         maxWidth: "800px",
//         margin: "0 auto",
//         padding: "30px",
//         paddingTop: "120px",
//         marginTop: "80px",
//       }}
//     >
//       <Header />
//       <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
//         Xác nhận thanh toán
//       </h2>

//       <div
//         style={{
//           border: "1px solid #ccc",
//           borderRadius: "12px",
//           padding: "20px",
//           background: "#f9f9f9",
//         }}
//       >
//         <h3>{bookingData.tourTitle}</h3>
//         <p>
//           Ngày: {new Date(bookingData.startDate).toLocaleDateString()} -{" "}
//           {new Date(bookingData.endDate).toLocaleDateString()}
//         </p>
//         <p>Thời gian: {bookingData.time}</p>

//         <hr />

//         <h4>Lều đã chọn:</h4>
//         {bookingData.selectedTents.length > 0 ? (
//           bookingData.selectedTents.map((tent) => (
//             <p key={tent.id}>
//               {tent.name} - {tent.quantity} cái (
//               {tent.subtotal.toLocaleString()} VND)
//             </p>
//           ))
//         ) : (
//           <p>Không thuê lều</p>
//         )}

//         <h4>Đồ dùng camping:</h4>
//         {bookingData.selectedEquipment.length > 0 ? (
//           bookingData.selectedEquipment.map((item) => (
//             <p key={item.id}>
//               {item.name} - {item.quantity} cái (
//               {item.subtotal.toLocaleString()} VND)
//             </p>
//           ))
//         ) : (
//           <p>Không thuê thêm đồ</p>
//         )}

//         <h3 style={{ marginTop: "20px", color: "#38a169" }}>
//           Tổng cộng: {bookingData.totalPrice.toLocaleString()} VND
//         </h3>

//         <hr />

//         <h4>Thông tin liên hệ:</h4>
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             gap: "12px",
//             marginTop: "10px",
//           }}
//         >
//           <input
//             type="text"
//             name="name"
//             placeholder="Họ và tên"
//             value={userInfo.name}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="tel"
//             name="phone"
//             placeholder="Số điện thoại"
//             value={userInfo.phone}
//             onChange={handleChange}
//             required
//           />
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={userInfo.email}
//             onChange={handleChange}
//             required
//           />
//           <textarea
//             name="note"
//             placeholder="Ghi chú (tuỳ chọn)"
//             rows={3}
//             value={userInfo.note}
//             onChange={handleChange}
//           />
//         </div>

//         <h4 style={{ marginTop: "20px" }}>Phương thức thanh toán:</h4>
//         <div>
//           <label>
//             <input
//               type="radio"
//               name="payment"
//               value="COD"
//               checked={paymentMethod === "COD"}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />{" "}
//             Thanh toán khi đến nơi
//           </label>
//           <br />
//           <label>
//             <input
//               type="radio"
//               name="payment"
//               value="BANK"
//               checked={paymentMethod === "BANK"}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />{" "}
//             Chuyển khoản ngân hàng
//           </label>
//           <br />
//           <label>
//             <input
//               type="radio"
//               name="payment"
//               value="WALLET"
//               checked={paymentMethod === "WALLET"}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />{" "}
//             Ví điện tử (Momo, ZaloPay)
//           </label>
//         </div>

//         <button
//           onClick={handleConfirmBooking}
//           disabled={isConfirming}
//           style={{
//             marginTop: "20px",
//             padding: "12px 24px",
//             backgroundColor: "#38a169",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             fontSize: "1rem",
//             cursor: "pointer",
//           }}
//         >
//           {isConfirming ? "Đang xử lý..." : "Xác nhận đặt chỗ"}
//         </button>

//         {success && (
//           <div
//             style={{
//               marginTop: "20px",
//               textAlign: "center",
//               color: "#2f855a",
//               fontWeight: "bold",
//             }}
//           >
//             ✅ Đặt chỗ thành công! Đang chuyển hướng...
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PaymentPage;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/HeaderHome";
import { createBooking } from "../api/bookingService";
import { payBooking } from "../api/paymentService";

const PaymentPage = () => {
  const [bookingData, setBookingData] = useState(null);
  const [userInfo, setUserInfo] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isConfirming, setIsConfirming] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("campingBookingData"));
    if (!data) {
      navigate("/");
    } else {
      setBookingData(data);
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = async () => {
    if (
      !userInfo.name ||
      !userInfo.phone ||
      !userInfo.email ||
      !paymentMethod
    ) {
      alert("Vui lòng điền đầy đủ thông tin và chọn phương thức thanh toán!");
      return;
    }

    setIsConfirming(true);

    try {
      // ✅ Lấy userId từ localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) throw new Error("Bạn cần đăng nhập trước khi đặt chỗ.");

      // ✅ Chuẩn bị dữ liệu BookingRequest đúng định dạng backend
      // Format ngày sang LocalDateTime chuẩn ISO
      const formatDateTime = (dateStr) => {
        try {
          // Nếu đã có dạng T, giữ nguyên
          if (dateStr.includes("T")) return dateStr;
          return `${dateStr}T00:00:00`;
        } catch {
          return `${new Date(dateStr).toISOString().slice(0, 19)}`;
        }
      };

      const bookingRequest = {
        userId: user.id,
        campingSiteId: bookingData.campingSiteId,
        campingInforId: bookingData.campingInforId,
        campingTentId: bookingData.selectedTentId || null,
        campingServiceIds: bookingData.selectedServiceIds || [],
        startTime: formatDateTime(bookingData.startDate),
        endTime: formatDateTime(bookingData.endDate),
        totalPrice: bookingData.totalPrice,
      };

      // ✅ Gọi API tạo booking
      const bookingRes = await createBooking(bookingRequest);
      console.log("Booking created:", bookingRes);

      const bookingId = bookingRes?.bookingId;
      if (!bookingId)
        throw new Error("Không tạo được booking, vui lòng thử lại!");

      // ✅ Nếu là thanh toán qua ngân hàng → gọi tiếp API payment
      if (paymentMethod === "BANK") {
        const paymentReq = {
          bookingId,
          paymentMethod: "BANK_TRANSFER",
        };

        const payRes = await payBooking(paymentReq);
        setPaymentResponse(payRes);
        setIsConfirming(false);
        localStorage.removeItem("campingBookingData");
        return; // dừng tại đây để hiển thị QR
      }

      // ✅ Các phương thức khác (COD, WALLET) → chỉ xác nhận đặt chỗ
      setSuccess(true);
      localStorage.removeItem("campingBookingData");

      setTimeout(() => {
        navigate("/my-bookings");
      }, 2000);
    } catch (error) {
      console.error("Lỗi khi đặt chỗ hoặc thanh toán:", error);
      alert("Có lỗi xảy ra trong quá trình đặt chỗ!");
      setIsConfirming(false);
    }
  };

  if (!bookingData) return null;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "30px",
        paddingTop: "120px",
        marginTop: "80px",
      }}
    >
      <Header />
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Xác nhận thanh toán
      </h2>

      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "12px",
          padding: "20px",
          background: "#f9f9f9",
        }}
      >
        <h3>{bookingData.tourTitle}</h3>
        <p>
          Ngày: {new Date(bookingData.startDate).toLocaleDateString()} -{" "}
          {new Date(bookingData.endDate).toLocaleDateString()}
        </p>
        <p>Thời gian: {bookingData.time}</p>

        <h3 style={{ marginTop: "20px", color: "#38a169" }}>
          Tổng cộng: {bookingData.totalPrice.toLocaleString()} VND
        </h3>

        <hr />

        <h4>Thông tin liên hệ:</h4>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            marginTop: "10px",
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Họ và tên"
            value={userInfo.name}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Số điện thoại"
            value={userInfo.phone}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={userInfo.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="note"
            placeholder="Ghi chú (tuỳ chọn)"
            rows={3}
            value={userInfo.note}
            onChange={handleChange}
          />
        </div>

        <h4 style={{ marginTop: "20px" }}>Phương thức thanh toán:</h4>
        <div>
          <label>
            <input
              type="radio"
              name="payment"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Thanh toán khi đến nơi
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="payment"
              value="BANK"
              checked={paymentMethod === "BANK"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Chuyển khoản ngân hàng
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="payment"
              value="WALLET"
              checked={paymentMethod === "WALLET"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />{" "}
            Ví điện tử (Momo, ZaloPay)
          </label>
        </div>

        <button
          onClick={handleConfirmBooking}
          disabled={isConfirming}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#38a169",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            cursor: "pointer",
          }}
        >
          {isConfirming ? "Đang xử lý..." : "Xác nhận đặt chỗ"}
        </button>

        {/* ✅ Nếu là thanh toán BANK thì hiển thị thông tin QR */}
        {paymentResponse && (
          <div
            style={{
              marginTop: "30px",
              textAlign: "center",
              padding: "20px",
              border: "1px solid #38a169",
              borderRadius: "12px",
              background: "#e6fffa",
            }}
          >
            <h3>💳 Thông tin thanh toán</h3>
            <p>
              <strong>Mã thanh toán:</strong> {paymentResponse.id}
            </p>
            <p>
              <strong>Số tiền:</strong>{" "}
              {paymentResponse.amount?.toLocaleString()} VND
            </p>
            <p>
              <strong>Trạng thái:</strong> {paymentResponse.paymentStatus}
            </p>

            {paymentResponse.qrCode && (
              <>
                <h5>Mã QR chuyển khoản:</h5>
                <img
                  src={
                    paymentResponse.qrCode.startsWith("data:")
                      ? paymentResponse.qrCode
                      : `data:image/png;base64,${paymentResponse.qrCode}`
                  }
                  alt="QR Code"
                  style={{ width: 250, margin: "10px 0" }}
                />
              </>
            )}
          </div>
        )}

        {success && (
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: "#2f855a",
              fontWeight: "bold",
            }}
          >
            ✅ Đặt chỗ thành công! Đang chuyển hướng...
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
