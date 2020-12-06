/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-loop-func */
import { createStore as reduxCreateStore, combineReducers, StoreCreator } from 'redux';

export * from 'react-redux';
type PickObject<Obj extends any, Key extends keyof Obj, Prop extends any> = Obj[Key][Prop];
type SetState<T> = (payload: Partial<T>) => void;
export type Store = {
    [key: string]: {
        state: {
            [key: string]: any;
        };
        actions: {
            [key: string]: (...payload: any) => Object;
        };
    };
};
export type StatesType<T> = {
    [key in keyof T]: PickObject<T, key, 'state'>;
};
export type ActionsType<T> = {
    [key in keyof T]: PickObject<T, key, 'actions'> & {
        setState: SetState<StatesType<T>[key]>;
    };
};
export interface GetState<State> {
    <T extends keyof State>(type: T): State[T];
    (): State;
}

export interface UseSelector<State> {
    <T>(mapState: (state: State) => T): T;
}

type CreateStoreReturnType = {
    store: ReturnType<StoreCreator>;
    actions: any;
};

function createStore(store: Store, ...arg: any): CreateStoreReturnType {
    const actions: any = {};
    const reducers = {};
    let reduxStore: any;
    Object.keys(store).forEach((i) => {
        (actions as any)[i] = {};
        for (const k in store[i].actions) {
            (actions as any)[i][k] = async (...payload: any) => {
                const result = await store[i].actions[k](...payload);
                if (result?.constructor === Object) {
                    reduxStore.dispatch({
                        type: `${i}.${k}`,
                        payload: result,
                    });
                }
                return result;
            };
        }
        (actions as any)[i].setState = (payload: any) => {
            reduxStore.dispatch({
                type: `${i}.setState`,
                payload,
            });
        };
        (reducers as any)[i] = (state = store[i].state, a: any) => {
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
