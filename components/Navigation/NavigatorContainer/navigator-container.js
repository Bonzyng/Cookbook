import React, {Component} from 'react';
import {
    View,
    Text,
    Navigator,
    StyleSheet
} from 'react-native';
import {Button} from 'apsl-react-native-button';
import ComponentsConfig from '../components-config';

import {colors, dims} from '../../../styles/global-styles';

class NavigatorContainer extends Component {
    constructor(props) {
        super(props)
    }

    _sceneLogic(route, navigator) {
        // return route.component
        let newUser = React.cloneElement(route.component, {user: this.props.user});
        return newUser;
    }

    get _navigationBar() {
        return <Navigator.NavigationBar
            routeMapper={{
				LeftButton: this._leftNavButton.bind(this),
				RightButton: this._rightNavButtonConfig.bind(this),
				Title: this._titleNavConfig.bind(this)
			}}
            style={styles.navigationBar}
        />
    }

    _titleNavConfig(route, navigator, index, navState) {
        return (
            <View style={styles.navTitleContainer}>
                <Text style={styles.navTitle}>{route.title}</Text>
            </View>
        )
    }

    _leftNavButton(route, navigator, index, navState) {
        return <View
            style={styles.navButtonContainer}>{route.generateLeftButton(route, navigator, index, navState)}</View>
    }

    _rightNavButtonConfig(route, navigator, index, navState) {
        return <View
            style={styles.navButtonContainer}>{route.generateRightButton(route, navigator, index, navState)}</View>
    }

    render() {
        return (
            <Navigator
                initialRoute={ComponentsConfig.getInitialComponent}
                initialRouteStack={ComponentsConfig.getComponents}
                renderScene={this._sceneLogic.bind(this)}
                navigationBar={this._navigationBar}
            />
        )
    }
}

const styles = StyleSheet.create({
    navigationBar: {
        flex: 1,
        padding: 0,
        backgroundColor: colors.leather,
        height: dims.height * 0.1,
        shadowColor: 'black',
        shadowOpacity: 1.0,
        elevation: 8,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
    },
    leftNavButton: {
        color: colors.parchmentLight
    },
    rightNavButton: {
        color: colors.parchmentLight
    },
    navButtonContainer: {
        flex: 1,
        width: dims.width * 0.15,
        borderRadius: dims.width * 0.15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    navTitleContainer: {
        flex: 1,
        width: dims.width * 0.6,
        justifyContent: 'center'
    },
    navTitle: {
        textAlign: 'center',
        fontWeight: '400',
        fontSize: 26,
        color: colors.parchmentLight
    }
});

export default NavigatorContainer;