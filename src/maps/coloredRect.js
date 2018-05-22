import React from 'react';
import { Rect } from "react-konva";

export class ColoredRect extends React.Component {
  state = {
    strokeWidth: 0,
    stroke: 'white'
  };

  setStroke = () => {
    if (this.state.strokeWidth > 0) {
      this.setState({ strokeWidth: 0, stroke: 'white' })
    } else {
      this.setState({ strokeWidth: 2, stroke: 'black' })
    }
  }

  render() {
    return (
      <Rect
        width={50}
        height={50}
        fill={this.props.color}
        stroke={this.state.stroke}
        strokeWidth={this.state.strokeWidth}
        onClick={this.setStroke}
        draggable={true}
        dragBoundFunc={(pos) => ({x: pos.x, y: pos.y < 50 ? 50 : pos.y})}
      />
    );
  }
}
