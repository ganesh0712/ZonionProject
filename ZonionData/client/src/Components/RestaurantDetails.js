import axios from 'axios';
import React, { Component } from 'react'
import Navbar from './Navbar';

export class RestaurantDetails extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            address: '',
            phoneNo: null,
            restaurant_no: '',
            imageUrl: [],
            tag: false,
            openTime: '',
            closeTime: ''
        }
    }


    componentDidMount = () => {
        const id = this.props.match.params.id;
        console.log(id)
        axios.get(`http://localhost:8000/${id}`)
            .then((res) => {
                console.log(res)
                this.setState({
                    name: res.data.name,
                    address: res.data.address,
                    phoneNo: res.data.phoneNo,
                    restaurant_no: res.data.restaurant_no,
                    imageUrl: res.data.imageUrl,
                    tag: res.data.tag,
                    openTime: res.data.openTime,
                    closeTime: res.data.closeTime
                })
            })
    }







    render() {
        return (
            <div>
                <Navbar />
                <div className="container">


                    <div>
                        <h1>{this.state.name}</h1>
                        <table className="table">
                            <img src={this.state.imageUrl} width="200" height="200" />
                            <br></br>
                            <br></br>
                            <h4>Restaurant ID : {this.state.restaurant_no}</h4>
                            <h4> Address : {this.state.address}</h4>
                            <h4>Phone Number : +91&nbsp;{this.state.phoneNo}</h4>
                            <h5>Opening Time : {this.state.openTime}</h5>
                            <h5>Closing Time : {this.state.closeTime}</h5>



                        </table>

                    </div>
                </div>
            </div>
        )
    }
}

export default RestaurantDetails
