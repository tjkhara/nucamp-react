import React, { Component } from "react"

// Components
import Directory from "./DirectoryComponent"
import Header from "./HeaderComponent"
import Footer from "./FooterComponent"
import Home from "./HomeComponent"
import Contact from "./ContactComponent"
import CampsiteInfo from "./CampsiteInfoComponent"
import About from "./AboutComponent"

// React Router stuff
import { Switch, Route, Redirect, withRouter } from "react-router-dom"

// Redux stuff
import { connect } from "react-redux"
import { addComment, fetchCampsites } from "../redux/ActionCreators"
import { actions } from "react-redux-form"

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

const mapDispatchToProps = {
  addComment: (campsiteId, rating, author, text) => addComment(campsiteId, rating, author, text),
  fetchCampsites: () => fetchCampsites(),
  resetFeedbackForm: () => actions.reset("feedbackForm")
}

class Main extends Component {
  // Methods
  componentDidMount() {
    this.props.fetchCampsites()
  }

  // Render
  render() {
    const HomePage = () => {
      return (
        <Home
          // Send in featured items
          campsite={this.props.campsites.campsites.filter(campsite => campsite.featured)[0]}
          campsitesLoading={this.props.campsites.isLoading}
          campsitesErrMess={this.props.campsites.errMess}
          promotion={this.props.promotions.filter(promotion => promotion.featured)[0]}
          partner={this.props.partners.filter(partner => partner.featured)[0]}
        />
      )
    }

    // Look through the state data for the id sent in params
    // Match object is sent in via props
    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo
          campsite={this.props.campsites.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          isLoading={this.props.campsites.isLoading}
          errMess={this.props.campsites.errMess}
          comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
          addComment={this.props.addComment}
        />
      )
    }

    return (
      <div>
        <Header />
        <Switch>
          {/* Home page */}
          <Route path="/home" component={HomePage} />
          {/* Directory page */}
          <Route exact path="/directory" render={() => <Directory campsites={this.props.campsites} />} />
          {/* Dynamic route for directory to display each item in directory on a separate page*/}
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          {/* Contact page */}
          <Route exact path="/contactus" render={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
          {/* About Page */}
          <Route exact path="/aboutus" render={() => <About partners={this.props.partners} />} />
          {/* This is like the default statement in switch */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
