import React from 'react';
import Granim from "granim";

export default class Background extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount () {
        var granimInstance = new Granim({
            element: this.ef,
            direction: 'left-right',
            isPausedWhenNotInView: true,
            states : {
                "default-state": {
                    gradients: [
                        ['#dab6fc', '#ccffcb'],
                        ['#ccffcb', '#dab6fc'],
                        ['#f7aef8', '#eae0cc']
                    ]
                }
            }
        });
    }
    render() {
        return (
            <canvas style={{width: "100%",
                height: "100%",
                position: "fixed",
                display: "block",
                top: 0, bottom: 0, right: 0, left: 0, zIndex: -1}} ref={ef => this.ef = ef} />
        );
    }
}
