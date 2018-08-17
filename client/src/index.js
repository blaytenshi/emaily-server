// Data layer control (Redux)
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

const store = createStore( // creates a new instance of a redux store, takes in three parameters
    () => [], // dummy reducer, just a function that returns an array (will be replaced later)
    {}, // initial state relevant to server side rendering, we don't really care in our case so we pass in an empty object
    applyMiddleware()); // will add in redux thunk later

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);