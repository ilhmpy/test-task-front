import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from "./context/Context";
import { Nav, Spinner } from './components/index';
import { URL } from './consts/port';
import axios from 'axios';
import { UsersViewModel } from './types/users';
import * as SecureStore from 'expo-secure-store';

// screens
import { 
  NewsScreen, AuthScreen, 
  DetailedNews, ConfirmPage,
  AdminScreen, RegScreen
} from "./pages/index"; 
   
const Stack = createStackNavigator(); 

export default function App() {
  const [user, setUser] = useState<UsersViewModel | null>(null);
  const [nav, setNav] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);
  const [reloadNews, setReloadNews] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(true);
  const [load, setLoad] = useState<boolean>(false);

  async function GetAuth() { 
    const token = await SecureStore.getItemAsync("token") || null;
    console.log("Token", token);
    if (token) {
      console.log(token);
      setLoad(true);
      axios.get(`${URL}GetAuth?Token=${token}`)     
        .then((res) => { 
          console.log("Context GetAuth", res);
          if (!res.data.hasOwnProperty("error") && res.data) {
            setUser(res.data);
          } else {  
            setUser(null);       
          };
        })       
        .catch((er) => {
          console.error(er) 
          setUser(null); 
        })
        .finally(() => {
          setReload(false);
          setLoad(false);
        });
    };
  };     

  async function deleteToken() {
    await SecureStore.deleteItemAsync("token");
  };  

  // deleteToken();
  
  useEffect(() => {   
    if (reload === true) {
      GetAuth();
    };
  }, [reload]); 
  
  return (  
    <>
      <AppContext.Provider value={{ 
        user,
        reloadNews,
        setReloadNews,
        setUser,
        setReload
      }}>
        {load ? <Spinner /> : (
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

              <Stack.Screen 
                name="Confirm"
                component={ConfirmPage}
              />
            </Stack.Navigator> 
          </NavigationContainer>
        )}
      </AppContext.Provider>
    </>
  );
}; 
   