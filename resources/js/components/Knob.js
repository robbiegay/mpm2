import React from 'react';
import { CircularInput } from 'react-circular-input';

function Knob() {
    const [value, setValue] = React.useState(0.5);

    return (
        <CircularInput value={value} radius={75} onChange={setValue} />
    );
}

export default Knob;
