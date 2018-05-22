import React, { Component } from 'react';
import { ColoredRect } from "./coloredRect"
import { Stage, Layer } from "react-konva";
import {ActionBar} from './actionBar'

class Maps extends Component {
  render() {
    return (
      <div className='container'>
        <ActionBar />
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <Layer>
            <ColoredRect color='blue' />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default Maps;
