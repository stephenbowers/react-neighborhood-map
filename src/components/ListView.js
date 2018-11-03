import React, { Component } from 'react';

class ListView extends Component {

  constructor() {
      super();
      this.state = {
        isActiveLocation: false
      }
    }
  
  handleClick = (location) => {
    console.log("Location Clicked!");
    console.log("Location is: " + location);
    this.props.setActiveLocation(location);
    this.showActiveLocationInfo();
  }

  showActiveLocationInfo = () => {
    if (this.state.isActiveLocation === false) {
      this.setState({ isActiveLocation: true });
    }
  }

  render() {
    return (
      <div className="locationList" aria-label="location list">
        <div className="neighborhoodHeading" aria-label="main heading">
          <h1>Hillcrest Locations</h1>
          <h4>Powered by Foursquare and Google Maps API</h4>
        </div>

        <div className="search" role="search">
          <input 
            type="text"
            placeholder="E.g. coffee, burgers, bar,..."
            value={this.props.query}
            onChange={(event) => this.props.updateQuery(event.target.value)}
            aria-label="search text"
          />
          <input
            type="submit"
            value="Search"
            onClick={() => this.props.getSearchResults(this.props.query)}
          />
        </div>

        <div className="searchResults" aria-label="search results">
          {(this.props.activeLocation !== undefined && this.state.isActiveLocation === true) &&
            <div className="activeLocationInfo" aria-label="selected location">
              {this.props.activeLocation.name &&
              <h3>{this.props.activeLocation.name}</h3>
              }
              {this.props.activeLocation.location.address &&
              <p>{this.props.activeLocation.location.address}</p>
              }
              {this.props.activeLocation["categories"][0]["name"] &&
              <p>Category: {this.props.activeLocation["categories"][0]["name"]}</p>
              }
            </div>
          }
          <ul>
              {this.props.locations.map(location=> 
                  <div 
                    key={location.id}
                    location={location.id}
                    className="locationResult"
                    onClick={() => this.handleClick(location)}
                    aria-label="location"
                    tabIndex="0"
                  >
                    <p>{location.name}</p>
                  </div>
                  ) 
              }
          </ul>
        </div>
        
      </div>
    );
  }
}

export default ListView;
