/* global google */

import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    markers={props.markers}
    activeMarker={props.activeMarker}
    defaultZoom={17}
    defaultCenter={{ lat: 32.748, lng: -117.159 }}
  >
    {props.isMarkerShown && 
        <>
        {props.markers.map(marker=> {
            return <Marker 
                        key={marker.id}
                        keyProp={marker.id}
                        position={marker.location}
                        title={marker.name}
                    />
        })}
        {props.activeMarker.map(marker=> {
            return <Marker
                        key={"active." + marker.id}
                        keyProp={"active." + marker.id}
                        position={marker.location}
                        title={marker.name}
                        animation={google.maps.Animation.BOUNCE}
                    />
        })}
        </>
    }
  </GoogleMap>
))

export default class Map extends Component {

    render() {
        return(
            <MyMapComponent
                markers={this.props.markers}
                activeMarker={this.props.activeMarker}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBPoQWOSF6VDoZE_Z_FUKv8rLTvlDFuf_I"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`}} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}