import { useContext, useState } from "react";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../Search/SearchContext";

const HeaderWebsite = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [city, setCity] = useState("");
  const [numberPeople, setNumberPeople] = useState("");
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const navigate = useNavigate();
  const { setSearchData } = useContext(SearchContext);

  const handleSelect = (ranges) => {
    setDateRange([ranges.selection]);
  };

  const handleSearch = () => {
    const formattedSearchData = {
      city: city.trim(),
      startDate: dateRange[0].startDate.toISOString(),
      endDate: dateRange[0].endDate.toISOString(),
      numberPeople: numberPeople.trim(),
    };

    console.log("🔍 searchData gửi đi:", formattedSearchData);

    setSearchData(formattedSearchData);
    navigate("/search");
  };

  return (
    <header>
      <div className="header-content">
        <div className="header-search">
          <div>
            <i className="fa fa-bed"></i>
            <input
              placeholder="Where are you going?"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div>
            <i className="fa fa-calendar"></i>
            <input
              placeholder={`${dateRange[0].startDate.toLocaleDateString()} to ${dateRange[0].endDate.toLocaleDateString()}`}
              onClick={() => setShowDatePicker(!showDatePicker)}
              readOnly
            />
            {showDatePicker && (
              <div className="date-modal">
                <DateRange
                  editableDateInputs={true}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  onChange={handleSelect}
                  minDate={new Date()}
                  style={{
                    width: "410px",
                    // padding: "-10px",
                    backgroundColor: "white",
                    borderRadius: "4px",
                    boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.2)",
                    zIndex: 1000,
                  }}
                />
              </div>
            )}
          </div>
          <div>
            <i className="fa fa-female"></i>
            <input
              placeholder="1 adult · 0 children · 1 room"
              value={numberPeople}
              onChange={(e) => setNumberPeople(e.target.value)}
            />
          </div>
          <div>
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderWebsite;
