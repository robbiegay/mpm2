// import React from 'react';
import Tone from 'tone';
import pts, {
    Pt,
    // Group, 
    // Line, 
    // Create, 
    Sound,
    // Triangle, 
    // Const, 
    // Geom 
    // this.synth


} from 'pts';
import { PtsCanvas } from "react-pts-canvas";

export default class ToneGenPts extends PtsCanvas {
    constructor(props) {
        super(props);
        this.index = new Pt(-1, -1);
        this.synth = new Tone.Synth().toMaster();
        this.sound = Sound.from(this.synth, this.synth.context).analyze(128);
        // this.getFromDB = this.getFromDB.bind(this);
        this.color = "ffffff";
    }



    animate(time) {
        if (this.synth.context.state === 'suspended') { // mostly for safari
            form.fillOnly("#fff").text([20, 30], "Click anywhere to start");
        }
        let area = this.space.size.$divide(3);
        let idx = this.space.pointer.$divide(area).floor();
        let rect = [idx.$multiply(area), idx.$multiply(area).add(area)];

        let t1 = this.sound.timeDomainTo(area, rect[0].$subtract(0, area.y / 2));
        let t2 = t1.map(t => t.$add(0, area.y)).reverse();
        let freqs = this.sound.freqDomainTo([area.x, area.y / 2], [rect[0].x, 0]).map(f => [[f.x, rect[0].y + area.y / 2 - f.y], [f.x, rect[0].y + area.y / 2 + f.y]]);
        this.form.fillOnly(this.color).polygon(t1.concat(t2));
        this.form.strokeOnly("#62e", Math.ceil(area.x / 128)).lines(freqs);

        let key = ["C2", "E2", "G2", "C3", "E3", "G3", "C4", "E4", "G4"][idx.y * 3 + idx.x];
        this.form.font(120, 'bold').fillOnly("#fff").text(rect[0].$add(10, 110), key);
        if (!this.index.equals(idx)) { // play if on different area
            this.synth.triggerAttackRelease(key, '4n');
            this.index = idx;
        }

    }
    start() {
        console.log("hello startin");
        // this.getFromDB()
        const _this = this;
        setInterval(() => {
            console.log("running")
            _this.color = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });


        }, 1000);

    }
    action(type, x, y) {
        if (type === "up") { // for safari
            if (this.synth.context.state === 'suspended') {
                this.synth.context.resume();
            }
        }
    }

    // getFromDB() {
    //     console.log('updated');


    // }


}
