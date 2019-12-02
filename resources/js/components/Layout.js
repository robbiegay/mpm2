import React from "react";
import ReactDOM from "react-dom";
import Controller from "./Controller";
import SynthVisuals from "./SynthVisuals";

class Layout extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         bgColor: "rgb(255, 99, 71)", // #0cf
    //     }
    // }

    // colorShifter() {
    //     var x = 0;
    //     var y = 10;
    //     var z = 100;
    //     const _this = this;
    //     setInterval(() => {
    //         _this.setState({bgColor: `rgb(${x}, ${y}, ${z})`});
    //         x += 1;
    //         console.log(this.state.bgColor);
    //     }, 100);
    // }

    // componentDidMount() {
    //     this.colorShifter();
    // }

    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <SynthVisuals name="pts-react" background="#0cf" credit="" style={{height: "100vh", width: "100vw", margin: "-10px" }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById("layout")) {
    ReactDOM.render(<Layout />, document.getElementById("layout"));
}

if (document.getElementById("controller")) {
    ReactDOM.render(<Controller />, document.getElementById("controller"));
}
