import { useEffect, useState } from "react";
import "./HomeHotel.css";
const HomeHotel = () => {
  const [hotel, setHotel] = useState([]);
  useEffect(() => {
    fetch("../../data/type.json")
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-hotel">
      <div className="home-container">
        <h3>Browse by property type</h3>
        <div className="hotel-list">
          <ul className="hotel-list-item">
            {hotel.map((item, index) => (
              <div key={index} className="hotel-item">
                <img src={item.image} alt={item.name} className="hotel-img" />
                <div className="hotel-item-text">
                  <h3>{item.name}</h3>
                  <p>{item.count} hotels</p>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default HomeHotel;
