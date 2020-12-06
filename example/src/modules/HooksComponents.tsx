import React, { useEffect } from 'react';
import { useSelector, actions } from '../utils/redux';

interface Props {
    id: number;
}

export default (props: Props) => {
    const global = useSelector((state) => state.global);

    useEffect(() => {
        // actions.global.getUserInfo();
        actions.global.setState({ name: '999' });
    }, []);
    console.log(global, props.id);

    return <div />;
};
