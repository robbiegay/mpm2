import { Pt, Group, Line, Create, Sound, Triangle, Const, Geom } from 'pts';
import { PtsCanvas } from "react-pts-canvas";
import Synth from './Synth';
// import Tone from 'tone';


class TestFromAudio extends PtsCanvas {
  constructor(props) {
    super(props);
    this.bins = 128; // range of: [32, 32768] --> 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384

    // this.style = {
    //   height: '100vh',
    //   width: '100vw',
    // }
    // this.synth = new Tone.Synth(1231);
    // this.synth.toMaster();

    // Sound.from(this.state.synth, this.synth.context).analyze(128);

    // Input place of sound
    // this.sound = Sound.generate( "sine", 120 );
    Sound.loadAsBuffer("https://upload.wikimedia.org/wikipedia/en/8/8f/Elvis_Presley_-_Are_You_Lonesome_Tonight.ogg").then(s => {
      this.sound = s;
      this.space.playOnce(50); // render for noce
      this.bufferLoaded = true;
    }).catch(e => console.error(e));
  }

  toggle() {
    if (this.sound.playing || !this.bufferLoaded) {
      this.sound.stop();
    } else {
      this.sound.createBuffer().analyze(this.bins); // recreate buffer again
      this.sound.start();
      this.space.replay();
    }
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
      // console.log(this.sound.analyze(128));

      this.form.fillOnly("rgba(0,0,0,.3").text([20, this.space.size.y - 20], this.props.credit);
    }

    // Draws the play/pause button
    this.drawButton();
  }

  // Override PtsCanvas' action function
  action(type, x, y) {
    if (type === "up" && Geom.withinBound([x, y], [0, 0], [50, 50])) { // clicked button
      this.toggle();
    }
  }

  // Play/Pause Button
  drawButton() {
    if (!this.bufferLoaded) {
      this.form.fillOnly("#9ab").text([20, 30], "Loading...");
      return;
    }
    // These 2 lines = draw the play button
    if (!this.sound || !this.sound.playing) {
      this.form.fillOnly("#f06").rect([[0, 0], [50, 50]]);
      this.form.fillOnly('#fff').polygon(Triangle.fromCenter([25, 25], 10).rotate2D(Const.half_pi, [25, 25]));
    } else {
      // These two lines = draw the stop button
      this.form.fillOnly("rgba(0,0,0,.2)").rect([[0, 0], [50, 50]]);
      this.form.fillOnly("#fff").rect([[18, 18], [32, 32]]);
    }
  }

}

export default TestFromAudio;
