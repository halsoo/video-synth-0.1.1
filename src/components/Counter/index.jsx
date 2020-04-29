import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../actions';

class Counter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="text-white">
                <h3>{this.props.count}</h3>
                <button onClick={() => this.props.increment()}> + </button>
                <button onClick={() => this.props.decrement()}> - </button>
            </div>
        );
    }
}

const MapState = (state) => {
    return {
        count: state.counter,
    };
};

const MapDispatch = { increment, decrement };

export default connect(MapState, MapDispatch)(Counter);
