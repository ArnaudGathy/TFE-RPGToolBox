import { Button, Glyphicon, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { FieldGroup } from '../components/fieldGroup'
import React, { Component } from 'react';
import { gridToggle } from '../reducers/actions/grid'
import {presets} from '../constants/mapsPresets'
import { actionSetMode, actionSetText, actionSetScale, actionReset, actionSetColor, actionSetAll } from '../reducers/actions/action'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { MAPS_MODES } from '../constants/mapsActionsModes'
import { PICKER_COLORS } from '../constants/mapsColors'
import { TwitterPicker } from 'react-color';
import {toUpper} from 'ramda'

const mapStateToProps = state => ({
  visible: state.maps.grid.visible,
  action: state.maps.action,
  players: state.maps.players.list
})

const mapDispatchToProps = {
  gridToggle,
  actionSetMode,
  actionSetText,
  actionSetScale,
  actionReset,
  actionSetColor,
  actionSetAll,
}

@connect(mapStateToProps, mapDispatchToProps)
export class TopActionBar extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    action: PropTypes.object,
    gridToggle: PropTypes.func.isRequired,
    actionSetMode: PropTypes.func.isRequired,
    actionSetText: PropTypes.func.isRequired,
    actionSetScale: PropTypes.func.isRequired,
    actionSetColor: PropTypes.func.isRequired,
    actionReset: PropTypes.func.isRequired,
    actionSetAll: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
  }

  state = {
    picker: false,
  }

  handlePreset = (event) => {
    const text = event.target.value
    if(!text) {
      return this.props.actionReset()
    }

    if(this.props.players.includes(text)) {
      return this.props.actionSetAll(presets.player(toUpper(text)))
    }

    return this.props.actionSetAll(presets[text])
  }

  render() {
    const { text, scale, color, mode } = this.props.action
    const { players } = this.props
    const popover = {
      position: 'absolute',
      zIndex: '2',
    }
    const cover = {
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px',
    }
    return (
      <div className='row small-bottom-spacing'>
        <div className='col-lg-2'></div>
        {/* SELECT PRESET */}
        <div className='col-lg-2'>
          {players.length > 0 ?
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select preset</ControlLabel>
              <FormControl
                onChange={this.handlePreset}
                componentClass="select"
              >
                <option value=''>None</option>
                <option disabled>──────────</option>
                {players.map((player, index) =>
                  <option key={index} value={player}>{`Player : ${player}`}</option>
                )}
                <option disabled>──────────</option>
                <option value='ennemy'>Ennemy : Generic, no name</option>
                <option value='goblin'>Ennemy : Goblin</option>
                <option value='ogre'>Ennemy : Ogre</option>
                <option disabled>──────────</option>
                <option value='trap'>Object : Trap</option>
                <option value='loot'>Object : Loot</option>
              </FormControl>
            </FormGroup>
            : 'Fetching preset ...'}
        </div>

        {/* SELECT SHAPE */}
        <div className='col-lg-2'>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Select shape</ControlLabel>
            <FormControl
              onChange={e => this.props.actionSetMode(e.target.value)}
              componentClass="select"
              value={mode}
            >
              <option value=''>None</option>
              <option value={MAPS_MODES.SQUARE}>Square</option>
              <option value={MAPS_MODES.CIRCLE}>Circle</option>
              <option value={MAPS_MODES.TRIANGLE}>Triangle</option>
              <option value={MAPS_MODES.DIAMOND}>Diamond</option>
              <option value={MAPS_MODES.STAR}>Star</option>
              <option value={MAPS_MODES.RING}>Ring</option>
            </FormControl>
          </FormGroup>
        </div>

        {/* INPUT TEXT */}
        <div className='col-lg-2'>
          <FieldGroup
            onChange={e => this.props.actionSetText(e.target.value)}
            value={text}
            type="text"
            label="Text to write on shape"
            placeholder={`Max ${scale * 3} chars displayed`}
          />
        </div>

        {/* INPUT NUMBER */}
        <div className='col-lg-1'>
          <FieldGroup
            onChange={e => this.props.actionSetScale(Number(e.target.value) > 0 ? Number(e.target.value) : 1)}
            value={scale}
            type="number"
            label="Scale"
            placeholder="Scale"
          />
        </div>

        {/* INPUT COLOR */}
        <div className='col-lg-1'>
          <FieldGroup
            onClick={(e) => {
              e.preventDefault()
              this.setState({ picker: !this.state.picker })
            }}
            onChange={() => { }}
            value={color}
            type="color"
            label="Color"
            placeholder="Color"
          />
          {this.state.picker
            ? <div style={popover}>
              <div style={cover} onClick={() => this.setState({ picker: false })} />
              <TwitterPicker
                color={color}
                colors={PICKER_COLORS}
                onChange={(color, e) => this.props.actionSetColor(color.hex)}
              />
            </div>
            : null}

        </div>

        {/* BUTTON RESET */}
        <div className='col-lg-2'>
          <Button
            className='buttons-margin'
            bsStyle="warning"
            onClick={this.props.actionReset}
          >
            <Glyphicon glyph="trash" /> Reset config
          </Button>
        </div>
      </div>
    )
  }
}
