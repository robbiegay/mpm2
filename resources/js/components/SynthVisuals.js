import { Pt, Group, Line, Create, Sound, Triangle, Const, Geom } from 'pts';
import { PtsCanvas } from "react-pts-canvas";
import React from 'react';
import Tone from 'tone';
import axios from 'axios';
import TestFromGen from './TestFromGen';


class SynthVisuals extends PtsCanvas {
    constructor(props) {
        super(props);
        this.state = {
            // Synth/param values
            pitch: 400,
            trigger: false,
            pingPongFbk: 0,
            chebWet: 0,
            reverbWet: 0,
            // Stores the synth and params in state
            synth: null,
            pong: null,
            cheb: null,
            reverb: null,
        }
        this.synthTrigger = this.synthTrigger.bind(this);
        this.useInterval = this.useInterval.bind(this);

        // VISUAL STUFF
        this.bins = 128; // range of: [32, 32768] --> 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384
        // Input place of sound
        // this.sound = Sound.generate("sine", 220);
        // this.sound.start();
        // this.sound = null;
    }

    componentDidMount() {
        // Resets the synth on load
        axios.post('http://127.0.0.1:8000/api/synthparams/reset');

        // Polling from DB
        this.useInterval();

        // Create the Synth and Effects
        var reverb = new Tone.JCReverb().toMaster();
        var cheb = new Tone.Chebyshev(30).connect(reverb);
        var pong = new Tone.PingPongDelay(0.25, this.state.pingPongFbk).connect(cheb);
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
                        pingPongFbk: data['pingPongFbk'],
                        chebWet: data['chebWet'],
                        reverbWet: data['reverbWet'],
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
        pong.feedback.value = this.state.pingPongFbk;
        cheb.wet.value = this.state.chebWet;
        reverb.wet.value = this.state.reverbWet;
    }

    // Anomates the EQ
    animate(time, ftime) {
        console.log('sound is playing');

        // console.log(this.props.sound);
        if (this.props.sound) {
            if (this.props.sound.playing) {
                this.props.sound.analyze(this.bins);
                this.space.replay();
            }
            if (!this.props.sound.playing) this.space.stop(); // stop animation if not playing
            // console.log(this.props.sound);

            // The colors of the EQ squares
            let colors = ["#f06", "#62e", "#fff", "#fe3", "#0c9"];

            // The squares of the EQ
            this.props.sound.freqDomainTo(this.space.size).forEach((t, i) => {
                this.form.fillOnly(colors[i % 5]).point(t, 3);
            });

            this.form.fillOnly("rgba(0,0,0,.3").text([20, this.space.size.y - 20], this.props.credit);
        }
    }

    // Override PtsCanvas' action function
    action(type, x, y) {
        if (type === "up" && Geom.withinBound([x, y], [0, 0], [50, 50])) { // clicked button
            this.toggle();
        }
    }

    render() {
        return (
            <>
                <p>~THIS IS A SYNTH~</p>
            </>
        )
    }
}

export default SynthVisuals;
