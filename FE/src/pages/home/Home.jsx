import NavBar from "../../../components/Navbar/NavBar";
import HeaderWebsite from "../../../components/Header/Header";
import HomePage from "../../../components/Homepage/HomePage";
import Footer from "../../../components/Header/Footer";

const Home = () => {
  return (
    <div className="homeContainer">
      <NavBar />
      <HeaderWebsite />
      <HomePage />
      <Footer />
    </div>
  );
};

export default Home;
