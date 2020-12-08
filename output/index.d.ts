import { StoreCreator } from 'redux';
export * from 'react-redux';
declare type SetState<T> = (payload: Partial<T>) => void;
export declare type Reducers = {
    [key: string]: {
        state: {
            [key: string]: any;
        };
        actions: {
            [key: string]: (...payload: any) => Object;
        };
    };
};
export declare type StatesType<T extends Reducers> = {
    [key in keyof T]: T[key]['state'];
};
export declare type ActionsType<T extends Reducers> = {
    [key in keyof T]: T[key]['actions'] & {
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
declare type CreateStoreReturnType = {
    store: ReturnType<StoreCreator>;
    actions: any;
};
declare function createStore(store: Reducers, ...arg: any): CreateStoreReturnType;
export { createStore };
