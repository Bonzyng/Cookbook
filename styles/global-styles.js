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

const colorsRgba = {
    brownPen: 'rgba(60, 0, 0, 1)',
    parchmentLight: 'rgba(241, 241, 212, 1)',
    leather: 'rgba(145, 108, 85, 1)',
    leatherLight: 'rgba(188, 160, 143, 1)'
};

const dims = {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
};

const logo = require('../assets/logo.png');

export {colors, colorsRgba, dims, logo};
export default stylesheet;
