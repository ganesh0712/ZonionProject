import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from './Components/Home';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import AddRestaurant from './Components/AddRestaurant';
import EditRestaurant from './Components/EditRestaurant';
import RestaurantDetails from './Components/RestaurantDetails';
import AboutUs from './Components/AboutUs';
import ContactUS from './Components/ContactUS';
import pageNotFound from './Components/pageNotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route exact path='/dashboard' component={Dashboard}></Route>
          <Route  path='/dashboard/addRestaurant' component={AddRestaurant}></Route>
          <Route  path='/dashboard/editRestaurant/:id' component={EditRestaurant}></Route>
          <Route path='/restaurantDetails/:id' component={RestaurantDetails} ></Route>
          <Route path='/aboutus' component={AboutUs} />
          <Route path= '/contactus' component={ContactUS}/>
          <Route  component={pageNotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
