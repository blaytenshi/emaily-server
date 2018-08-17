// Data layer control (Redux)
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import 'materialize-css/dist/css/materialize.min.css'; // non-javascript files need their extension

const store = createStore( // creates a new instance of a redux store, takes in three parameters
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), // put here so we can inspect the redux state in browser. can remove later.
    applyMiddleware()); // will add in redux thunk later

ReactDom.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root')
);