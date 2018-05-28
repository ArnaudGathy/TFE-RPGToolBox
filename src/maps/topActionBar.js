import { Button, Glyphicon, FormControl, FormGroup, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { FieldGroup } from '../components/fieldGroup'
import React, { Component } from 'react';
import { gridToggle } from '../reducers/actions/grid'
import { presets } from '../constants/mapsPresets'
import { actionSetMode, actionSetText, actionSetScale, actionReset, actionSetColor, actionSetAll } from '../reducers/actions/action'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { MAPS_MODES } from '../constants/mapsActionsModes'
import { PICKER_COLORS } from '../constants/mapsColors'
import { TwitterPicker } from 'react-color';
import { MAPS_IMAGES } from '../constants/mapsImages'
import { toUpper } from 'ramda'

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
    action: PropTypes.shape({
      scale: PropTypes.number.isRequired,
      mode: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
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
    selectedPreset: 'None',
    activeImage: null,
  }

  handlePreset = (event) => {
    const { value, options, selectedIndex } = event.target
    this.setState({ selectedPreset: options[selectedIndex].text })
    if (!value) {
      return this.props.actionReset()
    }
    if (this.props.players.includes(value)) {
      return this.props.actionSetAll(presets.player(toUpper(value)))
    }
    return this.props.actionSetAll(presets[value])
  }

  handleFree = () => this.props.action.mode === MAPS_MODES.FREE ? this.props.actionSetMode('') : this.props.actionSetMode(MAPS_MODES.FREE)

  handleActiveState = () => {
    this.setState({ selectedPreset: 'None', activeImage: null})
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
        {/* BUTTON RESET
        <div className='col-lg-1'>
          <Button
            className='buttons-margin'
            bsStyle="warning"
            onClick={() => {
              this.props.actionReset()
              this.handleActiveState()
              }}
          >
            <Glyphicon glyph="cog" /> Reset
          </Button>
        </div> */}

        {/* BUTTON IMAGES */}
        <div className='col-lg-2'>
          <DropdownButton
            className='buttons-margin'
            bsStyle='info'
            title={this.state.activeImage ? this.state.activeImage.name : 'Images'}
            id='SelectImage'
            active={this.state.activeImage !== null}
          >
            {MAPS_IMAGES.map((img, index) => 
            <MenuItem
              active={this.state.activeImage === img}
              onClick={() => {
                this.props.actionSetAll({mode: MAPS_MODES.IMG, uri: img.uri})
                this.setState({ selectedPreset: 'None', activeImage: img})
                }} 
              key={index} 
              eventKey={index}
            >
              <img src={img.uri} alt='' /> {img.name}
            </MenuItem>)
            }
          </DropdownButton>
        </div>

        {/* SELECT PRESET */}
        <div className='col-lg-2'>
          {players.length > 0 ?
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select preset</ControlLabel>
              <FormControl
                ref={o => this.presetSelect = o}
                onChange={(e) => {
                  this.handlePreset(e)
                  this.setState({activeImage: null})
                  }}
                componentClass="select"
                value={mode}
              >
                <option value=''>{this.state.selectedPreset}</option>
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
              onChange={e => {
                this.props.actionSetMode(e.target.value)
                this.handleActiveState()
                }}
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
            onChange={e => {
              this.props.actionSetText(e.target.value)
              this.setState({selectedPreset: 'None'})
              }}
            value={text}
            type="text"
            label="Text to write on shape"
            placeholder={`Max ${scale * 3} chars displayed`}
          />
        </div>

        {/* INPUT NUMBER */}
        <div className='col-lg-1'>
          <FieldGroup
            onChange={e => {
              this.props.actionSetScale(Number(e.target.value) > 0 ? Number(e.target.value) : 1)
              this.setState({selectedPreset: 'None'})
              }}
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
            onChange={() => {}}
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
                onChange={(color) => {
                  this.props.actionSetColor(color.hex)
                  this.setState({selectedPreset: 'None'})
                  }}
              />
            </div>
            : null}

        </div>

        {/* FREE DRAW BUTTON */}
        <div className='col-lg-1'>
          <Button
            className='buttons-margin'
            bsStyle="primary"
            active={mode === MAPS_MODES.FREE}
            onClick={() => {
              this.handleFree()
              this.handleActiveState()
              }}
          >
            <Glyphicon glyph="pencil" /> Draw
          </Button>
        </div>

        {/* ERASE BUTTON */}
        <div className='col-lg-1'>
          <Button
            className='buttons-margin'
            bsStyle="danger"
            active={mode === MAPS_MODES.ERASE}
            onClick={() => {
              this.props.action.mode === MAPS_MODES.ERASE ? this.props.actionSetMode('') : this.props.actionSetMode(MAPS_MODES.ERASE)
              this.handleActiveState()
              }}
          >
            <Glyphicon glyph="erase" /> Erase
          </Button>
        </div>
      </div>
    )
  }
}
