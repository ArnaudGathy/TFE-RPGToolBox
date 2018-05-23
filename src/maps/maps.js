import React, { Component } from 'react';
import { Stage, Layer} from "react-konva";
import { ActionBar } from './actionBar'
import { shapesAdd } from '../reducers/actions/shapes'
import { Grid } from './grid'
import {STAGE_WIDTH, STAGE_HEIGHT} from '../constants/mapsSizes'
import {connect} from 'react-redux'
import {MapBadge} from './mapBadge'
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  shapes: state.maps.shapes.list,
  action: state.maps.action,
})

const mapDispatchToProps = {
  shapesAdd
}

@connect(mapStateToProps, mapDispatchToProps)
class Maps extends Component {
  static propTypes = {
    shapes: PropTypes.array.isRequired,
    action: PropTypes.object.isRequired,
    shapesAdd: PropTypes.func.isRequired,
  }

  handleClick = () => {
    const pos = this.StageRef._stage.getPointerPosition();
    const {mode, text, scale, color} = this.props.action
    this.props.shapesAdd(
      <MapBadge 
        type={mode}
        text={text} 
        scale={scale}
        color={color} 
        x={pos.x} 
        y={pos.y} 
        key={this.props.shapes.length} 
      />
    )
  }

  render() {
    return (
      <div className="maps">
        <ActionBar />
        <Stage 
        className="stage" 
        ref={o => this.StageRef = o} 
        width={STAGE_WIDTH} 
        height={STAGE_HEIGHT}
        onClick={this.handleClick}
        >

          <Layer>
            {this.props.shapes}
          </Layer>

          <Layer>
            <Grid />
          </Layer>

        </Stage>
      </div>
    )
  }
}

export default Maps;
