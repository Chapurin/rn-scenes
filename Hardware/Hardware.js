import React, {Component} from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

import Vibration from "./Vibration";
import GeoLocation from "./GeoLocation";
import Camera from "./Camera";



class Hardware extends Component {

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text>Functions list</Text>
                    <Camera />
                    <Vibration />
                    <GeoLocation />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 70,
    },
});



export default Hardware;
