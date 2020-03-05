import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
// Pages
const TaskView = React.lazy(() => import('./view'));
const TaskInsert = React.lazy(() => import('./insert'));
const TaskUpdate = React.lazy(() => import('./update'));
const TaskDetail = React.lazy(() => import('./detail'));

class TaskMain extends Component {

  render() {
    return (
        <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
          <Route exact path="/task" name="Login Page" render={props => <TaskView {...props} />} />
            <Route exact path="/task/insert" name="Login Page" render={props => <TaskInsert {...props} />} />
            <Route exact path="/task/detail/:task_id" name="Login Page" render={props => <TaskDetail {...props} />} />
            <Route exact path="/task/update/:task_id" name="Login Page" render={props => <TaskUpdate {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}


export default (TaskMain);
