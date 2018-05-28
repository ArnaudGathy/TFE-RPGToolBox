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
import {FreeDraw} from './freeDraw'
import PropTypes from 'prop-types';
import { MAPS_MODES } from '../constants/mapsActionsModes'
import {MapBadgeImage} from './mapBadgeImage'

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
    action: PropTypes.shape({
      scale: PropTypes.number.isRequired,
      mode: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      uri: PropTypes.string.isRequired,
    }).isRequired,
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
    const { mode, text, scale, color, uri } = this.props.action
    if(![MAPS_MODES.FREE, MAPS_MODES.ERASE, MAPS_MODES.IMG, ''].includes(mode)) {
      return this.props.shapesAdd(
        <MapBadge
          type={mode}
          text={text}
          scale={scale}
          color={color}
          x={pos.x}
          y={pos.y}
          key={this.props.shapes.length}
        />)
    }

    if(mode === MAPS_MODES.IMG) {
      return this.props.shapesAdd(
      <MapBadgeImage 
        uri={uri} 
        x={pos.x}
        y={pos.y} 
        scale={scale}
        key={this.props.shapes.length}
      />)
    }
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
                <FreeDraw key={0} color={this.props.action.color} />
                {this.props.shapes}
                <Grid />
              </Layer>
              <Layer>
                
              </Layer>
            </Stage>
          </div>
        </div>
      </div>
    )
  }
}

export default Maps;
