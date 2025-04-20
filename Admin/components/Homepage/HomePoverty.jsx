import { useEffect, useState } from "react";
import "./HomePoverty.css";
const HomePoverty = () => {
  const [poverty, setPoverty] = useState([]);
  useEffect(() => {
    fetch("../../data/hotel_list.json")
      .then((res) => res.json())
      .then((data) => {
        setPoverty(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="home-poverty">
      <div className="poverty-container">
        <h3>Homes guests love</h3>
        <div className="poverty-list">
          <ul className="poverty-list-item">
            {poverty.map((item, index) => (
              <div key={index} className="poverty-item">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="poverty-img"
                />
                <div className="poverty-item-text">
                  <a href="/" className="item-name">
                    {item.name}
                  </a>
                  <p>{item.city}</p>
                  <p>Starting from ${item.price}</p>
                  <div style={{ display: "flex", gap: "10px" }}>
                    <p
                      style={{
                        backgroundColor: "blue",
                        color: "white",
                        padding: "2px",
                      }}
                    >
                      {item.rate}
                    </p>
                    <p> {item.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default HomePoverty;
