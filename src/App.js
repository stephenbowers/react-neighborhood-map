import React, { Component } from 'react';
import './App.css';
import Map from './components/Map';
import ListView from './components/ListView';

class App extends Component {
    state = {
        locations: [
            {'id': 1, 'latitude':'32.748', 'longitude': '-117.163'}, 
            {'id': 2, 'latitude':'32.747', 'longitude': '-117.161'}, 
            {'id': 3, 'latitude':'32.749', 'longitude': '-117.160'}, 
            {'id': 4, 'latitude':'32.749', 'longitude': '-117.162'}, 
            {'id': 5, 'latitude':'32.748', 'longitude': '-117.161'}
        ]
    }

  render() {
    return (
      <div className="App">
        <div className="listContainer">
          <ListView />
        </div>
        <div className="mapContainer">
        <Map
            locations={this.state.locations}
        />
        </div>
      </div>
    );
  }
}

export default App;
