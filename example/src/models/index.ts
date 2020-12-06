import { createStore } from '../utils/redux';
import global from './global';

const reducers = {
    global,
};

const store = createStore(reducers);

export default store;
export type Reducers = typeof reducers;
