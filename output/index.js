var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createStore as reduxCreateStore, combineReducers } from 'redux';
export * from 'react-redux';
function createStore(store, ...arg) {
    const actions = {};
    const reducers = {};
    let reduxStore;
    Object.keys(store).forEach((i) => {
        actions[i] = {};
        for (const k in store[i].actions) {
            actions[i][k] = (...payload) => __awaiter(this, void 0, void 0, function* () {
                const result = yield store[i].actions[k](...payload);
                if ((result === null || result === void 0 ? void 0 : result.constructor) === Object) {
                    reduxStore.dispatch({
                        type: `${i}.${k}`,
                        payload: result,
                    });
                }
                return result;
            });
        }
        actions[i].setState = (payload) => {
            reduxStore.dispatch({
                type: `${i}.setState`,
                payload,
            });
        };
        reducers[i] = (state = store[i].state, a) => {
            if (a.type.startsWith(`${i}.`)) {
                return Object.assign(Object.assign({}, state), a.payload);
            }
            return state;
        };
    });
    reduxStore = reduxCreateStore(combineReducers(reducers), ...arg);
    return { store: reduxStore, actions };
}
export { createStore };
