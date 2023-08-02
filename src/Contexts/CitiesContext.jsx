import { createContext, useContext, useEffect, useState } from "react";
const BASE_URL = "http://localhost:8000/cities";

// 1. Create s context variable

const CitiesContext = createContext();
// create a provider function
function CitiesProvider({ children }) {
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
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
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
