import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { Link } from "react-router-dom";


export class Dashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            restaurantDetails: [],
            adminName: ""
        }


    }


    componentDidMount() {

        let token = localStorage.getItem('jwtToken')
        this.setState({ adminName: localStorage.getItem('adminName') })

        if (localStorage.getItem('jwtToken') == null) {
            alert('Please Login First')
            this.props.history.push('/login');
        }
        this.getRestaurants();
    }


    addRestaurant = () => {
        this.props.history.push('/dashboard/addRestaurant')
    }
    logoutAdmin = () => {
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('adminName');
        this.props.history.push('/');
    }

    editRestaurant = () => {

        this.props.history.push('/dashboard/editRestaurant');
    }


    deleteRestaurant = (event) => {

        const confm = window.confirm("Are you sure to delete this record?")
        if (confm) {
            axios.delete(`http://localhost:8000/delete/${event}`)
            window.location.reload();
        }
    }

    getRestaurants = () => {
        axios.get('http://localhost:8000')
            .then((res) => {
                this.setState({ restaurantDetails: res.data })



            })
            .catch((err) => console.log(err))
    }
    detailHandler = (event) => {
        let id = event;
        console.log(event)
        this.props.history.push(`/restaurantDetails/${id}`)
    }

    render() {
        return (
            <div>
                {/* navBar here */}
                <Navbar />
                <div>

                    <h2 style={{ "marginTop": 30 }}> Welcome  {this.state.adminName}</h2>
                    <button className='btn btn-dark float-end' style={{ "marginRight": 200, "marginTop": 10 }} onClick={this.logoutAdmin}>Logout</button>

                    <button className='btn btn-success float-end' style={{ "marginRight": 50, "marginTop": 10 }} onClick={this.addRestaurant}>Add Restaurent</button>

                </div>
                <br></br>
                <div>
                </div>


                <table className="table" style={{ "border": "10px solid rgb(194, 194, 194)", "marginTop": 50 }}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Restaurnat Name</th>
                            <th scope="col">Restaurant address</th>
                            <th scope="col">Restaurant Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>{
                        this.state.restaurantDetails.map((restaurant, index) => {
                            return (<tr scope="row" key={restaurant._id}>
                                <td> {restaurant.restaurant_no}</td>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.address}</td>
                                {restaurant.tag ? <td>Active</td> : <td>In-Active</td>}
                                <td>
                                    <button className='btn btn-success' style={{ "marginRight": 5 }}
                                        onClick={() => this.detailHandler(restaurant._id, index)}>View</button>
                                    <Link className='btn btn-primary' style={{ "marginRight": 5 }} to={`/dashboard/editRestaurant/${restaurant._id}`} >Edit Restaurant</Link>
                                    <button className='btn btn-danger'
                                        onClick={() => this.deleteRestaurant(restaurant._id, index)}>Delete</button>

                                </td>
                            </tr>)

                        })
                    }

                    </tbody>
                </table>

            </div>
        )
    }
}

export default Dashboard
