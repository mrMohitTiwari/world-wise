import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import PageNotFound from "./Pages/PageNotFound";
import AppLayout from "./Pages/AppLayout";
import Login from "./Pages/Login";

function App() {
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
          <Route path="cities" element={<p>list of cities </p>} />
          <Route path="countries" element={<p>list of counties </p>} />
          <Route path="form" element={<p>form for app </p>} />
        </Route>

        <Route path="login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
