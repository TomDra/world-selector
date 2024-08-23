import React from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import geoData from "./../media/countries-110m.json";

export default function Map() {
  return (
    <ComposableMap projection="geoEqualEarth">
      <ZoomableGroup center={[0, 3]}>
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ZoomableGroup>
    </ComposableMap>
  );
}
