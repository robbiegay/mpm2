import React from 'react';
import ReactDOM from 'react-dom';
import Visuals from './Visuals';
import TestFromAudio from './TestFromAudio';
import TestFromGen from './TestFromGen';
import Synth from './Synth';
import Controller from './Controller';
import SynthVisuals from './SynthVisuals';

class Layout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {/* <Visuals /> */}
                            {/* <TestFromAudio name="pts-react" background="#0cf" credit="This is a visualizer" /> */}
                            {/* <TestFromGen name="pts-react" background="#0cf" credit="This is a visualizer" /> */}
                            
                            <SynthVisuals name="pts-react" background="#0cf" credit="This is a visualizer" />
                            {/* <Synth /> */}
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

if (document.getElementById('controller')) {
    ReactDOM.render(<Controller />, document.getElementById('controller'));
}
