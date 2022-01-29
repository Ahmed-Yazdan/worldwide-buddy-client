import './App.css';
import Home from './Pages/Home/Home';
import Plans from './Pages/Plans/Plans';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddPlan from './Pages/AddPlan/AddPlan';
import ManagePlans from './Pages/ManagePlans/ManagePlans';
import Booking from './Pages/Booking/Booking';
import Login from './Pages/Login/Login';
import AuthProvider from './context/AuthProvider';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/Footer/Footer';
import MyPlans from './Pages/MyPlans/MyPlans';
import AllOrders from './Pages/AllOrders/AllOrders';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route exact path="/plans">
              <Plans showNavbar={true} />
            </Route>
            <Route path="/addplan">
              <AddPlan />
            </Route>
            <PrivateRoute path="/manageplans">
              <ManagePlans />
            </PrivateRoute>
            <PrivateRoute exact path="/booking/:id">
              <Booking />
            </PrivateRoute>
            <PrivateRoute exact path="/orders/:email">
              <MyPlans />
            </PrivateRoute>
            <PrivateRoute path="/allorders">
              <AllOrders />
            </PrivateRoute>
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div >
  );
}

export default App;
