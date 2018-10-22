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

        <div className="searchResults">
          <ul>
              {/* 
                TODO: When location clicked (div becomes 'active'), more info is displayed
              */}
              { this.props.locations.map(location=> 
                  <div 
                    key={location.id}
                    className="locationResult"
                    onClick={(event) => this.props.setActiveLocation(location)}
                  >
                    <p 
                      className="locationName"
                    >
                      {location.name}
                    </p>
                  </div>) 
              }
          </ul>
        </div>
        
      </div>
    );
  }
}

export default ListView;
