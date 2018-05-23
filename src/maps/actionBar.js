import { Button, Glyphicon, FormControl } from 'react-bootstrap';
import React, { Component } from 'react';
import { gridToggle } from '../reducers/actions/grid'
import { actionSetMode, actionSetText, actionSetScale, actionReset, actionSetColor} from '../reducers/actions/action'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { MAPS_MODES } from '../constants/mapsActionsModes'

const mapStateToProps = state => ({
  visible: state.maps.grid.visible,
  action: state.maps.action,
})

const mapDispatchToProps = {
  gridToggle,
  actionSetMode,
  actionSetText,
  actionSetScale,
  actionReset,
  actionSetColor,
}

@connect(mapStateToProps, mapDispatchToProps)
export class ActionBar extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    action: PropTypes.object,
    gridToggle: PropTypes.func.isRequired,
    actionSetMode: PropTypes.func.isRequired,
    actionSetText: PropTypes.func.isRequired,
    actionSetScale: PropTypes.func.isRequired,
    actionSetColor: PropTypes.func.isRequired,
    actionReset: PropTypes.func.isRequired,
  }

  handleEnnemy = () => {
    if(this.props.action.mode === MAPS_MODES.ENNEMY) {
      this.props.actionReset()
    } else {
      this.props.actionSetMode(MAPS_MODES.ENNEMY)
    }
  }

  render() {
    const {mode, text, scale, color} = this.props.action
    return (
      <div>
        <Button
          onClick={this.props.gridToggle}
          active={this.props.visible}
        >
          <Glyphicon glyph="th" /> GRID
        </Button>

        <Button 
          onClick={this.handleEnnemy}
          active={mode === MAPS_MODES.ENNEMY}
        >
          <Glyphicon glyph="piggy-bank" /> Add ennemy
        </Button>

        <FormControl 
          inputRef={o => this.npcName = o} 
          onChange={e => this.props.actionSetText(e.target.value)} 
          value={text}
          type="text" 
          placeholder="Text" 
          style={{ width: "120px" }}
        />

        <FormControl 
          inputRef={o => this.npcScale = o}
          onChange={e => this.props.actionSetScale(Number(e.target.value) > 0 ? Number(e.target.value) : 1)}
          value={scale}
          type="number" 
          placeholder="Scale" 
          style={{ width: "60px" }}
        />

        <FormControl
          inputRef={o => this.npcScale = o}
          onChange={e => this.props.actionSetColor(e.target.value)} 
          value={color}
          type="color" 
          placeholder="Color" 
          style={{ width: "60px" }}
        />

        <Button
          onClick={this.props.actionReset}
        >
          RESET
        </Button>
      </div>
    )
  }
}
