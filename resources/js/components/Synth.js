import React from 'react';
import Tone from 'tone';

class Synth extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // pitch: 400,
            trigger: false,
            pingPongDelayFbk: 0.25,
            // reverbDryWet: 0.5,
        };
    }

    render() {
        var reverb = new Tone.Freeverb(this.props.reverbDryWet).toMaster();
        var crush = new Tone.PingPongDelay(0.25, this.state.pingPongDelayFbk).connect(reverb);
        var synth = new Tone.DuoSynth().connect(crush);
        this.state.trigger ? synth.triggerAttackRelease(this.props.freq, "1n") : synth.triggerRelease();

        return (
            <>
                <button 
                onClick={()=>{this.setState({trigger: !this.state.trigger})}}
                >PLAY TONE</button>
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