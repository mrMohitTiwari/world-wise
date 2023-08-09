import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./Pages/ProtectedRoute";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import { CitiesProvider } from "./Contexts/CitiesContext";
import CityList from "./Components/CityList";
import CountriesList from "./Components/CountryList";
import SpinnerFullPage from "./Components/SpinnerFullPage";
import City from "./Components/City";
import { Suspense, lazy } from "react";
import Form from "./Components/Form";

// import AppLayout from "./Pages/AppLayout";
// import Homepage from "./Pages/Homepage";
// import Product from "./Pages/Product";
// import Pricing from "./Pages/Pricing";
// import Login from "./Pages/Login";
// import PageNotFound from "./Pages/PageNotFound";
const Homepage = lazy(() => import("./Pages/Homepage"));
const AppLayout = lazy(() => import("./Pages/AppLayout"));
const Product = lazy(() => import("./Pages/Product"));
const Login = lazy(() => import("./Pages/Login"));
const PageNotFound = lazy(() => import("./Pages/PageNotFound"));
const Pricing = lazy(() => import("./Pages/Pricing"));

// const BASE_URL = "http://localhost:8000/cities";
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route index element={<Homepage />} />

              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              {/* <Route path="app" element={<AppLayout />} /> */}
              {/* adding the nested routes  */}
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    {" "}
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountriesList />} />
                <Route path="form" element={<Form />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
// we uisng naviagte element to navigate page to citities so that it will activve cities automatically
// replace keyword will replace the back buttonn with the page stack
