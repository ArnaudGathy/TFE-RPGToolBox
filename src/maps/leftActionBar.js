import { Button, Glyphicon } from 'react-bootstrap';
import React, { Component } from 'react';
import { gridToggle } from '../reducers/actions/grid'
import { shapesClear } from '../reducers/actions/shapes'
import { actionReset } from '../reducers/actions/action'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { STAGE_WIDTH, STAGE_HEIGHT } from '../constants/mapsSizes'

const mapStateToProps = state => ({
  gridVisible: state.maps.grid.visible,
  action: state.maps.action,
  context: state.maps.shapes.drawContext,
})

const mapDispatchToProps = {
  gridToggle,
  shapesClear,
  actionReset,
}

@connect(mapStateToProps, mapDispatchToProps)
export class LeftActionBar extends Component {
  static propTypes = {
    gridVisible: PropTypes.bool.isRequired,
    gridToggle: PropTypes.func.isRequired,
    shapesClear: PropTypes.func.isRequired,
    context: PropTypes.object,
    actionReset: PropTypes.func.isRequired,
    handleState: PropTypes.func.isRequired,
  }

  handleClear = () => {
    this.props.shapesClear()
    this.props.context.clearRect(0, 0, STAGE_WIDTH, STAGE_HEIGHT);
  }

  render() {
    return (
      <div>

        {/* BUTTON GRID */}
        <Button
          className='buttons-margin'
          onClick={this.props.gridToggle}
          active={this.props.gridVisible}
        >
          <Glyphicon glyph="th" /> GRID
          </Button>

        {/* BUTTON RESET */}
        <Button
          className='buttons-margin'
          bsStyle="warning"
          onClick={() => {
            this.props.actionReset()
            this.props.handleState()
          }}
        >
          <Glyphicon glyph="cog" /> Reset
        </Button>

        {/* BUTTON CLEAR */}
        <Button
          className='buttons-margin'
          bsStyle="danger"
          onClick={this.handleClear}
        >
          <Glyphicon glyph="trash" /> Clear
          </Button>
      </div>
    )
  }
}
