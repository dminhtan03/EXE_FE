// src/data/mockData.js
export const tours = [
  {
    tourId: 1,
    title: 'Hà Giang 3N2Đ',
    destination: 'hg',
    rating: 5,
    images: ['/assets/images/gallery-tours/bien-dao-3n2d-con-dao-5.jpg'],
    time: '3 ngày 2 đêm',
    quantity: 20,
    priceAdult: 2590000,
    description: 'Khám phá cao nguyên đá Đồng Văn, cột cờ Lũng Cú, và những cung đường đèo hùng vĩ.',
    schedule: [
      'Ngày 1: Hà Nội – Hà Giang – Quản Bạ',
      'Ngày 2: Quản Bạ – Đồng Văn – Mèo Vạc',
      'Ngày 3: Mèo Vạc – Hà Nội',
    ],
    comments: [
      { id: 1, user: 'Lan', text: 'Hướng dẫn viên rất nhiệt tình, cảnh đẹp lắm!' },
      { id: 2, user: 'Minh', text: 'Xe đưa đón thoải mái, lịch trình hợp lý.' },
    ],
  },
  {
    tourId: 2,
    title: 'Đà Nẵng 4N3Đ',
    destination: 'dn',
    rating: 4,
    images: ['/assets/images/gallery-tours/bien-dao-3n2d-con-dao-4.jpg'],
    time: '4 ngày 3 đêm',
    quantity: 15,
    priceAdult: 3190000,
    description: 'Tham quan Bà Nà Hills, Ngũ Hành Sơn, phố cổ Hội An lung linh về đêm.',
    schedule: [
      'Ngày 1: Hà Nội – Đà Nẵng – Bà Nà Hills',
      'Ngày 2: Ngũ Hành Sơn – Hội An',
      'Ngày 3: Biển Mỹ Khê – Sơn Trà',
      'Ngày 4: Tự do mua sắm – Hà Nội',
    ],
    comments: [],
  },
  {
    tourId: 3,
    title: 'Hội An 5N4Đ',
    destination: 'ha',
    rating: 3,
    images: ['/assets/images/gallery-tours/mien-trung-4n3d-da-nang-hoi-an-ba-na-hue-2.png'],
    time: '5 ngày 4 đêm',
    quantity: 25,
    priceAdult: 4190000,
    description: 'Khám phá Hội An cổ kính, Huế mộng mơ, và các bãi biển miền Trung.',
    schedule: [
      'Ngày 1: Hà Nội – Huế',
      'Ngày 2: Huế – Hội An',
      'Ngày 3: Hội An – Cù Lao Chàm',
      'Ngày 4: Đà Nẵng – Sơn Trà',
      'Ngày 5: Đà Nẵng – Hà Nội',
    ],
    comments: [],
  },
];



export const services = [
  {
    id: 1,
    title: 'Cho thuê lều, bếp, đèn',
    description:
      'Chúng tôi cung cấp các thiết bị cắm trại như lều ngủ, bếp gas mini, đèn pin, đèn cắm trại với giá phải chăng.',
    icon: 'fa-campground',
  },
  {
    id: 2,
    title: 'Xe đưa đón',
    description:
      'Dịch vụ xe đưa đón tận nơi từ sân bay, khách sạn hoặc địa điểm bạn yêu cầu, với tài xế thân thiện và chuyên nghiệp.',
    icon: 'fa-shuttle-van',
  },
  {
    id: 3,
    title: 'Tổ chức teambuilding',
    description:
      'Dịch vụ tổ chức các hoạt động teambuilding cho công ty, lớp học hoặc nhóm bạn, bao gồm MC, trò chơi, âm thanh ánh sáng.',
    icon: 'fas fa-users',
  },
];