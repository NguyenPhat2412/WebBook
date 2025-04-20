import "./SearchPopup.css";

const SearchPopup = () => {
  return (
    <div className="searchPopup">
      <h2>Search</h2>
      <label>Destination</label>
      <input type="text" placeholder="Enter a city" />

      <label>Check-in Date</label>
      <input type="date" />

      <label>Options</label>
      <div className="searchOptions">
        <div className="searchOptionNumber">
          <span>Min price per night</span>
          <input type="number" className="Option-input" />
        </div>
        <div className="searchOptionNumber">
          <span>Max price per night</span>
          <input type="number" className="Option-input" />
        </div>
        <div className="searchOptionNumber">
          <span>Adult</span>
          <input type="number" defaultValue={1} className="Option-input" />
        </div>
        <div className="searchOptionNumber">
          <span>Children</span>
          <input type="number" defaultValue={0} className="Option-input" />
        </div>
        <div className="searchOptionNumber">
          <span>Room</span>
          <input type="number" defaultValue={1} className="Option-input" />
        </div>
      </div>

      <button className="searchBtn">Search</button>
    </div>
  );
};

export default SearchPopup;
