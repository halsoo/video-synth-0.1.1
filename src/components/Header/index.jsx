import React from 'react';
import power from '../../img/power.png';
import { connect } from 'react-redux';
import { toggle } from '../../actions';

const Header = (props) => (
    <nav className="w-screen my-12 flex flex-col justify-center ">
        <Title name="Video Synthesizer Project" />
        <Title name="v0.1.1 / 2020" />
        <button className="mt-6 mx-auto" onClick={props.toggle}>
            <img className="w-12" src={power} />
        </button>
    </nav>
);

const Title = (props) => <p className="mx-auto font-display text-2xl text-white">{props.name}</p>;

const MapDispatch = { toggle };

export default connect(null, MapDispatch)(Header);
