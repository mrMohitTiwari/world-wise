// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "../Components/Message";
import Spinner from "../Components/Spinner";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../Contexts/CitiesContext";
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [lat, lng] = useUrlPosition();
  const [emoji, setemoji] = useState("");
  const [geoCodingError, setGeoCodingError] = useState("");
  const { createCity, isLoading } = useCities();
  // console.log(cityName);
  // fetching the reverse geocoding using use effect so it can load on mount
  useEffect(
    function () {
      if (!lat && !lng) return;
      async function fetchCityData() {
        try {
          setIsLoadingGeocoding(true);
          const res = await fetch(
            `${BASE_URL}latitude=${lat}&longitude=${lng}`
          );
          console.log(res);
          if (!res.ok) return;
          const data = await res.json();
          if (!data.countryCode)
            throw new Error(
              `It doesn't seems to be like a Country CLick anywhere else`
            );
          // console.log(data);
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setemoji(convertToEmoji(data.countryCode));
          // console.log(convertToEmoji(emoji));
        } catch (err) {
          console.error(err);
          setGeoCodingError(err.message);
        } finally {
          setIsLoadingGeocoding(false);
        }
      }
      fetchCityData();
    },
    [lat, lng]
  );
  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    // console.log(newCity);
    await createCity(newCity);
    // navigating back to cities list using navigators
    navigate("/app/cities");
  }
  if (!lat && !lng)
    return <Message message={"start by clicking somewhere on the app"} />;
  if (isLoadingGeocoding) return <Spinner />;

  if (geoCodingError) return <Message message={geoCodingError} />;
  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        ></DatePicker>
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">ADD</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
// by clickng on the back buttom we want to go back how we will we do that using navigator and definnin some steps s
// just pass -1 to navigation
