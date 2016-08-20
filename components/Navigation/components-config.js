import React from 'react';
import {CookbookRoute} from '../Cookbook/cookbook-container';

let initialRoute = CookbookRoute;

class ComponentsConfig {
    static get getInitialComponent() {
        return initialRoute
    }

    static get getComponents() {
        return [
            initialRoute
        ]
    }
}

export default ComponentsConfig;