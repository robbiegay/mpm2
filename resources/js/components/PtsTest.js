import React from 'react';
import {QuickCanvas} from 'react-pts-canvas';


// var form = space.getForm();

// Pts.quickStart( "#hello", "#e2e6ef" )( t => form.point( space.pointer, 10 ) );
// space.bindMouse().bindTouch().play();

function PtsTest() {
    return (
        <QuickStartCanvas onAnimate={ (space, form, time) => form.point( space.pointer, 10) } />
        // <canvas id="hello"></canvas>
    )}

export default PtsTest;
