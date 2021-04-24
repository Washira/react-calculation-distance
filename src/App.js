import React, { useState } from "react";
import "./App.css";
import { tripData } from "./MapInfo";
import Button from "react-bootstrap/Button";

import { withScriptjs } from "react-google-maps";
import Map from "./GoogleMap";

function App() {
  const [latStart, setLatStart] = useState("");
  const [lonStart, setLonStart] = useState("");
  const [latEnd, setLatEnd] = useState("");
  const [lonEnd, setLonEnd] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  var onclick = (num) => {
    setLatStart(tripData.find((x) => x.name === `start ${num}`).latitude);
    setLonStart(tripData.find((x) => x.name === `start ${num}`).longitude);
    setLatEnd(tripData.find((x) => x.name === `end ${num}`).latitude);
    setLonEnd(tripData.find((x) => x.name === `end ${num}`).longitude);
    setDateStart(tripData.find((x) => x.name === `start ${num}`).devicetime);
    setDateEnd(tripData.find((x) => x.name === `end ${num}`).devicetime);
  };
  const MapLoader = withScriptjs(Map);

  return (
    <div style={{marginLeft:"1em"}}>
      <h1 >Welcome To My Trip</h1>
      <p>Click the trip do you want to see.</p>
      <hr />
      {tripData.map((data, idx) =>
        data.status === "start" ? (
          <Button
          style={{marginLeft:"1em"}}
            key={idx}
            onClick={() => onclick(data.round)}
          >{`Trip ${data.round}`}</Button>
        ) : null
      )}
      <hr />
      <div>
        <MapLoader
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=<your-key>"
          loadingElement={<div style={{ height: `100%` }} />}
          dateStart={dateStart}
          dateEnd={dateEnd}
          latStart={latStart}
          lonStart={lonStart}
          latEnd={latEnd}
          lonEnd={lonEnd}
        />
      </div>
    </div>
  );
}

export default App;
