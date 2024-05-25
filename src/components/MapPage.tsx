import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import "./App.css";

interface CountryData {
  country: string;
  cases: number;
  recovered: number;
  deaths: number;
  lat: number;
  long: number;
}

interface HistoricalData {
  date: string;
  cases: number;
}

const MapPage: React.FC = () => {
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [countriesData, setCountriesData] = useState<CountryData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
      );
      const json = await response.json();
      const cases = Object.entries(json.cases).map(([date, value]) => ({
        date,
        cases: Number(value),
      }));
      setHistoricalData(cases);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://disease.sh/v3/covid-19/countries"
        );
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error("Data format is incorrect, expected an array");
        }

        const formattedData: CountryData[] = data.map((country: any) => ({
          country: country.country,
          cases: country.cases,
          recovered: country.recovered,
          deaths: country.deaths,
          lat: country.countryInfo.lat,
          long: country.countryInfo.long,
        }));
        setCountriesData(formattedData);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const markers = useMemo(
    () =>
      countriesData.map((country) => (
        <Marker
          key={country.country}
          position={[country.lat, country.long]}
          icon={
            new Icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })
          }
        >
          <Popup>
            <div>
              <h2>{country.country}</h2>
              <p>Total Cases: {country.cases}</p>
              <p>Recovered: {country.recovered}</p>
              <p>Deaths: {country.deaths}</p>
            </div>
          </Popup>
        </Marker>
      )),
    [countriesData]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "70vw",
          height: "70vh",
          marginTop: "50px",
          marginLeft: "50px",
        }}
      >
        <MapContainer
          center={[20, 0]}
          zoom={1.4}
          style={{ width: "auto", height: "60%" }}
          minZoom={1}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers}
        </MapContainer>
        <LineChart
          style={{
            position: "absolute",
          }}
          width={800}
          height={300}
          data={historicalData}
          margin={{ top: 50, left: 100, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" name="Dates" />
          <YAxis name="Cases" />
          <Tooltip />
          <Line type="monotone" dataKey="cases" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
};

export default MapPage;
