import React, { Component } from 'react';
import { Rect } from "react-konva";
import { GRID_GAP } from '../constants/mapsSizes'
import PropTypes from 'prop-types';

export class MapBadgeImage extends Component {
  static propTypes = {
    uri: PropTypes.string.isRequired,
    x: PropTypes.number,
    y: PropTypes.number,
  }

  static defaultProps = {
    x: 0,
    y: 0,
  }
  
  state = {
    image: null,
    x: this.props.x,
    y: this.props.y,
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = this.props.uri;
    image.onload = () => {
      this.setState({image: image})
    }
  }

  handleDragEnd = e => {
    this.setState({
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  handleClick = () => {
    this.setState({image: null})
    this.shape.destroy()
  }

  render() { 
    return ( 
      <Rect
        draggable
        ref={o => this.shape = o}
        width={GRID_GAP}
        height={GRID_GAP}
        offsetY={(GRID_GAP) / 2}
        offsetX={(GRID_GAP) / 2}
        x={this.state.x}
        y={this.state.y}
        fillPatternImage={this.state.image}
        onDragEnd={this.handleDragEnd}
        onClick={this.handleClick}
      />
    )
  }
}
