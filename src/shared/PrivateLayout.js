import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './helper';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivateLayout = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuth()  ? (
              <React.Fragment>
                <Header />
                <Component {...props} />
                <Footer />
              </React.Fragment>
              
            ) : (
                <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: props.location }
                    }}
                />
            )
        }
    ></Route>
);

export default PrivateLayout;