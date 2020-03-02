import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const EmployeeView = React.lazy(() => import('./view'));
const EmployeeInsert = React.lazy(() => import('./insert'));
const EmployeeUpdate = React.lazy(() => import('./update'));

class EmployeeMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/employee" name="Login Page" render={props => <EmployeeView {...props} />} />
            <Route exact path="/employee/insert" name="Login Page" render={props => <EmployeeInsert {...props} />} />
            <Route exact path="/employee/update/:employee_id" name="Login Page" render={props => <EmployeeUpdate {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (EmployeeMain);
