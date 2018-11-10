import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Store } from '../datastore/store';

export const PrivateRoute = ({ component: Component, data, ...rest }) => {

  return (
    <Route
      {...rest}
      render={props =>
        Store.instance.state.isLoggedIn ? (
          <Component {...props} {...data} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}
