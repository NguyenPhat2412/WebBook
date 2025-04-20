import { useContext, useEffect, useState } from "react";
import "./SearchList.css";
import SearchListItem from "./SearchListItem";
import { SearchContext } from "./SearchContext";
const SearchList = () => {
  const [hotel, setHotel] = useState([]);
  const { searchData } = useContext(SearchContext);
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
    <div className="search-list">
      {hotel.map((hotel, index) => (
        <SearchListItem key={index} hotel={hotel} />
      ))}
    </div>
  );
};
export default SearchList;
