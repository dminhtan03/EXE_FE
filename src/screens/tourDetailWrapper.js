import React from 'react';
import { useParams } from 'react-router-dom';
import { tours } from '../data/mockData'; // hoặc gọi API nếu có
import TourDetailPage from './tourDetail';

const TourDetailWrapper = () => {
  const { id } = useParams();
  const tourId = parseInt(id);
  const tourDetail = tours.find((t) => t.tourId === tourId);

  if (!tourDetail) return <div className="container py-5">Không tìm thấy tour</div>;

  // Gợi ý tour tương tự (ví dụ: cùng địa điểm)
  const tourRecommendations = tours.filter(t => t.tourId !== tourId && t.destination === tourDetail.destination);

  return (
    <TourDetailPage
      tourDetail={tourDetail}
      title="Chi tiết tour"
      avgStar={tourDetail.rating}
      checkDisplay=""
      tourRecommendations={tourRecommendations}
    />
  );
};

export default TourDetailWrapper;
