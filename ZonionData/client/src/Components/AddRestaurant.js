import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar';
import { MDBTimePicker, MDBCol } from "mdbreact";
export class AddRestaurant extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            address: '',
            phoneNo: null,
            restaurant_no: '',
            imageUrl: [],
            openTime: '',
            closeTime: ''
        }
    }
    componentDidMount() {



        if (localStorage.getItem('jwtToken') == null) {
            alert('Please Login First')
            this.props.history.push('/login');
        }
    }

    onChange = (e) => {

        this.setState({ [e.target.id]: e.target.value });

    }
    validatetion = (e) => {
        e.preventDefault();
        let isvalid = true;
        const { name, address, phoneNo, imageUrl, restaurant_no } = this.state;

        if (name == "" && address == "" && phoneNo == null && imageUrl == "" && restaurant_no == "") {
            alert("Required Fields cannot be Empty");
            return isvalid = false
        }
        var regex = /^[a-zA-Z0-9_ ]*$/;
        if (!this.state.name.match(regex)) {
            alert('Please input alphanumeric characters only');
            return isvalid = false
        }
        let pattern = /[789]{1}[0-9]{9}/;
        if (!this.state.phoneNo.match(pattern)) {
            alert('Please Enter Correct Phone number')
        }

        return isvalid
    }



    handleSubmit = (e) => {
        e.preventDefault();

        const restaurant_data = {
            name: this.state.name,
            address: this.state.address,
            phoneNo: this.state.phoneNo,
            restaurant_no: this.state.restaurant_no,
            imageUrl: this.state.imageUrl,
            openTime: this.state.openTime,
            closeTime: this.state.closeTime
        }

        if (this.validatetion(e)) {
            axios.post("http://localhost:8000/addRestaurant", restaurant_data)
                .then(res => {
                    console.log("Restaurant Added Successfully")
                })
                .catch(err => { console.log(err) })
            this.props.history.push('/dashboard')
        }

    }


    uploadFile = async (e) => {
        e.preventDefault();
        const { files } = document.querySelector('input[type="file"]')
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'np7j3kf6');
        const res = await fetch('https://api.cloudinary.com/v1_1/dmofkib6j/image/upload', {
            method: 'POST',
            body: data
        });
        const file = await res.json();
        console.log(file);
        console.log(file.secure_url);
        console.log(file.original_filename)
        this.setState({
            imageUrl: file.secure_url,
            imageAlt: `An image of ${file.original_filename}`
        })

    }


    render() {

        return (

            <div><Navbar />
                <div className='container' >
                    <h1 style={{ marginTop: "50px", }}>ADD Restaurant</h1>
                    <br></br>
                    <form className="col-8" style={{ marginLeft: "220px", marginTop: "10px" }}    >
                        <div className="form-group">
                            <label for="exampleInputEmail1">Restaurant Name</label>
                            <input type="text"
                                className="form-control"
                                id="name"
                                value={this.state.name}
                                onChange={this.onChange}
                                // pattern= "/[A-Za-z0-9]/ig"
                                placeholder="Enter Name" />

                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Address</label>
                            <input type="text"
                                className="form-control"
                                id="address"
                                placeholder="address"
                                value={this.state.address}
                                onChange={this.onChange} />
                        </div>
                        <div className="form-group">
                            <label for="exampleInputPassword1">Phone Number</label>
                            <input type="number"
                                className="form-control"
                                id="phoneNo"
                                placeholder="Phone Number"
                                value={this.state.phoneNo}
                                onChange={this.onChange} />
                        </div>

                        <div className="form-group">
                            <label for="RestaurantNumber">Restaurant Number</label>
                            <input type="number"
                                class="form-control"
                                id="restaurant_no"
                                placeholder="resturant_no"
                                value={this.state.restaurant_no}
                                onChange={this.onChange} />
                        </div>

                        <br></br>
                        <div className="form-group">
                            <label for="openingTime">Opening Time</label>
                            <input type="time"
                                id="openTime"
                                value={this.state.openTime}
                                onChange={this.onChange} />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label for="closingTime">Closing Time</label>
                            <input type="time"
                                id="closeTime"
                                value={this.state.closeTime}
                                onChange={this.onChange} />
                        </div>
                        <br></br>
                        <div className="form-group">
                            <label for="uploadImage">Upload Image</label>
                            <input
                                type="file"
                                accept=".jpg,.png"
                                className="form-control-file"
                                id="img_upload"
                                onChange={this.uploadFile}
                            />
                        </div>

                        <br></br>
                        <br></br>


                        <button type="submit"
                            class="btn btn-primary"
                            onClick={this.handleSubmit} >Submit</button>
                    </form>












                </div>


            </div>
        )
    }
}

export default AddRestaurant
