import React, { Component } from 'react';

class ListView extends Component {
  render() {
    return (
      <div className="locationList">
        <h1>Hillcrest Locations</h1>
        <ul>
            { this.props.locations.map(location=> <li key={location.id}>{location.name}</li>) }
        </ul>
      </div>
    );
  }
}

export default ListView;
