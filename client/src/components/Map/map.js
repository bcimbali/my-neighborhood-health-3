import React, { Component } from 'react';
// import {GoogleApiWrapper} from 'google-maps-react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

// ...

export class MapContainer extends Component {

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
      };

      
    
      onMarkerClick = (props, marker, e) =>
        this.setState({
          selectedPlace: props,
          activeMarker: marker,
          showingInfoWindow: true
        });
    
      onMapClicked = (props) => {
        if (this.state.showingInfoWindow) {
          this.setState({
            showingInfoWindow: false,
            activeMarker: null
          })
        }
      };

    render() {

        const style = {
            height: '100vh',
            width: '100vw'

        }
      return (
        

        <Map
         google={this.props.google}
         style={style}
         initialCenter={{
           lat: 41.8781,
           lng: -87.6298
         }}
         zoom={19}
         onClick={this.onMapClicked}
       >
  
          <Marker onClick={this.onMarkerClick}
                  name={'Current location'} />
  
          <InfoWindow onClose={this.onInfoWindowClose}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
          </InfoWindow>
        </Map>
      );
    }
  }

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDbkAtce3FywDMsrsIBlY5IoBxfobNPqtw')
})(MapContainer)