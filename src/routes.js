import React from 'react';

const Employee = React.lazy(() => import('./views/Employee'));
const Department = React.lazy(() => import('./views/Department'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/employee', name: 'Employee', component: Employee },
  { path: '/department', name: 'Department', component: Department },



];

export default routes;
