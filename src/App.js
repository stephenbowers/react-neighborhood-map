import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import ListView from './components/ListView';
import ErrorBoundary from './components/ErrorBoundary';

let foursquare = require('react-foursquare')({
  clientID: 'A0YJ3LCINNGXQB12BJ5TZYAJ2N4UQMTIRIVTWN4FH4YAJNB1',
  clientSecret: 'IYZZEEL4KUNXBEZANUFF0DKSJRI0ZD0IBFS2APOYHMJ1KSX1'
});

let params = {
  'll': '32.748,-117.159',
  'query': ''
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        locations: [],
        markers: [],
        query: '',
        activeLocation: {},
        activeMarker: [],
        clickedMarker: {},
        clickedName: '',
        clickedAddress: '',
        clickedCategory: ''
    };
  }

  componentDidMount() {
    foursquare.venues.getVenues(params)
        .then(res=> {
            this.setState({ locations: res.response.venues });
            this.setState({ markers: res.response.venues });
        });
  }

  updateQuery = (query) => {
    this.setState({ query: query });
    params.query = this.state.query;
  }

  getSearchResults = (query) => {
    if (this.state.query && query !== '') {
      foursquare.venues.getVenues(params)
        .then(res=> {
          this.setState({ locations: res.response.venues });
          this.setState({ markers: res.response.venues });
        });
    } else {
      this.setState({ locations: [] })
      this.setState({ markers: [] })
    }
    
  }

  setActiveMarker = (newActiveLocation, currentMarkers) => {
    let newActiveMarker = [];
    newActiveMarker.push(newActiveLocation);
    
    this.setState({ activeMarker: newActiveMarker });
    let newMarkers = currentMarkers.filter(loc => loc.id !== newActiveLocation.id);
    this.setState({ markers: newMarkers });
  }

  setActiveLocation = (location) => {
    let newActiveLocation = location;
    this.setState({ activeLocation: newActiveLocation });
    console.log("setActiveLocation - Active Location: " + this.state.activeLocation)
    // Reset Markers
    let currentMarkers = this.state.locations;
    this.setActiveMarker(newActiveLocation, currentMarkers);
  }

  setClickedMarker = (marker) => {
    // TO DO: Clear Bouncing location
    let category = marker["categories"][0]["name"];
    this.setState({ clickedMarker: marker });
    this.setState({ clickedName: marker.name});
    this.setState({ clickedAddress: marker.location.address});
    this.setState({ clickedCategory: category });
  }

  render() {
    return (
      <div className="App" role="application" aria-label="main-app">
        <aside className="listContainer" aria-label="location-list">
          <ErrorBoundary>
            <ListView 
              locations={this.state.locations}
              query={this.state.query}
              updateQuery={this.updateQuery}
              getSearchResults={this.getSearchResults}
              setActiveLocation={this.setActiveLocation}
              activeLocation={this.state.activeLocation}
              aria-label="location-list"
            />
          </ErrorBoundary>
          
        </aside>
        <main className="mapContainer" role="application" aria-label="map">
          <ErrorBoundary>
            <Map
                markers={this.state.markers}
                activeMarker={this.state.activeMarker}
                setClickedMarker={this.setClickedMarker}
                clickedMarker={this.state.clickedMarker}
                clickedName={this.state.clickedName}
                clickedAddress={this.state.clickedAddress}
                clickedCategory={this.state.clickedCategory}
                role="application"
                aria-label="map"
            />
          </ErrorBoundary>
        </main>
      </div>
    );
  }
}

export default App;
