import React, { Component } from "react"
import Directory from "./DirectoryComponent"
import Header from "./HeaderComponent"
import Footer from "./FooterComponent"
import Home from "./HomeComponent"
import Contact from "./ContactComponent"
import CampsiteInfo from "./CampsiteInfoComponent"

// React Router stuff
import { Switch, Route, Redirect } from "react-router-dom"
// Import data
import { CAMPSITES } from "../shared/campsites"
import { COMMENTS } from "../shared/comments"
import { PARTNERS } from "../shared/partners"
import { PROMOTIONS } from "../shared/promotions"

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campsites: CAMPSITES,
      comments: COMMENTS,
      partners: PARTNERS,
      promotions: PROMOTIONS
    }
  }

  // Methods

  // Render
  render() {
    const HomePage = () => {
      return (
        <Home
          // Send in featured items
          campsite={this.state.campsites.filter(campsite => campsite.featured)[0]}
          promotion={this.state.promotions.filter(promotion => promotion.featured)[0]}
          partner={this.state.partners.filter(partner => partner.featured)[0]}
        />
      )
    }

    // Look through the state data for the id sent in params
    // Match object is sent in via props
    const CampsiteWithId = ({ match }) => {
      return (
        <CampsiteInfo
          campsite={this.state.campsites.filter(campsite => campsite.id === +match.params.campsiteId)[0]}
          comments={this.state.comments.filter(comment => comment.campsiteId === +match.params.campsiteId)}
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
          {/* This is like the default statement in switch */}
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    )
  }
}

export default Main
