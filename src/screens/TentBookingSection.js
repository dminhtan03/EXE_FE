"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const TentBookingSection = ({ tourDetail }) => {
  const navigate = useNavigate()

  // Tent types data
  const tentTypes = [
    {
      id: 1,
      name: "Lều 2 người",
      capacity: "2 người",
      price: 150000,
      image: "/assets/images/device/leu2.jpg",
      features: ["Chống thấm nước", "Dễ dàng lắp đặt", "Nhỏ gọn"],
    },
    {
      id: 2,
      name: "Lều 4 người",
      capacity: "4 người",
      price: 250000,
      image: "/assets/images/device/leu4.jpg",
      features: ["Rộng rãi", "Chống thấm nước", "Có tiền sảnh"],
    },
    {
      id: 3,
      name: "Lều gia đình",
      capacity: "6-8 người",
      price: 400000,
      image: "/assets/images/device/leu8.jpg",
      features: ["Siêu rộng", "2 phòng riêng", "Chống bão tốt"],
    },
    {
      id: 4,
      name: "Lều cao cấp",
      capacity: "4 người",
      price: 350000,
      image: "/assets/images/device/caocap.jpg",
      features: ["Vật liệu cao cấp", "Cách nhiệt tốt", "Thiết kế hiện đại"],
    },
  ]

  // Camping equipment data
  const campingEquipment = [
    {
      id: 1,
      name: "Ghế xếp",
      price: 30000,
      image:
        "https://product.hstatic.net/1000380002/product/ghe_xep_suon_sat_win-01_1859ef0a204544bd87ac50878b219e6b.jpg",
      description: "Ghế xếp tiện lợi, nhẹ",
      category: "furniture",
    },
    {
      id: 2,
      name: "Bàn xếp",
      price: 50000,
      image: "https://armyhaus.com/wp-content/uploads/2018/09/ban-xep-NH15Z012-1.jpg",
      description: "Bàn xếp đa năng",
      category: "furniture",
    },
    {
      id: 3,
      name: "Bếp gas mini",
      price: 80000,
      image: "https://bepgasdon.com/wp-content/uploads/bep-gas-mini-11.png",
      description: "Bếp gas di động, an toàn",
      category: "cooking",
    },
    {
      id: 4,
      name: "Bếp nướng BBQ",
      price: 120000,
      image: "https://bepvietnam.vn/public/uploads/images_product/2022/07/bep-nuong-than-hoa-du-lich-bh921-1.jpg",
      description: "Bếp nướng than hoa",
      category: "cooking",
    },
    {
      id: 5,
      name: "Đèn LED sạc",
      price: 40000,
      image:
        "https://hangtotgiagoc.com/wp-content/uploads/2022/09/z3728186098864_68175b578fdc446b8481c0e29a5677c6-Copy.jpg",
      description: "Đèn LED sạc pin, sáng mạnh",
      category: "lighting",
    },
    {
      id: 6,
      name: "Đèn pin đội đầu",
      price: 25000,
      image: "https://hclighting.vn/image/cache/catalog/san-pham/2022/12-den-pin/n-pin-doi-dau-7w-800x800.png",
      description: "Đèn pin đội đầu tiện dụng",
      category: "lighting",
    },
    {
      id: 7,
      name: "Túi ngủ",
      price: 100000,
      image:
        "https://file.hstatic.net/1000054905/file/tui-ngu-con-nhong-long-vu-roticamp-extreme-r006-1_a4c5898c13e1480086f28a3ce97733d5.jpg",
      description: "Túi ngủ ấm áp, chống ẩm",
      category: "sleeping",
    },
    {
      id: 8,
      name: "Thảm picnic",
      price: 35000,
      image: "https://salt.tikicdn.com/ts/product/f4/a0/98/9fa728139f6e35deecfb60b38a385fa1.jpg",
      description: "Thảm picnic chống thấm",
      category: "furniture",
    },
    {
      id: 9,
      name: "Bình nước inox",
      price: 45000,
      image: "https://dochoihahuy.com/wp-content/uploads/2017/02/binh-u-nuoc-sai-gon-HD1-003-8.png",
      description: "Bình nước giữ nhiệt",
      category: "accessories",
    },
    {
      id: 10,
      name: "Bộ nồi cắm trại",
      price: 90000,
      image: "https://armyhaus.com/wp-content/uploads/2020/12/compass1541499055.jpg",
      description: "Bộ nồi nhôm nhẹ",
      category: "cooking",
    },
  ]

  // State management
  const [selectedTents, setSelectedTents] = useState({})
  const [selectedEquipment, setSelectedEquipment] = useState({})
  const [showEquipment, setShowEquipment] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0)
  const [adultTickets, setAdultTickets] = useState(1)
  const [childTickets, setChildTickets] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate total price
  useEffect(() => {
    let tentTotal = 0
    Object.entries(selectedTents).forEach(([tentId, quantity]) => {
      const tent = tentTypes.find((t) => t.id === Number.parseInt(tentId))
      if (tent) {
        tentTotal += tent.price * quantity
      }
    })

    let equipmentTotal = 0
    Object.entries(selectedEquipment).forEach(([equipId, quantity]) => {
      const equipment = campingEquipment.find((e) => e.id === Number.parseInt(equipId))
      if (equipment) {
        equipmentTotal += equipment.price * quantity
      }
    })

    const ticketTotal = tourDetail.priceAdult * adultTickets + tourDetail.priceChild * childTickets
    setTotalPrice(tentTotal + equipmentTotal + ticketTotal)
  }, [selectedTents, selectedEquipment, adultTickets, childTickets, tourDetail])

  // Handle tent quantity change
  const handleTentQuantityChange = (tentId, quantity) => {
    setSelectedTents((prev) => {
      const updated = { ...prev }
      if (quantity === 0) {
        delete updated[tentId]
      } else {
        updated[tentId] = quantity
      }
      return updated
    })
  }

  // Handle equipment quantity change
  const handleEquipmentQuantityChange = (equipId, quantity) => {
    setSelectedEquipment((prev) => {
      const updated = { ...prev }
      if (quantity === 0) {
        delete updated[equipId]
      } else {
        updated[equipId] = quantity
      }
      return updated
    })
  }

  // Handle booking submission
  const handleBookingSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Prepare booking data
    const bookingData = {
      tourId: tourDetail.tourId,
      tourTitle: tourDetail.title || "Tour Camping",
      adultTickets,
      childTickets,
      selectedTents: Object.entries(selectedTents).map(([tentId, quantity]) => {
        const tent = tentTypes.find((t) => t.id === Number.parseInt(tentId))
        return {
          id: tent.id,
          name: tent.name,
          price: tent.price,
          quantity: quantity,
          subtotal: tent.price * quantity,
        }
      }),
      selectedEquipment: Object.entries(selectedEquipment).map(([equipId, quantity]) => {
        const equipment = campingEquipment.find((e) => e.id === Number.parseInt(equipId))
        return {
          id: equipment.id,
          name: equipment.name,
          price: equipment.price,
          quantity: quantity,
          subtotal: equipment.price * quantity,
        }
      }),
      totalPrice,
      startDate: tourDetail.startDate,
      endDate: tourDetail.endDate,
      time: tourDetail.time,
    }

    // Save booking data to localStorage
    localStorage.setItem("campingBookingData", JSON.stringify(bookingData))

    // Redirect to payment page
    setTimeout(() => {
      navigate(`/payment?tourId=${tourDetail.tourId}`)
    }, 500)
  }

  // Group equipment by category
  const groupedEquipment = campingEquipment.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = []
    }
    acc[item.category].push(item)
    return acc
  }, {})

  const categoryNames = {
    furniture: "Bàn ghế",
    cooking: "Dụng cụ nấu ăn",
    lighting: "Đèn chiếu sáng",
    sleeping: "Dụng cụ ngủ",
    accessories: "Phụ kiện",
  }

  return (
    <>
      <style>{`
                .booking-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    background-color: #f8f9fa;
                }
                .booking-card {
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    padding: 30px;
                    margin-bottom: 20px;
                }
                .section-title {
                    font-size: 1.8rem;
                    font-weight: 700;
                    color: #2d3748;
                    text-align: center;
                    margin-bottom: 30px;
                }
                .date-section {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 25px;
                }
                .date-input-group {
                    display: flex;
                    flex-direction: column;
                }
                .date-label {
                    font-weight: 600;
                    color: #4a5568;
                    margin-bottom: 8px;
                    font-size: 0.9rem;
                }
                .date-input {
                    background: #f7fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 12px 14px;
                    font-size: 0.9rem;
                    color: #718096;
                }
                .time-info {
                    margin-bottom: 25px;
                }
                .time-label {
                    font-weight: 600;
                    color: #4a5568;
                    margin-bottom: 8px;
                    font-size: 0.9rem;
                }
                .time-text {
                    color: #718096;
                    font-size: 0.95rem;
                }
                .divider {
                    height: 1px;
                    background: #e2e8f0;
                    margin: 30px 0;
                    border: none;
                }
                .subsection-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 20px;
                }
                .tent-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 20px;
                    margin-top: 20px;
                }
                @media (max-width: 768px) {
                    .tent-grid {
                        grid-template-columns: 1fr;
                    }
                }
                .tent-card {
                    border: 2px solid #ddd;
                    border-radius: 10px;
                    padding: 16px;
                    transition: 0.3s;
                    background: #fff;
                }
                .tent-card.selected {
                    border-color: #007bff;
                    box-shadow: 0 0 10px rgba(0, 123, 255, 0.3);
                }
                .tent-image {
                    width: 100%;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 8px;
                }
                .tent-name {
                    font-size: 18px;
                    font-weight: bold;
                    margin-top: 12px;
                }
                .tent-capacity,
                .tent-price {
                    font-size: 14px;
                    margin: 4px 0;
                }
                .features-list {
                    padding-left: 16px;
                    margin: 8px 0;
                }
                .feature-item {
                    font-size: 13px;
                    margin-bottom: 4px;
                }
                .quantity-control {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: 12px;
                }
                .quantity-buttons {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .quantity-btn {
                    padding: 4px 12px;
                    font-size: 16px;
                    border: none;
                    background-color: #007bff;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .quantity-display {
                    min-width: 24px;
                    text-align: center;
                }
                .equipment-toggle-btn {
                    width: 100%;
                    padding: 14px 20px;
                    background: #ed8936;
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-bottom: 20px;
                }
                .equipment-toggle-btn:hover {
                    background: #dd6b20;
                    transform: translateY(-1px);
                }
                .equipment-section {
                    margin-top: 15px;
                }
                .category-title {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #2d3748;
                    margin-bottom: 15px;
                    padding-bottom: 8px;
                    border-bottom: 2px solid #e2e8f0;
                }
                .equipment-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 15px;
                    margin-bottom: 25px;
                }
                .equipment-card {
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 15px;
                    transition: all 0.3s ease;
                    cursor: pointer;
                }
                .equipment-card:hover {
                    border-color: #38a169;
                    box-shadow: 0 6px 20px rgba(56, 161, 105, 0.15);
                    transform: translateY(-1px);
                }
                .equipment-card.selected {
                    border-color: #38a169;
                    box-shadow: 0 6px 20px rgba(56, 161, 105, 0.2);
                    background: #f0fff4;
                }
                .equipment-content {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    margin-bottom: 12px;
                }
                .equipment-image {
                    width: 70px;
                    height: 70px;
                    object-fit: cover;
                    border-radius: 6px;
                    border: 1px solid #e2e8f0;
                }
                .equipment-info {
                    flex: 1;
                }
                .equipment-name {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #2d3748;
                    margin-bottom: 4px;
                }
                .equipment-description {
                    color: #718096;
                    font-size: 0.85rem;
                    margin-bottom: 6px;
                }
                .equipment-price {
                    font-size: 1rem;
                    font-weight: 700;
                    color: #38a169;
                }
                .total-section {
                    background: linear-gradient(135deg, #3182ce, #2c5282);
                    color: white;
                    padding: 25px;
                    border-radius: 12px;
                    text-align: center;
                    margin: 25px 0;
                }
                .total-title {
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-bottom: 12px;
                }
                .total-price {
                    font-size: 2.2rem;
                    font-weight: 800;
                    margin-bottom: 8px;
                }
                .total-description {
                    opacity: 0.9;
                    font-size: 0.9rem;
                }
                .booking-summary {
                    background: #f7fafc;
                    border: 1px solid #e2e8f0;
                    border-radius: 8px;
                    padding: 18px;
                    margin-bottom: 20px;
                }
                .summary-title {
                    font-weight: 700;
                    color: #2d3748;
                    margin-bottom: 12px;
                    font-size: 1rem;
                }
                .summary-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                .summary-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 6px 0;
                    border-bottom: 1px solid #e2e8f0;
                    font-size: 0.9rem;
                }
                .summary-item:last-child {
                    border-bottom: none;
                }
                .booking-btn {
                    width: 100%;
                    padding: 16px 25px;
                    background: linear-gradient(135deg, #38a169, #2f855a);
                    color: white;
                    border: none;
                    border-radius: 8px;
                    font-size: 1.1rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .booking-btn:hover:not(:disabled) {
                    background: linear-gradient(135deg, #2f855a, #276749);
                    transform: translateY(-2px);
                    box-shadow: 0 12px 30px rgba(56, 161, 105, 0.4);
                }
                .booking-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                    transform: none;
                }
                .help-link {
                    text-align: center;
                    margin-top: 15px;
                }
                .help-link a {
                    color: #3182ce;
                    text-decoration: none;
                    font-size: 0.9rem;
                }
                .help-link a:hover {
                    text-decoration: underline;
                }
                .loading-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .loading-content {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    box-shadow: 0 15px 50px rgba(0, 0, 0, 0.3);
                }
                .loading-spinner {
                    width: 32px;
                    height: 32px;
                    border: 3px solid #e2e8f0;
                    border-radius: 50%;
                    border-top: 3px solid #3182ce;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .loading-text {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #2d3748;
                }
                @media (max-width: 768px) {
                    .booking-card {
                        padding: 20px;
                        margin: 10px;
                    }
                    .section-title {
                        font-size: 1.5rem;
                    }
                    .tent-grid,
                    .equipment-grid {
                        grid-template-columns: 1fr;
                    }
                    .date-section {
                        grid-template-columns: 1fr;
                    }
                    .equipment-content {
                        flex-direction: column;
                        text-align: center;
                    }
                    .total-price {
                        font-size: 1.8rem;
                    }
                }
            `}</style>

      {isSubmitting && (
        <div className="loading-overlay">
          <div className="loading-content">
            <div className="loading-spinner"></div>
            <div className="loading-text">Đang xử lý...</div>
          </div>
        </div>
      )}

      <div className="booking-container">
        <div className="booking-card">
          <h1 className="section-title">Đặt Camping & Thuê Lều</h1>
          <form onSubmit={handleBookingSubmit}>
            {/* Date Information */}
            <div className="date-section">
              <div className="date-input-group">
                <label className="date-label">Ngày bắt đầu:</label>
                <input
                  type="text"
                  value={new Date(tourDetail.startDate).toLocaleDateString("vi-VN")}
                  disabled
                  className="date-input"
                />
              </div>
              <div className="date-input-group">
                <label className="date-label">Ngày kết thúc:</label>
                <input
                  type="text"
                  value={new Date(tourDetail.endDate).toLocaleDateString("vi-VN")}
                  disabled
                  className="date-input"
                />
              </div>
            </div>
            <div className="time-info">
              <label className="time-label">Thời gian:</label>
              <p className="time-text">{tourDetail.time}</p>
            </div>

            <hr className="divider" />

            {/* Tent Selection */}
            <div>
              <h2 className="subsection-title">Chọn loại lều</h2>
              <div className="tent-grid">
                {tentTypes.map((tent) => {
                  const quantity = selectedTents[tent.id] || 0
                  const isSelected = quantity > 0
                  return (
                    <div key={tent.id} className={`tent-card ${isSelected ? "selected" : ""}`}>
                      <img src={tent.image || "/placeholder.svg"} alt={tent.name} className="tent-image" />
                      <h3 className="tent-name">{tent.name}</h3>
                      <p className="tent-capacity">Sức chứa: {tent.capacity}</p>
                      <p className="tent-price">{tent.price.toLocaleString()} VND/đêm</p>
                      <div className="features-section">
                        <ul className="features-list">
                          {tent.features.map((feature, index) => (
                            <li key={index} className="feature-item">
                              <span className="feature-checkmark">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="quantity-control">
                        <span className="quantity-label">Số lượng:</span>
                        <div className="quantity-buttons">
                          <button
                            type="button"
                            className="quantity-btn"
                            onClick={() => handleTentQuantityChange(tent.id, Math.max(0, quantity - 1))}
                          >
                            -
                          </button>
                          <span className="quantity-display">{quantity}</span>
                          <button
                            type="button"
                            className="quantity-btn"
                            onClick={() => handleTentQuantityChange(tent.id, quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            <hr className="divider" />

            {/* Equipment Rental Toggle */}
            <div>
              <button type="button" className="equipment-toggle-btn" onClick={() => setShowEquipment(!showEquipment)}>
                {showEquipment ? "Ẩn đồ dùng camping" : "Thuê thêm đồ dùng camping"}
              </button>

              {/* Equipment Selection */}
              {showEquipment && (
                <div className="equipment-section">
                  <h2 className="subsection-title">Chọn đồ dùng camping</h2>
                  {Object.entries(groupedEquipment).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="category-title">{categoryNames[category]}</h3>
                      <div className="equipment-grid">
                        {items.map((equipment) => {
                          const quantity = selectedEquipment[equipment.id] || 0
                          const isSelected = quantity > 0
                          return (
                            <div key={equipment.id} className={`equipment-card ${isSelected ? "selected" : ""}`}>
                              <div className="equipment-content">
                                <img
                                  src={equipment.image || "/placeholder.svg"}
                                  alt={equipment.name}
                                  className="equipment-image"
                                />
                                <div className="equipment-info">
                                  <h4 className="equipment-name">{equipment.name}</h4>
                                  <p className="equipment-description">{equipment.description}</p>
                                  <p className="equipment-price">{equipment.price.toLocaleString()} VND/ngày</p>
                                </div>
                              </div>
                              <div className="quantity-control">
                                <span className="quantity-label">Số lượng:</span>
                                <div className="quantity-buttons">
                                  <button
                                    type="button"
                                    className="quantity-btn"
                                    onClick={() =>
                                      handleEquipmentQuantityChange(equipment.id, Math.max(0, quantity - 1))
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="quantity-display">{quantity}</span>
                                  <button
                                    type="button"
                                    className="quantity-btn"
                                    onClick={() => handleEquipmentQuantityChange(equipment.id, quantity + 1)}
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Total Price */}
            <div className="total-section">
              <h3 className="total-title">Tổng chi phí</h3>
              <div className="total-price">{totalPrice.toLocaleString()} VND</div>
              <p className="total-description">Bao gồm vé tham quan, thuê lều và đồ dùng</p>
            </div>

            {/* Booking Summary */}
            {(Object.keys(selectedTents).length > 0 ||
              Object.keys(selectedEquipment).length > 0 ||
              adultTickets > 0 ||
              childTickets > 0) && (
              <div className="booking-summary">
                <h4 className="summary-title">Tóm tắt đặt chỗ:</h4>
                <ul className="summary-list">
                  {Object.entries(selectedTents).map(([tentId, quantity]) => {
                    const tent = tentTypes.find((t) => t.id === Number.parseInt(tentId))
                    return (
                      <li key={tentId} className="summary-item">
                        <span>
                          {tent.name}: {quantity} cái
                        </span>
                        <span>{(tent.price * quantity).toLocaleString()} VND</span>
                      </li>
                    )
                  })}
                  {Object.entries(selectedEquipment).map(([equipId, quantity]) => {
                    const equipment = campingEquipment.find((e) => e.id === Number.parseInt(equipId))
                    return (
                      <li key={equipId} className="summary-item">
                        <span>
                          {equipment.name}: {quantity} cái
                        </span>
                        <span>{(equipment.price * quantity).toLocaleString()} VND</span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Booking Button */}
            <button type="submit" className="booking-btn" disabled={totalPrice === 0 || isSubmitting}>
              {isSubmitting ? (
                <>
                  <div
                    className="loading-spinner"
                    style={{ width: "18px", height: "18px", display: "inline-block", marginRight: "8px" }}
                  ></div>
                  Đang xử lý...
                </>
              ) : (
                `Tiếp tục thanh toán - ${totalPrice.toLocaleString()} VND`
              )}
            </button>

            <div className="help-link">
              <a href="/contact">Bạn cần trợ giúp không?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default TentBookingSection
