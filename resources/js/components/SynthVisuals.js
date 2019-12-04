import Tone from 'tone';
import axios from 'axios';
import { Sound } from 'pts';
import { PtsCanvas } from 'react-pts-canvas';

export default class SynthVisuals extends PtsCanvas {
    constructor(props) {
        super(props);
        this.state = {
            // Synth/param values (loads default values, then these are used to update live input)
            pitch: 400,
            trigger: false,
            pingPongFbk: 0,
            chebWet: 0,
            reverbWet: 0,
            stroke: 0,
            sqSize: 3,
            // Stores the full synth and params in state
            synth: null,
            pong: null,
            cheb: null,
            reverb: null,
        };
        this.synthTrigger = this.synthTrigger.bind(this);

        // EQ (visualizer) params
        this.bins = 1024; // valid values = 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384
        this.minDB = -100; // default = -100
        this.maxDB = 0; // default = -30
        this.smooth = 0.95; // default = 0.8

        // Sound that inputs into the visualizer
        this.sound = null;
    }

    // Animation of the visualizer
    animate(time, ftime) {
        if (this.sound) {
            if (!this.sound) this.space.stop(); // stop animation if not playing

            // The colors of the EQ squares
            let colors = ['#f06', '#62e', '#fff', '#fe3', '#0c9'];

            // Generates each individual EQ square
            // (Size, Position, Trim) --> trim = related to number of bins defined above, controls the upper EQ range
            this.sound.freqDomainTo(this.space.size, [0, 0], [0, 500]).forEach((t, i) => {
                // Toggles between filled and stroke only (outline) EQ squares
                this.state.stroke ?
                    this.form.strokeOnly(colors[i % 5]).point(t, this.state.sqSize) :
                    this.form.fillOnly(colors[i % 5]).point(t, this.state.sqSize);
            });
        }
    }

    start() {
        // Resets the synth on page load
        axios.post('https://classdemo.localtunnel.me/api/synthparams/reset');

        // Clears the synth users/queue on page load
        axios.post('https://classdemo.localtunnel.me/api/synthparams/clear');

        // Polling from DB (occurs every 1/4th second)
        const _this = this;
        setInterval(() => {
            axios.get('https://classdemo.localtunnel.me/api/synthparams')
                .then(response => {
                    const data = response.data;
                    this.state.pitch !== data['pitch'] ? _this.setState({ pitch: data['pitch'] }) : null;
                    this.state.trigger !== data['trigger'] ? _this.setState({ trigger: data['trigger'] }) : null;
                    this.state.pingPongFbk !== data['pingPongFbk'] ? _this.setState({ pingPongFbk: data['pingPongFbk'] }) : null;
                    this.state.chebWet !== data['chebWet'] ? _this.setState({ chebWet: data['chebWet'] }) : null;
                    this.state.reverbWet !== data['reverbWet'] ? _this.setState({ reverbWet: data['reverbWet'] }) : null;
                    this.state.stroke !== data['stroke'] ? _this.setState({ stroke: data['stroke'] }) : null;
                    this.state.sqSize !== data['sqSize'] ? _this.setState({ sqSize: data['sqSize'] }) : null;
                });
        }, 250);

        // Creates the Synth and Effects
        var reverb = new Tone.JCReverb().toMaster();
        var cheb = new Tone.Chebyshev(30).connect(reverb);
        var pong = new Tone.PingPongDelay(0.25, this.state.pingPongFbk).connect(cheb);
        var synth = new Tone.DuoSynth().connect(pong);

        // Stores the synth and effects in state
        this.setState({ synth: synth, pong: pong, cheb: cheb, reverb: reverb });
    }

    // Updates the synth and params on each change of the controller
    componentDidUpdate() {
        this.synthTrigger(this.state.synth, this.state.pitch, this.state.pong, this.state.cheb, this.state.reverb);
        this.sound = Sound.from(this.state.reverb, this.state.reverb.context).analyze(this.bins, this.minDB, this.maxDB, this.smooth);
    }

    // Trigger the synth sound
    synthTrigger(synth, pitch, pong, cheb, reverb) {
        this.state.trigger ? synth.triggerAttack(pitch) : synth.triggerRelease();
        pong.feedback.value = this.state.pingPongFbk;
        cheb.wet.value = this.state.chebWet;
        reverb.wet.value = this.state.reverbWet;
    }
}
