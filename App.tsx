import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from "./context/Context";
import { Nav } from './components/index';

// screens
import { 
  NewsScreen, AuthScreen, 
  DetailedNews, RegScreen,
  AdminScreen 
} from "./pages/index";
  
const Stack = createStackNavigator(); 

export default function App() {
  const [user, setUser] = useState<any>();
  const [nav, setNav] = useState<boolean>(false);

  return (
    <>
      <AppContext.Provider value={{ 
        user, 
      }}>
        <NavigationContainer> 
          <Nav nav={nav} setNav={setNav} />
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
          </Stack.Navigator> 
        </NavigationContainer>
      </AppContext.Provider>
    </>
  );
}; 
   