import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import English from '../screens/English';
import Uzbek from '../screens/Uzbek';
import Translator from '../screens/Translator';
const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="English" component={English} />
        <Stack.Screen name="Uzbek" component={Uzbek} />
        <Stack.Screen name="Translator" component={Translator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
