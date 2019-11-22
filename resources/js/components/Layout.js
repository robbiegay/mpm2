import React, { useState } from 'react'; //createContext
import ReactDOM from 'react-dom';
import Visuals from './Visuals';
import Synth from './Synth';
import Knob from './Knob';
import Button from './Knob';
import ReverbDryWet from './ReverbDryWet';

// export const AppContext = createContext({ value: 0.5 });

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 400,
            reverbDryWet: 0.5,
        };
        this.setValue = this.setValue.bind(this);
    }

    setValue(val) {
        this.setState({ value: val });
    }

    setReverb(val) {
        this.setState({ reverbDryWet: val });
    }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {/* <Visuals /> */}
                            <Synth freq={this.state.value} />
                            {/* <Knob /> */}
                            {/* <Button propVal={this.setValue} reverbDryWet={this.setReverb} /> */}
                            {/* <ReverbDryWet /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('layout')) {
    ReactDOM.render(<Layout />, document.getElementById('layout'));
}
