import React, { Component } from "react";
import { Image } from "react-konva";
import { STAGE_WIDTH, STAGE_HEIGHT } from '../constants/mapsSizes'
import { MAPS_MODES } from '../constants/mapsActionsModes'
import { connect } from 'react-redux'
import { setContext } from '../reducers/actions/shapes'
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  action: state.maps.action,
})

const mapDispatchToProps = {
  setContext,
}

@connect(mapStateToProps, mapDispatchToProps)
export class FreeDraw extends Component {
  static propTypes = {
    action: PropTypes.shape({
      scale: PropTypes.number.isRequired,
      mode: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }).isRequired,
    setContext: PropTypes.func.isRequired,
  }

  state = {
    isDrawing: false,
  };

  componentDidMount() {
    const canvas = document.createElement("canvas");
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;
    const context = canvas.getContext("2d");

    this.setState({ canvas, context });
    this.props.setContext(context);
  }

  handleMouseDown = () => {
    if ([MAPS_MODES.FREE, MAPS_MODES.ERASE].includes(this.props.action.mode)) {
      this.setState({ isDrawing: true });

      const stage = this.image.parent.parent;
      this.lastPointerPosition = stage.getPointerPosition();
    }
  };

  handleMouseUp = () => {
    if ([MAPS_MODES.FREE, MAPS_MODES.ERASE].includes(this.props.action.mode)) {
      this.setState({ isDrawing: false });
    }
  };

  handleMouseMove = () => {
    const { context, isDrawing } = this.state;
    const {mode, scale} = this.props.action

    if (isDrawing && [MAPS_MODES.FREE, MAPS_MODES.ERASE].includes(mode)) {
      context.strokeStyle = this.props.action.color;
      context.lineJoin = "round";

      if (mode === MAPS_MODES.FREE) {
        context.globalCompositeOperation = "source-over";
        context.lineWidth = 5 * scale;
      } else if (mode === MAPS_MODES.ERASE) {
        context.globalCompositeOperation = "destination-out";
        context.lineWidth = 20 * scale;
      }
      context.beginPath();

      let localPos = {
        x: this.lastPointerPosition.x - this.image.x(),
        y: this.lastPointerPosition.y - this.image.y()
      };

      context.moveTo(localPos.x, localPos.y);

      const stage = this.image.parent.parent;

      let pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - this.image.x(),
        y: pos.y - this.image.y()
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      this.lastPointerPosition = pos;
      this.image.getLayer().draw();
    }
  };

  render() {
    const { canvas } = this.state;
    return (
      <Image
        image={canvas}
        ref={node => (this.image = node)}
        width={STAGE_WIDTH}
        height={STAGE_HEIGHT}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      />
    );
  }
}
