import { Pt, Group, Line, Create, Sound, Triangle, Const, Geom } from 'pts';
import { PtsCanvas } from "react-pts-canvas";
import Synth from './Synth';

class Test extends PtsCanvas {

  // sound;
  // bins = 256;
  // bufferLoaded = false;
  
  constructor(props) {
    super(props);
    this.bins = 2048; // range of: [32, 32768] --> 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384
    // this.sound = Sound.from( synth, synth.context ).analyze(128);

    // Sound.from( Synth ).then(s => {
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

  // Override PtsCanvas' animate function
  animate(time, ftime) {

    if (this.sound && this.sound.playable) {
      if (!this.sound.playing) this.space.stop(); // stop animation if not playing

      let colors = ["#f06", "#62e", "#fff", "#fe3", "#0c9"];

      this.sound.freqDomainTo(this.space.size).forEach((t, i) => {
        this.form.fillOnly(colors[i % 5]).point(t, 30);
      });

      this.form.fillOnly("rgba(0,0,0,.3").text([20, this.space.size.y - 20], this.props.credit);
    }

    this.drawButton();
  }

  // Override PtsCanvas' action function
  action(type, x, y) {
    if (type === "up" && Geom.withinBound([x, y], [0, 0], [50, 50])) { // clicked button
      this.toggle();
    }
  }

  drawButton() {
    if (!this.bufferLoaded) {
      this.form.fillOnly("#9ab").text([20, 30], "Loading...");
      return;
    }
    if (!this.sound || !this.sound.playing) {
      this.form.fillOnly("#f06").rect([[0, 0], [50, 50]]);
      this.form.fillOnly('#fff').polygon(Triangle.fromCenter([25, 25], 10).rotate2D(Const.half_pi, [25, 25]));
    } else {
      this.form.fillOnly("rgba(0,0,0,.2)").rect([[0, 0], [50, 50]]);
      this.form.fillOnly("#fff").rect([[18, 18], [32, 32]]);
    }
  }

}

export default Test;
