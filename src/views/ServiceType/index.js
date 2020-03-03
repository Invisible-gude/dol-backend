import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const ServiceTypeView = React.lazy(() => import('./view'));
const ServiceTypeInsert = React.lazy(() => import('./insert'));
const ServiceTypeUpdate = React.lazy(() => import('./update'));

class EmployeeMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/servicetype" name="Login Page" render={props => <ServiceTypeView {...props} />} />
            <Route exact path="/servicetype/insert" name="Login Page" render={props => <ServiceTypeInsert {...props} />} />
            <Route exact path="/servicetype/update/:service_type_id" name="Login Page" render={props => <ServiceTypeUpdate {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (EmployeeMain);
