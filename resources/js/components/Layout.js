import React from 'react';
import ReactDOM from 'react-dom';
import Visuals from './Visuals';
import Test from './Test';
import Synth from './Synth';
import Controller from './Controller';

class Layout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {/* <Visuals /> */}
                            <Test background="#0cf" credit="This is a visualizer" />
                            <Synth />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('layout')) {
    ReactDOM.render(<Layout />, document.getElementById('layout'));
}

if (document.getElementById('controller')) {
    ReactDOM.render(<Controller />, document.getElementById('controller'));
}
