import "./navBar.css";

const NavBarItem = ({ type, icon, active }) => {
  return (
    <li className={`nav-item ${active ? "active" : ""}`}>
      <i className={`fa ${icon}`}></i> <span>{type}</span>
    </li>
  );
};
export default NavBarItem;
