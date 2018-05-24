import { Button, Glyphicon, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { FieldGroup } from '../components/fieldGroup'
import React, { Component } from 'react';
import { gridToggle } from '../reducers/actions/grid'
import { actionSetMode, actionSetText, actionSetScale, actionReset, actionSetColor } from '../reducers/actions/action'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { MAPS_MODES } from '../constants/mapsActionsModes'
import { PICKER_COLORS } from '../constants/mapsColors'
import { TwitterPicker } from 'react-color';

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
  }

  state = {
    picker: false,
  }

  handleEnnemy = () => {
    if (this.props.action.mode === MAPS_MODES.ENNEMY) {
      this.props.actionSetMode(null)
    } else {
      this.props.actionSetMode(MAPS_MODES.ENNEMY)
    }
  }

  render() {
    const { text, scale, color, mode } = this.props.action
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
      <div className='col-lg-4'></div>
      
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
