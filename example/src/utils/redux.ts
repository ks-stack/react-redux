/* eslint-disable import/no-mutable-exports */
// 该文件使用时直接复制，仅做类型导出和store隔离(即context)
import React from 'react';
import {
    createStore as CommonCreateStore,
    Store,
    GetState,
    createSelectorHook,
    UseSelector,
    StatesType,
    ActionsType,
    connect as reduxConnect,
    Connect,
} from 'react-redux-easy';
import type { Reducers } from '../models';

type Actions = ActionsType<Reducers>;
type State = StatesType<Reducers>;

let actions: Actions;
let store: any;
let context: React.Context<any>;

function createStore<T extends Store>(reducers: T) {
    const res = CommonCreateStore(reducers);
    actions = res.actions;
    store = res.store;
    context = React.createContext({ store, getState });
    return res.store;
}

const getState: GetState<State> = (type?: any) => (type ? store.getState()[type] : store.getState());

const useSelector: UseSelector<State> = (arg: any) => createSelectorHook(context)(arg);

const connect: Connect = (...arg: any) => reduxConnect(arg[0], arg[1], arg[2], { ...arg[3], context });

export { actions, createStore, context, getState, useSelector, connect };
export type { Actions, State };
export * from 'react-redux';
