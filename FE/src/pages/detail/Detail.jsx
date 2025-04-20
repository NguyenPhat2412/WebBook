import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Header/Footer";
import "./Detail.css";
import { useEffect, useState } from "react";

const Detail = () => {
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/detail")
      .then((res) => res.json())
      .then((data) => {
        setHotel(...data);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!hotel) return <h2>Loading...</h2>;

  return (
    <>
      <NavBar />
      <div className="detailContainer">
        <div className="detailWrapper">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h1>{hotel.name}</h1>
            <button className="bookNowBtn">Reserve or Book Now!</button>
          </div>

          <p
            className="location"
            style={{ display: "flex", flexDirection: "row", gap: "10px" }}
          >
            <i
              className="fa fa-map-marker"
              aria-hidden="true"
              style={{ color: "red" }}
            ></i>
            {hotel.address}
          </p>
          <span className="highlight">{hotel.distance} from center</span>

          <h2 className="price">
            {hotel.price} {hotel.nightStay}
          </h2>
          <p className="promotion"> {hotel.promotion}</p>

          {/* Hình ảnh hiển thị cùng lúc */}
          <div className="imageGallery">
            {hotel.photos.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Hotel view"
                className="hotelImage"
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: "10px",
              marginTop: "32px",
            }}
          >
            {/* Mô tả khách sạn */}
            <div className="hotelInfo">
              <h2>Stay in the heart of {hotel.city}</h2>
              <p>{hotel.description}</p>
            </div>

            {/* Giá & Đặt phòng */}
            <div className="bookingBox">
              <h3>Perfect for a 9-night stay!</h3>
              <span>
                Located in the real heart or Krakow this property has an
                excellent location score of 9.8!
              </span>
              <div className="priceBox">
                <div
                  style={{ display: "flex", gap: "10px", flexDirection: "row" }}
                >
                  <p style={{ fontSize: "30px", fontWeight: "bold" }}>
                    ${hotel.nine_night_price}
                    <span style={{ fontWeight: "normal" }}> (9 nights)</span>
                  </p>
                </div>
                <button className="bookNowBtn">Reserve or Book Now!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Detail;
