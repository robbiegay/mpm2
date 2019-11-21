import React from 'react';


class ReverbDryWet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dryWet: 0,
        };
    }

    render() {
        return (
            <input type="text" onChange={(e) => this.props.reverbDryWet(e.target.value)}></input>
        );
    }
}

export default ReverbDryWet;
