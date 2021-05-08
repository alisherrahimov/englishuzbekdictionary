import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  useColorScheme,
  Dimensions,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {backgroundColor, fontStyle} from '../../style/Colors';
import db from '../db_connect';

const {width, height} = Dimensions.get('screen');
export default function Uzbek({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const [word, setWord] = useState([]);
  const [search, setSearch] = useState([]);
  const [indicator, setIndicator] = useState(false);

  useEffect(() => {
    setIndicator(!indicator);
    db.transaction(tx => {
      tx.executeSql(
        'SELECT Hindi,id FROM Dictionary  LIMIT 1000',
        [],
        (tx, res) => {
          setWord(res.rows.raw());
          setIndicator(!indicator);
        },
      );
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? backgroundColor.dark
          : backgroundColor.light,
        alignItems: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          margin: 10,
          marginBottom: 20,
        }}>
        <Text
          style={{
            color: isDarkMode ? backgroundColor.light : backgroundColor.dark,
            fontFamily: fontStyle.regular,
            fontSize: width / 15,
          }}>
          Uzbek-English
        </Text>
      </View>

      <View style={styles.TextInputView}>
        <TextInput
          onChangeText={val => {
            db.transaction(tx => {
              tx.executeSql(
                `SELECT Hindi 
                FROM Dictionary 
                WHERE Hindi LIKE "${val}%" `,
                [],
                (tx, res) => {
                  setSearch(res.rows.raw());
                },
                (tx, err) => {
                  console.error(err);
                },
              );
            });
          }}
          placeholder="Qidirish"
          placeholderTextColor={
            isDarkMode ? backgroundColor.dark : backgroundColor.light
          }
          style={[
            {
              backgroundColor: isDarkMode
                ? backgroundColor.light
                : backgroundColor.dark,
            },
            {color: isDarkMode ? backgroundColor.dark : backgroundColor.light},
            styles.TextInput,
          ]}
        />
        <View
          style={{
            backgroundColor: isDarkMode
              ? backgroundColor.light
              : backgroundColor.dark,
            height: height / 18,
            borderTopRightRadius: 25,
            width: width / 8,
            borderBottomRightRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Icon
            name="search"
            size={20}
            color={isDarkMode ? backgroundColor.dark : backgroundColor.light}
          />
        </View>
      </View>
      <ScrollView style={{marginTop: 20}} showsVerticalScrollIndicator={false}>
        {search.length !== 0 ? (
          search.map((val, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  try {
                    db.transaction(tx => {
                      tx.executeSql(
                        `SELECT English FROM Dictionary where Id = ${val.Id}`,
                        [],
                        (txt, res) => {
                          navigation.navigate('Translator', {
                            data: res.rows.raw(),
                          });
                          console.log(res.rows.raw());
                        },
                        err => {
                          console.error(err);
                        },
                      );
                    });
                  } catch (error) {
                    ToastAndroid.show(error, 2000);
                  }
                }}
                activeOpacity={0.7}
                key={index}
                style={{
                  backgroundColor: isDarkMode
                    ? backgroundColor.light
                    : backgroundColor.dark,
                  width: width / 1.1,
                  height: height / 18,
                  margin: 10,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: isDarkMode
                      ? backgroundColor.dark
                      : backgroundColor.light,
                    fontFamily: fontStyle.regular,
                    fontSize: 20,
                  }}>
                  {val.Hindi}
                </Text>
              </TouchableOpacity>
            );
          })
        ) : word.length == 0 ? (
          <ActivityIndicator
            size="large"
            color={isDarkMode ? backgroundColor.light : backgroundColor.dark}
          />
        ) : (
          word.map((val, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  try {
                    db.transaction(tx => {
                      tx.executeSql(
                        `SELECT English FROM Dictionary where Id = ${val.Id}`,
                        [],
                        (txt, res) => {
                          navigation.navigate('Translator', {
                            data: res.rows.raw(),
                          });
                        },
                        err => {
                          console.error(err);
                        },
                      );
                    });
                  } catch (error) {
                    ToastAndroid.show(error, 2000);
                  }
                }}
                activeOpacity={0.7}
                key={index}
                style={{
                  backgroundColor: isDarkMode
                    ? backgroundColor.light
                    : backgroundColor.dark,
                  width: width / 1.1,
                  height: height / 18,
                  margin: 10,
                  borderRadius: 25,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: isDarkMode
                      ? backgroundColor.dark
                      : backgroundColor.light,
                    fontFamily: fontStyle.regular,
                    fontSize: 20,
                  }}>
                  {val.Hindi}
                </Text>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  TouchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 50,
    borderRadius: 20,
    backgroundColor: 'red',
  },
  TextInput: {
    width: width / 1.5,
    height: height / 18,
    paddingLeft: 15,
    fontFamily: fontStyle.regular,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    fontSize: 22,
  },
  TextInputView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
