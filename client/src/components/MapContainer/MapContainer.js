import React, { Component } from 'react';
// import {GoogleApiWrapper} from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import orangeDiamond from "./../../orange-diamond.ico"
import magentaMarker from "./../../magenta_marker.ico"
import USAData from "../../data/USA_TRI.json";
import UserSearch from "../UserSearch/UserSearch.js";
import zipcodes from "zipcodes";
import "./MapContainer.css";

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
      }
      this.onMarkerClick = this.onMarkerClick.bind(this);
    }


      onMarkerClick = (props, marker, e) => {
        //console.log(props);
          this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true,
        });
      }

      onILClick = (props) => {
        this.setState({displayMarkers: this.state.markers.filter(marker => marker.props.state_abbr === 'IL')});
        //console.log('displayMarkers: ', this.state.displayMarkers);
      }

      onCookCountyClick = (props) => {
        this.setState({displayMarkers: this.state.markers.filter(marker => marker.props.county === 'COOK')});
        this.setState({userLocation: {lat: 41.8807,lng: -87.6742} });
        this.setState({zoomFactor: 10});
        //console.log('displayMarkers: ', this.state.displayMarkers);
      }
      onLAClick = (props) => {
        this.setState({displayMarkers: this.state.markers.filter(marker => marker.props.city_name === 'LOS ANGELES')});
        //console.log('displayMarkers: ', this.state.displayMarkers);
      }
      onSFClick = (props) => {
        this.setState({displayMarkers: this.state.markers.filter(marker => marker.props.city_name === 'SAN FRANCISCO')});
        //console.log('displayMarkers: ', this.state.displayMarkers);
      }
      onNYCClick = (props) => {
        this.setState({displayMarkers: this.state.markers.filter(marker => marker.props.county === 'QUEENS' || marker.props.county === 'KINGS' || marker.props.county === 'NEW YORK' || marker.props.city_name === 'STATEN ISLAND' || marker.props.county === 'BRONX')});
        this.setState({userLocation: {lat: 40.7128,lng: -74.0060} });
        this.setState({zoomFactor: 12});

        //console.log('displayMarkers: ', this.state.displayMarkers);
      }
      onUSAClick = (props) => {
        this.setState({displayMarkers: this.state.markers});
        this.setState({userLocation: {lat: 39.8283,lng: -98.5795} });
        this.setState({zoomFactor: 5});
        //console.log('displayMarkers: ', this.state.displayMarkers);
      }
    
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

      createComplianceURL = (props) => {
        return <a href={this.state.selectedPlace.echoURL} target="_blank"><i className="far fa-3x fa-folder-open"></i></a>;
      }
      //set the state to the zip value
      search = (zip) => {
        //console.log("search:", zip);
        this.setState({displayMarkers: this.state.markers.filter(marker => marker.props.zip_code === zip)});
        // re-center the map to a set of coordinates in the zip code
        //When the user submits a zip, our app needs to convert it to a lat/lng variable that can be passed thru.
        var zipCodeLocation = zipcodes.lookup(zip);
        console.log("zipcodelocation", zipCodeLocation)

        //take the json lat&lng by calling the key on theobject
        //zipCodeLocation.latitude 
        //Update the userlocation state 
    
        this.setState({userLocation: {lat: zipCodeLocation.latitude,lng: zipCodeLocation.longitude} });
        this.setState({zoomFactor: 10});

        

      }
      //create a function that filters by zip code -take the markers from the state object and filter them according to zip. 

      componentDidMount() {
        //locating the user and seeking the user's location to center the map.
        navigator.geolocation.getCurrentPosition((position) =>{
          this.setState({userLocation: {lat: position.coords.latitude, lng: position.coords.longitude}});
          
        });
          let displayMarkers = USAData.map((tile) => {
           tile=tile.tri_facility;
           let zipCode= 60614;
           //console.log(tile.ZIP_CODE);

           
           //console.log(tile);
            return (<Marker
            key={tile.TRI_FACILITY_ID}
            title={tile.FACILITY_NAME}
            icon={{url: orangeDiamond}} 
            name={tile.FACILITY_NAME}
            echoURL={'https://echo.epa.gov/detailed-facility-report?fid=' + tile.TRI_FACILITY_ID}
            onClick={this.onMarkerClick}
            street_address={tile.STREET_ADDRESS}
            state_abbr={tile.STATE_ABBR}
            city_name={tile.CITY_NAME}
            zip_code={tile.ZIP_CODE}
            county={tile.COUNTY_NAME}
            position={{lat: tile.PREF_LATITUDE, lng: `-${tile.PREF_LONGITUDE}`}} />
              
          );
        });
          this.setState({displayMarkers: displayMarkers, markers: displayMarkers});
          // console.log(this.state.markers)
      };

    render() {

        const styles = [
          {
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#8ec3b9"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1a3646"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4b6878"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#64779e"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4b6878"
              }
            ]
          },
          {
            "featureType": "landscape.man_made",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#334e87"
              }
            ]
          },
          {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#283d6a"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#6f9ba5"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "poi.attraction",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.business",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#3C7680"
              }
            ]
          },
          {
            "featureType": "poi.place_of_worship",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi.school",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#304a7d"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#98a5be"
              }
            ]
          },
          {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#2c6675"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#255763"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#b0d5ce"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#023e58"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "labels",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#98a5be"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#1d2c4d"
              }
            ]
          },
          {
            "featureType": "transit.line",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#283d6a"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#3a4762"
              }
            ]
          },
          {
            "featureType": "transit.station",
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#0e1626"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#4e6d70"
              }
            ]
          }
        ]
        // const data= USAData;
        //console.log("mikesCleanDataTest", data);
        //the purpose of this const is to create a data variable so that we can utilize the dummy data in our marker.
      //we create a const to store the user's location
      const whereYouAre= this.state.userLocation || {lat: 41.8781,lng: -87.6298};
      const zoomLevel = this.state.zoomFactor || 5;
      //const whereYouAre= {lat:41.918990799999996,lng:-87.6760527}
      //console.log("where are you", whereYouAre);


        return (
        <div className="mapcontainer">
          <div className="searchBar">
          <UserSearch zipCodeSearch={this.search}/>
        

          <div className="nav nav-pills">
          <div className= "nav-item dropdown">

          <a className="nav-link dropdown-toggle filter-drop" data-toggle="dropdown" href="#!" role="button" aria-haspopup="true" aria-expanded="false">Locations</a>

          <div className="dropdown-menu drop">

          <button className="dropdown-item"
          onClick={this.onUSAClick}>
          USA
          </button>
          <button className=" dropdown-item"
          onClick={this.onILClick}>
          IL
          </button>
          <button className=" dropdown-item"
          onClick={this.onCookCountyClick}>
          Cook C.
          </button>
          <button className=" dropdown-item"
          onClick={this.onLAClick}>
          LA
          </button>
          <button className=" dropdown-item"
          onClick={this.onSFClick}>
          SF
          </button>
          <button className=" dropdown-item"
          onClick={this.onNYCClick}>
          NYC
          </button>
          </div>
          </div>
          </div >
          <h5 className="header-font text-center">My Neighborhood Health</h5>
          </div>

          <Map
          className='map-height'
          google={this.props.google}
          styles={styles}
          initialCenter={whereYouAre}
          center={whereYouAre}
          ref='gmap'
          zoom={zoomLevel}
          onClick={this.onMapClicked}
        >

        {/* Magenta current Location cross Marker */}
        <Marker
            name={'Current location'}
            position={whereYouAre}
            icon={magentaMarker} />

          {this.state.displayMarkers}
          <InfoWindow
            marker = { this.state.activeMarker }
            visible = { this.state.showingInfoWindow }
          >
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
              <p>{this.state.selectedPlace.street_address}</p>
              <p>{this.state.selectedPlace.city_name}, {this.state.selectedPlace.state_abbr} {this.state.selectedPlace.zip_code}</p>
              <h4>Compliance History:</h4>
              {this.createComplianceURL()}
              <button className="button"></button>
            </div>
          </InfoWindow>
          </Map>
        </div>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDbkAtce3FywDMsrsIBlY5IoBxfobNPqtw')
})(MapContainer)