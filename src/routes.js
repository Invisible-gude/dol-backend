import React from 'react';

const Employee = React.lazy(() => import('./views/Employee'));


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/employee', name: 'Employee', component: Employee },


];

export default routes;
