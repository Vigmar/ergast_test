import { createStore, combineReducers } from 'redux';
import pageReducer from '../reducers/pageReducer';
import racesReducer from '../reducers/racesReducer';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
const rootReducer = combineReducers(
    { pageList: pageReducer, raceList: racesReducer }
);
const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}
export default configureStore;