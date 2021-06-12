import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PublicLayout from './shared/PublicLayout';
import PrivateLayout from './shared/PrivateLayout';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Login from './pages/Login';


const Routes = () => {
  return ( 
    <BrowserRouter> 
      <Switch>          
        <PublicLayout exact path='/' component={ Home } />
        <PublicLayout exact path='/login' component={ Login } />

        <PrivateLayout exact path='/browse' component={ Browse } />        
      </Switch> 
    </BrowserRouter>
  );
};

export default Routes;