import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
          <React.Fragment>
            <Header />
            <Component {...props} />
            <Footer />
          </React.Fragment>
        }
    ></Route>
);

export default PublicLayout;