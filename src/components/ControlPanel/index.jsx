import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement } from '../../actions';
import ShapeSelector from './ShapeSelector';
import Slider from './Slider';

class ControlPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const splitShape = this.props.state.find(
            (prop) => prop.key === `screenSplitShape-${this.props.n}`,
        ).val;
        return (
            <div className="mx-auto w-1/2 h-auto my-8 flex flex-wrap justify-around">
                <ShapeSelector name={`basicShape-${this.props.n}`} shapeNum={4} />
                <Slider name={`basicShapeSize-${this.props.n}`} />
                <ShapeSelector name={`screenSplitShape-${this.props.n}`} shapeNum={2} />
                <Slider name={`screenSplitNum-${this.props.n}`} />
                {splitShape === 1 ? <Slider name={`screenSplitSpread-${this.props.n}`} /> : null}
                <Slider name={`shapeHue-${this.props.n}`} />
                <Slider name={`offsetX-${this.props.n}`} />
                <Slider name={`offsetY-${this.props.n}`} />
            </div>
        );
    }
}

const MapState = (state) => ({
    state: state.selector,
});

const MapDispatch = { increment, decrement };

export default connect(MapState, MapDispatch)(ControlPanel);
