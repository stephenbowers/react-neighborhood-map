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
        query: ''
    };
  }

  componentDidMount() {
    console.log(params.query)
    foursquare.venues.getVenues(params)
        .then(res=> {
            this.setState({ locations: res.response.venues });
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
        });
    } else {
      this.setState({ locations: [] })
    }
    
  }

  render() {
    return (
      <div className="App">
        <div className="listContainer">
          <ListView 
            locations={this.state.locations}
            query={this.state.query}
            getSearchResults={this.getSearchResults}
          />
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
