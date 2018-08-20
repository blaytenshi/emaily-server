import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => { // refactored to use currying
    // What we would usually have without redux thunk:
    // Make the request...
    // const request = axios.get('/api/current_user');

    // return an action object with the data inside
    // return {
    //     type: FETCH_USER,
    //     payload: request
    // }

    // Instead we'll have this:
    // We are not returning an action anymore, we're returning a function.
    // The reason for this is that after we wired up the redux-thunk middleware,
    // redux-thunk will look at what is returned from an action creator.
    // If it's a function it will pass in the dispatch function into the returned
    // functions parameters.
    // This allows us to dispatch (or send) an action whenever we want and not IMMEDIATELY
    // if we didn't have redux-thunk.
    // So why do we want to work with redux-thunk right here? well the axios.get is an async
    // function. We have to wait for all the data to come back after the request and THEN
    // dispatch the action with all the data in it.
    const res = await axios.get('/api/current_user');

    dispatch({ type: FETCH_USER, payload: res.data });
}

export const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);

    dispatch({ type: FETCH_USER, payload: res.data });
}