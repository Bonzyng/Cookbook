import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated,
    Dimensions
} from 'react-native';

import stylesheet from '../../styles/global-styles';

class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            fadeAnim: new Animated.Value(0)
        }
    }

    timer() {
        setTimeout(()=> {
            this.setState({
                done: true
            });
        }, this.props.duration || 1000)
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim,
            {toValue: 1}
        ).start();
        this.timer();
    }

    render() {
        return (
            this.state.done ?
                // If done -> Show all nested
                ({...this.props.children})
                :
                // Display Splash Screen
                (
                    <Animated.View
                        style={[{opacity: this.state.fadeAnim}, stylesheet.container, styles.container]}>
                        <View style={styles.spacer}/>
                        <Image style={styles.logo} source={this.props.logo} resizeMode={Image.resizeMode.contain}/>
                    </Animated.View>
                )
        );
    }
}

let {height, width} = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    spacer: {
        height: height * 0.3
    },
    logo: {
        flex: 1,
        width: width * 0.8
    }
});

export default SplashScreen;