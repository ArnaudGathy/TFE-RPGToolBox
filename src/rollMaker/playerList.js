import React from 'react';

const PlayerList = (props) => {
    return (
        <ul className="list-buttons">
            {
                props.isWaiting
                    ? "Waiting for GM prompt ..."
                    : props.render()
            }
        </ul>
    )
}

export default PlayerList;