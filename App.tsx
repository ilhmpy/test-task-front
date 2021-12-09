import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from "./context/Context";
import { Nav } from './components/index';
import { URL } from './consts/port';
import axios from 'axios';
import { UsersViewModel } from './types/users';

// screens
import { 
  NewsScreen, AuthScreen, 
  DetailedNews, RegScreen,
  AdminScreen 
} from "./pages/index";
  
const Stack = createStackNavigator(); 

export default function App() {
  const [user, setUser] = useState<UsersViewModel| null>(null);
  const [nav, setNav] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => { 
    console.log(URL);
      axios.get(`${URL}GetUser?token=${token}`)    
      .then((res) => {
        console.log("Context GetUser", res);
        if (!res.data.hasOwnProperty("error")) {
          setUser(res.data);
        };
      }) 
      .catch((er) => console.error(er));   
  }, []);
  
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
   