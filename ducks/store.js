import { applyMiddleware, createStore } from 'redux';
import { initialState, reducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const loadState = () =>
{
    try
    {
        const state = localStorage.getItem(process.env.DATA_NAME);
        if (state === null)
        {
            return initialState;
        }
        return JSON.parse(state);
    }
    catch (e)
    {
        return undefined;
    }
};

export const saveState = (state) =>
{
    try
    {
        const serialized = JSON.stringify(state);
        localStorage.setItem('spoof-data', serialized);
    }
    catch (e)
    {
        // do nothing
    }
};

const persistedState = loadState();

export const makeStore = () => process.env.NODE_ENV === 'development' ? createStore(reducer, persistedState, composeWithDevTools(applyMiddleware(thunk))) : createStore(reducer, persistedState, applyMiddleware(thunk));