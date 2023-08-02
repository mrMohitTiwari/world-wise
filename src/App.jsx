import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";
import CityList from "./Components/CityList";
import { useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000/cities";
function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function fetchUrl() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        setCities(data);
        console.log(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUrl();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />

        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        {/* <Route path="app" element={<AppLayout />} /> */}
        {/* adding the nested routes  */}
        <Route path="app" element={<AppLayout />}>
          <Route index element={<p>sdnsnd</p>} />
          <Route
            path="cities"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route
            path="countries"
            element={<CityList cities={cities} isLoading={isLoading} />}
          />
          <Route path="form" element={<p>form for app </p>} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
