import {combineReducers} from 'redux';

//  reducers
import headerReducer from './HeaderReducer';
import homeReducer from './HomeReducer';
import topicsReducer from './TopicsReducer';
import loginModalReducer from './LoginModalReducer';

let reducers = combineReducers({
    headerState: headerReducer,
    homeState: homeReducer,
    topicState: topicsReducer,
    loginModalState: loginModalReducer
});

export default reducers;