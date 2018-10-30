import React, { Component } from 'react';

class MoreInfo extends Component {
    constructor() {
      super();
      this.state = {
        showMoreInfo: false
      }
    }
  
    onClick() {
      if (this.state.showMoreInfo === false) {
        this.setState({ showMoreInfo: true })
      } else {
        this.setState({ showMoreInfo: false})
      }
    }

  render() {
    return (
      <div className="locationInfo" onClick={() => this.onClick()}>
        <h3>{this.props.name}</h3>
        {this.state.showMoreInfo &&
          <div className="moreInfo">
            <p className="address">{this.props.location}</p>
            <p className="category">Category: {this.props.category}</p>
          </div>
        }
    </div>
    );
  }
}

export default MoreInfo;
