import React from 'react';
import App from './App';
import Auth from './js/redux/components/views/Auth';
import Login from './js/redux/components/views/Login';
import Register from './js/redux/components/views/Register';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import renderer from 'react-test-renderer';

it('renders without crashing', () => {
    const rendered = renderer.create(<App />).toJSON();
    expect(rendered).toBeTruthy();
});

it('renders the auth screen properly', () => {
    const rendered = renderer.create(<Auth />).toJSON();
    expect(rendered).toBeTruthy();
});

it('has a login form', () => {
    const rendered = renderer.create(<Login />).toJSON(),
        instance = rendered.root;

    expect(instance.findByType(Form).props.ref).toBe('form');
});

it('has a register form', () => {
    const rendered = renderer.create(<Register />).toJSON(),
        instance = rendered.root;

    expect(instance.findByType(Form).props.ref).toBe('form');
});