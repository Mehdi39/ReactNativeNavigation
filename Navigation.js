import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

import Home from './screens/Home'
import Search from './screens/Search';
import Orders from './screens/Orders';
import Profile from './screens/Profile';
import Auth from './screens/Auth';

// Tab Bottom
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function TabGroup() {
    const [user, letUser] = useState(false);

    return (
        <Tab.Navigator 
            screenOptions={{
                activeTintColor: '#e91e63',
                labelStyle: { fontSize: 12 },
                style: { backgroundColor: 'powderblue' },
            }}
        >
            <Tab.Screen 
                name="Home" 
                component={Home} 
                options={{ 
                    tabBarIcon: () => <AntDesign name="home" size={24} color="black" />
                }}
            />
            <Tab.Screen 
                name="Search" 
                component={Search} 
                options={{ 
                    tabBarIcon: () => <AntDesign name="search1" size={24} color="black" /> 
                }} 
            />
            <Tab.Screen 
                name="Orders" 
                component={Orders} 
                options={{ 
                    tabBarIcon: () => <FontAwesome6 name="receipt" size={24} color="black" /> 
                }} 
            />
            {/* <Tab.Screen name="Profile" component={Profile} options={{ tabBarIcon: () => <AntDesign name="home" size={24} color="black" /> }} /> */}
            <Tab.Screen 
                name="Auth" 
                component={Auth} 
                options={{ 
                    tabBarIcon: () => <AntDesign name={user ? "search1" : "home"} size={24} color="black" /> 
                }}
            />
        </Tab.Navigator>
    )
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    )
}
