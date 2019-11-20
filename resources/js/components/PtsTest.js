import React from 'react';
import { Line, Util, Pt, Num, Rectangle, Sound } from 'pts';
import { QuickStartCanvas } from 'react-pts-canvas';

class PtsTest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: [200, 300],
        };
    }

    handleClick() {
        this.setState({ location: [500, 100] });
    }

    render() {
        return (
            <QuickStartCanvas
                style={{
                    height: '100vh',
                    width: '100vw',
                }}
                // onClick={
                //     this.handleClick()
                // }
                onAnimate={
                    (space, form, time, ftime) => {
                        var rect = Rectangle.fromCenter(space.center, space.size.$divide(10));
                        var poly = Rectangle.corners(rect);
                        poly.rotate2D(Num.cycle(time % 20000 / 20000) - 0.5, space.center);
                        poly.shear2D(Num.cycle(time % 200000 / 200000) - 0.5, space.center);
                        var clone = poly.clone();
                        poly.rotate2D(-Num.cycle(time % 20000 / 20000) + 0.5, space.center);
                        poly.shear2D(-Num.cycle(time % 200000 / 200000) + 0.5, this.state.location);
                        // drawing
                        form.point("#123").polygon(poly);
                        form.point("#123").polygon(clone);
                    }
                }
            />
        )
    }
}

export default PtsTest;
