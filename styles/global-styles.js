import {StyleSheet, Dimensions} from 'react-native';

const stylesheet = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1D4'
    },
    fontColor: {
        color: '#3C0000'
    }
});

const colors = {
    brownPen: '#3C0000',
    parchmentLight: '#F1F1D4',
    leather: '#916C55',
    leatherLight: '#bca08f'
};

const dims = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
}

const logo = require('../assets/logo.png');

export {colors, dims, logo};
export default stylesheet;
