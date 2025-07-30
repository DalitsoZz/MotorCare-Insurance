import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css'
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import VehicleDetails from "./pages/VehicleDetails";
import DriverDetails from "./pages/DriverDetails";
import CoverageOptions from "./pages/CoverageOptions";
import QuoteSummary from "./pages/QuoteSummary";
import About from "./pages/About";
import ProtectedRoute from "./components/ProtectedRoute";
import GlobalProgress from "./components/GlobalProgress";

export default function App() {
  return (
    <div className="app">
      <Router basename="/MotorCare_Insurance">
        <GlobalProgress />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/about" component={About} />
          
          {/* Protected Routes - Require Authentication */}
          <ProtectedRoute exact path="/vehicle-details" component={VehicleDetails} />
          <ProtectedRoute exact path="/driver-details" component={DriverDetails} />
          <ProtectedRoute exact path="/coverage-options" component={CoverageOptions} />
          <ProtectedRoute exact path="/quote-summary" component={QuoteSummary} />
        </Switch>
      </Router>
    </div>
  )
}
