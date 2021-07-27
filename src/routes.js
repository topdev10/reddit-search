import React, { Fragment } from 'react';
import { Route, Redirect, Router, Switch } from 'react-router-dom';
import { history } from './helpers';
import {HomePage, TestPage} from './pages';

const Routes = () => {
    return (
        <Router history={history}>
            <Fragment>
                <Switch>
                    <Route path="/home" component = {HomePage} />
                    <Route path="/test" component = {TestPage} />
                    <Redirect from="/" to="/home"></Redirect>
                </Switch>
            </Fragment>
        </Router>
    );
};

export default Routes;