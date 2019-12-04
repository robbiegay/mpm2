import React from 'react';
import axios from 'axios';

class Controller extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: 0,
            user: null,
        }
    }

    componentDidMount() {
        axios.post('https://classdemo.localtunnel.me/api/newuser');
        axios.get('https://classdemo.localtunnel.me/api/userid').then(response => {
            // Put all of the user info in state, can then access the id, param_id, and queue_id
            this.setState({ user: response.data });
        });

    }

    render() {
        if (this.state.user) {
            switch (this.state.user['queue_id']) {
                case 1:
                    return (
                        <>
                            <button
                                onClick={() => {
                                    axios.post('https://classdemo.localtunnel.me/api/synthparams/trigger', {
                                        trigger: this.state.trigger,
                                    });
                                }}
                            >PLAY TONE</button>
                        </>
                    );
                case 2:
                    return (
                        <form>
                            <div className='form-group'>
                                <label htmlFor='formControlRange'>Pitch</label>
                                <input
                                    type='range'
                                    defaultValue='400'
                                    onMouseUp={(e) => {
                                        axios.post('https://classdemo.localtunnel.me/api/synthparams/pitch', {
                                            pitch: e.target.value,
                                        })
                                    }}
                                    className='form-control-range'
                                    min='100'
                                    max='1000'
                                    step='1'
                                />
                            </div>
                        </form>
                    );
                case 3:
                    return (
                        <form>
                            <div className='form-group'>
                                <label htmlFor='formControlRange'>Ping Pong Feedback</label>
                                <input
                                    type='range'
                                    defaultValue='0'
                                    onMouseUp={(e) => {
                                        axios.post('https://classdemo.localtunnel.me/api/synthparams/pingPongFbk', {
                                            pingPongFbk: e.target.value,
                                        })
                                    }}
                                    className='form-control-range'
                                    min='0'
                                    max='1.5'
                                    step='0.01'
                                />
                            </div>
                        </form>
                    );
                case 4:
                    return (
                        <form>
                            <div className='form-group'>
                                <label htmlFor='formControlRange'>Waveshaper Dry/Wet</label>
                                <input
                                    type='range'
                                    defaultValue='0'
                                    onMouseUp={(e) => {
                                        axios.post('https://classdemo.localtunnel.me/api/synthparams/chebWet', {
                                            chebWet: e.target.value,
                                        })
                                    }}
                                    className='form-control-range'
                                    min='0'
                                    max='1'
                                    step='0.01'
                                />
                            </div>
                        </form>
                    );
                case 5:
                    return (
                        <form>
                            <div className='form-group'>
                                <label htmlFor='formControlRange'>Reverb Dry/Wet</label>
                                <input
                                    type='range'
                                    defaultValue='0'
                                    onMouseUp={(e) => {
                                        axios.post('https://classdemo.localtunnel.me/api/synthparams/reverbWet', {
                                            reverbWet: e.target.value,
                                        })
                                    }}
                                    className='form-control-range'
                                    min='0'
                                    max='0.5'
                                    step='0.01'
                                />
                            </div>
                        </form>
                    );
                case 6:
                    return (
                        <button
                            onClick={() => {
                                axios.post('https://classdemo.localtunnel.me/api/synthparams/stroke', {
                                    stroke: this.state.stroke,
                                });
                            }}
                        >STROKE TOGGLE</button>
                    );
                case 7:
                    return (
                        <form>
                            <div className='form-group'>
                                <label htmlFor='formControlRange'>Square Size</label>
                                <input
                                    type='range'
                                    defaultValue='0'
                                    onMouseUp={(e) => {
                                        axios.post('https://classdemo.localtunnel.me/api/synthparams/sqSize', {
                                            sqSize: e.target.value,
                                        })
                                    }}
                                    className='form-control-range'
                                    min='1'
                                    max='50'
                                    step='1'
                                />
                            </div>
                        </form>
                    );
                default:
                    return (
                        <h1>&#9203;</h1>
                    );
            }
        } else {
            return (
                <p>Loading...</p>
            );
        }
    }
}

export default Controller;
