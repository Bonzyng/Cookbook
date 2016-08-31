import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableHighlight, TextInput, Picker, Slider, Modal} from 'react-native';

import {dims, colors} from '../../styles/global-styles';

const ingredientUnits = {
    kg: 'Kg',
    gram: 'Grams',
    unit: 'Units'
}

class Button extends Component {
    state = {
        active: false,
    };

    _onHighlight = () => {
        this.setState({active: true});
    };

    _onUnhighlight = () => {
        this.setState({active: false});
    };

    render() {
        var colorStyle = {
            color: this.state.active ? '#fff' : '#000',
        };
        return (
            <TouchableHighlight
                onHideUnderlay={this._onUnhighlight}
                onPress={this.props.onPress}
                onShowUnderlay={this._onHighlight}
                style={[styles.button, this.props.style]}
                underlayColor={colors.leatherLight}>
                <Text style={[styles.buttonText]}>{this.props.children}</Text>
            </TouchableHighlight>
        );
    }
}

class AddIngredient extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: this.props.name,
            amount: this.props.amount,
            unit: this.props.unit,
            modalVisible: true
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    };

    _addIngredient() {
        if (this.state.name && this.state.amount && this.state.unit) {
            this.props.addIngredient({
                name: this.state.name,
                amount: this.state.amount,
                unit: this.state.unit
            });
        }

        this.setModalVisible(false);
    };

    render() {
        return (
            <View>
                <Modal
                    animationType={'fade'}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {this.setModalVisible(false)}}
                >

                    <View style={[styles.container, {backgroundColor: 'rgba(0, 0, 0, 0.5)'}]}>
                        <View style={[styles.innerContainer, {backgroundColor: colors.parchmentLight, padding: 20}]}>
                            <View style={[styles.row, {width: dims.width * 0.5}]}>
                                <Text style={styles.text}>Name: </Text>
                                <TextInput style={styles.textInput}
                                           onChangeText={(name) => this.setState({name})}
                                           value={this.state.name}/>
                            </View>

                            <View style={[styles.row, {width: dims.width * 0.5}]}>
                                <Text style={styles.text}>Amount: </Text>
                                <TextInput style={styles.textInput}
                                           onChangeText={(amount) => this.setState({amount})}
                                           value={this.state.amount}/>
                            </View>

                            <Picker style={{width: dims.width * 0.25, borderWidth: 1, borderColor: 'black'}}
                                    hitSlop={{top: 0, bottom: 15, right: 10, left: 10}}
                                    mode='dropdown'
                                    selectedValue={this.state.unit}
                                    onValueChange={(unit) => this.setState({unit})}>
                                <Picker.Item label={ingredientUnits.kg} value={ingredientUnits.kg}/>
                                <Picker.Item label={ingredientUnits.gram} value={ingredientUnits.gram}/>
                                <Picker.Item label={ingredientUnits.unit} value={ingredientUnits.unit}/>
                            </Picker>

                            <Button
                                onPress={this._addIngredient.bind(this)}
                                style={styles.modalButton}>
                                Add
                            </Button>
                        </View>
                    </View>

                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: colors.parchmentLight,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    textInput: {
        flex: 1,
        padding: dims.height * 0.01,
        margin: 0
    },
    modalButton: {
        marginTop: 10,
    },
    innerContainer: {
        borderRadius: dims.width * 0.1,
        alignItems: 'center',
    },
    button: {
        borderRadius: dims.width * 0.1,
        padding: dims.height * 0.02,
        paddingRight: dims.width * 0.1,
        paddingLeft: dims.width * 0.1,
        alignSelf: 'auto',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: colors.leather,
    },
    buttonText: {
        fontSize: 18,
        color: colors.parchmentLight,
        textAlign: 'center',
    }
});

export default AddIngredient;