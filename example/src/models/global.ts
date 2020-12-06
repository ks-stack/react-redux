import { actions } from '../utils/redux';

export default {
    state: {
        name: 'test',
    },
    actions: {
        async getUserInfo() {
            actions.global.setState({ name: 'ks' }); // 等同于return { name: 'ks' };
            return { name: 'ks' };
        },
        async init() {
            actions.global.getUserInfo();
        },
    },
};
