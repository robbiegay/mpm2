import React from 'react';
import ReactDOM from 'react-dom';
import Controller from './Controller';
import SynthVisuals from './SynthVisuals';

class Layout extends React.Component {
    render() {
        return (
            <SynthVisuals name='pts-react' background='#0cf' credit='' style={{ height: '100vh', width: '100vw', margin: '-10px' }} />
        );
    }
}

if (document.getElementById('layout')) {
    ReactDOM.render(<Layout />, document.getElementById('layout'));
}

if (document.getElementById('controller')) {
    ReactDOM.render(<Controller />, document.getElementById('controller'));
}
