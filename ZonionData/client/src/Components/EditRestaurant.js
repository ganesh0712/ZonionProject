import axios from 'axios'
import React, { Component } from 'react'
import Navbar from './Navbar'
import Switch from "react-switch";
export class EditRestaurant extends Component {
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
    componentDidMount() {
        if (localStorage.getItem('jwtToken') == null) {
            alert('Please Login First')
            this.props.history.push('/login');
        }

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

    onChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });

    }


    validatetion = (e) => {
        e.preventDefault();

        let isvalid = true;
        var regex = /[A-Za-z0-9]/;
        if (!this.state.name.match(regex)) {
            alert('Please input alphanumeric characters only');
            return isvalid = false
        }
        console.log(this.state.phoneNo)
        let pattern = /^[7-9][0-9]{9}$/;
        let verifyno = pattern.test(this.state.phoneNo)
        console.log(verifyno)
        if (verifyno == false) {
            alert('Please Enter Correct Phone No')
            return isvalid = false
        }

        return isvalid
    }

    handleChange = (tag) => {
        this.setState({ tag });
        console.log(this.state.tag)
    }

    handleSubmit = (e) => {

        const id = this.props.match.params.id;
        const restaurant_data = {
            name: this.state.name,
            address: this.state.address,
            phoneNo: this.state.phoneNo,
            restaurant_no: this.state.restaurant_no,
            imageUrl: this.state.imageUrl,
            tag: this.state.tag,
            openTime: this.state.openTime,
            closeTime: this.state.closeTime
        }
        if (this.validatetion(e)) {
            axios.put(`http://localhost:8000/update/${id}`, restaurant_data)
                .then(res => {
                    console.log("Updated Successfully")
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
            <div> <Navbar />
                <div className='container'>
                    <h1 style={{ marginTop: "10px" }}>Edit Restaurant</h1>
                    <br></br>
                    <form className="col-8" style={{ marginLeft: "220px", marginTop: "10px" }}    >
                        <div className="form-group">
                            <label for="exampleInputEmail1">Restaurant Name</label>
                            <input type="text"
                                className="form-control"
                                id="name"
                                value={this.state.name}
                                onChange={this.onChange}
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
                            <input type="file"
                                accept=".jpg,.png"
                                className="form-control-file"
                                id="img_upload"
                                onChange={this.uploadFile}
                            />
                        </div>


                        <div>
                            <label htmlFor="normal-switch">
                                <span>Switch with default style</span>
                                <Switch
                                    onChange={this.handleChange}
                                    checked={this.state.tag}
                                    className="react-switch"
                                    id="normal-switch"
                                />
                            </label>
                            <p>The switch is <span>{this.state.checked ? 'on' : 'off'}</span>.</p>
                        </div>

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

export default EditRestaurant
