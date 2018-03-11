import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Initiative from './initiative/initiative';
import Messenger from './messenger/messenger';
import RollMaker from './rollMaker/rollMaker';

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={RollMaker} />
                <Route path="/init" component={Initiative} />
                <Route path="/messenger" component={Messenger} />
                <Route path="/roll" component={RollMaker} />
            </Switch>
        </main>
    )
}

export default Main;