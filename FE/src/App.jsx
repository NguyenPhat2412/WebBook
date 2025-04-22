import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Detail from "./pages/detail/Detail";
import Search from "./pages/search/Search";
import RegisterPage from "./pages/Register/register";
import "./App.css";
import LoginPage from "./pages/Login/login";
import { SearchProvider } from "../components/Search/SearchContext";
import CheckOut from "./pages/checkout/checkout";
import Transactions from "./pages/transactions/transactions";
function App() {
  return (
    <BrowserRouter>
      <SearchProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/checkout/:id" element={<CheckOut />} />
          <Route path="/transactions/:id" element={<Transactions />} />
        </Routes>
      </SearchProvider>
    </BrowserRouter>
  );
}

export default App;
