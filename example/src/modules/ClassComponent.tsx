import React from 'react';
import { connect, State, actions } from '../utils/redux';

const mapState = (state: State) => ({
    global: state.global,
});
interface Props {
    id: number;
}

class Test extends React.PureComponent<ReturnType<typeof mapState> & Props> {
    async componentDidMount() {
        await actions.global.getUserInfo();
        actions.global.setState({ name: '' });
    }

    render() {
        const { global, id } = this.props;

        console.log(global, id);
        return <div />;
    }
}

export default connect(mapState)(Test);
