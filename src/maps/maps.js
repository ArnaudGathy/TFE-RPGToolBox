import React, { Component } from 'react';
import { ColoredRect } from "./coloredRect"
import { Stage, Layer, Text } from "react-konva";

class Maps extends Component {
    render() {
        return (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    <Text text='Try click on rect' />
                    <ColoredRect />
                </Layer>
            </Stage>
        )
    }
}

export default Maps;
