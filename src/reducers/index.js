import { combineReducers } from 'redux';
import selectorReducer from './selector';
import powerReducer from './power';

const allReducers = combineReducers({
    selector: selectorReducer,
    power: powerReducer,
});

export default allReducers;
