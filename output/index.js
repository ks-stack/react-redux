import { createStore as reduxCreateStore, combineReducers } from 'redux';
export * from 'react-redux';
function createStore(store, ...arg) {
    const actions = {};
    const reducers = {};
    let reduxStore;
    Object.keys(store).forEach((i) => {
        actions[i] = {};
        for (const k in store[i].actions) {
            actions[i][k] = async (...payload) => {
                const result = await store[i].actions?.[k](...payload);
                if (result?.constructor === Object) {
                    reduxStore.dispatch({
                        type: `${i}.${k}`,
                        payload: result,
                    });
                }
                return result;
            };
        }
        actions[i].setState = (payload) => {
            reduxStore.dispatch({
                type: `${i}.setState`,
                payload,
            });
        };
        reducers[i] = (state = store[i].state, a) => {
            if (a.type.startsWith(`${i}.`)) {
                return { ...state, ...a.payload };
            }
            return state;
        };
    });
    reduxStore = reduxCreateStore(combineReducers(reducers), ...arg);
    return { store: reduxStore, actions };
}
export { createStore };
