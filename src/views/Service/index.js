import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const ServiceView = React.lazy(() => import('./view'));
const ServiceInsert = React.lazy(() => import('./insert'));
const ServiceUpdate = React.lazy(() => import('./update'));

class EmployeeMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/service" name="Login Page" render={props => <ServiceView {...props} />} />
            <Route exact path="/service/insert" name="Login Page" render={props => <ServiceInsert {...props} />} />
            <Route exact path="/service/update/:service_id" name="Login Page" render={props => <ServiceUpdate {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (EmployeeMain);
