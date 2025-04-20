import "./SearchListItem.css";
const SearchListItem = ({ hotel }) => {
  const ChangeDetailPage = () => {
    window.location.href = "/detail";
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
          <button className="siCheckBtn" onClick={() => ChangeDetailPage()}>
            See availability
          </button>
        </div>
      </div>
    </div>
  );
};
export default SearchListItem;
