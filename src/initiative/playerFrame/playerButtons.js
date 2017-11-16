import React from 'react';
import { Button, ButtonGroup, Glyphicon } from 'react-bootstrap';

const PlayerButton = (props) => {
    return (
    <ButtonGroup>
        <Button 
        bsStyle="danger"
        onClick={() => props.moveDelete(props.player)} >
            <Glyphicon glyph="remove" />
        </Button>

        <Button 
        onClick={() => props.moveUp(props.player)} >
            <Glyphicon glyph="arrow-up" />
        </Button>

        <Button 
        onClick={() => props.moveDown(props.player)} >
            <Glyphicon glyph="arrow-down" />
        </Button>
    </ButtonGroup>
    )
}
 
export default PlayerButton;