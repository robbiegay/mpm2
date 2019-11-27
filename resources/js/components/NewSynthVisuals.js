// import React from 'react';
import Tone from 'tone';
import axios from 'axios';
import pts, {
    Pt,
    Group,
    Line,
    Create,
    Sound,
    Triangle,
    Const,
    Geom
} from 'pts';
import { PtsCanvas } from "react-pts-canvas";

export default class NewSynthVisuals extends PtsCanvas {
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
        };
        this.synthTrigger = this.synthTrigger.bind(this);

        this.bins = 256; // range of: [32, 32768] --> 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384
        this.minDB = -100; // default = -100
        this.maxDB = -80; // d = -30
        this.smooth = 0.8; // d = 0.8

        // this.sound = Sound.generate("sine", 300);
        // this.sound.start();
        this.sound = null;
    }

    animate(time, ftime) {
        // console.log(this.sound);

        if (this.sound) {
            // if (this.sound) {
            //     console.log(this.sound);
            //     this.sound.analyze(this.bins, this.minDB, this.maxDB, this.smooth);
            //     this.space.replay();
            // }
            if (!this.sound) this.space.stop(); // stop animation if not playing

            // The colors of the EQ squares
            let colors = ["#f06", "#62e", "#fff", "#fe3", "#0c9"];

            // The squares of the EQ
            this.sound.freqDomainTo(this.space.size).forEach((t, i) => {
                this.form.fillOnly(colors[i % 5]).point(t, 3);
            });

            this.form.fillOnly("rgba(0,0,0,.3").text([20, this.space.size.y - 20], this.props.credit);
        }
    }

    start() {
        // Resets the synth on load
        axios.post('http://127.0.0.1:8000/api/synthparams/reset');

        // Polling from DB
        const _this = this;
        setInterval(() => {
            // console.log(this.sound.playing);

            axios.get(`http://127.0.0.1:8000/api/synthparams`)
                .then(response => {
                    const data = response.data;
                    _this.setState({
                        pitch: data['pitch'],
                        trigger: data['trigger'],
                        pingPongFbk: data['pingPongFbk'],
                        chebWet: data['chebWet'],
                        reverbWet: data['reverbWet'],
                    });
                });
        }, 1000);

        // Create the Synth and Effects
        var reverb = new Tone.JCReverb().toMaster();
        var cheb = new Tone.Chebyshev(30).connect(reverb);
        var pong = new Tone.PingPongDelay(0.25, this.state.pingPongFbk).connect(cheb);
        var synth = new Tone.DuoSynth().connect(pong);
        // synth.triggerAttack(300);
        // this.setSynth(synth);

        // Stores the synth and effects in state
        this.setState({ synth: synth, pong: pong, cheb: cheb, reverb: reverb });

        
    }
    
    componentDidUpdate() {
        this.synthTrigger(this.state.synth, this.state.pitch, this.state.pong, this.state.cheb, this.state.reverb);
        this.sound = Sound.from(this.state.synth, this.state.synth.context).analyze(this.bins, this.minDB, this.maxDB, this.smooth);
    }

    // setSynth(synth) {
    //     this.sound = Sound.from(synth, synth.context).analyze(128);
    //     console.log(this.sound);
    // }

    synthTrigger(synth, pitch, pong, cheb, reverb) {
        this.state.trigger ? synth.triggerAttack(pitch) : synth.triggerRelease();
        pong.feedback.value = this.state.pingPongFbk;
        cheb.wet.value = this.state.chebWet;
        reverb.wet.value = this.state.reverbWet;
        // this.sound = this.state.synth;
    }

    // // Override PtsCanvas' action function
    // action(type, x, y) {
    //     if (type === "up" && Geom.withinBound([x, y], [0, 0], [50, 50])) { // clicked button
    //         this.toggle();
    //     }
    // }
}
