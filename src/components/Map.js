/* global google */

import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from 'react-google-maps';
import ErrorBoundary from './ErrorBoundary';

const MyMapComponent = withScriptjs(withGoogleMap((props) =>

  <GoogleMap
    markers={props.markers}
    activeMarker={props.activeMarker}
    clickMarker={props.clickMarker}
    clickedMarker={props.clickedMarker}
    closeInfoWindow={props.closeInfoWindow}
    clickedName={props.clickedName}
    clickedAddress={props.clickedAddress}
    clickedCategory={props.clickedCategory}
    defaultZoom={18}
    defaultCenter={{ lat: 32.748, lng: -117.159 }}
    role="application"
    aria-label="map"
  >
    {props.isMarkerShown && 
        <>
        {props.markers.map(marker=> {
            return <Marker 
                        key={marker.id}
                        position={marker.location}
                        title={marker.name}
                        clickedName={props.clickedName}
                        clickedAddress={props.clickedAddress}
                        clickedCategory={props.clickedCategory}
                        onClick={(event) => props.clickMarker(marker)}
                        aria-label="map marker"
                    >
                    {props.clickedMarker.id === marker.id &&
                        <InfoWindow
                            aria-label="info window"
                        >
                            <div aria-label="location details">
                                <h2>{props.clickedName}</h2>
                                <h4>{props.clickedAddress}</h4>
                                {props.clickedCategory &&
                                <p>Category: {props.clickedCategory}</p>
                                }
                            </div>
                        </InfoWindow>
                    }
                    </Marker>
        })}
        {props.activeMarker.map(marker=> {
            return <Marker
                        key={"active." + marker.id}
                        position={marker.location}
                        title={marker.name}
                        clickedName={props.clickedName}
                        clickedAddress={props.clickedAddress}
                        clickedCategory={props.clickedCategory}
                        onClick={(event) => props.clickMarker(marker)}
                        animation={google.maps.Animation.BOUNCE}
                        aria-label="active map marker"
                    >
                    {props.clickedMarker.id === marker.id &&
                        <InfoWindow
                            aria-label="info window"
                        >
                            <div aria-label="location details">
                                <h2>{props.clickedName}</h2>
                                <h4>{props.clickedAddress}</h4>
                                {props.clickedCategory &&
                                <p>Category: {props.clickedCategory}</p>
                                }
                            </div>
                        </InfoWindow>
                    }
                    </Marker>
        })}
        </>
    }
  </GoogleMap>
))

export default class Map extends Component {


    clickMarker = (marker) => {
        let newClickedMarker = marker
        console.log("A marker was clicked!");
        console.log("The marker name was: " + marker.name);
        this.props.setClickedMarker(newClickedMarker);
    }
    render() {
        return(
            <ErrorBoundary>
                <MyMapComponent
                    markers={this.props.markers}
                    activeMarker={this.props.activeMarker}
                    isMarkerShown
                    clickMarker={this.clickMarker}
                    setClickedMarker={this.props.setClickedMarker}
                    clickedMarker={this.props.clickedMarker}
                    clickedName={this.props.clickedName}
                    clickedAddress={this.props.clickedAddress}
                    clickedCategory={this.props.clickedCategory}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBPoQWOSF6VDoZE_Z_FUKv8rLTvlDFuf_I"
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `100%`}} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    role="application"
                    aria-label="map"
                >
                </MyMapComponent>
            </ErrorBoundary>
        );
    }
}