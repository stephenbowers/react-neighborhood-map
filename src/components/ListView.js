import React, { Component } from 'react';

class ListView extends Component {
  render() {
    return (
      <div className="locationList">
        <h1 className="neighborhoodHeading">Hillcrest Locations</h1>

        <div className="search">
          <input 
            type="text"
            placeholder="E.g. coffee, burgers, bar,..."
            value={this.props.query}
            onChange={(event) => this.props.getSearchResults(event.target.value)}
          />

        </div>

        <div>
          <ul>
              { this.props.locations.map(location=> <li key={location.id}>{location.name}</li>) }
          </ul>
        </div>
        
      </div>
    );
  }
}

export default ListView;
