import React from 'react';
import Dashboard from '../components/partial/Dashboard';
import Product from '../components/partial/Product';
import User from '../components/partial/User';
import AdminChart from '../components/partial/AdminChart';
import Store from '../components/partial/Store';
import AddUser from '../components/partial/AddUser';
import Bill from '../components/partial/Bill';
import Employee from '../components/partial/Employee';

export const routes = [
  {
    path: '/',
    main: () => <Dashboard />
  },
  {
    path: '/products',
    main: () => <Product />
  },
  {
    path: '/users',
    main: () => <User />
  },
  {
    path: '/charts',
    main: () => <AdminChart />
  },
  {
    path: '/stores',
    main: () => <Store />
  },
  {
    path: '/users/add',
    main: () => <AddUser />
  },
  {
    path: '/bills',
    main: () => <Bill />
  },
  {
    path: '/employees',
    main: () => <Employee />
  }
];
