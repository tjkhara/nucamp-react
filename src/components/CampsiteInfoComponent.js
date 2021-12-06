import React, { Component } from "react"
import { Button, Card, CardImg, CardText, CardBody, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Col, Row, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { Control, LocalForm } from "react-redux-form"

class CommentForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isModalOpen: false
    }

    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    return (
      <div>
        <Button type="submit" outline onClick={this.toggleModal}>
          {" "}
          <i className="fa fa-lg fa-pencil" /> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader>Login</ModalHeader>
          <ModalBody>
            <LocalForm>
              <div className="form-group">
                <Label htmlFor="rating">Rating</Label>{" "}
                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
              </div>

              <div className="form-group">
                <Label htmlFor="author">Last Name</Label>
                <Control.text model=".author" id="author" name="author" placeholder="author" className="form-control" />
              </div>

              <div className="form-group">
                <Label htmlFor="text">Comment</Label>
                <Control.textarea model=".text" id="text" name="text" rows="6" className="form-control" />
              </div>

              <Button type="submit" value="submit" color="primary">
                Submit
              </Button>
            </LocalForm>
          </ModalBody>
        </Modal>
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
        {/* Comment Form */}
        <CommentForm />
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
