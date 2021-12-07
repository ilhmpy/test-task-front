import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from "./context/Context";

// screens
import { NewsScreen, AuthScreen } from "./pages/index";
  
const Stack = createStackNavigator(); 

export default function App() {
  const [user, setUser] = useState<any>();

  return (
    <>
      <AppContext.Provider value={{ 
        user, 
      }}>
        <NavigationContainer> 
          <Stack.Navigator>
            <Stack.Screen 
              name="News"
              component={NewsScreen}
              options={{ title: "News" }}
            />
            <Stack.Screen 
              name="Auth"
              component={AuthScreen}
              options={{ title: "Auth" }}
            />
          </Stack.Navigator> 
        </NavigationContainer>
      </AppContext.Provider>
    </>
  );
}; 
   