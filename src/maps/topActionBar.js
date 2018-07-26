import { Button, Glyphicon, FormControl, FormGroup, ControlLabel, DropdownButton, MenuItem } from 'react-bootstrap';
import { FieldGroup } from '../components/fieldGroup'
import React, { Component } from 'react';
import { gridToggle } from '../reducers/actions/grid'
import { presets } from '../constants/mapsPresets'
import { actionSetMode, actionSetText, actionSetScale, actionReset, actionSetColor, actionSetAll, actionSetWidth, actionSetHeight } from '../reducers/actions/action'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { MAPS_MODES, WIDTH_HEIGHT, SCALED, COLORED, TEXTED } from '../constants/mapsActionsModes'
import { PICKER_COLORS } from '../constants/mapsColors'
import { TwitterPicker } from 'react-color';
import { MAPS_IMAGES } from '../constants/mapsImages'
import {Spinner} from '../spinner'
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
  actionSetWidth,
  actionSetHeight,
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
      rectWidth: PropTypes.number.isRequired,
      rectHeight: PropTypes.number.isRequired,
    }).isRequired,
    gridToggle: PropTypes.func.isRequired,
    actionSetMode: PropTypes.func.isRequired,
    actionSetText: PropTypes.func.isRequired,
    actionSetScale: PropTypes.func.isRequired,
    actionSetWidth: PropTypes.func.isRequired,
    actionSetHeight: PropTypes.func.isRequired,
    actionSetColor: PropTypes.func.isRequired,
    actionReset: PropTypes.func.isRequired,
    actionSetAll: PropTypes.func.isRequired,
    players: PropTypes.array.isRequired,
    visibleState: PropTypes.object.isRequired,
    changeImage: PropTypes.func.isRequired,
    handleState: PropTypes.func.isRequired,
    changeSelectedPreset: PropTypes.func.isRequired,
  }

  state = {
    picker: false,
  }

  handlePreset = (event) => {
    const { value, options, selectedIndex } = event.target
    this.props.changeSelectedPreset(options[selectedIndex].text)
    if (!value) {
      return this.props.actionReset()
    }
    if (this.props.players.includes(value)) {
      return this.props.actionSetAll(presets.player(toUpper(value)))
    }
    return this.props.actionSetAll(presets[value])
  }

  handleFree = () => this.props.action.mode === MAPS_MODES.FREE ? this.props.actionSetMode('') : this.props.actionSetMode(MAPS_MODES.FREE)

  render() {
    const { text, scale, color, mode, rectHeight, rectWidth } = this.props.action
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

        {/* BUTTON PRESETS & IMAGES */}
        <div className='col-lg-2'>
          {players.length > 0 ?
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Presets</ControlLabel>
              <FormControl
                ref={o => this.presetSelect = o}
                onChange={(e) => {
                  this.handlePreset(e)
                  this.props.changeImage(null)
                }}
                componentClass="select"
                value={mode}
              >
                <option value=''>{this.props.visibleState.selectedPreset}</option>
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
            : <Spinner />}

          <p><strong>Images</strong></p>
          <DropdownButton
            bsStyle='default'
            title={this.props.visibleState.activeImage ? this.props.visibleState.activeImage.name : <span><Glyphicon glyph="picture" /> None</span> }
            id='SelectImage'
            active={this.props.visibleState.activeImage !== null}
          >
            <MenuItem
              active={!this.props.visibleState.activeImage}
              onClick={() => {
                this.props.actionSetAll({ mode: '', uri: '' })
                this.props.handleState()
              }}
            >
              None
            </MenuItem>
            {MAPS_IMAGES.map((img, index) =>
              <MenuItem
                active={this.props.visibleState.activeImage === img}
                onClick={() => {
                  this.props.actionSetAll({ mode: MAPS_MODES.IMG, uri: img.uri })
                  this.props.handleState()
                  this.props.changeImage(img)
                }}
                key={index}
                eventKey={index}
              >
                <img src={img.uri} alt='' /> {img.name}
              </MenuItem>)
            }
          </DropdownButton>
        </div>

        {/* SPACING */}
        <div className='col-lg-1'></div>

        {/* INPUT SHAPE & TEXT */}
        <div className='col-lg-2'>
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>Shape</ControlLabel>
            <FormControl
              onChange={e => {
                this.props.actionSetMode(e.target.value)
                this.props.handleState()
              }}
              componentClass="select"
              value={mode}
            >
              <option value=''>None</option>
              <option value={MAPS_MODES.SQUARE}>Square</option>
              <option value={MAPS_MODES.CIRCLE}>Circle</option>
              <option value={MAPS_MODES.RECT}>Rectangle</option>
              <option value={MAPS_MODES.TRIANGLE}>Triangle</option>
              <option value={MAPS_MODES.DIAMOND}>Diamond</option>
              <option value={MAPS_MODES.STAR}>Star</option>
              <option value={MAPS_MODES.RING}>Ring</option>
            </FormControl>
          </FormGroup>

          <FieldGroup
            onChange={e => {
              this.props.actionSetText(e.target.value)
              this.props.changeSelectedPreset('None')
            }}
            value={text}
            type="text"
            label="Text to write on shape"
            placeholder={`Max ${scale * 3} chars displayed`}
            disabled={!TEXTED.includes(mode)}
          />
        </div>

        {/* INPUT NUMBER & COLOR */}
        <div className='col-lg-1'>
          <FieldGroup
            onChange={e => {
              this.props.actionSetScale(Number(e.target.value) > 0 ? Number(e.target.value) : 1)
              this.props.changeSelectedPreset('None')
            }}
            value={scale}
            type="number"
            label="Scale"
            placeholder="Scale"
            disabled={!SCALED.includes(mode)}
          />

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
            disabled={!COLORED.includes(mode)}
          />
          {this.state.picker
            ? <div style={popover}>
              <div style={cover} onClick={() => this.setState({ picker: false })} />
              <TwitterPicker
                color={color}
                colors={PICKER_COLORS}
                onChange={(color) => {
                  this.props.actionSetColor(color.hex)
                  this.props.changeSelectedPreset('None')
                }}
              />
            </div>
            : null}
        </div>

        {/* RECTANGLE SIZES */}
        <div className='col-lg-2'>
        <FieldGroup
            onChange={e => {
              this.props.actionSetWidth(Number(e.target.value) > 0 ? Number(e.target.value) : 1)
              this.props.changeSelectedPreset('None')
            }}
            value={rectWidth}
            type="number"
            label={<Glyphicon glyph="resize-horizontal" />}
            placeholder="Rctangle width"
            disabled={!WIDTH_HEIGHT.includes(mode)}
          />

          <FieldGroup
            onChange={e => {
              this.props.actionSetHeight(Number(e.target.value) > 0 ? Number(e.target.value) : 1)
              this.props.changeSelectedPreset('None')
            }}
            value={rectHeight}
            type="number"
            label={<Glyphicon glyph="resize-vertical" />}
            placeholder="Rectangle height"
            disabled={!WIDTH_HEIGHT.includes(mode)}
          />
        </div>

        {/* SPACING */}
        <div className='col-lg-1'></div>

        {/* FREE DRAW BUTTONS */}
        <div className='col-lg-1'>
          <Button
            className='buttons-margin'
            bsStyle="primary"
            active={mode === MAPS_MODES.FREE}
            onClick={() => {
              this.handleFree()
              this.props.handleState()
            }}
          >
            <Glyphicon glyph="pencil" /> Draw
          </Button>

          <Button
            className='buttons-margin'
            bsStyle="danger"
            active={mode === MAPS_MODES.ERASE}
            onClick={() => {
              this.props.action.mode === MAPS_MODES.ERASE ? this.props.actionSetMode('') : this.props.actionSetMode(MAPS_MODES.ERASE)
              this.props.handleState()
            }}
          >
            <Glyphicon glyph="erase" /> Erase
          </Button>
        </div>
      </div>
    )
  }
}
