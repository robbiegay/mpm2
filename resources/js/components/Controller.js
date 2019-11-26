import React from 'react';
import axios from 'axios';

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: 0,
        }
    }

    render() {
        return (
            <>
                <p><u>SYNTH CONTROLS</u>:</p>
                {/* TIGGER TONE */}
                <button
                    onClick={() => {
                        axios.post('http://127.0.0.1:8000/api/synthparams/trigger', {
                            trigger: this.state.trigger,
                        });
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
                        <label htmlFor="formControlRange">Ping Pong Feedback</label>
                        <input
                            type="range"
                            defaultValue='0'
                            onMouseUp={(e) => {
                                axios.post('http://127.0.0.1:8000/api/synthparams/pingPongFbk', {
                                    pingPongFbk: e.target.value,
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
                        <label htmlFor="formControlRange">Waveshaper Dry/Wet</label>
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
                                axios.post('http://127.0.0.1:8000/api/synthparams/reverbWet', {
                                    reverbWet: e.target.value,
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
