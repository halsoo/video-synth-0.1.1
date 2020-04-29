import config from '../lib/config';

const getFromData = (key, data) => {
    return data.find((item) => item.key === key);
};

const stateInitVal = (data) => {
    return data.map((item) => {
        return {
            key: item.key,
            label: item.label,
            val: item.init,
            min: item.min,
            max: item.max,
            step: item.step,
        };
    });
};

const selectorReducer = (state = stateInitVal(config.sliders), action) => {
    const stateSlider = getFromData(action.key, state);

    switch (action.type) {
        case 'increment': {
            if (stateSlider.val < stateSlider.max) {
                stateSlider.val = stateSlider.val + action.option / stateSlider.step;
            }

            let newState = [...state];
            newState = newState.map((obj) => {
                if (obj.key === stateSlider.key) {
                    return stateSlider;
                } else {
                    return obj;
                }
            });

            return newState;
        }

        case 'decrement': {
            if (stateSlider.val < stateSlider.max) {
                stateSlider.val = stateSlider.val - action.option / stateSlider.step;
            }

            let newState = [...state];
            newState = newState.map((obj) => {
                if (obj.key === stateSlider.key) {
                    return stateSlider;
                } else {
                    return obj;
                }
            });

            return newState;
        }

        case 'set': {
            stateSlider.val = action.option;

            let newState = [...state];
            newState = newState.map((obj) => {
                if (obj.key === stateSlider.key) {
                    return stateSlider;
                } else {
                    return obj;
                }
            });

            return newState;
        }
        default:
            return state;
    }
};

export default selectorReducer;
