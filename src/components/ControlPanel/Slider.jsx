import React, { Component } from 'react';
import { connect } from 'react-redux';
import { set } from '../../actions';

class Slider extends Component {
    constructor(props) {
        super(props);
    }

    onRangeChange = (e) => {
        this.props.set(this.props.name, e.target.value);
    };

    render() {
        const slider = this.props.state.find((obj) => obj.key === this.props.name);
        return (
            <div className="w-30% my-auto inline-block flex flex-col">
                <div className="mb-4 text-center text-white text-lg">{slider.label}</div>
                <div className="">
                    <input
                        className="w-full"
                        type="range"
                        min={slider.min}
                        max={slider.max}
                        step={slider.step}
                        value={slider.val}
                        onChange={this.onRangeChange}
                    />
                </div>
            </div>
        );
    }
}

const MapState = (state) => {
    return {
        state: state.selector,
    };
};

const MapDispatch = { set };

export default connect(MapState, MapDispatch)(Slider);
