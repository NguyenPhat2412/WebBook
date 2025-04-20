import "./SearchListItem.css";
const SearchListItem = ({ hotel }) => {
  const ChangeDetailPage = () => {
    window.location.href = "/detail";
  };
  return (
    <div className="searchItem">
      <img src={hotel.image_url} alt="{hotel.name}" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{hotel.name}</h1>
        <span className="siDistance">{hotel.distance}</span>
        <span className="siTag">{hotel.tag}</span>

        <span className="siDesc">{hotel.description}</span>
        {hotel.free_cancel}
        <span className="siType">{hotel.type}</span>
        <span className="siCancel">Free cancellation</span>
        <span className="siMin">{hotel.minder}</span>
      </div>
      <div className="isDetails">
        <div className="siRating">
          <span className="siRatingText">{hotel.rate_text}</span>
          <button>{hotel.rate}</button>
        </div>
        <div className="sỉPrice">
          <span className="siPriceCol">${hotel.price}</span>
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
