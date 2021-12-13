import React, { useState, useEffect } from 'react';
import { AppContext } from "./context/Context";
import { Spinner } from './components';
import { URL } from './consts';
import axios from 'axios';
import { UsersViewModel } from './types';
import * as SecureStore from 'expo-secure-store';
import { Navigation } from './Navigation';
  
export default function App() {
  const [user, setUser] = useState<UsersViewModel | null>(null);
  const [nav, setNav] = useState<boolean>(false);
  const [reload, setReload] = useState<boolean>(true);
  const [reloadNews, setReloadNews] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState(true);
  const [load, setLoad] = useState<boolean>(false);

  const GetAuth = async () => { 
        try {
          const token = await SecureStore.getItemAsync("token") || null;
          if (token) {
            setLoad(true);      
            console.log("Token", token);
            const req = await axios.get(`${URL}GetAuth?Token=${token}`);
            const res = await req.data;
            console.log("Context GetAuth", res);
            if (!res?.hasOwnProperty("error") && res) {
              setUser(res);
            } else {  
              setUser(null);       
            };
          };
        } catch(e) {
          console.error(e)  
          setUser(null);  
        } finally {
          setReload(false);
          setLoad(false);
        };
  };     

  const deleteToken = async () => {
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
        {load ? <Spinner /> : <Navigation />}
      </AppContext.Provider>
    </>
  );
}; 
   