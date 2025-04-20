import { useEffect, useState } from "react";
import "./Footer.css";
const Footer = () => {
  const [columns, setColumns] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/api/footer")
      .then((res) => res.json())
      .then((data) => {
        setColumns(data);
        console.log(data);
      })
      .catch((error) => console.error("Error loading footer data", error));
  }, []);
  return (
    <footer className="footer">
      <div className="footer-container">
        {columns.map((column, index) => (
          <div key={index} className="footer-column">
            <ul>
              {column.col_values.map((link, index) => (
                <li key={index}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};
export default Footer;
