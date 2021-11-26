import React from "react"
import { Card, CardImg, CardText, CardBody, CardTitle } from "reactstrap"

const RenderCampsite = ({ campsite }) => {
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

const CampsiteInfoComponent = ({ campsite }) => {
  if (campsite) {
    return (
      <div className="container">
        <div className="row">
          {/* Render selected campsite */}
          <RenderCampsite campsite={campsite} />

          {/* Render comments */}
          <RenderComments comments={campsite.comments} />
        </div>
      </div>
    )
  }
  return <div></div>
}

export default CampsiteInfoComponent
