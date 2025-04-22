import { useNavigate } from "react-router-dom";
import "./SearchListItem.css";
// import { useState } from "react";
const SearchListItem = ({ hotel }) => {
  const navigate = useNavigate();
  const handleHotelClick = (_id) => {
    console.log(_id);
    navigate(`/detail/${_id}`, { state: { hotelId: _id } });
  };

  return (
    <div className="searchItem">
      <img src={hotel.photos} alt="{hotel.name}" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">{hotel.distance}</span>
        <span className="siDesc">{hotel.desc}</span>

        <span className="siType">{hotel.type}</span>
        <span className="siCancel">Free cancellation</span>
      </div>
      <div className="isDetails">
        <div className="siRating">
          <button>{hotel.rating}</button>
        </div>
        <div className="sỉPrice">
          <span className="siPriceCol">${hotel.cheapestPrice}</span>
          <p className="sỉPricePra">Includes taxes and fees</p>
          <button
            className="siCheckBtn"
            onClick={() => handleHotelClick(hotel._id)}
          >
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchListItem;
