import React from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  TouchableOpacity,
  Image,
} from 'react-native';
import {backgroundColor, fontStyle} from '../../style/Colors';
const {width, height} = Dimensions.get('screen');
export default function Home({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          backgroundColor: isDarkMode
            ? backgroundColor.dark
            : backgroundColor.light,
        },
      ]}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text
          style={{
            color: isDarkMode ? backgroundColor.light : backgroundColor.dark,
            fontSize: 25,
            fontFamily: fontStyle.regular,
          }}>
          English-Uzbek Dictionary
        </Text>
        <Image
          source={require('../unnamed.png')}
          resizeMode="cover"
          style={{width: width / 2, height: height / 5, marginTop: 80}}
        />
      </View>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('English');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            width: width / 2,
            height: height / 18,
            backgroundColor: isDarkMode
              ? backgroundColor.light
              : backgroundColor.dark,
            margin: 20,
          }}>
          <Text
            style={{
              color: isDarkMode ? backgroundColor.dark : backgroundColor.light,
              fontSize: 18,
              fontFamily: fontStyle.regular,
            }}>
            English-Uzbek
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Uzbek');
          }}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            width: width / 2,
            height: height / 18,
            backgroundColor: isDarkMode
              ? backgroundColor.light
              : backgroundColor.dark,
            margin: 20,
          }}>
          <Text
            style={{
              color: isDarkMode ? backgroundColor.dark : backgroundColor.light,
              fontSize: 18,
              fontFamily: fontStyle.regular,
            }}>
            Uzbek-English
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
