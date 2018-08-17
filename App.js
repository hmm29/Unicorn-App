/**
 * Unicorn App
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Application from './js/redux/containers/Application';
import store from './js/redux/store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Application />
            </Provider>
        );
    }
}