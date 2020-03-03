import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const ProcessView = React.lazy(() => import('./view'));
const ProcessInsert = React.lazy(() => import('./insert'));
const ProcessUpdate = React.lazy(() => import('./update'));

class ProcessMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/process" name="Login Page" render={props => <ProcessView {...props} />} />
          <Route exact path="/process/insert" name="Login Page" render={props => <ProcessInsert {...props} />} />
          <Route exact path="/process/update/:process_id" name="Login Page" render={props => <ProcessUpdate {...props} />} /> 
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (ProcessMain);
