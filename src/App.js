import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signin from './Signin';
import Signup from './Signup';
import Dashboard from './Dashboard';
import { Redirect } from 'react-router';
import './App.css';

class App extends React.Component { 
  constructor(props) {
  	super(props)
    this.userData = JSON.parse(localStorage.getItem("userData"));

    this.Routes = [
      {
        path: "/login",
        exact: true,
        component: Signin,
        title: "login",
      },
      {
        path: "/signup",
        exact: true,
        component: Signup,
        title: "signup",
      },
      {
        path: "/",
        exact: true,
        component: Dashboard,
        title: "home",
      }
    ];
  }

 isAllowed = (props, RouteComponent, title) => {
   console.log('title', title)
   if (this.userData) {
     if (title == "home") {
       return <RouteComponent {...props} />;
     }
     return <Redirect to="/" />;
   } else if (title === "signup") {
      return <RouteComponent {...props} />;
   } else if (title === "home") {
      return <Redirect to="/login" />;
   } else if (title === "login") {
      return <RouteComponent {...props} />;
   }
 };

  render() {
    return (
      <Router>
      {this.getUserData}
      <div>
        <main>
          <Switch>
            {this.Routes.map((route, i) => (
              <Route
               key={i}
               exact={route.exact}
               path={route.path}
               render={props =>
                 this.isAllowed(props, route.component, route.title)
               }
              />
             ))}
         </Switch>
        </main>
      </div>
      </Router>
    );
  }
}

export default App;
