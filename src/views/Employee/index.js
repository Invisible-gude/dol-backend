import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const EmployeeView = React.lazy(() => import('./view'));
const EmployeeInsert = React.lazy(() => import('./insert'));

class EmployeeMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/employee" name="Login Page" render={props => <EmployeeView {...props} />} />
            <Route exact path="/employee/insert" name="Login Page" render={props => <EmployeeInsert {...props} />} />
            {/* <Route exact path="/customer/update/:customer_code" name="Login Page" render={props => <CustomerUpdate {...props} />} /> */}
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (EmployeeMain);
