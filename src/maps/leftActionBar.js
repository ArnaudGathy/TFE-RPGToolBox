import { Button, Glyphicon } from 'react-bootstrap';
import React, { Component } from 'react';
import { gridToggle } from '../reducers/actions/grid'
import { shapesClear } from '../reducers/actions/shapes'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  gridVisible: state.maps.grid.visible,
  action: state.maps.action,
})

const mapDispatchToProps = {
  gridToggle,
  shapesClear,
}

@connect(mapStateToProps, mapDispatchToProps)
export class LeftActionBar extends Component {
  static propTypes = {
    gridVisible: PropTypes.bool.isRequired,
    gridToggle: PropTypes.func.isRequired,
    shapesClear: PropTypes.func.isRequired,
  }

  render() {
    return (
      <div className='row'>
        {/* BUTTON GRID */}
        <Button
          className='buttons-margin'
          onClick={this.props.gridToggle}
          active={this.props.gridVisible}
        >
          <Glyphicon glyph="th" /> GRID
          </Button>

        {/* BUTTON CLEAR */}
        <Button
          className='buttons-margin'
          bsStyle="danger"
          onClick={this.props.shapesClear}
        >
          <Glyphicon glyph="erase" /> Clear canvas
          </Button>
      </div>
    )
  }
}
