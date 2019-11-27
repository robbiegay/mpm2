import React from 'react';
import ReactDOM from 'react-dom';
import Visuals from './Visuals';
import TestFromAudio from './TestFromAudio';
import TestFromGen from './TestFromGen';
import Synth from './Synth';
import Controller from './Controller';
import SynthVisuals from './SynthVisuals';
import ToneGenPts from './ToneGenPts';
import NewSynthVisuals from './NewSynthVisuals';
import NewSynthVisuals2 from './NewSynthVisuals2';


class Layout extends React.Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     synth: null
        // }
        // this.setSynth = this.setSynth.bind(this);
    }
    // setSynth(synth) {
    //     this.setState({ synth: synth });
    // }
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {/* <Visuals /> */}
                            {/* <TestFromGen
                                // synth={this.state.synth}
                                name="pts-react"
                                background="#0cf"
                                credit="This is a visualizer"
                            /> */}

                            {/* <SynthVisuals name="pts-react" background="#0cf" credit="This is a visualizer" /> */}
                            {/* <Synth
                            // setSynth={this.setSynth}
                            /> */}
                            {/* <ToneGenPts /> */}


                            {/* New component */}
                            {/* <TestFromAudio name="pts-react" background="#0cf" credit="This is a visualizer" /> */}
                            <NewSynthVisuals name="pts-react" background="#0cf" credit="This is a visualizer" />
                            {/* <NewSynthVisuals2 name="pts-react" background="#0cf" credit="This is a visualizer" /> */}
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
