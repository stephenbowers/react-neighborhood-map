import React, { Component } from 'react';
import MoreInfo from './MoreInfo';
class ListView extends Component {
  

  handleClick = (location) => {
    console.log("Location Clicked!");
    this.props.setActiveLocation(location);
  }

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

        <div className="searchResults">
          <ul>
              {this.props.locations.map(location=> 
                  <div 
                    key={location.id}
                    location={location.id}
                    className="locationResult"
                    onClick={() => this.handleClick(location)}
                  >
                    <div 
                      className="locationInfoContainer"
                    >
                      <MoreInfo 
                        name={location.name}
                        location={location.location.address}
                        category={location["categories"][0]["name"]}
                      />
                    </div>
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
