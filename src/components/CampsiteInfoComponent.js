import React, { Component } from "react"
import { Button, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem } from "reactstrap"
import { Link } from "react-router-dom"

class CommentForm extends Component {
  render() {
    return (
      <div>
        <Button type="submit" color="primary">
          Submit Comment
        </Button>
      </div>
    )
  }
}

// Presentational component
const RenderCampsite = ({ campsite }) => {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  )
}

// Presentational component
const RenderComments = ({ comments }) => {
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

// This component renders selected campsite and related comments
const CampsiteInfoComponent = ({ campsite, comments }) => {
  if (campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          {/* Render selected campsite */}
          <RenderCampsite campsite={campsite} />

          {/* Render comments */}
          <RenderComments comments={comments} />
        </div>
      </div>
    )
  }
  return <div></div>
}

export default CampsiteInfoComponent
