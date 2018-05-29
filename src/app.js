import React from 'react';
import Header from './header';
import Main from './main';
import io from 'socket.io-client';
const host = window.location.hostname;
export const socket = host === 'localhost' ? io(`http://${host}:8000`) : io('/')

const App = () => {
    return (
        <div>
            <Header />
            <Main />
        </div>
    )
}

export default App;