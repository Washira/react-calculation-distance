import React, { Component } from "react";
import {
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer
} from "react-google-maps";

class Map extends Component {
  state = {
    directions: null
  };

  componentDidMount() {
    const directionsService = new window.google.maps.DirectionsService();

    const origin = { lat: this.props.latStart, lng:this.props.lonStart };
    const destination = { lat: this.props.latEnd, lng: this.props.lonEnd };

    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * (Math.PI / 180);
    var dLon = (lon2 - lon1) * (Math.PI / 180);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  };

  render() {
    const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter={{ lat: this.props.latStart, lng: this.props.lonStart }}
        defaultZoom={13}
      >
        <DirectionsRenderer
          directions={this.state.directions}
        />
      </GoogleMap>
    ));

    return (
      <div style={{marginLeft:"1em"}}>
        <div></div>
        <div>Start Time : {this.props.dateStart}</div>
        <div style={{marginTop:"0.5em", marginLeft:"1em"}}>Latitude of Start : {this.props.latStart}</div>
        <div style={{marginLeft:"1em"}}>Longitude of Start : {this.props.lonStart}</div>
        <div style={{marginTop:"1em"}}>End Time : {this.props.dateEnd}</div>
        <div style={{marginTop:"0.5em", marginLeft:"1em"}}>Latitude of End : {this.props.latEnd}</div>
        <div style={{marginLeft:"1em"}}>Longitude of End : {this.props.lonEnd}</div>
        <div style={{marginTop:"1em"}}>
          Distance :{" "}
          {this.props.latStart? this.getDistanceFromLatLonInKm(
            this.props.latStart,
            this.props.lonStart,
            this.props.latEnd,
            this.props.lonEnd
          ).toFixed(2): "-"} {"km "}
        </div>
        <GoogleMapExample
          containerElement={<div style={{ height: `500px`, width: "500px", marginTop: "2em" }} />}
          mapElement={<div style={{ height: `50%` }} />}
        />
      </div>
    );
  }
}

export default Map;