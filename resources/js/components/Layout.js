import React from 'react';
import ReactDOM from 'react-dom';
import Visuals from './Visuals';
import Synth from './Synth';

class Layout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            {/* <Visuals /> */}
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
