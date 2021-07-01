import React, { Component } from 'react'

export class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
    this.homeClick = this.homeClick.bind(this)
  }




  homeClick = (e) => {
    if (localStorage.getItem('jwtToken') == null) {

      window.location.href = "http://localhost:3000"
    }
    else {
      window.location.href = "http://localhost:3000/dashboard"

    }
  }
  render() {
    return (
      <div >
        <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
          <a className="navbar-brand" onClick={this.homeClick} style={{ "marginLeft": 50, "marginRight": 100 }}>Zonion</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" onClick={this.homeClick} >Home </a>
              </li>
              <br></br>


              <li className="nav-item">
                <a className="nav-link" href="/aboutuS">About US</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contactus">Contact Us</a>
              </li>

            </ul>

          </div>
        </nav>
      </div>

    )
  }
}

export default Navbar
