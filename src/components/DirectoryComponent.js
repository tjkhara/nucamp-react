import React from "react"
import { Link } from "react-router-dom"
import { Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem } from "reactstrap"

const RenderDirectoryItem = ({ campsite }) => {
  return (
    <Card>
      <Link to={`/directory/${campsite.id}`}>
        <CardImg width="100%" src={campsite.image} alt={campsite.name} />
        <CardImgOverlay>
          <CardTitle>{campsite.name}</CardTitle>
        </CardImgOverlay>
      </Link>
    </Card>
  )
}

const DirectoryComponent = ({ campsites }) => {
  // Prepare the html via map in this variable
  const directory = campsites.map(campsite => {
    return (
      <div className="col-md-5 m-1" key={campsite.id}>
        <RenderDirectoryItem campsite={campsite} />
      </div>
    )
  })

  // Display the prepared html
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Directory</BreadcrumbItem>
          </Breadcrumb>
          <h2>Directory</h2>
          <hr />
        </div>
      </div>
      <div className="row">{directory}</div>
    </div>
  )
}

export default DirectoryComponent
