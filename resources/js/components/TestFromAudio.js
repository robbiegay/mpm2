// import Tone from 'tone';
import {
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
import Synth from './Synth';


class TestFromAudio extends PtsCanvas {
  constructor(props) {
    super(props);
    this.state = {
      nothing: null
    }
    this.bins = 128; // range of: [32, 32768] --> 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384
    this.minDB = -100; // default = -100
    this.maxDB = -30; // d = -30
    this.smooth = 0.8; // d = 0.8

    Sound.load(
      "https://upload.wikimedia.org/wikipedia/en/8/8f/Elvis_Presley_-_Are_You_Lonesome_Tonight.ogg"
    ).then(s => {
      this.sound = s;
      this.space.playOnce(50); // render for noce
      this.bufferLoaded = true;
    }).catch(e => console.error(e));

  // Sound.generate( "sine", 150 );
  // this.sound.start();
  }

  // Anomates the EQ
  animate(time, ftime) {
    if (this.sound && this.sound.playable) {
      if (!this.sound.playing) this.space.stop(); // stop animation if not playing

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
    this.sound.start();
    this.sound.analyze(this.bins); // recreate buffer again
    this.space.replay();
  }
}

export default TestFromAudio;
