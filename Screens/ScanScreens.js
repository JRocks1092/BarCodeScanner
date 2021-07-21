import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class ScanScreen extends Component {

    constructor() {
        super();
        this.state = {
            buttonState: "normal",
            gotPermissions: null,
            scanned: false,
            scannedData: "",
        }

    }


    getCameraPermissions = async () => {
        console.log("hi")

        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            buttonState: "clicked",
            gotPermissions: status === "granted",
        })

    }

    handleBarCodeScan = async ({ type, data }) => {

        this.setState({
            scannedData: data,
            scanned: true,
            buttonState: "normal",
            gotPermissions: null
        })
    }

    render() {

        if (this.state.buttonState === "normal") {

            return (

                <View>
                    <Text style={styles.heading}>Bar Code Scanner</Text>
                    <Image style={styles.image} source={require("../assets/Barcode-scanner.jpg")} />
                    <TouchableOpacity style={styles.touchableOpacity} onPress={() => this.getCameraPermissions()}>
                        <Text style={styles.text}>Scan</Text>
                    </TouchableOpacity>
                    <Text style={[styles.text, { color:"black" }]}>{this.state.scannedData}</Text>
                </View>

            )

        } else if (this.state.buttonState === "clicked" && this.state.gotPermissions) {
            return (

                <BarCodeScanner style={StyleSheet.absoluteFillObject} onBarCodeScanned={this.state.scannedData ? undefined : this.handleBarCodeScan} />

            )
        }
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    touchableOpacity: {

        alignSelf: 'center',
        backgroundColor: "#661111",
        width: 100,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        borderRadius: 50

    },

    heading: {

        color: "#661111",
        alignSelf: "center",
        fontSize: 30,
        fontFamily: 'System',
        marginTop: 50

    },

    textInput: {

        borderWidth: 3,
        borderRadius: 20,
        width: 200,
        marginTop: 50,
        alignSelf: "center",
        textAlign: "center",


    },

    bg: {

        flex: 1,

    },

    image: {

        marginTop:50,
        alignSelf:'center',
        justifyContent:'center',
       
    },

    text: {

        color: "#FFFFFF",
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center'
    }
})
