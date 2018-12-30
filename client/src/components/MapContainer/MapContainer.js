import "./MapContainer.css";

import { GoogleApiWrapper, InfoWindow, Map, Marker } from "google-maps-react";
import React, { Component } from "react";

import BUTTON_CLICK_DATA from "./areaClick";
import USAData from "../../data/USA_TRI.json";
import UserSearch from "../UserSearch/UserSearch.js";
import magentaMarker from "./../../magenta_marker.ico";
import orangeDiamond from "./../../orange-diamond.ico";
import styles from "./MapStyles";
import zipcodes from "zipcodes";

export class MapContainer extends Component {
  constructor() {
    super();
    this.state = {
      markers: [],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      userLocation: null,
      displayMarkers: [],
      zoomFactor: null
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick = (props, marker, e) => {
    //console.log(props);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };

  // Function to search through our data json
  filterByAbbr = (marker, abbr, stAbbr) => {
    if (marker.props.county === abbr && marker.props.state_abbr === stAbbr) {
      return marker;
    } else if (marker.props.state_abbr === abbr) {
      return marker;
    } else if (
      marker.props.city_name === abbr &&
      marker.props.state_abbr === stAbbr
    ) {
      return marker;
    } else if ("USA" === abbr) {
      return this.state.markers;
    }
  };

  // Reusable function to handle the area clicks for the dropdown
  onAreaClick = abbr => {
    const areaData = BUTTON_CLICK_DATA[abbr];
    this.setState((prevState, props) => {
      return {
        displayMarkers: prevState.markers.filter(marker =>
          this.filterByAbbr(marker, areaData.abbr, areaData.stateAbbr)
        ),
        userLocation: areaData.userLocation,
        zoomFactor: areaData.zoomFactor
      };
    });
  };

  onMapClicked = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  createComplianceURL = props => {
    return (
      <a
        href={this.state.selectedPlace.echoURL}
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="far fa-3x fa-folder-open" />
      </a>
    );
  };
  //set the state to the zip value
  search = zip => {
    //console.log("search:", zip);
    this.setState({
      displayMarkers: this.state.markers.filter(
        marker => marker.props.zip_code === zip
      )
    });
    // re-center the map to a set of coordinates in the zip code
    //When the user submits a zip, our app needs to convert it to a lat/lng variable that can be passed thru.
    var zipCodeLocation = zipcodes.lookup(zip);
    console.log("zipcodelocation", zipCodeLocation);

    //take the json lat&lng by calling the key on theobject
    //zipCodeLocation.latitude
    //Update the userlocation state

    this.setState({
      userLocation: {
        lat: zipCodeLocation.latitude,
        lng: zipCodeLocation.longitude
      }
    });
    this.setState({ zoomFactor: 10 });
  };
  //create a function that filters by zip code -take the markers from the state object and filter them according to zip.

  componentDidMount() {
    //locating the user and seeking the user's location to center the map.
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
    let displayMarkers = USAData.map(tile => {
      tile = tile.tri_facility;
      //console.log(tile.ZIP_CODE);

      //console.log(tile);
      //  Move the marker creation down to the render. Only store the marker data in the state and not the component creation.
      return (
        <Marker
          key={tile.TRI_FACILITY_ID}
          title={tile.FACILITY_NAME}
          icon={{ url: orangeDiamond }}
          name={tile.FACILITY_NAME}
          echoURL={
            "https://echo.epa.gov/detailed-facility-report?fid=" +
            tile.TRI_FACILITY_ID
          }
          onClick={this.onMarkerClick}
          street_address={tile.STREET_ADDRESS}
          state_abbr={tile.STATE_ABBR}
          city_name={tile.CITY_NAME}
          zip_code={tile.ZIP_CODE}
          county={tile.COUNTY_NAME}
          position={{ lat: tile.PREF_LATITUDE, lng: `-${tile.PREF_LONGITUDE}` }}
        />
      );
    });
    this.setState({
      displayMarkers: displayMarkers,
      markers: displayMarkers
      // displayMarkerData: USAData
    });
    // console.log(this.state.markers)
  }

  render() {
    //we create a const to store the user's location
    const whereYouAre = this.state.userLocation || {
      lat: 39.8283,
      lng: -98.57955
    };
    const zoomLevel = this.state.zoomFactor || 5;

    return (
      <div className="mapcontainer w-100">
        <div className="searchBar w-100">
          <UserSearch zipCodeSearch={this.search} />

          <div className="nav nav-pills">
            <div className="nav-item dropdown">
              <a
                className="border border-white nav-link dropdown-toggle filter-drop text-white"
                data-toggle="dropdown"
                href="#!"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Locations
              </a>

              <div className="dropdown-menu drop">
                {/* Return an array of all the object keys from our areaClick.js, 
                      dynamically create buttons with the index, and pass in the key to
                      our onAreaClick function. */}
                {Object.keys(BUTTON_CLICK_DATA).map((marker, i) => (
                  <button
                    key={i}
                    className="dropdown-item"
                    onClick={() => this.onAreaClick(marker)}
                  >
                    {marker}
                  </button>
                ))}

                {/* <button className="dropdown-item"
                  onClick={this.onUSAClick}>
                  USA
                  </button>
                  */}
              </div>
            </div>
          </div>
          <h5 className="header-font text-center text-white">
            My Neighborhood Health
          </h5>
        </div>

        <Map
          className="map-height"
          google={this.props.google}
          styles={styles}
          initialCenter={whereYouAre}
          center={whereYouAre}
          ref="gmap"
          zoom={zoomLevel}
          onClick={this.onMapClicked}
        >
          {/* Magenta current Location cross Marker */}
          <Marker
            name={"Current location"}
            position={whereYouAre}
            icon={magentaMarker}
          />

          {this.state.displayMarkers}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <p>{this.state.selectedPlace.street_address}</p>
              <p>
                {this.state.selectedPlace.city_name},{" "}
                {this.state.selectedPlace.state_abbr}{" "}
                {this.state.selectedPlace.zip_code}
              </p>
              <h4>Compliance History:</h4>
              {this.createComplianceURL()}
              <button className="button" />
            </div>
          </InfoWindow>
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: `${process.env.REACT_APP_API_KEY}`
})(MapContainer);
