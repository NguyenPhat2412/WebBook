import { useEffect, useState } from "react";
import "./SearchList.css";
import SearchListItem from "./SearchListItem";
const SearchList = () => {
  const [hotel, setHotel] = useState([]);
  useEffect(() => {
    fetch("../../data/search.json")
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="search-list">
      {hotel.map((hotel, index) => (
        <SearchListItem key={index} hotel={hotel} />
      ))}
    </div>
  );
};
export default SearchList;
