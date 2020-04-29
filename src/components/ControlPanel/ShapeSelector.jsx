import React, { Component } from 'react';
import iconCircle from '../../img/shape-circle.png';
import iconSquare from '../../img/shape-square.png';
import iconTriangle from '../../img/shape-triangle.png';
import iconX from '../../img/shape-X.png';
import selected from '../../img/selected.png';
import notSelected from '../../img/notSelected.png';

import { connect } from 'react-redux';
import { set } from '../../actions';

class ShapeSelector extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shapes: [iconCircle, iconSquare, iconTriangle, iconX],
        };
    }

    render() {
        const selector = this.props.state.find((obj) => obj.key === this.props.name);
        const currentSelected = selector.val;
        return (
            <div className="w-30% my-auto p-6 inline-block flex flex-col">
                <div className="mb-4 text-center text-white text-lg">{selector.label}</div>
                <div className={`grid grid-cols-${this.props.shapeNum} grid-rows-2 gap-2`}>
                    {this.state.shapes.map((shape, index) => {
                        if (index <= this.props.shapeNum - 1) {
                            return (
                                <React.Fragment key={index}>
                                    <button
                                        className={`mx-auto
                                        col-start-${index + 1} 
                                        col-end-${index + 2} 
                                        row-start-1 row-end-2`}
                                        onClick={() => this.props.set(this.props.name, index + 1)}
                                    >
                                        <img src={shape} />
                                    </button>
                                    <div
                                        className={`my-auto 
                                        col-start-${index + 1} 
                                        col-end-${index + 2} 
                                        row-start-2 row-end-3`}
                                    >
                                        <img
                                            className="mx-auto w-50%"
                                            src={
                                                currentSelected === index + 1
                                                    ? selected
                                                    : notSelected
                                            }
                                        />
                                    </div>
                                </React.Fragment>
                            );
                        } else {
                            return null;
                        }
                    })}
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

export default connect(MapState, MapDispatch)(ShapeSelector);
