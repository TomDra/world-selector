import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import geoData from "./../media/countries-110m.json";
import { saveAs } from "file-saver";
import { Button } from 'react-bootstrap';
import './map.css';

export default function Map() {
  const [selectedCountries, setSelectedCountries] = useState([]);

  // Load selected countries from localStorage when the component mounts
  useEffect(() => {
    const savedCountries = localStorage.getItem("selectedCountries");
    if (savedCountries) {
      setSelectedCountries(JSON.parse(savedCountries));
    }
  }, []);

  const handleCountryClick = (geo) => {
    const countryKey = geo.rsmKey;
    if (selectedCountries.includes(countryKey)) {
      // Remove country from the selectedCountries array if it is already selected (unpress)
      setSelectedCountries(selectedCountries.filter((key) => key !== countryKey));
    } else {
      // Add country to the selectedCountries array if it is not selected (press)
      setSelectedCountries([...selectedCountries, countryKey]);
    }
  };

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(selectedCountries)], { type: "application/json" });
    saveAs(blob, "selectedCountries.json");
    localStorage.setItem("selectedCountries", JSON.stringify(selectedCountries));
  };

  return (
    <div>
      <Button variant="primary" onClick={handleSave} className="save-button">Save</Button>
      <div className="map">
      <ComposableMap projection="geoEqualEarth">
        <ZoomableGroup center={[0, 3]}>
          <Geographies geography={geoData}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const isSelected = selectedCountries.includes(geo.rsmKey);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => handleCountryClick(geo)}
                    style={{
                      default: {
                        fill: isSelected ? "#ad1515" : "#b5c3f7",
                      },
                      hover: {
                        fill: "#d47fb0",
                      },
                      pressed: {
                        fill: "#ad1515",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
      </div>
    </div>
  );
}
