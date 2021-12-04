import React, { Component } from "react"
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

const mapStateToProps = state => {
  return {
    campsites: state.campsites,
    comments: state.comments,
    partners: state.partners,
    promotions: state.promotions
  }
}

class Main extends Component {
  // Methods

  // Render
  render() {
    const HomePage = () => {
      return (
        <Home
          // Send in featured items
          campsite={this.props.campsites.filter(campsite => campsite.featured)[0]}
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
          campsite={this.props.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          comments={this.props.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
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
          <Route exact path="/directory" render={() => <Directory campsites={this.state.campsites} />} />
          {/* Dynamic route for directory to display each item in directory on a separate page*/}
          <Route path="/directory/:campsiteId" component={CampsiteWithId} />
          {/* Contact page */}
          <Route exact path="/contactus" component={Contact} />
          {/* About Page */}
          <Route exact path="/aboutus" render={() => <About partners={this.state.partners} />} />
          {/* This is like the default statement in switch */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps)(Main))
