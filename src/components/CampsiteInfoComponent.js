import React, { Component } from "react"
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap"

export default class CampsiteInfoComponent extends Component {
  // Methods start

  // *** Render the campsites ***
  renderCampsite = campsite => {
    return (
      <div className="col-md-5 m-1">
        <Card>
          <CardImg top src={campsite.image} alt={campsite.name} />
          <CardBody>
            <CardTitle>{campsite.name}</CardTitle>
            <CardText>{campsite.description}</CardText>
          </CardBody>
        </Card>
      </div>
    )
  }

  // *** Render the comments ***
  renderComments = comments => {
    if (comments) {
      return (
        <div className="col-md-5 m-1">
          <h4>Comments</h4>
          {comments.map(comment => {
            return (
              <div key={comment.id}>
                <p>{comment.text}</p>
                <p>
                  -- {comment.author}{" "}
                  {new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(new Date(Date.parse(comment.date)))}
                </p>
              </div>
            )
          })}
        </div>
      )
    }

    return <div />
  }
  // Methods end

  // Render method
  render() {
    if (this.props.campsite) {
      return (
        <div className="container">
          <div className="row">
            {/* Render selected campsite */}
            {this.renderCampsite(this.props.campsite)}
            {/* Render comments */}
            {this.renderComments(this.props.campsite.comments)}
          </div>
        </div>
      )
    }
    return <div></div>
  }
}
