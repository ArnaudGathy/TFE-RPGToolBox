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
              onClick={props.start}
              onKeyDown={props.start}>
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
      <div className="col-lg-1"></div>
      {
        props.started
          ? null
          : <div className="col-lg-1">
            {
              props.isPromptStarted
                ? <Button
                  bsStyle="danger"
                  onClick={props.stopPromptRoll}>
                  <Glyphicon glyph="stop" /> Stop prompt
          </Button>
                : <Button
                  bsStyle="success"
                  onClick={props.promptRoll}>
                  <Glyphicon glyph="phone" /> Prompt roll
          </Button>
            }
          </div>
      }
    </div>
  )
}

export default ActionBar