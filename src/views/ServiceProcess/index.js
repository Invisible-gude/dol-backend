import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const ServiceProcessView = React.lazy(() => import('./view'));
const ServiceProcessInsert = React.lazy(() => import('./insert'));
const ServiceProcessUpdate = React.lazy(() => import('./update'));

class ServiceProcessMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/serviceprocess" name="Login Page" render={props => <ServiceProcessView {...props} />} />
            <Route exact path="/serviceprocess/insert" name="Login Page" render={props => <ServiceProcessInsert {...props} />} />
            <Route exact path="/serviceprocess/update/:service_process_id" name="Login Page" render={props => <ServiceProcessUpdate {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (ServiceProcessMain);
