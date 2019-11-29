import Tone from "tone";
import axios from "axios";
import { Sound } from "pts";
import { PtsCanvas } from "react-pts-canvas";

export default class NewSynthVisuals extends PtsCanvas {
    constructor(props) {
        super(props);
        this.state = {
            // Synth/param values (loads default values, then used to update live input)
            pitch: 400,
            trigger: false,
            pingPongFbk: 0,
            chebWet: 0,
            reverbWet: 0,
            stroke: 0,
            sqSize: 3,
            // Stores the synth and params in state
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
            let colors = ["#f06", "#62e", "#fff", "#fe3", "#0c9"];

            // Generates each individual EQ square
            // (Size, Position, Trim) --> trim = related to number of bins defined above
            this.sound.freqDomainTo(this.space.size, [0, 0], [0, 500]).forEach((t, i) => {
                // Toggles between filled and stroke EQ squares
                this.state.stroke ?
                this.form.strokeOnly(colors[i % 5]).point(t, this.state.sqSize) :
                    this.form.fillOnly(colors[i % 5]).point(t, this.state.sqSize);
            });

            // Places the "credit" on the screen
            // this.form.fillOnly("rgba(0,0,0,.3").text([20, this.space.size.y - 20], this.props.credit);
        }
    }

    start() {
        // Resets the synth on load
        axios.post("http://127.0.0.1:8000/api/synthparams/reset");

        // Polling from DB (occurs every 1 second)
        const _this = this;
        setInterval(() => {
            axios.get("http://127.0.0.1:8000/api/synthparams")
                .then(response => {
                    const data = response.data;
                    // If statement option
                    if (
                        this.state.pitch !== data["pitch"] ||
                        this.state.trigger !== data["trigger"] ||
                        this.state.pingPongFbk !== data["pingPongFbk"] ||
                        this.state.chebWet !== data["chebWet"] ||
                        this.state.reverbWet !== data["reverbWet"] ||
                        this.state.stroke !== data["stroke"] ||
                        this.state.sqSize !== data["sqSize"]
                    ) {
                        _this.setState({
                            pitch: data["pitch"],
                            trigger: data["trigger"],
                            pingPongFbk: data["pingPongFbk"],
                            chebWet: data["chebWet"],
                            reverbWet: data["reverbWet"],
                            stroke: data["stroke"],
                            sqSize: data["sqSize"],
                        });
                    }
                    // Turnary option
                    // this.state.pitch !== data["pitch"] ? _this.setState({ pitch: data["pitch"] }) : null;
                    // this.state.trigger !== data["trigger"] ? _this.setState({ trigger: data["trigger"] }) : null;
                    // this.state.pingPongFbk !== data["pingPongFbk"] ? _this.setState({ pingPongFbk: data["pingPongFbk"] }) : null;
                    // this.state.chebWet !== data["chebWet"] ? _this.setState({ chebWet: data["chebWet"] }) : null;
                    // this.state.reverbWet !== data["reverbWet"] ? _this.setState({ reverbWet: data["reverbWet"] }) : null;
                });
        }, 1500);

        // Create the Synth and Effects
        var reverb = new Tone.JCReverb().toMaster();
        // var dist = new Tone.Distortion(1.0).connect(reverb);
        var cheb = new Tone.Chebyshev(30).connect(reverb);
        var pong = new Tone.PingPongDelay(0.25, this.state.pingPongFbk).connect(cheb);
        var synth = new Tone.DuoSynth().connect(pong);
        // synth.harmonicity.value = 12.0; // --> this could be cool to change, changes the harmonics of the 2 voices. 2 = 1 octave up

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
