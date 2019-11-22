import React from 'react';
import Tone from 'tone';

class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pitch: 400,
            trigger: false,
            pingPongDelayFbk: 0,
            chebWet: 0,
            reverbDryWet: 0,
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
        console.log(reverb.wet.value);
        // reverb.feedback.value = this.state.pingPongDelayFbk;
    }

    componentDidMount() {
        var reverb = new Tone.JCReverb().toMaster();
        var cheb = new Tone.Chebyshev(30).connect(reverb);
        var pong = new Tone.PingPongDelay(0.25, this.state.pingPongDelayFbk).connect(cheb);
        var synth = new Tone.DuoSynth().connect(pong);
        this.setState({ synth: synth, pong: pong, cheb: cheb, reverb: reverb });
    }

    componentDidUpdate() {
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
                    <div class="form-group">
                        <label for="formControlRange">Pitch</label>
                        <input
                            type="range"
                            defaultValue={this.state.pitch}
                            onChange={(e) => { this.setState({ pitch: e.target.value }) }}
                            className="form-control-range"
                            // id="formControlRange"
                            min="100"
                            max="1000"
                            step="1"
                        />
                    </div>
                </form>
                {/* PING PONG DELAY FEEDBACK */}
                <form>
                    <div class="form-group">
                        <label for="formControlRange">Ping Pong Delay Fbk</label>
                        <input
                            type="range"
                            defaultValue={this.state.pingPongDelayFbk}
                            onChange={(e) => { this.setState({ pingPongDelayFbk: e.target.value }) }}
                            className="form-control-range"
                            // id="formControlRange"
                            min="0"
                            max="1.5"
                            step="0.01"
                        />
                    </div>
                </form>
                {/* CHEBYSHEV WAVESHAPER DRY WET */}
                <form>
                    <div class="form-group">
                        <label for="formControlRange">Cheb Dry/Wet</label>
                        <input
                            type="range"
                            defaultValue={this.state.chebWet}
                            onChange={(e) => { this.setState({ chebWet: e.target.value }) }}
                            className="form-control-range"
                            // id="formControlRange"
                            min="0"
                            max="1"
                            step="0.01"
                        />
                    </div>
                </form>
                {/* REVERB DRY WET */}
                <form>
                    <div class="form-group">
                        <label for="formControlRange">Reverb Dry/Wet</label>
                        <input
                            type="range"
                            defaultValue={this.state.reverbDryWet}
                            onChange={(e) => { this.setState({ reverbDryWet: e.target.value }) }}
                            className="form-control-range"
                            // id="formControlRange"
                            min="0"
                            max="0.5"
                            step="0.01"
                        />
                    </div>
                </form>


                {/* <button
                    onClick={() => {
                        this.setState({ pitch: this.state.pitch * 2 });
                    }}
                >+8ve</button>
                <button
                    onClick={() => {
                        this.setState({ pitch: this.state.pitch / 2 });
                    }}
                >-8ve</button> */}
            </>
        )
    }
}

export default Synth;






// <div className="App">
//       <header className="App-header" id='hello'>
//         {/* var synth = new Tone.Synth().toMaster();
//         synth.triggerAttackRelease("C4", "8n"); */}
//         <input type="text" value="75" className="dial" />

//         <script>
//           $(function() {
//             // $(".dial").knob();
//           });
//         </script> 
//       </header>
//     </div>
//   );
// }




// var space = new CanvasSpace("#hello");
// space.setup({ bgcolor: "#fff" });
// SOUND
// var reverb = new Tone.Reverb(10);
// var synth = new Tone.DuoSynth().connect('reverb');
// synth.triggerAttackRelease("B2", "1n").toMaster();
// reverb.connect(synth.triggerAttackRelease("B2", "1n"));
// synth.toMaster();

// Nice sounding: DuoSynth, MonoSynth, NoiseSynth, PolySynth

// var freeverb = new Tone.Freeverb().toMaster();
// freeverb.dampening.value = 1000;
// //routing synth through the reverb
// var synth1 = new Tone.AMSynth().connect(freeverb);
// synth1.triggerAttackRelease("B2", "1n");

// var reverb = new Tone.Freeverb(1).toMaster(); 
// var crush = new Tone.BitCrusher(4).connect(reverb);
// var synth = new Tone.DuoSynth().connect(crush);
// synth.triggerAttackRelease("B2", "1n");