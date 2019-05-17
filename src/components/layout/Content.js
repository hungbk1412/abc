import React, { Component } from 'react';
import '../../stylesheet/layout/Content.css';
import { Route, Switch } from 'react-router-dom';
import { routes } from '../../utils/routes';
import NotFound from '../partial/NotFound';

export class Content extends Component {
  render() {
    return (
      <div className='main-content'>
        <Switch>
          {
            routes.map((route, index) => {
              return (
                <Route path={route.path} exact component={route.main} key={index} />
              )
            })
          }
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

export default Content
