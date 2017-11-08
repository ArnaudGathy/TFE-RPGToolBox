import React from 'react';
import { Button } from 'react-bootstrap';

export const PlayerFrame = (props) => (
    <div className="row row-spacing">
        <div className="col-lg-3"></div>
        <div className="col-lg-3"><Button bsStyle="primary">{props.name}</Button></div>
        <div className="col-lg-2 text-center">{props.initiative} {/*TODO*/}</div>
        <div className="col-lg-1 text-center">buttons{/*TODO*/}</div>
        <div className="col-lg-3"></div>
    </div>
)