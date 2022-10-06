import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/home/homeScreen';
import ZzimScreen from './components/zzim/zzimScreen';
import LoginScreen from './components/account/login/loginScreen';
import JoinScreen from './components/account/login/joinScreen';
import MypageScreen from './components/account/mypage/mypageScreen';
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function GuestStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='login' component={LoginScreen}/>
      <Stack.Screen name='join' component={JoinScreen}/>
    </Stack.Navigator>
  )
}

function MemberStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='mypage' component={MypageScreen}/>
    </Stack.Navigator>
  )
}






function DefaultNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='home' component={HomeScreen}/>
      <Tab.Screen name='test' component={GuestStackNavigator}/>
      <Tab.Screen name='zzim' component={ZzimScreen}/>
    </Tab.Navigator>
  )
}





export default function App() {
  const [fontsLoaded] = useFonts({
    'baseFont': require("./assets/font/NanumGothic-Regular.ttf")
  })
  if (!fontsLoaded) {
    return <StatusBar/>
  }
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <DefaultNavigator/>
      </NavigationContainer>
    </>
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
