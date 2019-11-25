import React from 'react';
import axios from 'axios';
import { TriggerConsumer } from './TriggerContext'
// import { state } from './Synth';

class Controller extends React.Component {
    constructor(props) {
        super(props);
        // trigger = this.trigger;
        this.state = {
            trigger: 0,
        }
    }
    //     this.getTrigger = this.getTrigger.bind(this);
    //     this.postTrigger = this.postTrigger.bind(this);
    // }

    // async getTrigger() {
    //     await axios.get(`http://127.0.0.1:8000/api/synthparams`)
    //         .then(response => {
    //             this.setState({
    //                 trigger: response.data['trigger'],
    //             });
    //         });
    // }

    // async postTrigger() {
    //     await axios.post('http://127.0.0.1:8000/api/synthparams/trigger', {
    //         trigger: !this.state.trigger,
    //     });
    // }

    render() {
        return (
            <>
                <TriggerConsumer>
                    {props => {
                        return <div>{ props.trigger }</div>
                        // return this.setState({ trigger: props.trigger });
                    }}
                </TriggerConsumer>

                {/* TIGGER TONE */}
                <button
                    onClick={() => {
                        axios.post('http://127.0.0.1:8000/api/synthparams/trigger', {
                            trigger: this.state.trigger,
                        });
                        // e.preventDefault();
                        // this.getTrigger();
                        // setTimeout(this.postTrigger(), 1000);
                    }}
                >PLAY TONE</button>

                {/* CHANGE PITCH */}
                <form>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Pitch</label>
                        <input
                            type="range"
                            defaultValue='400'
                            onMouseUp={(e) => {
                                axios.post('http://127.0.0.1:8000/api/synthparams/pitch', {
                                    pitch: e.target.value,
                                })
                            }}
                            className="form-control-range"
                            min="100"
                            max="1000"
                            step="1"
                        />
                    </div>
                </form>

                {/* PING PONG DELAY FEEDBACK */}
                <form>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Ping Pong Delay Fbk</label>
                        <input
                            type="range"
                            defaultValue='0'
                            onMouseUp={(e) => {
                                axios.post('http://127.0.0.1:8000/api/synthparams/pingPongDelayFbk', {
                                    pingPongDelayFbk: e.target.value,
                                })
                            }}
                            className="form-control-range"
                            min="0"
                            max="1.5"
                            step="0.01"
                        />
                    </div>
                </form>

                {/* CHEBYSHEV WAVESHAPER DRY WET */}
                <form>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Cheb Dry/Wet</label>
                        <input
                            type="range"
                            defaultValue='0'
                            onChange={(e) => {
                                axios.post('http://127.0.0.1:8000/api/synthparams/chebWet', {
                                    chebWet: e.target.value,
                                })
                            }}
                            className="form-control-range"
                            min="0"
                            max="1"
                            step="0.01"
                        />
                    </div>
                </form>

                {/* REVERB DRY WET */}
                <form>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Reverb Dry/Wet</label>
                        <input
                            type="range"
                            defaultValue='0'
                            onChange={(e) => {
                                axios.post('http://127.0.0.1:8000/api/synthparams/reverbDryWet', {
                                    reverbDryWet: e.target.value,
                                })
                            }}
                            className="form-control-range"
                            min="0"
                            max="0.5"
                            step="0.01"
                        />
                    </div>
                </form>
            </>
        );
    }
}


export default Controller;
