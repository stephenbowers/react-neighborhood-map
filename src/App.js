import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import ListView from './components/ListView';

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
        activeMarker: []
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

  getSearchResults = async (query) => {
    await this.updateQuery(query);

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
    this.setState({ activeLocation: newActiveLocation });
    this.setState({ activeMarker: newActiveMarker });
    let newMarkers = currentMarkers.filter(loc => loc.id !== newActiveLocation.id);
    this.setState({ markers: newMarkers });
  }

  setActiveLocation = (location) => {
    let newActiveLocation = location;

    // Reset Markers
    let currentMarkers = this.state.locations;

    // TO DO: Toggle active class on sidebar info
    this.setActiveMarker(newActiveLocation, currentMarkers);
  }

  render() {
    return (
      <div className="App">
        <div className="listContainer">
          <ListView 
            locations={this.state.locations}
            query={this.state.query}
            getSearchResults={this.getSearchResults}
            setActiveLocation={this.setActiveLocation}
          />
        </div>
        <div className="mapContainer">
        <Map
            markers={this.state.markers}
            activeMarker={this.state.activeMarker}
        />
        </div>
      </div>
    );
  }
}

export default App;
