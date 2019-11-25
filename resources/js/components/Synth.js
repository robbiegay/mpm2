import React from 'react';
import Tone from 'tone';
import axios from 'axios';
import Controller from './Controller';
import { TriggerProvider } from './TriggerContext'

class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Synth/param values
            pitch: 400,
            trigger: false,
            pingPongDelayFbk: 0,
            chebWet: 0,
            reverbDryWet: 0,
            // Stores the synth and params in state
            synth: null,
            pong: null,
            cheb: null,
            reverb: null,
        };
        this.synthTrigger = this.synthTrigger.bind(this);
        this.useInterval = this.useInterval.bind(this);
    }

    componentDidMount() {
        // Resets the synth on load
        axios.post('http://127.0.0.1:8000/api/synthparams/reset');
        
        // Polling from DB
        this.useInterval();
        
        // Create the Synth and Effects
        var reverb = new Tone.JCReverb().toMaster();
        var cheb = new Tone.Chebyshev(30).connect(reverb);
        var pong = new Tone.PingPongDelay(0.25, this.state.pingPongDelayFbk).connect(cheb);
        var synth = new Tone.DuoSynth().connect(pong);
        // Stores the synth and effects in state
        this.setState({ synth: synth, pong: pong, cheb: cheb, reverb: reverb });
    }
    
    // Polling — updates every 1 second
    useInterval() {
        setInterval(() => {
            axios.get(`http://127.0.0.1:8000/api/synthparams`)
            .then(response => {
                const data = response.data;
                this.setState({
                    pitch: data['pitch'],
                    trigger: data['trigger'],
                    pingPongDelayFbk: data['pingPongDelayFbk'],
                    chebWet: data['chebWet'],
                    reverbDryWet: data['reverbDryWet'],
                });
            });
        }, 1000);
    }
    
    // When state is set, update the synth parameters
    componentDidUpdate() {
        this.synthTrigger(this.state.synth, this.state.pitch, this.state.pong, this.state.cheb, this.state.reverb);
    }
    
    synthTrigger(synth, pitch, pong, cheb, reverb) {
        this.state.trigger ? synth.triggerAttack(pitch) : synth.triggerRelease();
        pong.feedback.value = this.state.pingPongDelayFbk;
        cheb.wet.value = this.state.chebWet;
        reverb.wet.value = this.state.reverbDryWet;
    }
    
    render() {
        <TriggerProvider value={ 5 } />
        return (
            <Controller /> //trigger={ this.state.trigger }
        )
    }
}

export default Synth;
