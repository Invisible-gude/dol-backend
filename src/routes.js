import React from 'react';

const Employee = React.lazy(() => import('./views/Employee'));
const Department = React.lazy(() => import('./views/Department'));
const Process = React.lazy(() => import('./views/Process'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/employee', name: 'Employee', component: Employee },
  { path: '/department', name: 'Department', component: Department },
  { path: '/process', name: 'Process', component: Process },


];

export default routes;
