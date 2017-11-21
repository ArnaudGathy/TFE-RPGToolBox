import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';
import Toggle from 'react-toggle'
import "react-toggle/style.css"

const ActionBar = (props) => {
  return (
    <div className="row row-spacing">
      <div className="col-lg-2 text-center">
        {
          props.started
          ? <ButtonGroup>
          <Button
            onClick={props.previous}
          >
            <Glyphicon glyph="step-backward" />
          </Button>
          <Button
            bsStyle="danger"
            onClick={props.stop}>
            <Glyphicon glyph="stop" />
          </Button>
          <Button
            onClick={props.next}>
            <Glyphicon glyph="step-forward" />
          </Button>
        </ButtonGroup>
          : <Button
              style={{ width: "120px" }}
              bsStyle="success"
              onClick={props.start}>
              <Glyphicon glyph="play" />
            </Button>
        }
      </div>
      {
        props.started
        ? null
        : <div className="col-lg-3 toggle-padding">
        <label>
          <Toggle 
          onChange={props.extra}
          checked={props.isExtra()}
          className="toggle-align" />
          <span> Add extra round</span>
        </label>
      </div>
      }
    </div>
  )
}

export default ActionBar