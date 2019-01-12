import React, {Component} from "react";
import { Jumbotron } from "react-bootstrap";

class EmptyRoute extends Component {

    render() {
        return (<div>
            <Jumbotron>
                <h1>Whupps, this is an invalid URL.</h1>
                <h3>Make sure the address is spelled correctly.</h3>
            </Jumbotron>
        </div>);
    }
}

export default EmptyRoute;