import { StoreCreator } from 'redux';
export * from 'react-redux';
declare type PickObject<Obj extends any, Key extends keyof Obj, Prop extends any> = Obj[Key][Prop];
declare type SetState<T> = (payload: Partial<T>) => void;
export declare type Store = {
    [key: string]: {
        state: {
            [key: string]: any;
        };
        actions: {
            [key: string]: (...payload: any) => Object;
        };
    };
};
export declare type StatesType<T> = {
    [key in keyof T]: PickObject<T, key, 'state'>;
};
export declare type ActionsType<T> = {
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
declare type CreateStoreReturnType = {
    store: ReturnType<StoreCreator>;
    actions: any;
};
declare function createStore(store: Store, ...arg: any): CreateStoreReturnType;
export { createStore };
