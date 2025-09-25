import React, { useState, useEffect } from "react";
import axios from "axios";
import BannerHome from "../components/BannerHome";
import ManagerCampingList from "../components/ManagerCampingList";

const ManagerCamping = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredCampings, setFilteredCampings] = useState([]);
  const [allCampings, setAllCampings] = useState([]);

  const [searchParams, setSearchParams] = useState({
    filter: "all", // mặc định lấy tất cả
  });

  // 👉 Hardcode ownerId để test
  const ownerId = "a7ea138e-3ba5-42a3-9686-2c7f9a9d57f4";

  const handleSearch = (params) => {
    setSearchParams(params);
    setCurrentPage(1);
  };

  // 👉 Gọi API lấy danh sách camping
  useEffect(() => {
    const fetchCampings = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/camping");
        setAllCampings(res.data);
      } catch (err) {
        console.error("Lỗi khi gọi API:", err);
      }
    };

    fetchCampings();
  }, []);

  // 👉 Lọc campings theo ownerId + filter
  useEffect(() => {
    let result = allCampings;

    // chỉ lấy camp của owner
    result = result.filter((camping) => camping.ownerId === ownerId);

    // lọc theo filter
    if (searchParams.filter === "active") {
      result = result.filter((camping) => camping.active === true);
    } else if (searchParams.filter === "in-progress") {
      result = result.filter((camping) => camping.active === false);
    }

    setFilteredCampings(result);
  }, [searchParams, allCampings, ownerId]);

  const indexOfLastCamping = currentPage * itemsPerPage;
  const indexOfFirstCamping = indexOfLastCamping - itemsPerPage;
  const currentCampings = filteredCampings.slice(
    indexOfFirstCamping,
    indexOfLastCamping
  );
  const totalPages = Math.ceil(filteredCampings.length / itemsPerPage);

  return (
    <>
      <BannerHome onSearch={handleSearch} />

      <div className="tour-grid-wrap">
        <div className="row" id="campings-container">
          <ManagerCampingList
            campings={currentCampings}
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </>
  );
};

export default ManagerCamping;
