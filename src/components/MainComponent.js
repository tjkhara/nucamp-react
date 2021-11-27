import React, { Component } from "react"
import { Navbar, NavbarBrand } from "reactstrap"
import Directory from "./DirectoryComponent"
import CampsiteInfo from "./CampsiteInfoComponent"
import Header from "./HeaderComponent"
import Footer from "./FooterComponent"
import { CAMPSITES } from "../shared/campsites"

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      campsites: CAMPSITES,
      selectedCampsite: null
    }
  }

  // Methods

  // Set the state to the selected campsite
  onCampsiteSelect = campsiteId => {
    this.setState({
      selectedCampsite: campsiteId
    })
  }

  // Get data of selected campsite
  // Go through all the campsites and find the one where the campsite id is equal to the id of the
  // selected campsite
  // We have the id of the selected campsite in state
  getSelectedCampsiteData = () => {
    return this.state.campsites.filter(campsite => campsite.id === this.state.selectedCampsite)[0]
  }

  render() {
    return (
      <div>
        {/* Add header component - nav bar etc */}
        <Header />
        {/* Pass down the campsites and pass the method that handles the click (stores id in state) */}
        <Directory campsites={this.state.campsites} onClick={this.onCampsiteSelect} />
        {/* Pass the clicked campsite data down to the component */}
        <CampsiteInfo campsite={this.getSelectedCampsiteData()} />
        {/* Add footer */}
        <Footer />
      </div>
    )
  }
}

export default Main
