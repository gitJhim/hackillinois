import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {View, Image, StyleSheet} from 'react-native';

import HomeScreen from './Screens/HomeScreen';
import DetailsScreen from './Screens/DetailsScreen';
import SettingScreen from './Screens/SettingScreen';

import Hatchery from './Screens/Hatchery';
import Garden from './Screens/Garden';

const eggName = "Hatchery";
const homeName = "Garden";
const detailsName = "Details";
const settingsName = "Profile";

const eggImg = require("../assets/egg-outline.png");
const eggImgFilled = require("../assets/egg-filled.png");
const Tab = createBottomTabNavigator();

function MainContainer() {
  const nTheme = {
    dark: true,
    colors: {
        primary: '#FFFFFF',
        background: '#FFFFFF',
        color: '#FFFFFF',
        card: '#2C2A4A',
        notification: '#FFFFFF'
    },
  };

  return (
    
    <NavigationContainer theme={nTheme} zIndex="-9999">
      <Tab.Navigator
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            
            if (rn === eggName) {
                if (!focused) {
                    return <Image source={eggImg} style={styles.image}/>
                } else {return <Image source={eggImgFilled} style={styles.image} />}
            } else if (rn === homeName) {
                if (focused) {
                    return <Image source={require('../assets/Garden.png')} style={styles.image}/>
                } else {return <Image source={require('../assets/Garden-outline.png')} style={styles.image}/>}
            } else if (rn === detailsName) {
              iconName = focused ? 'list' : 'list-outline';

            } else if (rn === settingsName) {
              iconName = focused ? 'person' : 'person-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "white",
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#FFFFFF',
        }
        )}
        >
        
        <Tab.Screen name={eggName} component={Hatchery} />
        <Tab.Screen name={homeName} component={Garden} />
        <Tab.Screen name={detailsName} component={DetailsScreen}/>
        <Tab.Screen name={settingsName} component={SettingScreen}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    image: {
      width: 30, 
      height: 30,
      resizeMode: 'contain',
      zIndex: 9
    },
  });

export default MainContainer;