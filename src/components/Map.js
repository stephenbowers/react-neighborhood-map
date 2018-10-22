/* global google */

import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    locations={props.locations}
    activeLocation={props.activeLocation}
    defaultZoom={17}
    defaultCenter={{ lat: 32.748, lng: -117.159 }}
  >
    {props.isMarkerShown && 
        <>
        {props.locations.map(location=> {
            return <Marker 
                        key={location.id}
                        keyProp={location.id}
                        position={location.location}
                        title={location.name}
                        defaultAnimation={google.maps.Animation.DROP}
                    />
        })}
        {props.activeLocation.map(location=> {
            return <Marker
                        key={location.id}
                        keyProp={location.id}
                        position={location.location}
                        title={location.name}
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
                locations={this.props.locations}
                activeLocation={this.props.activeLocation}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBPoQWOSF6VDoZE_Z_FUKv8rLTvlDFuf_I"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%`}} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}