import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Nav } from './components';
import React from 'react';

// screens
import { 
    NewsScreen, AuthScreen, 
    DetailedNews, ConfirmPage,
    AdminScreen, RegScreen
  } from "./pages"; 

const Stack = createStackNavigator(); 

export const Navigation = () => {
    return (
        <NavigationContainer>    
            <Nav />
            <Stack.Navigator>
            <Stack.Screen 
                name="News"
                component={NewsScreen}
            />

            <Stack.Screen 
                name="Auth"
                component={AuthScreen}
                options={{ title: "Sign In"}}
            />

            <Stack.Screen 
                name="NewsDetails"
                component={DetailedNews}
                options={{ title: "News details"}}
            />

            <Stack.Screen 
                name="Reg"
                component={RegScreen}
                options={{ title: "Sign up"}}
            />

            <Stack.Screen 
                name="Admin" 
                component={AdminScreen} 
            />  

            <Stack.Screen 
                name="Confirm"
                component={ConfirmPage}
            />
            </Stack.Navigator> 
      </NavigationContainer>
    );
};  