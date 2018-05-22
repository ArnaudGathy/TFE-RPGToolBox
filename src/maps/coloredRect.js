import React from 'react';
import Konva from "konva";
import {Rect } from "react-konva";

export class ColoredRect extends React.Component {
    state = {
      color: Konva.Util.getRandomColor(),
    };
    
    render() {
      return (
        <Rect
          x={20}
          y={20}
          width={50}
          height={50}
          fill={this.state.color}
          stroke='black'
          strokeWidth='4'
          onClick={() => this.setState({color: Konva.Util.getRandomColor()})}
        />
      );
    }
  }
