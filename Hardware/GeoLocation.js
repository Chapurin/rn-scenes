import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform, Dimensions} from 'react-native';

import {requestPermission} from "react-native-android-permissions";
import MapView from 'react-native-maps';
import EleRNLocation from 'ele-react-native-location';

/**
 * Если интернета нет, карта не отображается
 */

class GeoLocation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      myPosition: {
        latitude: null,
        longitude: null,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02
      },
      postionListener: null,
      needChangeMapFocus: false
    };

  }

  render() {
    return (
      <View>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={this.initialPosition()}
            region={(this.state.needChangeMapFocus)
            ? this.state.myPosition
            : null}>
            {(this.existsMyLatLong())
              ? <MapView.Marker coordinate={this.myLatLong()} title={'Мое местоположение'}/>
              : null
}
          </MapView>
          <Text>Lat: {this.prettyLatLong(this.state.myPosition.latitude)}
            Long: {this.prettyLatLong(this.state.myPosition.longitude)}</Text>
        </View>
      </View>

    );
  }

  componentDidMount() {
    this.androidPermissions();
    this.positionFinding();
  }

  androidPermissions() {
    // Проверка прав доступа для андроида (у меня в эмуляторе понадобилась)
    if (Platform.OS === "android") {

      let arr = [
        'INTERNET',
        'ACCESS_FINE_LOCATION',
        'ACCESS_COARSE_LOCATION',
        'ACCESS_LOCATION_EXTRA_COMMANDS',
        'ACCESS_NETWORK_STATE',
        'ACCESS_WIFI_STATE',
        'CHANGE_WIFI_STATE',
        'READ_PHONE_STATE',
        'WRITE_EXTERNAL_STORAGE'
      ];

      arr.forEach((item) => {
        requestPermission("android.permission." + item).then((result) => {}, (result) => {
          console.warn(`Not Granted $(item)!`);
          console.warn(result);
        });
      });
    }
  }

  positionFinding() {
    if (Platform.OS === "android") {
      this.androidPositionFinding();
    } else {
      this.iosPositionFinding();
    }
  }

  androidPositionFinding() {
    this.state.postionListener = EleRNLocation.addEventListener((data) => {

      if (data.errorCode) {
        if (data.errorCode == 13) {
          console.warn('Невозможно определить координаты, отсутствует подключение.');
        } else {
          console.warn(JSON.stringify(data));
        }
      } else {

        this.setState((prevState) => {
          let {latitude, longitude} = data;
          let {latitudeDelta, longitudeDelta} = prevState.myPosition;

          return {
            myPosition: {
              latitude,
              longitude,
              latitudeDelta,
              longitudeDelta
            },
            needChangeMapFocus: this.needChangeMapFocus({latitude, longitude})
          };
        });

      }

    });

    EleRNLocation.startLocation({accuracy: 'HighAccuracy', mockEnable: true, interval: 5000});
  }

  iosPositionFinding() {
    this.state.postionListener = navigator
      .geolocation
      .watchPosition((position) => {

        this.setState((prevState) => {

          let {latitude, longitude} = position.coords;
          let {latitudeDelta, longitudeDelta} = prevState.myPosition;

          return {
            myPosition: {
              latitude,
              longitude,
              latitudeDelta,
              longitudeDelta
            },
            needChangeMapFocus: this.needChangeMapFocus({latitude, longitude})
          };
        });
      }, (error) => console.warn(JSON.stringify(error)), {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      });
  }

  initialPosition() {
    return { // Координаты Москвы
      latitude: 55.75222,
      longitude: 37.61556,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02
    };
  }

  myLatLong() {
    return {latitude, longitude} = this.state.myPosition;
  }

  prettyLatLong(data) {
    return Math.round(data * 10000) / 10000;
  }

  existsMyLatLong() {
    let {latitude, longitude} = this.myLatLong();
    if (latitude && longitude) {
      return true;
    }
    return false;
  }

  needChangeMapFocus(nextLatLong) {
    if (!this.existsMyLatLong() && (nextLatLong.latitude && nextLatLong.longitude)) { // При первой загрузки моих кооридант
      return true;
    }
    return false;
  }

  componentWillUnmount() {
    if (Platform.OS === "android") {
      EleRNLocation.stopLocation();
      this
        .state
        .postionListener
        .remove();
    } else {
      navigator
        .geolocation
        .clearWatch(this.state.postionListener);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
   height: Dimensions.get("window").height,
   justifyContent: 'flex-end',
   alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
});

export default GeoLocation;
