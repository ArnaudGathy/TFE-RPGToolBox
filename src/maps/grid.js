import React, {Fragment} from 'react';
import { Line } from "react-konva";
import {STAGE_WIDTH, STAGE_HEIGHT, GRID_GAP} from '../constants/mapsSizes'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  visible: state.maps.grid.visible,
})

@connect(mapStateToProps)
export class Grid extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
  }
  
  renderHorizontalLines = () => {
    const horizontalLines = []
    for(let y = GRID_GAP; y < STAGE_HEIGHT; y += GRID_GAP) {
      horizontalLines.push(<Line key={`0, ${y}, ${STAGE_WIDTH}, ${y}`} stroke='#d7d4d4' strokeWidth='1' points={[0, y, STAGE_WIDTH, y]}/>)
    }
    return horizontalLines
  }

  renderVericalLines = () => {
    const vericalLines = []
    for(let x = GRID_GAP; x < STAGE_WIDTH; x += GRID_GAP) {
      vericalLines.push(<Line key={`${x}, 0, ${x}, ${STAGE_WIDTH}`} stroke='#d7d4d4' strokeWidth='1' points={[x, 0, x, STAGE_WIDTH]}/>)
    }
    return vericalLines
  }

  render() {
    const lines = [...this.renderHorizontalLines(), ...this.renderVericalLines()]
    return (
      <Fragment>
      {this.props.visible ? lines : null}
      </Fragment>
    )
  }
}
