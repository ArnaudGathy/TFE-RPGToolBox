import React from 'react';
import {GRID_GAP} from '../constants/mapsSizes'
import PropTypes from 'prop-types';
import {Group, Text} from "react-konva";

export class MapBadge extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    scale: PropTypes.number,
    color: PropTypes.string,
    text: PropTypes.string,
  }

  static defaultProps = {
    x: 0,
    y: 0,
    color: 'black',
    scale: 1,
    draggable: true,
  }

  state = {
    x: this.props.x,
    y: this.props.y,
  }

  handleDragEnd = e => {
    this.setState({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  render() {
    const {scale, color, text} = this.props
    const Shape = this.props.type
    if(!Shape) {
      return null
    }
    return (
      text 
      ?
        <Group draggable>
          <Shape
            x={this.state.x}
            y={this.state.y}
            width={(GRID_GAP * scale) - 5}
            height={(GRID_GAP * scale) - 5}
            fill={color}
          />
          <Text
            text={text}
            x={this.state.x - (((GRID_GAP * scale) - 5) / 2)}
            y={this.state.y - 12}
            width={(GRID_GAP * scale) - 5}
            height={(GRID_GAP) - 5}
            align='center'
            ellipsis
            fontFamily='monospace'
            fontSize={25}
            fill='white'
            strokeWidth={1}
            stroke='black'
          />
        </Group>
      : 
      <Shape
        x={this.state.x}
        y={this.state.y}
        width={(GRID_GAP * scale) - 5}
        height={(GRID_GAP * scale) - 5}
        fill={color}
        draggable
        onDragEnd={this.handleDragEnd}
      />
    )
  }
}
