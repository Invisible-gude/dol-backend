import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const EmployeeUpdateView = React.lazy(() => import('./view'));

class EmployeeUpdateMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/employee_update" name="Login Page" render={props => <EmployeeUpdateView {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (EmployeeUpdateMain);
