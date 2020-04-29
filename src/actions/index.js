export const increment = (key, option) => {
    return {
        type: 'increment',
        key: key,
        option: option,
    };
};

export const decrement = (key, option) => {
    return {
        type: 'decrement',
        key: key,
        option: option,
    };
};

export const set = (key, option) => {
    return {
        type: 'set',
        key: key,
        option: option,
    };
};

export const toggle = () => {
    return {
        type: 'toggle',
    };
};
