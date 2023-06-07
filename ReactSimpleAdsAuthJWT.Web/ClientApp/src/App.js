import React, { Component } from 'react';
import { Route } from 'react-router';
import Home from './Pages/Home';
import AddAd from './Pages/AddAd';
import MyAds from './Pages/MyAds';
import Layout from './Layout';
import Login from './Pages/Login';
import Logout from './Pages/Logout';
import SignUp from './Pages/SignUp';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import Ad from './Components/Ad';




export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <AuthContextComponent>
                <Layout>
                    <Route exact path='/' component={Home} />
                    <PrivateRoute exact path='/addad' component={AddAd} />
                    <PrivateRoute exact path='/myads' component={MyAds} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/logout' component={Logout} />
                    <Route exact path='/SignUp' component={SignUp} />
                </Layout>
            </AuthContextComponent>
        );
    }
}