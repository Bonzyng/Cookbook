import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Animated
} from 'react-native';

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
                    <Animated.View style={[{opacity: this.state.fadeAnim},styles.container]}>
                        <Image style={styles.logo} source={this.props.logo} resizeMode='contain'/>
                    </Animated.View>
                )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1
    },
    gradient: {
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        flex: 1,
        width: 300
    }
});

export default SplashScreen;