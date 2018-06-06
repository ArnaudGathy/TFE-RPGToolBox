import React from 'react';
import { GRID_GAP } from '../constants/mapsSizes'
import PropTypes from 'prop-types';
import { Group, Text } from "react-konva";
import { MAPS_MODES } from '../constants/mapsActionsModes'

export class MapBadge extends React.Component {
  static propTypes = {
    type: PropTypes.string,
    x: PropTypes.number,
    y: PropTypes.number,
    scale: PropTypes.number,
    color: PropTypes.string,
    text: PropTypes.string,
    rectWidth: PropTypes.number,
    rectHeight: PropTypes.number,
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
  }

  getExtraAttrs = () => {
    const { type, scale, rectWidth, rectHeight } = this.props
    if (type === MAPS_MODES.STAR) {
      return ({
        numPoints: 5,
        innerRadius: ((GRID_GAP * scale) + 5) / 6,
        outerRadius: ((GRID_GAP * scale) + 5) / 2,
      })
    }

    if (type === MAPS_MODES.TRIANGLE) {
      return ({
        numPoints: 3,
        innerRadius: ((GRID_GAP * scale) + 5) / 4,
        outerRadius: ((GRID_GAP * scale) + 5) / 2,
      })
    }

    if (type === MAPS_MODES.DIAMOND) {
      return ({
        numPoints: 4,
        innerRadius: ((((GRID_GAP * scale) - 5) / 3) + (1 * Number(scale))),
        outerRadius: ((GRID_GAP * scale) - 5) / 2,
      })
    }

    if (type === MAPS_MODES.RING) {
      return ({
        innerRadius: ((GRID_GAP * scale) - 5) / 4,
        outerRadius: ((GRID_GAP * scale) - 5) / 2,
      })
    }

    if (type === MAPS_MODES.SQUARE) {
      return ({
        offsetY: ((GRID_GAP * scale) - 5) / 2,
        offsetX: ((GRID_GAP * scale) - 5) / 2,
        width: (GRID_GAP * scale) - 5,
        height: (GRID_GAP * scale) - 5,
      })
    }

    if (type === MAPS_MODES.RECT) {
      return ({
        offsetY: (GRID_GAP * rectHeight) / 2,
        offsetX: (GRID_GAP * rectWidth) / 2,
        width: GRID_GAP * rectWidth,
        height: GRID_GAP * rectHeight,
      })
    }

    if (type === MAPS_MODES.CIRCLE) {
      return ({
        width: (GRID_GAP * scale) - 5,
        height: (GRID_GAP * scale) - 5,
      })
    }
    return {}
  }

  getImageExtraAttrs = () => {
    const { type, rectWidth, rectHeight } = this.props
    if (type === MAPS_MODES.RECT) {
      return ({
        width: (GRID_GAP * rectWidth) - 5,
        height: (GRID_GAP * rectHeight) - 5,
        x: this.state.x - (((GRID_GAP * rectWidth) - 5) / 2),
      })
    }
  }

  render() {
    const { scale, color, text } = this.props
    let Shape = this.props.type
    if (!Shape) {
      return null
    }

    const extraAttrs = this.getExtraAttrs()
    const imgExtraAttrs = this.getImageExtraAttrs()

    if (this.props.type === MAPS_MODES.TRIANGLE || this.props.type === MAPS_MODES.DIAMOND) {
      Shape = MAPS_MODES.STAR
    }
    if (this.props.type === MAPS_MODES.SQUARE) {
      Shape = MAPS_MODES.RECT
    }
    return (
      text
        ?
        <Group
          ref={o => this.shapeGroup = o}
          onClick={() => this.shapeGroup.destroy()}
          draggable
        >
          <Shape
            {...extraAttrs}
            x={this.state.x}
            y={this.state.y}
            fill={color}
          />
          <Text
            text={text}
            x={this.state.x - (((GRID_GAP * scale) - 5) / 2)}
            y={this.state.y - 13}
            width={(GRID_GAP * scale) - 5}
            height={(GRID_GAP) - 5}
            align='center'
            ellipsis
            fontFamily='monospace'
            fontSize={25}
            fill='white'
            {...imgExtraAttrs}
          />
        </Group>
        :
        <Shape
          {...extraAttrs}
          ref={o => this.shape = o}
          x={this.state.x}
          y={this.state.y}
          fill={color}
          draggable
          onDragEnd={this.handleDragEnd}
          onClick={() => this.shape.destroy()}
        />
    )
  }
}
