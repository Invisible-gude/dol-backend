import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const ServiceGroupView = React.lazy(() => import('./view'));
const ServiceGroupInsert = React.lazy(() => import('./insert'));
const ServiceGroupUpdte = React.lazy(() => import('./update'));

class EmployeeMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/servicegroup" name="Login Page" render={props => <ServiceGroupView {...props} />} />
            <Route exact path="/servicegroup/insert" name="Login Page" render={props => <ServiceGroupInsert {...props} />} />
            <Route exact path="/servicegroup/update/:service_group_id" name="Login Page" render={props => <ServiceGroupUpdte {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (EmployeeMain);
