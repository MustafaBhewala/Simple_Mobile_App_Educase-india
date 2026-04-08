import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsScreen from '../screens/ProductsScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import InsightsScreen from '../screens/InsightsScreen';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Products"
        screenOptions={{
          headerTitleStyle: {
            fontWeight: '700',
          },
        }}>
        <Stack.Screen
          name="Products"
          component={ProductsScreen}
          options={{title: 'Catalog'}}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetailScreen}
          options={{title: 'Product Detail'}}
        />
        <Stack.Screen
          name="Insights"
          component={InsightsScreen}
          options={{title: 'App Insights'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
