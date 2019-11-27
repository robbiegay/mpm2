import { Pt, Group, Line, Create, Sound, Triangle, Const, Geom } from 'pts';
import { PtsCanvas } from "react-pts-canvas";
import React from 'react';


class TestFromGen extends PtsCanvas {
  constructor(props) {
    super(props);
    this.bins = 128; // range of: [32, 32768] --> 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384

    // Input place of sound
    // this.sound = Sound.generate( "sine", 2000 );
    // this.sound.start();
    // this.sound = Sound.from(this.props.synth)
    // this.state = {
    //   sound: null
    // }

    console.log(this.sound);
    // this.setSound = this.setSound.bind(this);
  }
  // setSound() {
  //   this.setState({ sound: Sound.from(this.props.synth) });
  //   console.log(this.props.synthSound);

  // }

  // // Toggle play/pause, can remove
  // toggle() {
  //   if (this.sound.playing) {
  //     this.sound.stop();
  //   } else {
  //     this.sound.analyze(this.bins); // recreate buffer again
  //     this.sound.start();
  //     this.space.replay();
  //   }
  // }
  // componentDidMount() {


  // }

  // Anomates the EQ
  animate(time, ftime) {
    // this.setSound();

    // console.log(this.sound);
    if (this.sound) {
      if (this.sound.playing) {
        console.log(this.sound);
        this.sound.analyze(this.bins);
        this.space.replay();
      }
      if (!this.sound.playing) this.space.stop(); // stop animation if not playing
      // console.log(this.sound);

      // The colors of the EQ squares
      let colors = ["#f06", "#62e", "#fff", "#fe3", "#0c9"];

      // The squares of the EQ
      this.sound.freqDomainTo(this.space.size).forEach((t, i) => {
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
  // render() {

  //   console.log(this.sound)
  //   return (
  //     <>
  //       {/* testing */}
  //     </>
  //   )
  // }
}

export default TestFromGen;
