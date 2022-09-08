import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen.js';
import DetailScreen from './screens/DetailScreen.js';
import RacesScreen from './screens/RacesScreen.js';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore()


const Stack = createNativeStackNavigator();

function App() {
  return (
  <Provider store = { store }>
    <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen name="Home" component={HomeScreen}    options={{ title: 'Гонщики' }}/>
		 <Stack.Screen name="Races" component={RacesScreen} options={{ title: 'Заезды' }}/>
        <Stack.Screen name="Info" component={DetailScreen} options={{ title: 'Информация' }}/>
      </Stack.Navigator>
    </NavigationContainer>
	</Provider>
  );
}

export default App;