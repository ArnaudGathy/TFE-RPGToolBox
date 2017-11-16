import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

const ActionBar = (props) => {
    return (
    <div className="row row-spacing">
        <div className="col-lg-3">
            <ButtonGroup>
                <Button
                onClick={props.previous}
                >
                    <Glyphicon glyph="step-backward" />
                </Button>
                <Button
                bsStyle="success"
                onClick={props.start}>
                    <Glyphicon glyph="play" />
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
        </div>
      </div>
    )
}

export default ActionBar