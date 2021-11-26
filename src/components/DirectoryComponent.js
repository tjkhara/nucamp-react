import React, { Component } from "react"
import { Card, CardImg, CardImgOverlay, CardTitle } from "reactstrap"
export default class DirectoryComponent extends Component {
  // methods

  // render
  render() {
    // Prepare the html via map in this variable
    const directory = this.props.campsites.map(campsite => {
      return (
        <div className="col-md-5 m-1" key={campsite.id}>
          <Card onClick={() => this.props.onClick(campsite.id)}>
            <CardImg width="100%" src={campsite.image} alt={campsite.name} />
            <CardImgOverlay>
              <CardTitle>{campsite.name}</CardTitle>
            </CardImgOverlay>
          </Card>
        </div>
      )
    })

    // Display the prepared html
    return (
      <div className="container">
        <div className="row">{directory}</div>
      </div>
    )
  }
}
