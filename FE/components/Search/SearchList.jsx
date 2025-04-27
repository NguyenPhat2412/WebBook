import { useContext, useEffect, useState } from "react";
import "./SearchList.css";
import SearchListItem from "./SearchListItem";
import { SearchContext } from "./SearchContext";
const SearchList = () => {
  const [hotel, setHotel] = useState([]);
  const { searchData } = useContext(SearchContext);

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Số lượng khách sạn trên mỗi trang

  const indexOfLastItem = currentPage * itemsPerPage; // Chỉ số cuối cùng của trang hiện tại
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // Chỉ số đầu tiên của trang hiện tại
  const currentItems = hotel.slice(indexOfFirstItem, indexOfLastItem); // Lấy danh sách khách sạn cho trang hiện tại
  const totalPages = Math.ceil(hotel.length / itemsPerPage); // Tổng số trang

  const paginate = (pageNumber) => setCurrentPage(pageNumber); // Cập nhật trang hiện tại

  const paginateRange = 1;
  const startPage = Math.max(1, currentPage - Math.floor(paginateRange / 2)); // Trang bắt đầu
  const endPage = Math.min(totalPages, startPage + paginateRange - 1); // Trang kết thúc
  // useEffect(() => {
  //   if (!searchData) return;

  //   const query = new URLSearchParams(searchData);

  //   if (searchData.city) query.append("city", searchData.city);

  //   fetch(`http://localhost:5000/api/hotels/search?${query.toString()}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setHotel(data);
  //       console.log(data);
  //     })
  //     .catch((err) => console.log(err));
  // }, [searchData]);

  useEffect(() => {
    if (!searchData) return;

    const query = new URLSearchParams(searchData).toString();
    const url = `http://localhost:5000/api/hotels/search?${query}`;

    console.log("📡 Fetching URL:", url); // Kiểm tra đường link ở đây

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
        console.log("🟢 Dữ liệu nhận về:", data);
      })
      .catch((err) => console.log("❌ Lỗi:", err));
  }, [searchData]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="search-list">
        {currentItems.map((hotel, index) => (
          <SearchListItem key={index} hotel={hotel} />
        ))}
      </div>
      <div
        className="dashboard-page flex justify-center mt-4 space-x-2"
        style={{
          right: 0,
          position: "absolute",
          bottom: 0,
          transform: "translate(-80%, 120%)",
        }}
      >
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded border ${
            currentPage === 1
              ? " text-gray-500 cursor-not-allowed"
              : "bg-blue-500"
          }`}
        >
          <i className="fa-solid fa-square-caret-left w-10 "></i>
        </button>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNumber = startPage + i;
          return (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={`px-3 py-1 rounded border w-10 ${
                currentPage === pageNumber
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}
        <button
          onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded border w-10 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-white text-blue-500"
          }`}
        >
          <i className="fa-solid fa-square-caret-right"></i>
        </button>
      </div>
    </div>
  );
};
export default SearchList;
