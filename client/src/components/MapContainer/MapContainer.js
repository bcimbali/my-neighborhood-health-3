import React, { Component } from 'react';
// import {GoogleApiWrapper} from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import dummyData60611 from "../../data/converted.json";
import orangeDiamond from "./../../orange-diamond.ico"
//import ILData from "../../data/IL_TRI.json";
import USAData from "../../data/USA_TRI.json";


// ...

export class MapContainer extends Component {
    constructor() {
    super();
    this.state = {
      markers: [],
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        userLocation: null,

      }
      this.onMarkerClick = this.onMarkerClick.bind(this);
    }


      onMarkerClick = (props, marker, e) => {
        console.log(props);
          this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
      }
    
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

      componentDidMount() {
        //locating the user and seeking the user's location to center the map.
        navigator.geolocation.getCurrentPosition((position) =>{
          this.setState({userLocation: {lat: position.coords.latitude, lng: position.coords.longitude}});
          
        });
          let markers = USAData.map((tile) => {
           tile=tile.tri_facility;
           //console.log(tile);
            return (<Marker
            key={tile.TRI_FACILITY_ID}
            title={tile.FACILITY_NAME}
            icon={{url: orangeDiamond}} 
            name={tile.FACILITY_NAME}
            onClick={this.onMarkerClick}
            street_address={tile.STREET_ADDRESS}
            state_abbr={tile.STATE_ABBR}
            city_name={tile.CITY_NAME}
            position={{lat: tile.PREF_LATITUDE, lng: `-${tile.PREF_LONGITUDE}`}} />
              
          )});
          this.setState({markers: markers},()=> console.log('Whatever'));
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
      //const whereYouAre= {lat:41.918990799999996,lng:-87.6760527}
      console.log("where are you", whereYouAre);


        return (
        

        <Map
         google={this.props.google}
         styles={styles}
         initialCenter={whereYouAre}
         zoom={14}
         onClick={this.onMapClicked}
       >

        {this.state.markers}
        <InfoWindow
          marker = { this.state.activeMarker }
          visible = { this.state.showingInfoWindow }
        >
        <div>
          <h1>{this.state.selectedPlace.name}</h1>
          <p>{this.state.selectedPlace.street_address}</p>
          <p>{this.state.selectedPlace.city_name}, {this.state.selectedPlace.state_abbr}</p>
          <h4>Chemicals:</h4>
          <p>Will be listed here...</p>
          <h4>Any Chemicals Known Carcinogens?</h4>
          <p>Yes or no listed here...</p>
          <h4>Compliance History:</h4>
          <p>Compliance icon</p>
          <h4>Are you a concerned neighbor?</h4>
          <button class="button"></button>
        </div>
        </InfoWindow>
        </Map>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDbkAtce3FywDMsrsIBlY5IoBxfobNPqtw')
})(MapContainer)