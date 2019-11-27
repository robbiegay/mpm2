import React from "react";
import ReactDOM from "react-dom";
import Controller from "./Controller";
import NewSynthVisuals from "./NewSynthVisuals";

class Layout extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card">
                            <NewSynthVisuals name="pts-react" background="#0cf" credit="" style={{height: "100vh", width: "100vw", margin: "-10px" }} />
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
