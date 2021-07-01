import React, { Component } from 'react'
import axios from 'axios'
import Navbar from './Navbar'
import '../style/Home.css'
export class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            restaurantDetails: [],
            name: "",
            address: '',
            phoneNo: '',
            restaurant_no: '',
            imageUrl: [],
            tag: false,
            search: '',
           
        }
    }
    componentDidMount() {
        this.getRestaurants();
    }

    getRestaurants = () => {
        axios.get('http://localhost:8000')
            .then((res) => {
                this.setState({ restaurantDetails: res.data })

                // res.data.map(restaurant=>{
                //     this.setState({restaurantDetails: (restaurant)})
                // })
                console.log(this.state.restaurantDetails)


            })
            .catch((err) => console.log(err))
    }


   

    detailHandler = (event) => {
        let id = event;
        console.log(event)
        this.props.history.push(`/restaurantDetails/${id}`)
    }

    onLoginClick = () => {

        this.props.history.push('/login');
    }
  


    render() {
        let search = this.state.search
        return (
            <div>
                <Navbar />
                <div className="container">


                    <br></br>
                    <form class="form-inline">
                <button className='btn btn-dark float-end' style={{ "marginRight": 80,"marginLeft":20  ,"marginBottom": 50 }} onClick={this.onLoginClick}> Login</button>

                <input className="form-control float-start" name="search"
                 style={{"width":"450px",
                 "marginLeft":"100px",
                 "backgroundColor":"transparent",
                 "border": "3px solid rgb(180, 177, 177)"}} 
                 onChange={(e)=>{this.setState({[e.target.name]:e.target.value})}} 
                type="search" placeholder="Search" aria-label="Search"/>

  </form>
  {console.log(search)}

                    <div >
                    
                        <br></br>
                        <br></br>
                        <table className="table mytable" >
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Restaurnat Name</th>
                                    <th scope="col">Restaurant address</th>
                                    <th scope="col">View Details</th>
                                    {/* <th scope="col">Restaurant Image</th> */}
                                </tr>
                            </thead>
                            <tbody>{
                                this.state.restaurantDetails.filter((restaurant)=>{
                                    if(search==""){
                                        return restaurant
                                 }
                                 else if(restaurant.name.toLowerCase().includes(search.toLowerCase())) {
                                     return restaurant
                                 }
                                }).map((restaurant, index) => {
                                    if (restaurant.tag === true) {
                                        return (
                                            <tr scope="row" key={restaurant._id}>
                                                <td> {restaurant.restaurant_no}</td>
                                                <td>{restaurant.name}</td>
                                                <td>{restaurant.address}</td>
                                                {/* {console.log(restaurant._id)} */}
                                                <td><button className="btn btn-primary" onClick={() => { this.detailHandler(restaurant._id, index) }}>View Details</button></td>

                                                {/* <td><img src={restaurant.imageUrl} width="100" height="100" /></td> */}
                                            </tr>)

                                    }
                                })
                            }

                            </tbody>
                        </table>
                       



                    </div>
                </div>
            </div>

        )
    }
}

export default Home
