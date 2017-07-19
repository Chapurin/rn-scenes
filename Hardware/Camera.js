import React, {Component} from "react";
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from "react-native";
import Camera from "react-native-camera";

class CameraExample extends Component {

    constructor(props) {
        super(props);
    }

    takePicture() {
        this.camera.capture()
            .then((data) => console.log(data))
            .catch(err => console.error(err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                ref={(cam) => {
                    this.camera = cam;
                }}
                style={styles.preview}
                aspect={Camera.constants.Aspect.fill}>
                    <TouchableHighlight
                        style={styles.submit}
                        onPress={this.takePicture.bind(this)}
                        underlayColor='#fff'>
                        <Text style={styles.submitText}>[ Сделать снимок ]</Text>
                    </TouchableHighlight>
                </Camera>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    preview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width
    },
    submit:{
        flex: 0,
        padding: 10,
        margin: 40,
        borderWidth: 1,
        borderColor: "#fff"
    },
    submitText:{
        color:"#8a8a8a",
        textAlign:"center",
    }
});


export default CameraExample;
