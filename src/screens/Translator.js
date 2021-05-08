import React from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {backgroundColor, fontStyle} from '../../style/Colors';
import Tts from 'react-native-tts';
export default function Translator({route}) {
  const isDark = useColorScheme === 'dark';
  const {data} = route.params;
  const obj = data[0];
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark
            ? backgroundColor.light
            : backgroundColor.dark,
        },
      ]}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        {Object.keys(obj)[0] == 'English' ? (
          <Text
            style={{
              color: isDark ? backgroundColor.dark : backgroundColor.light,
              fontFamily: fontStyle.regular,
              fontSize: 18,
            }}>
            {data[0].English}
          </Text>
        ) : (
          <Text
            style={{
              color: isDark ? backgroundColor.dark : backgroundColor.light,
              fontFamily: fontStyle.regular,
              fontSize: 18,
            }}>
            {data[0].Hindi}
          </Text>
        )}
      </View>
      <View>
        {Object.keys(obj)[0] == 'English' ? (
          <TouchableOpacity
            onPress={() => {
              Tts.speak(data[0].English, {
                androidParams: {
                  KEY_PARAM_PAN: -1,
                  KEY_PARAM_STREAM: 'STREAM_MUSIC',
                  KEY_PARAM_VOLUME: 0.5,
                },
              });
            }}>
            <Icon
              name="play"
              color={isDark ? backgroundColor.dark : backgroundColor.light}
              size={25}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              Tts.speak(data[0].Hindi, {
                androidParams: {
                  KEY_PARAM_PAN: -1,
                  KEY_PARAM_STREAM: 'STREAM_MUSIC',
                  KEY_PARAM_VOLUME: 0.5,
                },
              });
            }}>
            <Icon
              name="play"
              color={isDark ? backgroundColor.dark : backgroundColor.light}
              size={25}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
