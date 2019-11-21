import React, { useState, useEffect } from 'react'; // useContext
import { CircularInput } from 'react-circular-input';
// import { AppContext } from './Layout';

// function Knob() {
//     // let context = useContext(AppContext);
//     const [value, setValue] = useState(0);
//     // console.log(context.value);

//     // useEffect(() => {
//     //     // document.title = 'Hi';
//     //     // layout.props.changePitch();
//     // });

//     return (
//         <CircularInput value={ value } radius={75} onChange={ setValue } />
//     );
// }

// export default Knob;

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           value: 0,
        };
    }

    render() {
        return(
            <button onClick={()=> this.props.propVal(800) }>UP OCTAVE</button>
        );
    }
}

export default Button;
