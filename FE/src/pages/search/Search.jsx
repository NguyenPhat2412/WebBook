import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Header/Footer";
import SearchPopup from "../../../components/Search/SearchPopup";
import SearchList from "../../../components/Search/SearchList";
import "./Search.css";

const Search = () => {
  return (
    <div>
      <NavBar />
      <div className="searchContainer">
        <div className="searchWrapper">
          <SearchPopup />
          <SearchList />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Search;
