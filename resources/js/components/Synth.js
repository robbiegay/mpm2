import React from 'react';
import Tone from 'tone';
import axios from 'axios';

class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pitch: null, // 400
            trigger: null, // false
            pingPongDelayFbk: null, // 0
            chebWet: null, // 0
            reverbDryWet: null, // 0
            synth: null,
            pong: null,
            cheb: null,
            reverb: null,
        };
        this.synthTrigger = this.synthTrigger.bind(this);
    }

    synthTrigger(synth, pitch, pong, cheb, reverb) {
        this.state.trigger ? synth.triggerAttack(pitch) : synth.triggerRelease();
        pong.feedback.value = this.state.pingPongDelayFbk;
        cheb.wet.value = this.state.chebWet;
        reverb.wet.value = this.state.reverbDryWet;
    }

    componentDidMount() {
        var reverb = new Tone.JCReverb().toMaster();
        var cheb = new Tone.Chebyshev(30).connect(reverb);
        var pong = new Tone.PingPongDelay(0.25, this.state.pingPongDelayFbk).connect(cheb);
        var synth = new Tone.DuoSynth().connect(pong);
        this.setState({ synth: synth, pong: pong, cheb: cheb, reverb: reverb });
    }

    componentDidUpdate() {
        axios.get(`http://127.0.0.1:8000/api/synthparams`)
            .then(response => {
                const data = response.data;
                console.log(data['reverb']);
                this.setState({
                    pitch: data['pitch'],
                    trigger: data['trigger'],
                    pingPongDelayFbk: data['pingPongDelayFbk'],
                    chebWet: data['chebWet'],
                    reverbDryWet: data['reverbDryWet'],
                })
            });
            console.log(this.state.pitch);
        this.synthTrigger(this.state.synth, this.state.pitch, this.state.pong, this.state.cheb, this.state.reverb);
    }


    render() {
        return (
            <>
                {/* TIGGER TONE */}
                <button
                    onClick={() => {
                        this.setState({ trigger: !this.state.trigger });
                    }}
                >PLAY TONE</button>
                {/* CHANGE PITCH */}
                <form>
                    <div className="form-group">
                        <label htmlFor="formControlRange">Pitch</label>
                        <input
                            type="range"
                            defaultValue={this.state.pitch}
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
                            defaultValue={this.state.pingPongDelayFbk}
                            onChange={(e) => { this.setState({ pingPongDelayFbk: e.target.value }) }}
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
                            defaultValue={this.state.chebWet}
                            onChange={(e) => { this.setState({ chebWet: e.target.value }) }}
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
                            defaultValue={this.state.reverbDryWet}
                            onChange={(e) => { this.setState({ reverbDryWet: e.target.value }) }}
                            className="form-control-range"
                            min="0"
                            max="0.5"
                            step="0.01"
                        />
                    </div>
                </form>
            </>
        )
    }
}

export default Synth;
