import React, { Component } from 'react';
import { Stage, Layer } from "react-konva";
import { LeftActionBar } from './leftActionBar'
import { TopActionBar } from './topActionBar'
import { shapesAdd } from '../reducers/actions/shapes'
import { setPlayers } from '../reducers/actions/players'
import { Grid } from './grid'
import { STAGE_WIDTH, STAGE_HEIGHT } from '../constants/mapsSizes'
import { connect } from 'react-redux'
import { MapBadge } from './mapBadge'
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  shapes: state.maps.shapes.list,
  action: state.maps.action,
})

const mapDispatchToProps = {
  shapesAdd,
  setPlayers,
}

@connect(mapStateToProps, mapDispatchToProps)
class Maps extends Component {
  static propTypes = {
    shapes: PropTypes.array.isRequired,
    action: PropTypes.object.isRequired,
    shapesAdd: PropTypes.func.isRequired,
    setPlayers: PropTypes.func.isRequired,
  }

  getPlayersArray = async () => {
    const response = await fetch('/api/players')
    const json = await response.json()
    return json.map(player => player.name)
  }

  async componentDidMount() {
    const players = await this.getPlayersArray()
    this.props.setPlayers(players)
  }

  handleClick = () => {
    const pos = this.StageRef._stage.getPointerPosition();
    const { mode, text, scale, color } = this.props.action
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
      <div className="container">
        <div>
          <TopActionBar />
        </div>

        <div className='flex'>
          <div className='actionBar'>
            <LeftActionBar />
          </div>
          
          <div className='maps'>
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
        </div>
      </div>
    )
  }
}

export default Maps;
