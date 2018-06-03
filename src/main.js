import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Initiative from './initiative/initiative';
import Messenger from './messenger/messenger';
import RollMaker from './rollMaker/rollMaker';
import {Welcome} from './welcome'
import Maps from './maps/maps';

const Main = () => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/init" component={Initiative} />
                <Route path="/messenger" component={Messenger} />
                <Route path="/roll" component={RollMaker} />
                <Route path="/maps" component={Maps} />
            </Switch>
        </main>
    )
}

export default Main;