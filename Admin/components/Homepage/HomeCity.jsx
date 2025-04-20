import { useEffect, useState } from "react";
import "./HomeCity.css";
const HomeCity = () => {
  const [city, setCity] = useState([]);
  // cach lay file tu file json
  useEffect(() => {
    fetch("../../data/city.json")
      .then((res) => res.json())
      .then((data) => {
        setCity(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-city">
      <div className="city-list">
        <ul className="city-list-item">
          {city.map((item, index) => (
            <div key={index} className="city-item">
              <img src={item.image} alt={item.name} className="city-img" />
              <div className="city-item-text">
                <h3>{item.name}</h3>
                <p>{item.subText}</p>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default HomeCity;
