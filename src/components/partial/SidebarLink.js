import { Link, Route } from 'react-router-dom';
import React from 'react';

export default function SidebarLink({ label, to, icon, exact, isSidebarFull }) {
  return (
    <Route path={to} exact={exact} children={({ match }) => {
      const classes = isSidebarFull ? `${icon} mr-2` : icon;
      const linkClass = isSidebarFull ? 'nav-link sidebar-link' : 'nav-link sidebar-link text-center';
      return (
        <li className={match ? "nav-item active" : "nav-item"} >
          <Link className={linkClass} to={to}>
            <span className={classes}></span> {!isSidebarFull || label}</Link>
        </li>
      )
    }} />
  )
}