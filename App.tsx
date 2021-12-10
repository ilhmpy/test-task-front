import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from "./context/Context";
import { Nav } from './components/index';
import { URL } from './consts/port';
import axios from 'axios';
import { UsersViewModel } from './types/users';
import * as SecureStore from 'expo-secure-store';

// screens
import { 
  NewsScreen, AuthScreen, 
  DetailedNews, RegScreen,
  AdminScreen 
} from "./pages/index"; 
   
const Stack = createStackNavigator(); 

export default function App() {
  const [user, setUser] = useState<UsersViewModel | null>(null);
  const [nav, setNav] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(false);

  async function GetAuth() { 
    const token = await SecureStore.getItemAsync("token") || null;
    console.log("Token", token);
    axios.get(`${URL}GetAuth?Token=${token}`)     
    .then((res) => { 
      console.log("Context GetAuth", res);
      if (!res.data.hasOwnProperty("error")) {
        setUser(res.data);
      } else {
        setUser(null);
      };
    })       
    .catch((er) => {
      console.error(er)
    })
    .finally(() => setReload(false));
  };    
  
  useEffect(() => {   
    GetAuth();     
  }, [reload]); 
  
  return (
    <>
      <AppContext.Provider value={{ 
        user, 
        setReload
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
   