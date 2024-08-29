import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import geoData from "./../media/countries-110m.json";
import { saveAs } from "file-saver";
import { Button } from 'react-bootstrap';
import './map.css';

export default function Map() {
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const savedCountries = localStorage.getItem("selectedCountries");
    if (savedCountries) {
      setSelectedCountries(JSON.parse(savedCountries));
    }
  }, []);

  const handleCountryClick = (geo) => {
    const countryKey = geo.rsmKey;
    if (selectedCountries.includes(countryKey)) {
      setSelectedCountries(selectedCountries.filter((key) => key !== countryKey));
    } else {
      setSelectedCountries([...selectedCountries, countryKey]);
    }
  };

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(selectedCountries)], { type: "application/json" });
    saveAs(blob, "selectedCountries.json");
    localStorage.setItem("selectedCountries", JSON.stringify(selectedCountries));
  };


  const handleLoad = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      try {
        const loadedCountries = JSON.parse(content);
        setSelectedCountries(loadedCountries);
        localStorage.setItem("selectedCountries", JSON.stringify(loadedCountries));
      } catch (error) {
        console.error("Error loading file:", error);
        alert("Failed to load file. Please ensure it is a valid JSON file.");
      }
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="button-container">
        <Button variant="primary" onClick={handleSave} className="save-button">Save</Button>
        <label htmlFor="file-upload" className="load-button" >
          Load
        </label>
        <input 
          id="file-upload" 
          type="file" 
          accept=".json" 
          onChange={handleLoad} 
          style={{ display: "none" }} 
        />
      </div>
      <div className="map">
        <ComposableMap projection="geoEqualEarth">
          <ZoomableGroup center={[0, 7]}>
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
                          stroke: "none",
                          strokeWidth: 0,
                          outline: "none", // Remove the focus outline
                        },
                        hover: {
                          fill: isSelected ? "inherit" : "#d47fb0",
                          stroke: "none",
                          strokeWidth: 0,
                          outline: "none", // Remove the focus outline
                        },
                        pressed: {
                          fill: "#ad1515",
                          stroke: "none",
                          strokeWidth: 0,
                          outline: "none", // Remove the focus outline
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

