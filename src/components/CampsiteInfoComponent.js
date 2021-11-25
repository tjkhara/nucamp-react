import React, { Component } from "react"

export default class CampsiteInfoComponent extends Component {
  render() {
    if (this.props.campsite) {
      return <div className="row"></div>
    }
    return <div></div>
  }
}
