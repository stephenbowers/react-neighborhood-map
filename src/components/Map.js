import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    locations={props.locations}
    defaultZoom={17}
    defaultCenter={{ lat: 32.748, lng: -117.159 }}
  >
    {props.isMarkerShown && 
        <>
        <Marker position={{ lat: 32.748, lng: -117.163 }} />
        <Marker position={{ lat: 32.747, lng: -117.161 }} />
        <Marker position={{ lat: 32.749, lng: -117.160 }} />
        <Marker position={{ lat: 32.749, lng: -117.162 }} />
        <Marker position={{ lat: 32.748, lng: -117.161 }} />
        {props.locations.map(location=> {
        return <Marker key={location.id} position={location.location} title={location.name}/>
        })}
        </>
    }

  </GoogleMap>
))

export default class Map extends Component {

    render() {
        const mapHeight = window.innerHeight;
        return(
            <MyMapComponent
                locations={this.props.locations}
                isMarkerShown
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBPoQWOSF6VDoZE_Z_FUKv8rLTvlDFuf_I"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `${mapHeight}px`}} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        );
    }
}