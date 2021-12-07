import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { NewsScreen } from "./pages/index";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppContext } from "./context/Context";
  
const Stack = createStackNavigator(); 

export default function App() {
  const [user, setUser] = useState<any>();

  /// ??????

  return (
    <AppContext.Provider value={{ 
      user, 
    }}>
      <NavigationContainer> 
      <Stack.Navigator>
          <Stack.Screen 
            name="News"
            component={NewsScreen}
          />
      </Stack.Navigator> 
    </NavigationContainer>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
   