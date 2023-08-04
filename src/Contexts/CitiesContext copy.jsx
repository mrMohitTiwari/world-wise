import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000/cities";

// 1. Create s context variable

const CitiesContext = createContext();
// create a provider function
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchUrl() {
      try {
        setIsLoading(true);

        const res = await fetch(`${BASE_URL}`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchUrl();
  }, []);
  // function for getting the details of specific city
  async function getCity(id) {
    try {
      setIsLoading(true);

      const res = await fetch(`${BASE_URL}/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      console.log(isLoading);
      const res = await fetch(`${BASE_URL}`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setCities((cities) => [...cities, data]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    console.log(id);
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
      });
      await res.json();

      setCities(cities.filter((city) => city.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("You are accessing it outside the scope");
  return context;
}
export { CitiesProvider, useCities };
