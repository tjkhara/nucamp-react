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
              <Row className="form-group">
                <Label htmlFor="firstName" md={2}>
                  First Name
                </Label>
                <Col md={10}>
                  <Control.text model=".firstName" id="firstName" name="firstName" placeholder="First Name" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="lastName" md={2}>
                  Last Name
                </Label>
                <Col md={10}>
                  <Control.text model=".lastName" id="lastName" name="lastName" placeholder="Last Name" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="phoneNum" md={2}>
                  Phone
                </Label>
                <Col md={10}>
                  <Control.text model=".phoneNum" id="phoneNum" name="phoneNum" placeholder="Phone number" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="email" md={2}>
                  Email
                </Label>
                <Col md={10}>
                  <Control.text model=".email" id="email" name="email" placeholder="Email" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 4, offset: 2 }}>
                  <div className="form-check">
                    <Label check>
                      <Control.checkbox model=".agree" name="agree" className="form-check-input" /> <strong>May we contact you?</strong>
                    </Label>
                  </div>
                </Col>
                <Col md={4}>
                  <Control.select model=".contactType" name="contactType" className="form-control">
                    <option>By Phone</option>
                    <option>By Email</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Label htmlFor="feedback" md={2}>
                  Your Feedback
                </Label>
                <Col md={10}>
                  <Control.textarea model=".feedback" id="feedback" name="feedback" rows="12" className="form-control" />
                </Col>
              </Row>
              <Row className="form-group">
                <Col md={{ size: 10, offset: 2 }}>
                  <Button type="submit" color="primary">
                    Send Feedback
                  </Button>
                </Col>
              </Row>
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
